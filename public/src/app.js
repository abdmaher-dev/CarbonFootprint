// ================================================================
//  ⚙️  API Settings
// ================================================================
const EMAILJS_PUBLIC_KEY  = "UKZX5vXt0uP3uXd53";
const EMAILJS_SERVICE_ID  = "service_blw3koo";
const EMAILJS_TEMPLATE_ID = "template_sole5be";
const BACKEND_URL = "";

// ================================================================
//  💧 TOOLTIP STYLES (injected once)
// ================================================================
(function injectTooltipStyles() {
  if (document.getElementById('tt-styles')) return;
  const s = document.createElement('style');
  s.id = 'tt-styles';
  s.textContent = `
    .tt-wrap { display:inline-flex; align-items:center; gap:6px; width:100%; }
    .tt-btn {
      display:inline-flex; align-items:center; justify-content:center;
      width:18px; height:18px; border-radius:50%;
      background:#d1fae5; color:#059669;
      font-size:11px; font-weight:800;
      border:1.5px solid #6ee7b7; cursor:pointer;
      flex-shrink:0; line-height:1;
      transition:background 0.2s, color 0.2s;
      font-family:Arial,sans-serif; padding:0;
    }
    .tt-btn:hover, .tt-btn.active { background:#059669; color:white; }
    .tt-box {
      position:absolute; z-index:9999;
      bottom:calc(100% + 8px);
      background:#064e3b; color:#ecfdf5;
      font-family:"Parastoo",serif;
      font-size:0.8rem; line-height:1.7;
      padding:0.6rem 0.9rem;
      border-radius:10px; width:220px;
      box-shadow:0 6px 20px rgba(0,0,0,0.2);
      pointer-events:none; opacity:0;
      transform:translateY(4px);
      transition:opacity 0.2s, transform 0.2s;
    }
    .tt-btn.active + .tt-box { opacity:1; transform:translateY(0); pointer-events:auto; }
    [dir="ltr"] .tt-box { right:0; left:auto; }
    [dir="rtl"] .tt-box { left:0; right:auto; }
    .tt-box::after {
      content:''; position:absolute; bottom:-6px;
      border:6px solid transparent;
      border-top-color:#064e3b; border-bottom:none;
    }
    [dir="ltr"] .tt-box::after { right:4px; }
    [dir="rtl"] .tt-box::after { left:4px; }
    .form-label { position:relative; }
    .tt-btn.comm-tt { background:#e0f2fe; color:#0891b2; border-color:#7dd3fc; }
    .tt-btn.comm-tt:hover,.tt-btn.comm-tt.active { background:#0891b2; color:white; }
    .comm-tt.active + .tt-box { background:#0c4a6e; }
    .comm-tt.active + .tt-box::after { border-top-color:#0c4a6e; }
  `;
  document.head.appendChild(s);
})();

