// ================================================================
//  ⚙️  إعدادات API — ضع مفاتيحك هنا فقط
// ================================================================

// 1. EmailJS (للإيميل الفوري)
const EMAILJS_PUBLIC_KEY  = "UKZX5vXt0uP3uXd53";
const EMAILJS_SERVICE_ID  = "service_blw3koo";
const EMAILJS_TEMPLATE_ID = "template_sole5be";

// ================== Backend API URL ==================
const BACKEND_URL = "http://localhost:5000"; // change when deployed

// Save email to MongoDB
async function saveEmailToDB(email) {
  try {
    await fetch(`${BACKEND_URL}/save-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
  } catch (e) {
    console.log("DB save skipped:", e.message);
  }
}

// Trigger reminder check (lazy scheduler)
async function triggerReminderCheck() {
  try {
    await fetch(`${BACKEND_URL}/check-reminders`);
  } catch (e) {
    console.log("Reminder check skipped");
  }
}

window.addEventListener('load', () => {
  triggerReminderCheck();
});

// ================================================================
//  تهيئة EmailJS
// ================================================================
(function(){
  if(typeof emailjs !== 'undefined') emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// ================================================================
//  🤖 تحليل البصمة بالذكاء الاصطناعي (عبر السيرفر)
// ================================================================
async function analyzeWithAI(inputs, result) {
  try {
    const response = await fetch(`${BACKEND_URL}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputs, result })
    });

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    
    if (data.analysis) {
      console.log(`📊 Analysis source: ${data.source || 'unknown'}`);
      return data.analysis;
    } else {
      throw new Error("No analysis in response");
    }
  } catch (err) {
    console.error("AI analysis error:", err);
    return `⚠️ تعذر الاتصال بخادم التحليل. يرجى المحاولة مرة أخرى لاحقاً.

ملاحظة: تم إرسال بصمتك الكربونية إلى بريدك الإلكتروني.`;
  }
}

// ================================================================
//  📧 إرسال إيميل النتيجة الفوري (EmailJS + تحليل AI)
// ================================================================
async function sendResultEmail(email, result, inputs) {
  if(typeof emailjs === 'undefined') return { ok: false, msg: "EmailJS غير محمّل" };
  if(!email) return { ok: false, msg: "لا يوجد إيميل" };

  // جلب التحليل من AI (عبر السيرفر)
  const aiAnalysis = await analyzeWithAI(inputs, result);
  
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email:     email,
      user_result:  result.monthly.toFixed(1),
      user_yearly:  result.yearly.toFixed(2),
      user_level:   result.level,
      user_color:   result.color,
      ai_analysis:  aiAnalysis
    });
    return { ok: true, analysis: aiAnalysis };
  } catch(err) {
    console.error("EmailJS error:", err);
    return { ok: false, analysis: aiAnalysis, msg: err.toString() };
  }
}

// ================================================================
//  NAVBAR
// ================================================================
const menuBtn  = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const overlay  = document.getElementById('overlay');

if(menuBtn) menuBtn.addEventListener('click', () => {
  sideMenu.classList.toggle('open');
  overlay.classList.toggle('hidden');
});
if(overlay) overlay.addEventListener('click', () => {
  sideMenu.classList.remove('open');
  overlay.classList.add('hidden');
});

