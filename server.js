require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Required for Railway (runs behind a proxy)
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

/* ================= MongoDB Connection ================= */
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1); // Fail fast so Railway restarts the container
  });

/* ================= Schema ================= */
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: Date.now },
  week1Sent: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

/* ================= Local Analysis Generator (Fallback) ================= */
function generateLocalAnalysis(inputs, result) {
  // حساب أكبر مساهمَين
  const breakdown = [
    { name: "البنزين",     val: (inputs.gasoline || 0) * 2.31 },
    { name: "الديزل",      val: (inputs.diesel || 0) * 2.68 },
    { name: "السيارة",     val: (inputs.distance || 0) * 0.19 },
    { name: "الكهرباء",   val: (inputs.electricity || 0) * 0.5 },
    { name: "الغاز",       val: (inputs.gas || 0) * 36 },
    { name: "المياه",      val: (inputs.water || 0) * 0.3 },
    { name: "النفايات",    val: (inputs.waste || 0) * 4 * 1.9 },
    { name: "الغذاء",      val: ((inputs.diet || 0) * 1000) / 12 },
    { name: "الطيران",     val: ((inputs.flights || 0) * 115) / 12 },
    { name: "التسوق",      val: (inputs.shopping || 0) * 0.4 }
  ].filter(x => x.val > 0).sort((a,b) => b.val - a.val);

  const top1 = breakdown[0] || { name: "الكهرباء", val: 0 };
  const top2 = breakdown[1] || { name: "التنقل",    val: 0 };

  const tips = {
    "البنزين":   "🚗 فكّر في استخدام السيارة الكهربائية أو تقسيم التنقل مع زملاء للعمل.",
    "الديزل":    "🚚 استبدل رحلات الديزل بالمواصلات العامة حيثما أمكن.",
    "السيارة":   "🚌 استخدم المواصلات العامة أو الدراجة لمسافات أقل من 5 كم.",
    "الكهرباء":  "💡 استبدل الأجهزة القديمة بأجهزة موفرة للطاقة (تصنيف A+).",
    "الغاز":     "🔥 اعزل بيتك جيداً وقلّل استخدام التدفئة والتبريد.",
    "المياه":    "💧 ضع موفرات المياه على الصنابير وأصلح أي تسرب.",
    "النفايات":  "♻️ فرز النفايات وإعادة تدويرها يخفض الانبعاثات بشكل ملموس.",
    "الغذاء":    "🥦 قلّل اللحوم الحمراء يومين في الأسبوع وزِد الخضروات.",
    "الطيران":   "✈️ استبدل رحلة جوية واحدة بالسنة بالقطار أو المؤتمرات عن بُعد.",
    "التسوق":    "🛍️ اشترِ أقل وأفضل — جودة على حساب الكمية."
  };

  const monthly = result.monthly || 0;
  const yearly = result.yearly || 0;

  return `🔍 **تحليل بصمتك الكربونية**

أكبر مصادر انبعاثاتك:
1. **${top1.name}**: ${top1.val.toFixed(0)} كغم CO₂/شهر (${((top1.val/monthly)*100).toFixed(0)}% من إجمالي بصمتك)
2. **${top2.name}**: ${top2.val.toFixed(0)} كغم CO₂/شهر (${((top2.val/monthly)*100).toFixed(0)}% من إجمالي بصمتك)

💡 **توصيات مخصصة لك:**
${tips[top1.name] || "• قلّل الاستهلاك العام للطاقة."}
${tips[top2.name] || "• راجع عادات التنقل اليومي."}
• 🌱 زراعة شجرتين شهرياً تعوّض ${(monthly*0.1).toFixed(0)} كغم CO₂.

✅ إذا اتّبعت هذه النصائح يمكنك تقليل بصمتك السنوية بحوالي **${(yearly*0.25).toFixed(1)} طن CO₂** — وهذا يعادل إزالة سيارة من الطريق لأشهر!

استمر في القياس كل شهر لرصد تقدمك 🌿`;
}