// ================================================================
//  TRANSLATIONS
// ================================================================
const TRANSLATIONS = {
  "en": {
    "dir":"ltr","langButton":"العربية",
    "nav":{"home":"Home","about":"About","calc":"Calculator","contact":"Community Calculator","logo":"<img class='logo-img' src='/Images/IMG_7912.webp' alt='Logo'/> Carbon Footprint"},
    "hero":{"title":"Carbon Footprint","paragraph":"Discover the impact you have on the environment through a precise and easy-to-use carbon footprint calculator. Start reducing your energy consumption and daily emissions for a more sustainable lifestyle.","under":"Understanding Carbon Footprint","indvBut":"Calculate Now","commBut":"Community Print","scrollHint":"Discover more"},
    "cta":{"title":"Start Your Journey Now 🌍","para":"Calculate your carbon footprint for free and get your results delivered to your email.","btn":"🌿 Calculate Now"},
    "cards":{"first":{"h":"What is Carbon Footprint?","p":"A carbon footprint measures the total greenhouse gas emissions caused directly and indirectly by an individual, organization, or product."},"second":{"h":"Why It Matters","p":"Reducing carbon emissions is crucial for combating climate change and preserving our planet for future generations."},"third":{"h":"Take Action","p":"Small changes in daily life can significantly reduce your environmental impact and inspire others to do the same."}},
    "art":{"header":"Reduce Your Carbon Footprint","firstHeader":"Use Public Transport","secondHeader":"Save Energy","thirdHeader":"Eat Plant-Based","fourthHeader":"Shop Sustainably","fifthHeader":"Awareness","Firstp":"Reduce emissions by 4.6 metric tons annually per person","Secondp":"Switch to LED bulbs and unplug devices when not in use","Thirdp":"Reduce food emissions by up to 73%","Fourthp":"Choose eco-friendly products and reduce consumption","fifthp":"Calculating your carbon footprint helps raise awareness among others about the impact of our daily actions"},
    "footer":{"header":"Together for a Greener Future","p":"Every action counts. Start your journey towards a sustainable lifestyle today.","first":"Tons CO₂ Annually","second":"Target Limit","third":"Climate Goals"},
    "about":{
      "heroTag":"🌿 Carbon Footprint Guide","text1":"What is Carbon Footprint?","text2":"Everything you do produces CO₂ — discover what this means and how it affects our planet's future",
      "eyebrow1":"Definition","headerDef":"Understanding Carbon Footprint",
      "text2Full":"The carbon footprint is the total amount of greenhouse gases produced by human activities, including CO₂, methane (CH₄), and nitrous oxide (N₂O), measured in tons of CO₂ equivalent.",
      "text2Types":"It is divided into two types: <strong style='color:#059669'>Direct</strong> — such as car exhaust and home fuel burning, and <strong style='color:#059669'>Indirect</strong> — such as the energy used to produce goods and services we buy.",
      "defQuote":"\"The carbon footprint is the mirror that reflects our impact on the planet. Measuring it is the first step toward reducing it.\"",
      "statAvg":"Global average per person","statGoal":"Climate target per person","statTop":"Highest country (Qatar)",
      "statLabel1":"Billion tons CO₂ annually from humans","statLabel2":"Earth temperature rise since 1880","statLabel3":"CO₂ concentration in the atmosphere","statLabel4":"Global carbon neutrality target",
      "eyebrow2":"Importance","text3":"Why is Carbon Footprint Important?","text4":"Rising CO₂ levels pose one of the most dangerous threats to our planet. Every additional ton of CO₂ stays in the atmosphere for over <strong>100 years</strong>, accumulating impacts on future generations.",
      "why1Title":"Global Warming","why1p":"Earth's temperature has risen by 1.2°C since the pre-industrial era. If we exceed 2°C, the consequences will be severe and irreversible.",
      "why2Title":"Melting Ice","why2p":"Antarctica has lost over 3 trillion tons of ice since the 1990s, visibly raising sea levels every year.",
      "why3Title":"Food Security","why3p":"Changing rainfall patterns and drought threaten crops. Scientists estimate a 25% drop in food production by 2050 if degradation continues.",
      "why4Title":"Economic Losses","why4p":"Climate disasters cost the world over $300 billion annually. Acting now is 5x cheaper than dealing with the consequences later.",
      "eyebrow3":"Sources","text5":"Major Sources of Carbon Emissions",
      "li1Title":"Electricity & Energy Generation","li1p":"Coal and natural gas plants generate more than a third of global emissions. Switching to solar and wind is the fastest solution.",
      "li2Title":"Transportation","li2p":"Cars, planes, and ships consume billions of liters of fossil fuel daily. An electric car alone reduces your footprint by 50%.",
      "li3Title":"Industry & Manufacturing","li3p":"Producing steel, cement, and chemicals requires burning massive amounts of fuel. Industry accounts for a sixth of global emissions.",
      "li4Title":"Agriculture & Livestock","li4p":"Livestock produce methane, which is 80x more potent than CO₂. Reducing red meat is one of the most powerful individual changes.",
      "li5Title":"Construction","li5p":"Buildings account for 40% of global energy consumption through heating, cooling, and lighting. Good insulation cuts both bills and footprint.",
      "eyebrow4":"Effects","text11":"Impact of Carbon Footprint on the Environment",
      "eff1Title":"Extreme Heat Waves","eff1p":"Earth has recorded its highest temperatures in recent years. Heat waves that once occurred every 50 years now occur every 10.","eff1sev":"Very High Impact ⚠️",
      "eff2Title":"Rising Sea Levels","eff2p":"Average sea levels have risen over 20cm since 1900. Projections suggest an additional 0.3–1 meter rise by 2100, threatening coastal cities.","eff2sev":"Long-term Danger 🌊",
      "eff3Title":"Drought & Water Scarcity","eff3p":"Over 2 billion people face water scarcity. Climate change intensifies this crisis by altering rainfall patterns.","eff3sev":"Growing Crisis 📈",
      "eff4Title":"Air Pollution & Health","eff4p":"Air pollution causes 7 million deaths annually worldwide. Fine particles penetrate lungs causing heart disease, cancer, and asthma.","eff4sev":"7 Million Deaths/Year 💔",
      "eyebrow5":"Solutions","text20":"How Can You Reduce Your Carbon Footprint?",
      "red1Title":"Green Transport","red1p":"Use public transport, cycle, or walk. Every km cycled instead of driven saves 150g CO₂.","red1imp":"↓ 2.4 tons/year",
      "red2Title":"Energy Efficiency","red2p":"Switch to LED bulbs and energy-efficient appliances. An LED bulb uses 90% less energy than a standard one.","red2imp":"↓ 1.5 tons/year",
      "red3Title":"Plant-Based Diet","red3p":"Cutting red meat one day a week saves 340 kg CO₂ annually. A fully plant-based diet cuts food footprint by 73%.","red3imp":"↓ 0.7 tons/year",
      "red4Title":"Renewable Energy","red4p":"Solar panels eliminate 80% of electricity bills and produce clean energy for 25 years.","red4imp":"↓ 1.8 tons/year",
      "red5Title":"Recycling","red5p":"Recycling aluminum saves 95% of the energy needed. Sorting waste cuts footprint noticeably.","red5imp":"↓ 0.5 tons/year",
      "red6Title":"Tree Planting","red6p":"One tree absorbs 22 kg CO₂ annually. Planting ten trees roughly offsets an eco-conscious person's footprint.","red6imp":"↓ 0.22 tons/tree",
      "eyebrow6":"Data","chartTitle":"Carbon Footprint in Iraq",
      "text26":"⚠️ Important Notice: These figures are approximate estimates based on energy, transport, and industrial patterns. They do not represent officially approved data from international bodies.",
      "ctaTitle":"Ready to Know Your Footprint? 🌿","ctaPara":"Calculate your personal carbon footprint in two minutes and get a personalized AI report.","text27":"Calculate for Free Now ←"
    },
    "cal":{
      "bannerTitle":"🌿 Calculate Your Carbon Footprint","header1":"Enter your data (all fields are optional)",
      "secFuel":"⛽ Fuel & Transport","secHome":"🏠 Home & Energy","secFood":"🥦 Food & Shopping","secEmail":"📧 Receive Your Results",
      "emailLabel":"📧 Email address <span style='color:#059669;font-size:0.8rem'>(to receive results and weekly reminder)</span>",
      "emailNote":"✅ You'll receive an email with results immediately + a reminder in a week to re-measure",
      "header2":"Gasoline (liters/month)","header3":"Diesel (liters/month)","header4":"Distance (km/month)",
      "header5":"Electricity (kWh/month)","header6":"Gas cylinders (per month)","header7":"Water (liters/month)",
      "header8":"Waste (kg/week)","header9":"Diet type","header10":"Choose...","header11":"Vegan","header12":"Moderate","header13":"High-meat",
      "header14":"Flights per year","header15":"Monthly spending (USD)","header16":"Calculate Now",
      "tipsTitle":"💡 Quick Tips to Reduce Your Footprint",
      "tips":["🚌 Public transport","💡 Turn off lights","🚴 Ride a bike","🌱 Eat less meat","♻️ Recycle","☀️ Solar energy","🛁 Save water","🛒 Shop wisely"]
    },
    "tooltips":{
      "gasoline":"Gasoline is used in most passenger cars and motorcycles. Enter your estimated monthly consumption in liters.",
      "diesel":"Diesel is used in generators, heavy trucks, buses, and some cars. It produces more CO₂ per liter than gasoline.",
      "distance":"Total distance driven monthly by car (any fuel type). Even short daily trips add up significantly.",
      "electricity":"Check your electricity bill for the kWh figure. Electricity is one of the biggest sources of household emissions.",
      "gas":"Cooking or heating gas cylinders used per month. Each standard cylinder (~12 kg) releases ~36 kg CO₂.",
      "water":"Your household water consumption in liters per month. Water treatment and pumping consumes significant energy.",
      "waste":"Average weight of trash you produce per week in kg. Landfill waste decomposes and releases methane gas.",
      "diet":"Your general diet type. Meat-heavy diets produce significantly more greenhouse gases than plant-based ones.",
      "flights":"Total number of flights (one-way) per year. A single flight can add hundreds of kg of CO₂.",
      "shopping":"Average monthly spending on goods in USD. Production and shipping of goods generates emissions.",
      "people":"Total number of employees, students, or residents in your community.",
      "electricityC":"Total electricity consumption of the entire community (kWh/month).",
      "gasolineC":"Total gasoline used by community vehicles per month in liters.",
      "dieselC":"Diesel used by generators, trucks, or heavy equipment in the community per month.",
      "wasteC":"Total solid waste generated by the community per month in kg.",
      "waterC":"Total water consumption by the community per month in liters.",
      "flightsC":"Total number of flights taken by community members or for business per year."
    },
    "comm":{
      "bannerTitle":"🏘️ Community Carbon Footprint Calculator","header1":"Calculate the carbon footprint of your community, company, or institution",
      "badge1":"🏢 Companies","badge2":"🎓 Universities","badge3":"🏙️ Cities",
      "secType":"🏙️ Community Type","header2":"Choose your community type",
      "header3":"Choose...","header4":"Company","header5":"College / University","header6":"Town / City",
      "typeCompany":"Company","typeCollege":"College / University","typeTown":"Town / City",
      "secPeople":"👥 Number of People","header7":"👥 Number of Employees / Students / Residents",
      "secEnergy":"⚡ Energy & Fuel Consumption",
      "header8":"⚡ Electricity (kWh/month)","header9":"⛽ Gasoline (liters/month)","header10":"🛢️ Diesel (liters/month)","header13":"✈️ Annual Flights",
      "secWaste":"🗑️ Waste & Water","header11":"🚛 Community Waste (kg/month)","header12":"💧 Water (liters/month)",
      "header14":"Calculate Community Footprint",
      "info1Val":"Industry","info1Lab":"Largest source of community emissions","info2Lab":"Absorbed by one tree in 20 years","info3Lab":"Global target by 2050"
    }
  },
  "ar": {
    "dir":"rtl","langButton":"English",
    "nav":{"home":"الرئيسية","about":"التفاصيل","calc":"المقياس","contact":"مقياس المجتمع","logo":"<img class='logo-img' src='/Images/IMG_7912.webp' alt='Logo'/> البصمة الكاربونية"},
    "hero":{"title":"البصمة الكاربونية","paragraph":"تعرف على مقدار تأثيرك على البيئة من خلال أداة دقيقة وسهلة الاستخدام لحساب البصمة الكربونية. ابدأ في تقليل استهلاكك للطاقة وانبعاثاتك اليومية نحو أسلوب حياة أكثر استدامة.","under":"افهم مبادئ البصمة الكاربونية","indvBut":"احسب الآن","commBut":"بصمة المجتمع","scrollHint":"اكتشف أكثر"},
    "cta":{"title":"ابدأ رحلتك الآن 🌍","para":"احسب بصمتك الكربونية مجاناً واحصل على نتائجك على بريدك الإلكتروني","btn":"🌿 احسب الآن"},
    "cards":{"first":{"h":"ما هي البصمة الكاربونية؟","p":"يقيس البصمة الكربونية إجمالي انبعاثات الغازات الدفيئة التي تسببها بشكل مباشر وغير مباشر فرد أو منظمة أو منتج."},"second":{"h":"لماذا هذا مهم؟","p":"إن تقليل انبعاثات الكربون أمر بالغ الأهمية لمكافحة تغير المناخ والحفاظ على كوكبنا للأجيال القادمة."},"third":{"h":"اتخذ إجراءً","p":"يمكن أن تحدث التغييرات الصغيرة في الحياة اليومية فرقًا كبيرًا في تقليل تأثيرك البيئي وإلهام الآخرين."}},
    "art":{"header":"قلّل بصمتك الكاربونية","firstHeader":"استعمل النقل العام","secondHeader":"لا تسرف بالطاقة","thirdHeader":"الأكل باعتدال","fourthHeader":"التسوق باعتدال","fifthHeader":"التوعية","Firstp":"خفض الانبعاثات بمقدار 4.6 طن متري سنويًا للشخص الواحد","Secondp":"التبديل إلى مصابيح LED وفصل الأجهزة عند عدم استخدامها","Thirdp":"تقليل انبعاثات الغذاء بنسبة تصل إلى 73%","Fourthp":"اختر المنتجات الصديقة للبيئة وقلل من الاستهلاك","fifthp":"حساب بصمتك الكربونية يساعدك على توعية الآخرين بتأثير أفعالنا اليومية على البيئة"},
    "footer":{"header":"معاً لمستقبل أكثر خضرة","p":"كل فعل له قيمته. ابدأ رحلتك نحو نمط حياة مستدام اليوم.","first":"أطنان من ثاني أكسيد الكربون سنويًا","second":"الهدف المحدد","third":"أهداف المناخ"},
    "about":{
      "heroTag":"🌿 دليل البصمة الكاربونية","text1":"ما هي البصمة الكربونية؟","text2":"كل شيء تفعله يُنتج كمية من CO₂ — اكتشف ما هذا يعني وكيف يؤثر على مستقبل كوكبنا",
      "eyebrow1":"التعريف","headerDef":"فهم البصمة الكربونية",
      "text2Full":"البصمة الكربونية هي إجمالي كمية غازات الاحتباس الحراري التي ينتجها الإنسان من أنشطته اليومية. تشمل ثاني أكسيد الكربون (CO₂) والميثان (CH₄) وأكسيد النيتروز (N₂O) وغازات أخرى، وتُقاس بوحدة 'طن مكافئ CO₂'.",
      "text2Types":"تنقسم إلى نوعين: <strong style='color:#059669'>المباشرة</strong> — كعوادم السيارة وحرق الوقود في المنزل، و<strong style='color:#059669'>غير المباشرة</strong> — كالطاقة المستخدمة لإنتاج ما نشتريه من سلع وخدمات.",
      "defQuote":"'البصمة الكربونية هي المرآة التي تعكس تأثيرنا على الكوكب. قياسها هو الخطوة الأولى نحو تقليلها.'",
      "statAvg":"متوسط الفرد عالمياً","statGoal":"الهدف المناخي للفرد","statTop":"أعلى دولة (قطر)",
      "statLabel1":"طن CO₂ سنوياً من البشر","statLabel2":"ارتفاع حرارة الأرض منذ 1880","statLabel3":"تركيز CO₂ في الغلاف الجوي","statLabel4":"هدف الحياد الكربوني العالمي",
      "eyebrow2":"الأهمية","text3":"لماذا تُعد البصمة الكربونية مهمة؟","text4":"ارتفاع مستويات ثاني أكسيد الكربون يُشكّل أحد أخطر التحديات التي يواجهها كوكب الأرض. كل طن إضافي من CO₂ يبقى في الغلاف الجوي لأكثر من <strong>100 سنة</strong>، مُتراكماً التأثيرات على الأجيال القادمة.",
      "why1Title":"الاحترار العالمي","why1p":"ارتفعت حرارة الأرض بمقدار 1.2 درجة مئوية منذ عصر ما قبل الصناعة. إذا تجاوزنا 2 درجة، ستكون العواقب وخيمة وغير قابلة للعكس.",
      "why2Title":"ذوبان الجليد","why2p":"فقدت القارة القطبية الجنوبية أكثر من 3 تريليون طن من الجليد منذ التسعينيات، مما يرفع مستوى البحار بشكل ملموس كل عام.",
      "why3Title":"الأمن الغذائي","why3p":"تغير الأنماط المطرية والجفاف يُهددان المحاصيل الزراعية. يُقدّر العلماء انخفاض الإنتاج الغذائي بنسبة 25% بحلول 2050 إذا استمر التدهور.",
      "why4Title":"الخسائر الاقتصادية","why4p":"تُكلّف الكوارث المناخية العالم أكثر من 300 مليار دولار سنوياً. التصرف الآن أرخص بـ 5 أضعاف من التعامل مع تداعيات التغير المناخي لاحقاً.",
      "eyebrow3":"المصادر","text5":"أهم مصادر الانبعاثات الكاربونية",
      "li1Title":"توليد الكهرباء والطاقة","li1p":"محطات الفحم والغاز الطبيعي تولّد أكثر من ثلث انبعاثات العالم. التحول للطاقة الشمسية والرياح هو الحل الأسرع تأثيراً.",
      "li2Title":"النقل والمواصلات","li2p":"السيارات والطائرات والسفن تستهلك مليارات اللترات من الوقود الأحفوري يومياً. السيارة الكهربائية وحدها تقلل بصمتك بنسبة 50%.",
      "li3Title":"الصناعة والتصنيع","li3p":"إنتاج الحديد والإسمنت والمواد الكيميائية يتطلب حرق كميات هائلة من الوقود. الصناعة مسؤولة عن سُدس الانبعاثات العالمية.",
      "li4Title":"الزراعة وتربية الحيوانات","li4p":"الماشية تُنتج الميثان، وهو غاز أشد تأثيراً من CO₂ بـ 80 مرة. تقليل استهلاك اللحوم الحمراء هو من أقوى التغييرات الفردية.",
      "li5Title":"البناء والتشييد","li5p":"المباني مسؤولة عن 40% من استهلاك الطاقة عالمياً عبر التدفئة والتبريد والإضاءة. العزل الجيد يخفض الفاتورة والبصمة معاً.",
      "eyebrow4":"التأثيرات","text11":"تأثير البصمة الكاربونية على البيئة",
      "eff1Title":"موجات الحر الشديدة","eff1p":"سجّلت الأرض أعلى درجات حرارة في التاريخ المسجّل خلال السنوات الأخيرة. موجات الحر التي كانت تحدث مرة كل 50 سنة باتت تحدث كل 10 سنوات.","eff1sev":"تأثير عالٍ جداً ⚠️",
      "eff2Title":"ارتفاع مستوى البحار","eff2p":"ارتفع متوسط مستوى البحار بأكثر من 20 سم منذ 1900. التوقعات تشير إلى ارتفاع إضافي يتراوح بين 0.3 و1 متر بحلول 2100.","eff2sev":"خطر طويل الأمد 🌊",
      "eff3Title":"الجفاف وشح المياه","eff3p":"يعاني أكثر من 2 مليار شخص من شح المياه. التغير المناخي يُضاعف هذه الأزمة عبر تغيير أنماط الأمطار.","eff3sev":"أزمة متصاعدة 📈",
      "eff4Title":"تلوث الهواء والصحة","eff4p":"يتسبب تلوث الهواء في وفاة 7 مليون شخص سنوياً حول العالم. الجسيمات الدقيقة تخترق الرئتين وتُسبب أمراض القلب والسرطان والربو.","eff4sev":"7 مليون وفاة/سنة 💔",
      "eyebrow5":"الحلول","text20":"كيف تقلل بصمتك الكربونية؟",
      "red1Title":"النقل الأخضر","red1p":"استخدم المواصلات العامة أو الدراجة أو المشي. كل كيلومتر على الدراجة بدل السيارة يوفر 150 غرام CO₂.","red1imp":"↓ 2.4 طن/سنة",
      "red2Title":"كفاءة الطاقة","red2p":"استبدل المصابيح بـ LED وأجهزة الطاقة العالية بموفّرة للطاقة. المصباح LED يوفر 90% من استهلاك المصباح العادي.","red2imp":"↓ 1.5 طن/سنة",
      "red3Title":"نظام غذائي نباتي","red3p":"تقليل اللحوم الحمراء يوم واحد في الأسبوع يوفر 340 كغم CO₂ سنوياً. النظام النباتي الكامل يخفض البصمة الغذائية بنسبة 73%.","red3imp":"↓ 0.7 طن/سنة",
      "red4Title":"الطاقة المتجددة","red4p":"الألواح الشمسية على المنزل تُلغي 80% من فاتورة الكهرباء وتُنتج طاقة نظيفة لـ 25 سنة.","red4imp":"↓ 1.8 طن/سنة",
      "red5Title":"إعادة التدوير","red5p":"إعادة تدوير الألومنيوم توفر 95% من طاقة الإنتاج الجديد. فرز النفايات وتقليل الهدر الغذائي يُقلصان البصمة.","red5imp":"↓ 0.5 طن/سنة",
      "red6Title":"زراعة الأشجار","red6p":"شجرة واحدة تمتص 22 كغم CO₂ سنوياً. زراعة عشر أشجار يعوّض تقريباً بصمة شخص واعٍ بيئياً.","red6imp":"↓ 0.22 طن/شجرة",
      "eyebrow6":"البيانات","chartTitle":"البصمة الكربونية في العراق",
      "text26":"⚠️ تنبيه مهم: هذه الأرقام تقديرات تقريبية بناءً على أنماط استهلاك الطاقة والنقل والصناعة. لا تمثل بيانات رسمية معتمدة من هيئات دولية.",
      "ctaTitle":"جاهز لمعرفة بصمتك؟ 🌿","ctaPara":"احسب بصمتك الكربونية الشخصية في دقيقتين واحصل على تقرير مخصص بالذكاء الاصطناعي","text27":"احسب الآن مجاناً ←"
    },
    "cal":{
      "bannerTitle":"🌿 احسب بصمتك الكاربونية","header1":"أدخل بياناتك (كل الحقول اختيارية)",
      "secFuel":"⛽ الوقود والتنقل","secHome":"🏠 المنزل والطاقة","secFood":"🥦 الغذاء والتسوق","secEmail":"📧 استلام نتائجك",
      "emailLabel":"📧 البريد الإلكتروني <span style='color:#059669;font-size:0.8rem'>(لاستلام نتائجك وتذكير أسبوعي)</span>",
      "emailNote":"✅ سيصلك إيميل بالنتائج فوراً + تذكير بعد أسبوع لإعادة القياس",
      "header2":"⛽ استهلاك البنزين (لتر/شهر)","header3":"🛢️ استهلاك الديزل (لتر/شهر)","header4":"🚗 المسافة المقطوعة (كم/شهر)",
      "header5":"⚡ استهلاك الكهرباء (ك.و.س/شهر)","header6":"🔥 عدد أسطوانات الغاز (شهريًا)","header7":"💧 استهلاك المياه (لتر/شهر)",
      "header8":"🗑️ وزن النفايات (كغم/أسبوع)","header9":"🥦 نمط الغذاء","header10":"اختر...","header11":"نباتي","header12":"متوسط","header13":"غني باللحوم",
      "header14":"✈️ عدد الرحلات الجوية بالسنة","header15":"🛍️ الإنفاق الشهري (دولار)","header16":"احسب الآن",
      "tipsTitle":"💡 نصائح سريعة لتقليل بصمتك",
      "tips":["🚌 استخدم النقل العام","💡 أطفئ الأضواء","🚴 اركب الدراجة","🌱 قلّل اللحوم","♻️ أعد التدوير","☀️ الطاقة الشمسية","🛁 قلّل استهلاك الماء","🛒 تسوق بوعي"]
    },
    "tooltips":{
      "gasoline":"البنزين يُستخدم في معظم سيارات الركاب والدراجات النارية. أدخل تقديرك للاستهلاك الشهري بالليتر.",
      "diesel":"الديزل يُستخدم في المولدات الكهربائية والشاحنات الثقيلة والحافلات وبعض السيارات. يُنتج انبعاثات أعلى من البنزين لكل لتر.",
      "distance":"إجمالي المسافة التي تقطعها شهرياً بالسيارة. حتى الرحلات القصيرة اليومية تتراكم بشكل كبير.",
      "electricity":"راجع فاتورة الكهرباء لمعرفة قيمة ك.و.س. الكهرباء من أكبر مصادر الانبعاثات المنزلية.",
      "gas":"أسطوانات الغاز المستخدمة للطهي أو التدفئة شهرياً. كل أسطوانة قياسية (~12 كغم) تُطلق نحو 36 كغم CO₂.",
      "water":"استهلاك مياهك المنزلية بالليتر شهرياً. معالجة المياه وضخها يستهلك طاقة كبيرة.",
      "waste":"متوسط وزن القمامة التي تنتجها أسبوعياً بالكغم. النفايات في المكبّات تتحلل وتُطلق غاز الميثان.",
      "diet":"نوع غذائك العام. الأنظمة الغنية باللحوم تُنتج انبعاثات دفيئة أعلى بكثير من الأنظمة النباتية.",
      "flights":"إجمالي عدد الرحلات الجوية (ذهاباً) في السنة. رحلة واحدة قد تُضيف مئات الكغم من CO₂.",
      "shopping":"متوسط إنفاقك الشهري على السلع والخدمات بالدولار. إنتاج البضائع وشحنها يُولّد انبعاثات كبيرة.",
      "people":"إجمالي عدد الموظفين أو الطلاب أو السكان في مجتمعك.",
      "electricityC":"إجمالي استهلاك الكهرباء للمجتمع بالكامل (ك.و.س شهرياً).",
      "gasolineC":"إجمالي استهلاك البنزين لمركبات المجتمع شهرياً بالليتر.",
      "dieselC":"الديزل المستخدم في المولدات أو الشاحنات أو المعدات الثقيلة للمجتمع شهرياً.",
      "wasteC":"إجمالي النفايات الصلبة التي يُنتجها المجتمع شهرياً بالكغم.",
      "waterC":"إجمالي استهلاك المياه للمجتمع شهرياً بالليتر.",
      "flightsC":"إجمالي عدد الرحلات الجوية التي يقوم بها أفراد المجتمع أو لأغراض العمل سنوياً."
    },
    "comm":{
      "bannerTitle":"🏘️ مقياس البصمة المجتمعية","header1":"احسب البصمة الكربونية لمجتمعك أو شركتك أو مؤسستك",
      "badge1":"🏢 شركات","badge2":"🎓 جامعات","badge3":"🏙️ مدن",
      "secType":"🏙️ نوع المجتمع","header2":"اختر نوع مجتمعك",
      "header3":"اختر...","header4":"شركة","header5":"كلية / جامعة","header6":"مدينة / بلدة",
      "typeCompany":"شركة","typeCollege":"كلية / جامعة","typeTown":"مدينة / بلدة",
      "secPeople":"👥 عدد الأفراد","header7":"👥 عدد الأفراد / الموظفين / السكان",
      "secEnergy":"⚡ استهلاك الطاقة والوقود",
      "header8":"⚡ استهلاك الكهرباء (ك.و.س/شهر)","header9":"⛽ البنزين (لتر/شهر)","header10":"🛢️ الديزل (لتر/شهر)","header13":"✈️ الرحلات الجوية (سنوياً)",
      "secWaste":"🗑️ النفايات والمياه","header11":"🚛 نفايات المجتمع (كغم/شهر)","header12":"💧 استهلاك الماء (لتر/شهر)",
      "header14":"احسب البصمة المجتمعية",
      "info1Val":"الصناعة","info1Lab":"أكبر مصدر للانبعاثات المجتمعية","info2Lab":"تمتصه شجرة واحدة في 20 سنة","info3Lab":"الهدف العالمي بحلول 2050"
    }
  }
};