// ================================================================
//  LANGUAGE SWITCH
// ================================================================
const langButtons = document.querySelectorAll('.engbut');
const homeBut  = document.querySelectorAll('.home-li');
const aboutBut = document.querySelectorAll('.about-li');
const calBut   = document.querySelectorAll('.cal-li');
const conBut   = document.querySelectorAll('.con-li');
const logoBut  = document.querySelectorAll('.nav-logo');
const heroText  = document.getElementById('hero-text');
const heroPar   = document.getElementById('hero-p');
const underHero = document.getElementById('under-hero-header');
const fiCard    = document.getElementById('first-card-p');
const seCard    = document.getElementById('second-card-p');
const thirCard  = document.getElementById('third-card-p');
const fiCardH   = document.getElementById('first-card-h');
const seCardH   = document.getElementById('second-card-h');
const thirCardH = document.getElementById('third-card-h');
const cardCon   = document.getElementById('card-container');
const cards     = document.querySelectorAll('.card');
const navCon    = document.querySelector('.nav-container');
const artHeader = document.getElementById('art-header');
const artFirstHeader   = document.getElementById('art-item-1-header');
const artSecondtHeader = document.getElementById('art-item-2-header');
const artThirdHeader   = document.getElementById('art-item-3-header');
const artFourthHeader  = document.getElementById('art-item-4-header');
const artFifthHeader   = document.getElementById('art-item-5-header');
const artFirstp  = document.getElementById('art-item-1-p');
const artSecondp = document.getElementById('art-item-2-p');
const artThirdp  = document.getElementById('art-item-3-p');
const artFourthp = document.getElementById('art-item-4-p');
const artFifthp  = document.getElementById('art-item-5-p');
const footHeader = document.getElementById("footer-header");
const footp  = document.getElementById("footer-p");
const foot1  = document.getElementById("footer-1");
const foot2  = document.getElementById("footer-2");
const foot3  = document.getElementById("footer-3");
const invdBut = document.getElementById('indv-but');
const commBut = document.getElementById('comm-but');
const aboutHeader  = document.getElementById('about-text-1');
const aboutPara    = document.getElementById('about-text-2');
const aboutHeader2 = document.getElementById('about-header-2');
const aboutPara2   = document.getElementById('about-p-2');
const aboutHeader3 = document.getElementById('about-header-3');
const aboutLi1 = document.getElementById('about-li-1');
const aboutLi2 = document.getElementById('about-li-2');
const aboutLi3 = document.getElementById('about-li-3');
const aboutLi4 = document.getElementById('about-li-4');
const aboutLi5 = document.getElementById('about-li-5');
const aboutEffectHeader1 = document.getElementById('about-effects-header1');
const aboutEffectHeader2 = document.getElementById('about-effects-header2');
const aboutEffectHeader3 = document.getElementById('about-effects-header3');
const aboutEffectHeader4 = document.getElementById('about-effects-header4');
const aboutEffectHeader5 = document.getElementById('about-effects-header5');
const aboutEffectp1 = document.getElementById('about-effects-p1');
const aboutEffectp2 = document.getElementById('about-effects-p2');
const aboutEffectp3 = document.getElementById('about-effects-p3');
const aboutEffectp4 = document.getElementById('about-effects-p4');
const aboutReduceHeader = document.getElementById('aboutReduceHeader');
const aboutReducep1 = document.getElementById('aboutReduceP1');
const aboutReducep2 = document.getElementById('aboutReduceP2');
const aboutReducep3 = document.getElementById('aboutReduceP3');
const aboutReducep4 = document.getElementById('aboutReduceP4');
const aboutReducep5 = document.getElementById('aboutReduceP5');
const warnpara = document.getElementById('warn-p');
const fastLink = document.getElementById('fast-link');
const calHeader   = document.getElementById('cal-header');
const calHeader2  = document.getElementById('cal-header2');
const calHeader3  = document.getElementById('cal-header3');
const calHeader4  = document.getElementById('cal-header4');
const calHeader5  = document.getElementById('cal-header5');
const calHeader6  = document.getElementById('cal-header6');
const calHeader7  = document.getElementById('cal-header7');
const calHeader8  = document.getElementById('cal-header8');
const calHeader9  = document.getElementById('cal-header9');
const calHeader10 = document.getElementById('cal-header10');
const calHeader11 = document.getElementById('cal-header11');
const calHeader12 = document.getElementById('cal-header12');
const calHeader13 = document.getElementById('cal-header13');
const calHeader14 = document.getElementById('cal-header14');
const calHeader15 = document.getElementById('cal-header15');
const calHeader16 = document.getElementById('cal-header16');
const calculatorForm = document.getElementById('carbonForm');
const commForm    = document.getElementById('communityForm');
const commHeader1 = document.getElementById('header1');
const commHeader2 = document.getElementById('header2');
const commHeader3 = document.getElementById('header3');
const commHeader4 = document.getElementById('header4');
const commHeader5 = document.getElementById('header5');
const commHeader6 = document.getElementById('header6');
const commHeader7 = document.getElementById('header7');
const commHeader8 = document.getElementById('header8');
const commHeader9 = document.getElementById('header9');
const commHeader10 = document.getElementById('header10');
const commHeader11 = document.getElementById('header11');
const commHeader12 = document.getElementById('header12');
const commHeader13 = document.getElementById('header13');
const commHeader14 = document.getElementById('header14');

