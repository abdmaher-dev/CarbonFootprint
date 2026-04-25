// ================================================================
//  ⚙️  API Settings
// ================================================================
const EMAILJS_PUBLIC_KEY  = "UKZX5vXt0uP3uXd53";
const EMAILJS_SERVICE_ID  = "service_blw3koo";
const EMAILJS_TEMPLATE_ID = "template_sole5be";
const BACKEND_URL = "";


// ================================================================
//  TRANSLATIONS  — loaded from lang.json at runtime
// ================================================================
let TRANSLATIONS = {};

async function loadTranslations() {
  try {
    const res = await fetch('/lang.json');
    if (!res.ok) throw new Error('Failed to load lang.json');
    TRANSLATIONS = await res.json();
  } catch (e) {
    console.error('Could not load lang.json:', e);
  }
}


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

async function analyzeWithAI(inputs, result, isCommunity = false) {
  const route = isCommunity ? '/analyze-community' : '/analyze';
  try {
    const r = await fetch(`${BACKEND_URL}${route}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({inputs,result})});
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

  // Email section translation
  const commEmailLabel = document.getElementById('comm-emailLabel');
  if(commEmailLabel && c.comm.emailLabel) commEmailLabel.innerHTML = c.comm.emailLabel;
  const commEmailNote = document.getElementById('comm-emailNote');
  if(commEmailNote && c.comm.emailNote) commEmailNote.innerHTML = c.comm.emailNote;
  const commSecEmail = document.getElementById('comm-secEmail');
  if(commSecEmail && c.comm.secEmail) commSecEmail.innerHTML = c.comm.secEmail;
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

// ================================================================
//  INIT — load translations from lang.json then apply language
// ================================================================
(async function init() {
  await loadTranslations();
  loadLanguage(currentLang);
  buildAllTooltips();
})();

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

  let color="", level="", advice="";
  const ar = currentLang==="ar";

 const tonsPerYear = (total*12)/1000;
const yearlyKg = total * 12;

if(ar){
    if(yearlyKg < 2000)       {color="🟢"; level="منخفضة جداً"; advice="أحسنت! بصمتك منخفضة جداً.";}
    else if(yearlyKg < 4500)  {color="🟡"; level="طبيعية";       advice="ضمن المعدل الطبيعي في العراق.";}
    else if(yearlyKg < 9000)  {color="🟠"; level="متوسطة";       advice="يمكنك تقليل استهلاكك.";}
    else if(yearlyKg < 15000) {color="🔴"; level="مرتفعة";       advice="استهلاكك عالي.";}
    else                      {color="⚫"; level="عالية جداً";   advice="تحتاج تغيير جذري.";}
} else {
    if(yearlyKg < 2000)       {color="🟢"; level="Very Low";  advice="Excellent!";}
    else if(yearlyKg < 4500)  {color="🟡"; level="Normal";    advice="Within average.";}
    else if(yearlyKg < 9000)  {color="🟠"; level="Average";   advice="Can improve.";}
    else if(yearlyKg < 15000) {color="🔴"; level="High";      advice="High consumption.";}
    else                      {color="⚫"; level="Very High"; advice="Major changes needed.";}
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
async function calculateCommunity() {
  const g = id => parseFloat(document.getElementById(id)?.value)||0;
  const type = document.getElementById("communityType")?.value;
  const people=g("people"), electricity=g("electricityC"), gasoline=g("gasolineC");
  const diesel=g("dieselC"), waste=g("wasteC"), water=g("waterC"), flights=g("flightsC");
  const email = document.getElementById("emailC")?.value?.trim() || "";

  const EF = {electricity:0.5, gasoline:2.31, diesel:2.68, waste:1.9, water:0.0003, flights:115};
  const factor = ({company:1.2, college:1.4, town:1.0})[type]||1;

  const total = electricity*EF.electricity + gasoline*EF.gasoline + diesel*EF.diesel +
    waste*EF.waste + water*EF.water + flights*EF.flights + people*factor*5;
  const tonsYear=(total*12)/1000;
  const perPerson = people>0 ? (total/people).toFixed(1) : 0;

  let color="", level="", advice="";
  const ar = currentLang==="ar";

  const yearlyKg = total * 12;
  const perPersonYearly = people > 0 ? yearlyKg / people : 0;

  if(total<=0||people<=0){
    color="⚫";
    level = ar ? "غير صالح" : "Invalid";
    advice=ar?"أدخل قيماً صحيحة.":"Please enter valid values.";
  } else if(ar){
    if(perPersonYearly < 2000)      {color="🟢"; level="منخفضة جداً"; advice="بصمة الفرد في هذا المجتمع منخفضة جداً! أداء ممتاز.";}
    else if(perPersonYearly < 4500) {color="🟡"; level="طبيعية";      advice="بصمة المجتمع ضمن المعدل الطبيعي في العراق.";}
    else if(perPersonYearly < 9000) {color="🟠"; level="متوسطة";      advice="بصمة متوسطة، يمكن تحسين كفاءة الطاقة والنقل.";}
    else if(perPersonYearly < 15000){color="🔴"; level="مرتفعة";      advice="بصمة مرتفعة، الاستهلاك أعلى من المعدل.";}
    else                            {color="⚫"; level="عالية جداً";  advice="بصمة عالية جداً، يحتاج المجتمع خطة تقليل واضحة.";}
  } else {
    if(perPersonYearly < 2000)      {color="🟢"; level="Very Low";  advice="Very low per-person footprint! Excellent.";}
    else if(perPersonYearly < 4500) {color="🟡"; level="Normal";    advice="Within the normal Iraqi average.";}
    else if(perPersonYearly < 9000) {color="🟠"; level="Average";   advice="Average footprint. Improvements possible.";}
    else if(perPersonYearly < 15000){color="🔴"; level="High";      advice="High footprint per person.";}
    else                            {color="⚫"; level="Very High"; advice="Very high footprint. Action needed.";}
  }

  const resultData = {monthly: total, yearly: tonsYear, color, level, advice};
  const el = document.getElementById("communityResult");
  if(!el) return;

  const typeLabel = ar
    ? ({company:"شركة", college:"كلية/جامعة", town:"مدينة/بلدة"})[type] || "غير محدد"
    : ({company:"Company", college:"College/University", town:"City/Town"})[type] || "Not set";

  el.innerHTML = `
    <div class="result-card" style="direction:rtl">
      <div class="result-meter">
        <span class="result-emoji">${color}</span>
        <div class="result-numbers">
          <p><strong>${total.toFixed(1)}</strong> ${ar?'كغم CO₂e / شهر':'kg CO₂e / month'}</p>
          <p><strong>${tonsYear.toFixed(2)}</strong> ${ar?'طن CO₂e / سنة':'tons CO₂e / year'}</p>
        </div>
      </div>
      <p class="result-level-badge">${ar?'المستوى':'Level'}: ${level}</p>
      <div class="per-person-bar">
        <p>👤 ${ar?'متوسط نصيب الفرد':'Per-person avg'}: <strong>${perPerson} ${ar?'كغم CO₂e/شهر':'kg CO₂e/month'}</strong></p>
        <p>📊 ${ar?'نوع المجتمع':'Community type'}: <strong>${typeLabel}</strong></p>
      </div>
      <p class="result-advice">${advice}</p>
      ${email ? `
        <div id="commAiBlock" class="result-advice" style="margin-top:1rem;border-color:#fde68a;background:#fffbeb">
          <p style="color:#92400e;font-weight:700;font-family:'Parastoo',serif">🤖 ${ar?'جاري تحليل البيانات...':'Analyzing your data...'}</p>
          <div style="display:flex;gap:0.5rem;margin-top:0.5rem">
            <span style="width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:pulse 1s infinite"></span>
            <span style="width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:pulse 1s infinite 0.2s"></span>
            <span style="width:8px;height:8px;background:#f59e0b;border-radius:50%;animation:pulse 1s infinite 0.4s"></span>
          </div>
        </div>
        <p id="commEmailStatus" class="email-notice">📧 ${ar?'جاري إرسال التقرير...':'Sending report...'}</p>
      ` : ''}
    </div>
    <style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}</style>`;

  el.scrollIntoView({behavior:'smooth', block:'center'});

  if(email) {
    // إرسال التحليل بالذكاء الاصطناعي
    const commInputs = {
      electricity, gasoline, diesel,
      waste, water, flights, people,
      communityType: type, factor
    };
    const emailRes = await sendCommunityEmail(email, resultData, commInputs);
    await saveEmailToDB(email);

    const aiBlock = document.getElementById('commAiBlock');
    if(aiBlock && emailRes.analysis){
      const html = emailRes.analysis.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>');
      aiBlock.innerHTML = `<p style="color:#065f46;font-weight:700;font-family:'Parastoo',serif;margin-bottom:0.8rem">🤖 ${ar?'تحليل الذكاء الاصطناعي:':'AI Analysis:'}</p><div style="font-family:'Parastoo',serif;font-size:0.9rem;color:#374151;line-height:1.9;text-align:right">${html}</div>`;
    }
    const st = document.getElementById('commEmailStatus');
    if(st) st.textContent = emailRes.ok
      ? (ar?'✅ تم إرسال التقرير!':'✅ Report sent!')
      : (ar?'⚠️ تعذّر الإرسال.':'⚠️ Send failed.');
  }
}

async function sendCommunityEmail(email, result, inputs) {
  if(typeof emailjs==='undefined' || !email) return {ok:false};
  const aiAnalysis = await analyzeWithAI(inputs, result, true);
  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email: email,
      user_result: result.monthly.toFixed(1),
      user_yearly: result.yearly.toFixed(2),
      user_level: result.level,
      user_color: result.color,
      ai_analysis: aiAnalysis
    });
    return {ok:true, analysis:aiAnalysis};
  } catch(e) { return {ok:false, analysis:aiAnalysis}; }
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