// ================================================================
//  BACKEND HELPERS
// ================================================================
async function saveEmailToDB(email) {
  try { await fetch(`${BACKEND_URL}/save-email`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email})}); } catch(e) {}
}
async function triggerReminderCheck() { try { await fetch(`${BACKEND_URL}/check-reminders`); } catch(e) {} }
window.addEventListener('load', triggerReminderCheck);
(function(){ if(typeof emailjs!=='undefined') emailjs.init(EMAILJS_PUBLIC_KEY); })();

// ================================================================
//  AI ANALYSIS
// ================================================================
async function analyzeWithAI(inputs, result) {
  try {
    const r = await fetch(`${BACKEND_URL}/analyze`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({inputs,result})});
    if(!r.ok) throw new Error();
    const d = await r.json();
    if(d.analysis) return d.analysis;
    throw new Error();
  } catch(e) {
    return currentLang==='ar' ? "⚠️ تعذر الاتصال بخادم التحليل." : "⚠️ Could not connect to analysis server.";
  }
}

async function sendResultEmail(email, result, inputs) {
  if(typeof emailjs==='undefined'||!email) return {ok:false};
  const aiAnalysis = await analyzeWithAI(inputs, result);
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {to_email:email,user_result:result.monthly.toFixed(1),user_yearly:result.yearly.toFixed(2),user_level:result.level,user_color:result.color,ai_analysis:aiAnalysis});
    return {ok:true,analysis:aiAnalysis};
  } catch(e) { return {ok:false,analysis:aiAnalysis}; }
}