let currentLang = localStorage.getItem('lang') || 'ar';

async function loadLanguage(lang) {
  try {
    const res = await fetch('lang.json');
    const data = await res.json();
    const content = data[lang];
    const p = window.location.pathname;
    const set = (el,v) => { if(el) el.innerHTML = v; };

    if(p.includes('index')||p==='/'){ transindex(); langButtons.forEach(e=>(e.textContent=content.langButton)); dirSwitch(); }
    else if(p.includes('calculator')){ transcal(); langButtons.forEach(e=>(e.textContent=content.langButton)); dirSwitch(); }
    else if(p.includes('Community')){ transCommunity(); langButtons.forEach(e=>(e.textContent=content.langButton)); dirSwitch(); }
    else if(p.includes('About')){ transAbout(); langButtons.forEach(e=>(e.textContent=content.langButton)); dirSwitch(); }

    function transindex(){
      transNav(); transConCard();
      set(heroText,content.hero.title); set(heroPar,content.hero.paragraph);
      set(underHero,content.hero.under); set(invdBut,content.hero.indvBut); set(commBut,content.hero.commBut);
      set(fiCardH,content.cards.first.h); set(fiCard,content.cards.first.p);
      set(seCardH,content.cards.second.h); set(seCard,content.cards.second.p);
      set(thirCardH,content.cards.third.h); set(thirCard,content.cards.third.p);
      set(artHeader,content.art.header); set(artFirstHeader,content.art.firstHeader);
      set(artSecondtHeader,content.art.secondHeader); set(artThirdHeader,content.art.thirdHeader);
      set(artFourthHeader,content.art.fourthHeader); set(artFifthHeader,content.art.fifthHeader);
      set(artFirstp,content.art.Firstp); set(artSecondp,content.art.Secondp);
      set(artThirdp,content.art.Thirdp); set(artFourthp,content.art.Fourthp); set(artFifthp,content.art.fifthp);
      transfooter();
    }
    function transcal(){
      transNav();
      set(calHeader,content.cal.header1); set(calHeader2,content.cal.header2);
      set(calHeader3,content.cal.header3); set(calHeader4,content.cal.header4);
      set(calHeader5,content.cal.header5); set(calHeader6,content.cal.header6);
      set(calHeader7,content.cal.header7); set(calHeader8,content.cal.header8);
      set(calHeader9,content.cal.header9); set(calHeader10,content.cal.header10);
      set(calHeader11,content.cal.header11); set(calHeader12,content.cal.header12);
      set(calHeader13,content.cal.header13); set(calHeader14,content.cal.header14);
      set(calHeader15,content.cal.header15); set(calHeader16,content.cal.header16);
      if(calculatorForm){ lang==='en'?calculatorForm.classList.add('text-ar'):calculatorForm.classList.remove('text-ar'); }
      transfooter();
    }
    function transCommunity(){
      transNav();
      set(commHeader1,content.comm.header1); set(commHeader2,content.comm.header2);
      set(commHeader3,content.comm.header3); set(commHeader4,content.comm.header4);
      set(commHeader5,content.comm.header5); set(commHeader6,content.comm.header6);
      set(commHeader7,content.comm.header7); set(commHeader8,content.comm.header8);
      set(commHeader9,content.comm.header9); set(commHeader10,content.comm.header10);
      set(commHeader11,content.comm.header11); set(commHeader12,content.comm.header12);
      set(commHeader13,content.comm.header13); set(commHeader14,content.comm.header14);
      if(commForm){ lang==='en'?commForm.classList.add('text-ar'):commForm.classList.remove('text-ar'); }
      transfooter();
    }
    function transAbout(){
      transNav();
      set(aboutHeader,content.about.text1); set(aboutPara,content.about.text2);
      set(aboutHeader2,content.about.text3); set(aboutPara2,content.about.text4);
      set(aboutHeader3,content.about.text5);
      set(aboutLi1,content.about.text6); set(aboutLi2,content.about.text7);
      set(aboutLi3,content.about.text8); set(aboutLi4,content.about.text9); set(aboutLi5,content.about.text10);
      set(aboutEffectHeader1,content.about.text11); set(aboutEffectHeader2,content.about.text12);
      set(aboutEffectHeader3,content.about.text13); set(aboutEffectHeader4,content.about.text14);
      set(aboutEffectHeader5,content.about.text15);
      set(aboutEffectp1,content.about.text16); set(aboutEffectp2,content.about.text17);
      set(aboutEffectp3,content.about.text18); set(aboutEffectp4,content.about.text19);
      set(aboutReduceHeader,content.about.text20);
      set(aboutReducep1,content.about.text21); set(aboutReducep2,content.about.text22);
      set(aboutReducep3,content.about.text23); set(aboutReducep4,content.about.text24); set(aboutReducep5,content.about.text25);
      set(warnpara,content.about.text26); set(fastLink,content.about.text27);
      transfooter();
    }
    function transNav(){
      homeBut.forEach(e=>(e.innerHTML=content.nav.home));
      aboutBut.forEach(e=>(e.innerHTML=content.nav.about));
      calBut.forEach(e=>(e.innerHTML=content.nav.calc));
      conBut.forEach(e=>(e.innerHTML=content.nav.contact));
      if(logoBut[0]) logoBut[0].innerHTML=content.nav.logo;
    }
    function transfooter(){
      set(footHeader,content.footer.header); set(footp,content.footer.p);
      set(foot1,content.footer.first); set(foot2,content.footer.second); set(foot3,content.footer.third);
    }
    function transConCard(){
      if(cardCon) cardCon.classList.remove('dir');
      cards.forEach(e=>e.classList.remove('dir'));
    }
    function dirSwitch(){
      document.documentElement.dir=content.dir;
      if(navCon){ content.dir==='rtl'?navCon.classList.add('dir'):navCon.classList.remove('dir'); }
    }
  } catch(e) { console.log("lang.json not found, skipping translation"); }
}