/* ================= Save Email Route ================= */
app.post('/save-email', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.sendStatus(400);

    const exists = await User.findOne({ email });
    if (!exists) {
      await User.create({ email });
      console.log('📥 Email saved:', email);

      setTimeout(async () => {
        const freshUser = await User.findOne({ email });
        if (freshUser && !freshUser.week1Sent) {
          const success = await sendReminderEmail(freshUser.email);
          if (success) {
            freshUser.week1Sent = true;
            await freshUser.save();
            console.log('📧 Reminder sent (7 days after signup):', freshUser.email);
          }
        }
      },7 * 24 * 60 * 60 * 1000);
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

/* ================= 🤖 AI Analysis Route ================= */
app.post('/analyze', async (req, res) => {
  try {
    const { inputs, result, lang = 'ar' } = req.body;
    if (!inputs || !result) return res.status(400).json({ error: 'Missing data' });

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === '') {
      console.log('⚠️ No API key found, using local analysis fallback');
      const localAnalysis = generateLocalAnalysis(inputs, result);
      return res.json({ analysis: localAnalysis, source: 'local' });
    }

    const isAr = lang === 'ar';
    const langInstruction = isAr
      ? 'اكتب بالعربية الفصيحة فقط.'
      : 'Write in English only.';

    const prompt = `
${isAr ? 'أنت خبير بيئي متخصص في تحليل البصمة الكربونية.' : 'You are an environmental expert specializing in carbon footprint analysis.'}
${isAr ? 'بناءً على بيانات المستخدم التالية، اكتشف السبب الرئيسي لارتفاع البصمة وقدّم تحليلاً وتوصيات مخصصة.' : 'Based on the following user data, identify the main causes of high footprint and provide personalized analysis and recommendations.'}

📊 ${isAr ? 'بيانات المستخدم الشهرية' : 'Monthly user data'}:
- ${isAr?'بنزين':'Gasoline'}: ${inputs.gasoline || 0} ${isAr?'لتر/شهر':'L/month'} → ${((inputs.gasoline || 0)*2.31).toFixed(0)} kg CO₂
- ${isAr?'ديزل':'Diesel'}: ${inputs.diesel || 0} ${isAr?'لتر/شهر':'L/month'} → ${((inputs.diesel || 0)*2.68).toFixed(0)} kg CO₂
- ${isAr?'مسافة بالسيارة':'Distance'}: ${inputs.distance || 0} ${isAr?'كم/شهر':'km/month'} → ${((inputs.distance || 0)*0.19).toFixed(0)} kg CO₂
- ${isAr?'كهرباء':'Electricity'}: ${inputs.electricity || 0} ${isAr?'ك.و.س/شهر':'kWh/month'} → ${((inputs.electricity || 0)*0.5).toFixed(0)} kg CO₂
- ${isAr?'أسطوانات غاز':'Gas cylinders'}: ${inputs.gas || 0}${isAr?'/شهر':'/month'} → ${((inputs.gas || 0)*36).toFixed(0)} kg CO₂
- ${isAr?'مياه':'Water'}: ${inputs.water || 0} ${isAr?'م³/شهر':'L/month'} → ${((inputs.water || 0)*0.3).toFixed(0)} kg CO₂
- ${isAr?'نفايات':'Waste'}: ${inputs.waste || 0} ${isAr?'كغم/أسبوع':'kg/week'} → ${((inputs.waste || 0)*4*1.9).toFixed(0)} kg CO₂
- ${isAr?'نمط الغذاء':'Diet'}: ${inputs.diet === 3.3 ? (isAr?'غني باللحوم':'High-meat') : inputs.diet === 2.5 ? (isAr?'متوسط':'Moderate') : inputs.diet === 1.7 ? (isAr?'نباتي':'Vegan') : (isAr?'غير محدد':'Unspecified')}
- ${isAr?'رحلات جوية':'Flights'}: ${inputs.flights || 0}${isAr?'/سنة':'/year'}
- ${isAr?'إنفاق شهري':'Monthly spending'}: ${inputs.shopping || 0} USD

📈 ${isAr?'النتيجة الإجمالية':'Total'}: ${(result.monthly || 0).toFixed(1)} kg CO₂e/${isAr?'شهر':'month'} (${(result.yearly || 0).toFixed(2)} ${isAr?'طن/سنة':'tons/year'})
${isAr?'المستوى':'Level'}: ${result.level || (isAr?'غير محدد':'Unspecified')}

${langInstruction}
${isAr ? `الرجاء تقديم:
1. أكبر سببين لارتفاع البصمة (مقارنة بالمتوسط العالمي)
2. ثلاث نصائح مخصصة وعملية بناءً على بياناته تحديداً
3. الوفورات المتوقعة إذا اتّبع كل نصيحة (بالكغم أو الطن سنوياً)
اكتب بأسلوب واضح وودّي، وأضف تشجيعاً إيجابياً في النهاية. لا تتجاوز 250 كلمة.`
: `Please provide:
1. The top 2 causes of high footprint (compared to global average)
2. Three personalized, actionable tips based on their specific data
3. Expected savings if each tip is followed (in kg or tons/year)
Write in a clear and friendly tone, with positive encouragement at the end. Max 250 words.`}
`;

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-sonnet-4-5',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }]
      },
      {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  timeout: 15000  // ← هنا صح من ناحية المكان
}
    );

    const text = response.data.content[0]?.text || '';
    res.json({ analysis: text, source: 'ai' });

  } catch (err) {
    console.error('❌ AI error:', err.response?.data || err.message);
    // في حالة فشل الـ AI، استخدم التحليل المحلي
    const { inputs, result } = req.body;
    const localAnalysis = generateLocalAnalysis(inputs, result);
    res.json({ analysis: localAnalysis, source: 'local-fallback' });
  }
});