// ================================================================
//  NAVBAR
// ================================================================
const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');
const navLinksEl = document.querySelector('.nav-links');

if(menuBtn) menuBtn.addEventListener('click', () => {
  sideMenu?.classList.toggle('open');
  overlay?.classList.toggle('hidden');
  navLinksEl?.classList.toggle('open');
  menuBtn.classList.toggle('open');
});
if(overlay) overlay.addEventListener('click', () => {
  sideMenu?.classList.remove('open');
  overlay.classList.add('hidden');
  navLinksEl?.classList.remove('open');
  menuBtn?.classList.remove('open');
});

// ================================================================
//  TOOLTIP ENGINE
// ================================================================
function buildTooltip(fieldId, isComm) {
  const input = document.getElementById(fieldId);
  if(!input) return;
  const card = input.closest('.input-card');
  if(!card || card.querySelector('.tt-btn')) return;
  const label = card.querySelector('.form-label');
  if(!label) return;

  const tt = TRANSLATIONS[currentLang]?.tooltips?.[fieldId];
  if(!tt) return;

  const cls = isComm ? 'tt-btn comm-tt' : 'tt-btn';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = cls;
  btn.setAttribute('aria-label','info');
  btn.textContent = '!';

  const box = document.createElement('span');
  box.className = 'tt-box';
  box.textContent = tt;

  label.style.position = 'relative';
  label.appendChild(btn);
  label.appendChild(box);

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasActive = btn.classList.contains('active');
    document.querySelectorAll('.tt-btn.active').forEach(b => b.classList.remove('active'));
    if(!wasActive) btn.classList.add('active');
  });
}