langButtons.forEach(btn=>btn.addEventListener('click',()=>{
  currentLang=currentLang==='ar'?'en':'ar';
  localStorage.setItem('lang',currentLang);
  loadLanguage(currentLang);
}));
loadLanguage(currentLang);

// ================================================================
//  🌿 CALCULATOR — مع تحليل AI عبر السيرفر
// ================================================================
async function calculateCarbon() {
  const g = id => parseFloat(document.getElementById(id)?.value)||0;
  const inputs = {
    gasoline:    g("gasoline"),
    diesel:      g("diesel"),
    distance:    g("distance"),
    electricity: g("electricity"),
    gas:         g("gas"),
    water:       g("water"),
    waste:       g("waste"),
    diet:        g("diet"),
    flights:     g("flights"),
    shopping:    g("shopping")
  };
  const email = document.getElementById("email")?.value?.trim() || "";

  const EF = { gasoline:2.31, diesel:2.68, distance:0.19, electricity:0.5, gas:36, water:0.3, waste:1.9, flights:115, shopping:0.4 };

  const total =
    inputs.gasoline*EF.gasoline + inputs.diesel*EF.diesel + inputs.distance*EF.distance +
    inputs.electricity*EF.electricity + inputs.gas*EF.gas + inputs.water*EF.water +
    inputs.waste*4*EF.waste + (inputs.diet*1000)/12 +
    inputs.flights*EF.flights/12 + inputs.shopping*EF.shopping;

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

  const resultData = { monthly: total, yearly: tonsPerYear, color, level, advice };
  const resultEl = document.getElementById("result");

  // عرض النتيجة الأولية فوراً
  if(resultEl) {
    resultEl.innerHTML = `
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
        ${email ? `<div id="aiAnalysisBlock" class="result-advice" style="margin-top:1rem;border-color:#fde68a;background:#fffbeb">
          <p style="color:#92400e;font-weight:700;font-family:'Parastoo',serif">🤖 ${ar?'جاري تحليل البيانات بالذكاء الاصطناعي...':'AI is analyzing your data...'}</p>
          <div style="display:flex;gap:0.5rem;margin-top:0.5rem">
            <span style="width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:pulse 1s infinite"></span>
            <span style="width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:pulse 1s infinite 0.2s"></span>
            <span style="width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:pulse 1s infinite 0.4s"></span>
          </div>
        </div>` : ''}
        ${email ? `<p id="emailStatus" class="email-notice">📧 ${ar?'جاري إرسال التقرير إلى بريدك...':'Sending report to your email...'}</p>` : ''}
      </div>
      <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}</style>`;

    resultEl.scrollIntoView({ behavior:'smooth', block:'center' });
  }

  // تحليل AI وإرسال إيميل
  if(email) {
    const emailRes = await sendResultEmail(email, resultData, inputs);
    await saveEmailToDB(email);

    const aiBlock = document.getElementById('aiAnalysisBlock');
    if(aiBlock && emailRes.analysis) {
      const analysisHtml = emailRes.analysis
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');
      aiBlock.innerHTML = `
        <p style="color:#065f46;font-weight:700;font-family:'Parastoo',serif;margin-bottom:0.8rem">
          🤖 ${ar?'تحليل الذكاء الاصطناعي لبصمتك:':'AI Analysis of your footprint:'}
        </p>
        <div style="font-family:'Parastoo',serif;font-size:0.9rem;color:#374151;line-height:1.9;text-align:right">
          ${analysisHtml}
        </div>`;
    }

    const statusEl = document.getElementById('emailStatus');
    if(statusEl) {
      statusEl.textContent = emailRes.ok
        ? (ar ? '✅ تم إرسال التقرير الكامل إلى بريدك الإلكتروني!' : '✅ Full report sent to your email!')
        : (ar ? '⚠️ تعذّر الإرسال — تحقق من إعدادات EmailJS.' : '⚠️ Send failed — check EmailJS config.');
    }
  }
}