/* ================= Community AI Analysis Route ================= */
app.post('/analyze-community', async (req, res) => {
  try {
    const { inputs, result } = req.body;
    if (!inputs || !result) return res.status(400).json({ error: 'Missing data' });

    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === '') {
      const localAnalysis = generateLocalAnalysis(inputs, result);
      return res.json({ analysis: localAnalysis, source: 'local' });
    }

    const typeLabels = { company: 'Company', college: 'College/University', town: 'City/Town' };
    const typeLabel = typeLabels[inputs.communityType] || 'Unspecified';
    const perPerson = inputs.people > 0 ? ((result.monthly || 0) / inputs.people).toFixed(1) : 0;

    const prompt = `
You are an environmental expert analyzing community carbon footprints.
IMPORTANT: Write every point bilingually - Arabic first, then English translation immediately after.

Community Data:
- Type: ${typeLabel}
- People: ${inputs.people || 0}
- Electricity: ${inputs.electricity || 0} kWh/month -> ${((inputs.electricity || 0)*0.5).toFixed(0)} kg CO2
- Gasoline: ${inputs.gasoline || 0} L/month -> ${((inputs.gasoline || 0)*2.31).toFixed(0)} kg CO2
- Diesel: ${inputs.diesel || 0} L/month -> ${((inputs.diesel || 0)*2.68).toFixed(0)} kg CO2
- Waste: ${inputs.waste || 0} kg/month -> ${((inputs.waste || 0)*1.9).toFixed(0)} kg CO2
- Water: ${inputs.water || 0} L/month -> ${((inputs.water || 0)*0.0003).toFixed(1)} kg CO2
- Flights: ${inputs.flights || 0}/year

Total: ${(result.monthly || 0).toFixed(1)} kg CO2e/month (${(result.yearly || 0).toFixed(2)} tons/year)
Per person: ${perPerson} kg CO2e/month
Level: ${result.level || 'Unspecified'}

Please provide a BILINGUAL response (Arabic sentence followed by English translation) covering:
1. Top 2 causes of the high community footprint
2. Three practical recommendations for this type of community
3. Expected savings for each recommendation (kg or tons/year)
Friendly professional tone, positive encouragement at end. Max 300 words total.
`;

    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      { model: 'claude-sonnet-4-5', max_tokens: 700, messages: [{ role: 'user', content: prompt }] },
      {
        headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
        timeout: 15000
      }
    );

    const text = response.data.content[0]?.text || '';
    res.json({ analysis: text, source: 'ai' });

  } catch (err) {
    console.error('Community AI error:', err.response?.data || err.message);
    const { inputs, result } = req.body;
    const localAnalysis = generateLocalAnalysis(inputs, result);
    res.json({ analysis: localAnalysis, source: 'local-fallback' });
  }
});

/* ================= EmailJS Sender ================= */
async function sendReminderEmail(userEmail) {
  try {
    await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id:   process.env.EMAILJS_SERVICE_ID,
        template_id:  process.env.EMAILJS_TEMPLATE_ID_WEEK1,
        user_id:      process.env.EMAILJS_PUBLIC_KEY,
        accessToken:  process.env.EMAILJS_PRIVATE_KEY,
        template_params: {
          to_email:  userEmail,
          to_name:   userEmail,
          from_name: "Carbon Tracker"
        }
      }
    );
    console.log("📧 Email sent to USER:", userEmail);
    return true;
  } catch (err) {
    console.error("❌ EmailJS error:", err.response?.data || err.message);
    return false;
  }
}

/* ================= Reminder Logic (Backup Checker) ================= */
async function checkReminders() {
  const users = await User.find({ week1Sent: false });
  const now = new Date();
  for (const user of users) {
    const diffDays = (now - user.createdAt) / (1000 * 60 * 60 * 24);
    if (diffDays >= 7) {
      const success = await sendReminderEmail(user.email);
      if (success) {
        user.week1Sent = true;
        await user.save();
        console.log("✅ Backup reminder sent:", user.email);
      }
    }
  }
}

/* ================= Auto Scheduler ================= */
setInterval(checkReminders, 6 * 60 * 60 * 1000);
checkReminders();

/* ================= Trigger Route ================= */
app.get('/check-reminders', async (req, res) => {
  await checkReminders();
  res.sendStatus(200);
});

/* ================= Start Server ================= */
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.status(404).send('Not Found');
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));