function buildAllTooltips() {
  ['gasoline','diesel','distance','electricity','gas','water','waste','diet','flights','shopping'].forEach(f => buildTooltip(f, false));
  ['people','electricityC','gasolineC','dieselC','wasteC','waterC','flightsC'].forEach(f => buildTooltip(f, true));
}

document.addEventListener('click', () => {
  document.querySelectorAll('.tt-btn.active').forEach(b => b.classList.remove('active'));
});

// ================================================================
//  LANGUAGE SYSTEM
// ================================================================
let currentLang = localStorage.getItem('lang') || 'ar';

function loadLanguage(lang) {
  const c = TRANSLATIONS[lang];
  if(!c) return;
  const isRTL = c.dir === 'rtl';
  const p = window.location.pathname;
  const set = (el, v) => { if(el) el.innerHTML = v; };

  document.documentElement.dir = c.dir;
  document.documentElement.lang = lang;

  const navCon = document.querySelector('.nav-container');
  if(navCon) isRTL ? navCon.classList.add('dir') : navCon.classList.remove('dir');

  document.querySelectorAll('.engbut').forEach(e => e.textContent = c.langButton);
  document.querySelectorAll('.home-li').forEach(e => e.innerHTML = c.nav.home);
  document.querySelectorAll('.about-li').forEach(e => e.innerHTML = c.nav.about);
  document.querySelectorAll('.cal-li').forEach(e => e.innerHTML = c.nav.calc);
  document.querySelectorAll('.con-li').forEach(e => e.innerHTML = c.nav.contact);
  const logo = document.querySelector('.nav-logo');
  if(logo) logo.innerHTML = c.nav.logo;

  set(document.getElementById('footer-header'), c.footer.header);
  set(document.getElementById('footer-p'), c.footer.p);
  set(document.getElementById('footer-1'), c.footer.first);
  set(document.getElementById('footer-2'), c.footer.second);
  set(document.getElementById('footer-3'), c.footer.third);

  if(p.includes('index') || p==='/' || p.endsWith('/')) _transIndex(c, set, isRTL);
  else if(p.includes('calculator')) _transCal(c, set, isRTL);
  else if(p.includes('Community')) _transComm(c, set, isRTL);
  else if(p.includes('About')) _transAbout(c, set, isRTL);

  // Rebuild tooltips with new language
  document.querySelectorAll('.tt-btn, .tt-box').forEach(el => el.remove());
  buildAllTooltips();
}