// ================================================================
//  🏘️ COMMUNITY CALCULATOR
// ================================================================
function calculateCommunity() {
  const g = id => parseFloat(document.getElementById(id)?.value)||0;
  const type = document.getElementById("communityType")?.value;
  const people=g("people"), electricity=g("electricityC"), gasoline=g("gasolineC");
  const diesel=g("dieselC"), waste=g("wasteC"), water=g("waterC"), flights=g("flightsC");

  const EF = { electricity:0.5, gasoline:2.31, diesel:2.68, waste:1.9, water:0.3, flights:115 };
  const factor = ({company:1.2, college:1.4, town:1.0})[type] || 1;

  const total = electricity*EF.electricity + gasoline*EF.gasoline + diesel*EF.diesel +
    waste*EF.waste + water*EF.water + flights*EF.flights + people*factor*5;
  const tonsYear=(total*12)/1000;
  const perPerson = people > 0 ? (total/people).toFixed(1) : 0;

  let color="", advice="";
  const ar = currentLang==="ar";

  if(total<=0||people<=0){
    color="⚫"; advice = ar ? "أدخل قيماً صحيحة." : "Please enter valid values.";
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
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); obs.unobserve(e.target); } });
  }, { threshold:0.1 });
  fadeEls.forEach(el=>obs.observe(el));
}