function _transIndex(c, set, isRTL) {
  set(document.getElementById('hero-text'), c.hero.title);
  set(document.getElementById('hero-p'), c.hero.paragraph);
  set(document.getElementById('under-hero-header'), c.hero.under);
  set(document.getElementById('indv-but'), c.hero.indvBut);
  set(document.getElementById('comm-but'), c.hero.commBut);
  const sh = document.querySelector('.scroll-hint small');
  if(sh) sh.textContent = c.hero.scrollHint;

  set(document.getElementById('cta-title'), c.cta.title);
  set(document.getElementById('cta-para'), c.cta.para);
  set(document.getElementById('cta-btn'), c.cta.btn);

  set(document.getElementById('first-card-h'), c.cards.first.h);
  set(document.getElementById('first-card-p'), c.cards.first.p);
  set(document.getElementById('second-card-h'), c.cards.second.h);
  set(document.getElementById('second-card-p'), c.cards.second.p);
  set(document.getElementById('third-card-h'), c.cards.third.h);
  set(document.getElementById('third-card-p'), c.cards.third.p);

  const cardCon = document.getElementById('card-container');
  if(cardCon) cardCon.style.direction = c.dir;
  document.querySelectorAll('.card').forEach(e => e.style.direction = c.dir);

  set(document.getElementById('art-header'), c.art.header);
  set(document.getElementById('art-item-1-header'), c.art.firstHeader);
  set(document.getElementById('art-item-2-header'), c.art.secondHeader);
  set(document.getElementById('art-item-3-header'), c.art.thirdHeader);
  set(document.getElementById('art-item-4-header'), c.art.fourthHeader);
  set(document.getElementById('art-item-5-header'), c.art.fifthHeader);
  set(document.getElementById('art-item-1-p'), c.art.Firstp);
  set(document.getElementById('art-item-2-p'), c.art.Secondp);
  set(document.getElementById('art-item-3-p'), c.art.Thirdp);
  set(document.getElementById('art-item-4-p'), c.art.Fourthp);
  set(document.getElementById('art-item-5-p'), c.art.fifthp);
}

function _transCal(c, set, isRTL) {
  set(document.querySelector('.cal-hero-banner h1'), c.cal.bannerTitle);
  set(document.getElementById('cal-header'), c.cal.header1);

  const secs = document.querySelectorAll('.form-section-title');
  const secK = ['secFuel','secHome','secFood','secEmail'];
  secs.forEach((el,i) => { if(c.cal[secK[i]]) el.innerHTML = c.cal[secK[i]]; });

  [['cal-header2','header2'],['cal-header3','header3'],['cal-header4','header4'],
   ['cal-header5','header5'],['cal-header6','header6'],['cal-header7','header7'],
   ['cal-header8','header8'],['cal-header9','header9'],['cal-header14','header14'],
   ['cal-header15','header15'],['cal-header16','header16']
  ].forEach(([id,k]) => set(document.getElementById(id), c.cal[k]));

  ['cal-header10','cal-header11','cal-header12','cal-header13'].forEach((id,i) => {
    const el = document.getElementById(id);
    if(el) el.textContent = c.cal[['header10','header11','header12','header13'][i]];
  });

  const emailCard = document.querySelector('.email-card');
  if(emailCard) {
    const lbl = emailCard.querySelector('.form-label');
    if(lbl) lbl.innerHTML = c.cal.emailLabel;
    const note = emailCard.querySelector('p');
    if(note) note.innerHTML = c.cal.emailNote;
  }

  set(document.querySelector('.tips-section h3'), c.cal.tipsTitle);
  document.querySelectorAll('.tip-tag').forEach((el,i) => { if(c.cal.tips[i]) el.textContent = c.cal.tips[i]; });

  const form = document.getElementById('carbonForm');
  if(form) form.style.direction = c.dir;
}

function _transComm(c, set, isRTL) {
  set(document.querySelector('.cal-hero-banner h1'), c.comm.bannerTitle);
  set(document.getElementById('header1'), c.comm.header1);

  document.querySelectorAll('.type-badge').forEach((el,i) => {
    const k = ['badge1','badge2','badge3'][i];
    if(k) el.textContent = c.comm[k];
  });

  const secs = document.querySelectorAll('.form-section-title');
  const secK = ['secType','secEnergy','secWaste'];
  secs.forEach((el,i) => { if(c.comm[secK[i]]) el.innerHTML = c.comm[secK[i]]; });

  const opts = document.querySelectorAll('.type-option');
  if(opts[0]) { opts[0].innerHTML = ''; const s=document.createElement('span'); s.className='type-icon'; s.textContent='🏢'; opts[0].appendChild(s); opts[0].appendChild(document.createTextNode(c.comm.typeCompany)); }
  if(opts[1]) { opts[1].innerHTML = ''; const s=document.createElement('span'); s.className='type-icon'; s.textContent='🎓'; opts[1].appendChild(s); opts[1].appendChild(document.createTextNode(c.comm.typeCollege)); }
  if(opts[2]) { opts[2].innerHTML = ''; const s=document.createElement('span'); s.className='type-icon'; s.textContent='🏙️'; opts[2].appendChild(s); opts[2].appendChild(document.createTextNode(c.comm.typeTown)); }

  set(document.getElementById('header2'), c.comm.header2);
  const sel = document.getElementById('communityType');
  if(sel) {
    const o = sel.querySelectorAll('option');
    [c.comm.header3, c.comm.header4, c.comm.header5, c.comm.header6].forEach((t,i) => { if(o[i]) o[i].textContent = t; });
  }

  [['header7','header7'],['header8','header8'],['header9','header9'],['header10','header10'],
   ['header11','header11'],['header12','header12'],['header13','header13'],['header14','header14']
  ].forEach(([id,k]) => set(document.getElementById(id), c.comm[k]));

  const infos = document.querySelectorAll('.info-card');
  if(infos[0]) { const v=infos[0].querySelector('.value'); if(v) v.textContent=c.comm.info1Val; const l=infos[0].querySelector('.label'); if(l) l.textContent=c.comm.info1Lab; }
  if(infos[1]) { const l=infos[1].querySelector('.label'); if(l) l.textContent=c.comm.info2Lab; }
  if(infos[2]) { const l=infos[2].querySelector('.label'); if(l) l.textContent=c.comm.info3Lab; }
}

function _transAbout(c, set, isRTL) {
  const a = c.about;
  const heroTag = document.querySelector('.about-hero-tag');
  if(heroTag) heroTag.textContent = a.heroTag;
  set(document.getElementById('about-text-1'), a.text1);
  set(document.getElementById('about-text-2'), a.text2);

  document.querySelectorAll('.section-eyebrow').forEach((el,i) => {
    const k = ['eyebrow1','eyebrow2','eyebrow3','eyebrow4','eyebrow5','eyebrow6'][i];
    if(k && a[k]) el.textContent = a[k];
  });

  set(document.getElementById('about-header-def'), a.headerDef);
  const bodyTexts = document.querySelectorAll('.what-split .body-text');
  if(bodyTexts[0]) bodyTexts[0].innerHTML = a.text2Full;
  if(bodyTexts[1]) bodyTexts[1].innerHTML = a.text2Types;
  const defText = document.querySelector('.definition-text');
  if(defText) defText.textContent = a.defQuote;

  const statSpans = document.querySelectorAll('.definition-card span.ar, .definition-card span');
  if(statSpans[0]) statSpans[0].textContent = a.statAvg;
  if(statSpans[1]) statSpans[1].textContent = a.statGoal;
  if(statSpans[2]) statSpans[2].textContent = a.statTop;

  document.querySelectorAll('.stat-label').forEach((el,i) => {
    const k = ['statLabel1','statLabel2','statLabel3','statLabel4'][i];
    if(k) el.textContent = a[k];
  });

  set(document.getElementById('about-header-2'), a.text3);
  set(document.getElementById('about-p-2'), a.text4);

  ['about-why-1','about-why-2','about-why-3','about-why-4'].forEach((id,i) => {
    set(document.getElementById(id), a[['why1Title','why2Title','why3Title','why4Title'][i]]);
  });
  document.querySelectorAll('.why-card p').forEach((el,i) => {
    const k = ['why1p','why2p','why3p','why4p'][i]; if(k) el.textContent = a[k];
  });

  set(document.getElementById('about-header-3'), a.text5);
  ['about-li-1','about-li-2','about-li-3','about-li-4','about-li-5'].forEach((id,i) => {
    set(document.getElementById(id), a[['li1Title','li2Title','li3Title','li4Title','li5Title'][i]]);
  });
  document.querySelectorAll('.source-content p').forEach((el,i) => {
    const k = ['li1p','li2p','li3p','li4p','li5p'][i]; if(k) el.textContent = a[k];
  });

  set(document.getElementById('about-effects-header1'), a.text11);
  set(document.getElementById('about-effects-header3'), a.eff1Title);
  set(document.getElementById('about-effects-p2'), a.eff1p);
  set(document.getElementById('about-effects-header4'), a.eff2Title);
  set(document.getElementById('about-effects-p3'), a.eff2p);
  set(document.getElementById('about-effects-header2'), a.eff3Title);
  set(document.getElementById('about-effects-p1'), a.eff3p);
  set(document.getElementById('about-effects-header5'), a.eff4Title);
  set(document.getElementById('about-effects-p4'), a.eff4p);
  document.querySelectorAll('.severity').forEach((el,i) => {
    const k = ['eff1sev','eff2sev','eff3sev','eff4sev'][i]; if(k) el.textContent = a[k];
  });

  set(document.getElementById('aboutReduceHeader'), a.text20);
  ['aboutReduceP1','aboutReduceP2','aboutReduceP3','aboutReduceP4','aboutReduceP5'].forEach((id,i) => {
    set(document.getElementById(id), a[['red1Title','red2Title','red3Title','red4Title','red5Title'][i]]);
  });
  document.querySelectorAll('.reduce-card').forEach((card,i) => {
    const rk = ['red1','red2','red3','red4','red5','red6'][i]; if(!rk) return;
    const p = card.querySelector('p'); if(p) p.textContent = a[rk+'p'];
    const imp = card.querySelector('.impact'); if(imp) imp.textContent = a[rk+'imp'];
    if(i===5){ const h=card.querySelector('h3'); if(h) h.textContent=a.red6Title; }
  });

  set(document.getElementById('warn-p'), a.text26);
  set(document.getElementById('fast-link'), a.text27);
  const chartH = document.querySelector('.chart-section .big-title');
  if(chartH) chartH.textContent = a.chartTitle;
  const ctaH = document.querySelector('.cta-section h2');
  const ctaP = document.querySelector('.cta-section p');
  if(ctaH) ctaH.textContent = a.ctaTitle;
  if(ctaP) ctaP.textContent = a.ctaPara;
}

// Language toggle
document.querySelectorAll('.engbut').forEach(btn => btn.addEventListener('click', () => {
  currentLang = currentLang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('lang', currentLang);
  loadLanguage(currentLang);
}));

loadLanguage(currentLang);
buildAllTooltips();

// ================================================================
//  🌿 INDIVIDUAL CALCULATOR
//  Water unit: LITERS/month  |  EF = 0.0003 kg CO₂/liter
// ================================================================
async function calculateCarbon() {
  const g = id => parseFloat(document.getElementById(id)?.value) || 0;
  const inputs = {
    gasoline: g("gasoline"), diesel: g("diesel"), distance: g("distance"),
    electricity: g("electricity"), gas: g("gas"),
    water: g("water"),   // liters/month
    waste: g("waste"), diet: g("diet"), flights: g("flights"), shopping: g("shopping")
  };
  const email = document.getElementById("email")?.value?.trim() || "";
  const EF = { gasoline:2.31, diesel:2.68, distance:0.19, electricity:0.5, gas:36,
               water:0.0003, waste:1.9, flights:115, shopping:0.4 };

  const total =
    inputs.gasoline*EF.gasoline + inputs.diesel*EF.diesel + inputs.distance*EF.distance +
    inputs.electricity*EF.electricity + inputs.gas*EF.gas +
    inputs.water*EF.water +
    inputs.waste*4*EF.waste + (inputs.diet*1000)/12 +
    (inputs.flights*EF.flights)/12 + inputs.shopping*EF.shopping;

  const tonsPerYear = (total*12)/1000;
  let color="", level="", advice="";
  const ar = currentLang==="ar";

  if(ar){
    if(total<170)       {color="🟢";level="منخفضة جداً"; advice="أحسنت! بصمتك الكربونية منخفضة جدًا، واعٍ بيئياً بامتياز!";}
    else if(total<420)  {color="🟡";level="جيدة";         advice="بصمتك جيدة، بعض التحسينات الصغيرة تجعلها ممتازة.";}
    else if(total<830)  {color="🟠";level="متوسطة";       advice="بصمتك متوسطة، الذكاء الاصطناعي سيحدد لك أكبر الفرص.";}
    else if(total<1670) {color="🔴";level="مرتفعة";       advice="بصمتك مرتفعة، التحليل الذكي سيُرشدك لتقليلها.";}
    else                {color="⚫";level="عالية جداً";   advice="بصمتك عالية جداً، اقرأ التحليل المفصّل بعناية.";}
  } else {
    if(total<170)       {color="🟢";level="Very Low";  advice="Excellent! Your carbon footprint is very low!";}
    else if(total<420)  {color="🟡";level="Good";      advice="Good footprint. Small improvements will make it great.";}
    else if(total<830)  {color="🟠";level="Average";   advice="Average footprint. AI will identify your biggest opportunities.";}
    else if(total<1670) {color="🔴";level="High";      advice="High footprint. Smart analysis will guide your reduction.";}
    else                {color="⚫";level="Very High";  advice="Very high footprint. Read the detailed AI analysis carefully.";}
  }

  const resultData = {monthly:total, yearly:tonsPerYear, color, level, advice};
  const resultEl = document.getElementById("result");

  if(resultEl){
    resultEl.innerHTML=`
      <div class="result-card" style="direction:rtl">
        <div class="result-meter">
          <span class="result-emoji">${color}</span>
          <div class="result-numbers">
            <p><strong>${total.toFixed(1)}</strong> ${ar?'كغم CO₂e / شهر':'kg CO₂e / month'}</p>
            <p><strong>${tonsPerYear.toFixed(2)}</strong> ${ar?'طن CO₂e / سنة':'tons CO₂e / year'}</p>
          </div>
        </div>
        <p class="result-level-badge">${ar?'المستوى':'Level'}: ${level}</p>
        <p class="result-advice">${advice}</p>
        ${email?`<div id="aiAnalysisBlock" class="result-advice" style="margin-top:1rem;border-color:#fde68a;background:#fffbeb">
          <p style="color:#92400e;font-weight:700;font-family:'Parastoo',serif">🤖 ${ar?'جاري تحليل البيانات...':'Analyzing your data...'}</p>
          <div style="display:flex;gap:0.5rem;margin-top:0.5rem">
            <span style="width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:pulse 1s infinite"></span>
            <span style="width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:pulse 1s infinite 0.2s"></span>
            <span style="width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:pulse 1s infinite 0.4s"></span>
          </div>
        </div>`:''}
        ${email?`<p id="emailStatus" class="email-notice">📧 ${ar?'جاري إرسال التقرير...':'Sending report...'}</p>`:''}
      </div>
      <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}</style>`;
    resultEl.scrollIntoView({behavior:'smooth',block:'center'});
  }

  if(email){
    const emailRes = await sendResultEmail(email, resultData, inputs);
    await saveEmailToDB(email);
    const aiBlock = document.getElementById('aiAnalysisBlock');
    if(aiBlock && emailRes.analysis){
      const html = emailRes.analysis.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
      aiBlock.innerHTML=`<p style="color:#065f46;font-weight:700;font-family:'Parastoo',serif;margin-bottom:0.8rem">🤖 ${ar?'تحليل الذكاء الاصطناعي:':'AI Analysis:'}</p><div style="font-family:'Parastoo',serif;font-size:0.9rem;color:#374151;line-height:1.9;text-align:right">${html}</div>`;
    }
    const st = document.getElementById('emailStatus');
    if(st) st.textContent = emailRes.ok
      ? (ar?'✅ تم إرسال التقرير!':'✅ Report sent!')
      : (ar?'⚠️ تعذّر الإرسال.':'⚠️ Send failed.');
  }
}

// ================================================================
//  🏘️ COMMUNITY CALCULATOR  (water in liters)
// ================================================================
function calculateCommunity() {
  const g = id => parseFloat(document.getElementById(id)?.value)||0;
  const type = document.getElementById("communityType")?.value;
  const people=g("people"), electricity=g("electricityC"), gasoline=g("gasolineC");
  const diesel=g("dieselC"), waste=g("wasteC"), water=g("waterC"), flights=g("flightsC");

  const EF = {electricity:0.5, gasoline:2.31, diesel:2.68, waste:1.9, water:0.0003, flights:115};
  const factor = ({company:1.2, college:1.4, town:1.0})[type]||1;

  const total = electricity*EF.electricity + gasoline*EF.gasoline + diesel*EF.diesel +
    waste*EF.waste + water*EF.water + flights*EF.flights + people*factor*5;
  const tonsYear=(total*12)/1000;
  const perPerson = people>0 ? (total/people).toFixed(1) : 0;

  let color="", advice="";
  const ar = currentLang==="ar";

  if(total<=0||people<=0){
    color="⚫"; advice=ar?"أدخل قيماً صحيحة.":"Please enter valid values.";
  } else if(ar){
    if(total<170*people)       {color="🟢";advice="بصمة المجتمع منخفضة جداً! نموذج يُحتذى به.";}
    else if(total<420*people)  {color="🟡";advice="بصمة جيدة، تحسينات بسيطة تُفرق كثيراً.";}
    else if(total<830*people)  {color="🟠";advice="متوسطة، حسّن كفاءة الطاقة والنقل الجماعي.";}
    else if(total<1670*people) {color="🔴";advice="مرتفعة، ضع خطة لتقليل الانبعاثات تدريجياً.";}
    else                       {color="⚫";advice="عالية جداً، يجب اتخاذ خطوات استراتيجية فورية.";}
  } else {
    if(total<170*people)       {color="🟢";advice="Very low community footprint! A model to follow.";}
    else if(total<420*people)  {color="🟡";advice="Good footprint; small improvements make a big difference.";}
    else if(total<830*people)  {color="🟠";advice="Average; improve energy efficiency and collective transport.";}
    else if(total<1670*people) {color="🔴";advice="High; create a gradual reduction plan.";}
    else                       {color="⚫";advice="Very high; immediate strategic steps needed.";}
  }

  const el = document.getElementById("communityResult");
  if(!el) return;
  el.innerHTML = ar ? `
    <div class="result-card">
      <div class="result-meter">
        <span class="result-emoji">${color}</span>
        <div class="result-numbers">
          <p><strong>${total.toFixed(1)}</strong> كغم CO₂e / شهر</p>
          <p><strong>${tonsYear.toFixed(2)}</strong> طن CO₂e / سنة</p>
        </div>
      </div>
      <p class="result-level-badge">${color}</p>
      <div class="per-person-bar">
        <p>👤 متوسط نصيب الفرد: <strong>${perPerson} كغم CO₂e/شهر</strong></p>
        <p>📊 معامل المجتمع (${type||"غير محدد"}): <strong>${factor}</strong></p>
      </div>
      <p class="result-advice">${advice}</p>
    </div>` : `
    <div class="result-card">
      <div class="result-meter">
        <span class="result-emoji">${color}</span>
        <div class="result-numbers">
          <p><strong>${total.toFixed(1)}</strong> kg CO₂e / month</p>
          <p><strong>${tonsYear.toFixed(2)}</strong> tons CO₂e / year</p>
        </div>
      </div>
      <p class="result-level-badge">${color}</p>
      <div class="per-person-bar">
        <p>👤 Per person average: <strong>${perPerson} kg CO₂e/month</strong></p>
        <p>📊 Community factor (${type||"Not set"}): <strong>${factor}</strong></p>
      </div>
      <p class="result-advice">${advice}</p>
    </div>`;
}

// ================================================================
//  SCROLL FADE-IN
// ================================================================
const fadeEls = document.querySelectorAll('.fade-in');
if(fadeEls.length){
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){e.target.classList.add('show'); obs.unobserve(e.target);} });
  },{threshold:0.1});
  fadeEls.forEach(el=>obs.observe(el));
}