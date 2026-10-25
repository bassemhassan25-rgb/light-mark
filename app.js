(() => {
  'use strict';
  const C = window.SITE_CONTENT;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const iconPaths = {
    camera: '<path d="M14 4h-4L8 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4Z"/><circle cx="12" cy="13" r="4"/>',
    film: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4m-11-6 5 3-5 3Z"/>',
    cube: '<path d="m12 2 10 5.5v9L12 22 2 16.5v-9Zm0 11v9M2 7.5l10 5.5 10-5.5M7 5l10 5.5"/>',
    social: '<rect x="2" y="4" width="15" height="13" rx="3"/><path d="m5 17 1 4 4-4m7-10h2a3 3 0 0 1 3 3v7l-3-1h-2M6 9h7M6 12h4"/>',
    target: '<circle cx="11" cy="13" r="9"/><circle cx="11" cy="13" r="5"/><path d="m11 13 8-8m-1-3v4h4"/>',
    spark: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/>',
    phone: '<path d="m8 3-3-1-3 3c0 8 9 17 17 17l3-3-1-3-5-2-2 2c-3-1-5-3-6-6l2-2Z"/>',
    whatsapp: '<path d="M21 11.5A9 9 0 0 1 7.2 19L2 21l1.8-5.2A9 9 0 1 1 21 11.5Z"/><path d="m8 7-1 1c0 4 4 7 7 7l1-1-2-2-1 1-3-3 1-1Z"/>'
  };
  const icon = name => `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.spark}</svg>`;
  const waUrl = (text, number = C.company.whatsapp) => `https://wa.me/${number.replace(/\D/g,'')}?text=${encodeURIComponent(text)}`;
  const generalMessage = () => `أهلًا ${C.company.name}، حابب أستفسر عن خدماتكم وطلب عرض سعر لنشاطي في الكويت.`;
  let whatsappTrigger = null;
  function countryLinks(message, context) {
    return C.whatsappContacts.map((contact,index) => `<a id="${context}-whatsapp-${escape(contact.id)}" class="button ${index===0?'button-gold':'button-outline'} wa-country-link${context==='request'?' summary-send':''}" href="${escape(waUrl(message,contact.number))}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')}<span class="country-link-text"><strong class="country-label">${escape(context==='request'?contact.summaryLabel:contact.label)}</strong><bdi dir="ltr">${escape(contact.display)}</bdi></span></a>`).join('');
  }
  function openWhatsAppChooser(message, trigger) {
    const dialog = $('#whatsapp-dialog');
    $('#whatsapp-choice-links').innerHTML = countryLinks(message,'choice');
    whatsappTrigger = trigger;
    if(!dialog.open) {
      if(typeof dialog.showModal === 'function') dialog.showModal();
      else { dialog.setAttribute('open',''); $('.wa-country-link',dialog).focus(); }
    }
  }
  function closeWhatsAppChooser() {
    const dialog = $('#whatsapp-dialog');
    if(typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
    whatsappTrigger?.focus({preventScroll:true});
  }
  const safeUrl = value => { try { const url = new URL(value, location.href); return /^https?:$/.test(url.protocol) ? url.href : ''; } catch { return ''; } };
  const arNumber = n => new Intl.NumberFormat('ar-KW', {useGrouping:false}).format(n);
  const state = { services: [], activity: '', activityDetail: '', area: '', areaDetail: '', cooperation: '', timing: '', date: '', name: '', business: '', notes: '' };
  let step = 0, editing = false;
  const labels = C.assistant.steps;
  const prompts = [...C.assistant.prompts];
  prompts[0] = C.sections.greeting;
  const selectedServices = () => C.services.filter(s => state.services.includes(s.id));
  const activityText = () => [state.activity, state.activityDetail.trim()].filter(Boolean).join(' — ');
  const areaText = () => [state.area ? `محافظة ${state.area}` : '', state.areaDetail.trim()].filter(Boolean).join(' — ');
  const dateText = () => {
    if (state.timing !== 'تاريخ محدد' || !state.date) return state.timing;
    const [year, month, day] = state.date.split('-').map(Number);
    return new Intl.DateTimeFormat('ar-KW', {year:'numeric',month:'long',day:'numeric'}).format(new Date(year, month - 1, day));
  };
  const fullMessage = () => [
    `أهلًا ${C.company.name}، حابب أطلب عرض سعر.`, '',
    `الخدمات: ${selectedServices().map(s => s.title).join('، ')}`,
    `نوع النشاط: ${activityText()}`, `منطقة التنفيذ داخل الكويت: ${areaText()}`,
    `نوع التعاون: ${state.cooperation}`, `الموعد التقريبي: ${dateText()}`,
    state.name.trim() ? `الاسم: ${state.name.trim()}` : '',
    state.business.trim() ? `اسم النشاط: ${state.business.trim()}` : '',
    state.notes.trim() ? `الملاحظات: ${state.notes.trim()}` : '', '',
    'يا ريت نتواصل لتحديد التفاصيل وعرض السعر المناسب.'
  ].filter(line => line !== null).filter((line,index,all) => line || (all[index-1] && all[index+1])).join('\n');
  function initContent() {
    $$('[data-company]').forEach(el => el.textContent = C.company[el.dataset.company] || '');
    const title = $('#hero-title');
    // نص العنوان بالكامل قابل للتعديل في content.js؛ السطر الأخير بلون الهوية.
    const parts = C.hero.title.split('صورة');
    if (parts.length === 2) title.innerHTML = `${escape(parts[0])}<span>صورة${escape(parts[1])}</span>`;
    else title.textContent = C.hero.title;
    $('#hero-description').textContent = C.hero.description;
    $('#hero-primary').innerHTML = `${escape(C.hero.primary)} <span aria-hidden="true">↙</span>`;
    $('#hero-secondary').innerHTML = `${icon('whatsapp')}${escape(C.hero.secondary)}`;
    const textBindings = {'services-eyebrow':'servicesEyebrow','services-title':'servicesTitle','services-description':'servicesDescription','assistant-title':'assistantTitle','assistant-description':'assistantDescription','contact-title':'contactTitle','contact-description':'contactDescription','contact-note':'contactNote'};
    Object.entries(textBindings).forEach(([id,key]) => $('#'+id).textContent = C.sections[key]);
    $$('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
    $$('[data-wa]').forEach(el => {
      const message = el.dataset.wa === 'advice' ? `أهلًا ${C.company.name}، محتاج ترشيح للخدمة المناسبة لنشاطي في الكويت.` : generalMessage();
      el.href = waUrl(message);
      el.dataset.waMessage = message;
      el.setAttribute('aria-haspopup','dialog');
      el.setAttribute('aria-controls','whatsapp-dialog');
    });
    $('#contact-whatsapp-links').innerHTML = countryLinks(generalMessage(),'contact');
    $$('[data-phone]').forEach(el => el.href = `tel:${C.company.phone.replace(/[^+\d]/g,'')}`);
    $('#services-grid').innerHTML = C.services.map((s,i) => `<article class="service-card"><div class="service-top"><span class="service-icon">${icon(s.icon)}</span><span class="service-number" dir="ltr">0${i+1} /</span></div><span class="service-english" dir="ltr">${escape(s.english)}</span><h3>${escape(s.title)}</h3><p class="service-description">${escape(s.description)}</p><div class="service-tags">${s.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><button type="button" class="service-select" data-select-service="${escape(s.id)}" aria-label="اختار خدمة ${escape(s.title)}">اختار الخدمة <span aria-hidden="true">↙</span></button></article>`).join('');
    initWorks();
  }
  function initWorks() {
    initGallery(C.works, C.portfolio, {section:'works-section', title:'works-title', eyebrow:'works-eyebrow', description:'works-description', grid:'works-grid'});
    initGallery(C.aiAds.videos, C.aiAds, {section:'ai-food-ads', title:'ai-ads-title', eyebrow:'ai-ads-eyebrow', description:'ai-ads-description', grid:'ai-ads-grid'});
    initGallery(C.fashion.videos, C.fashion, {section:'fashion-section', title:'fashion-title', eyebrow:'fashion-eyebrow', description:'fashion-description', grid:'fashion-grid'});
    initVideoPlayers();
  }
  function initGallery(items, portfolio, ids) {
    const works = items.filter(work => work.title && ((work.video && safeUrl(work.video)) || (work.url && safeUrl(work.url))));
    $$(`a[href="#${ids.section}"]`).forEach(link => link.hidden = !works.length);
    if(!works.length) return;
    $('#'+ids.section).hidden = false;
    $('#'+ids.title).textContent = portfolio.title;
    $('#'+ids.eyebrow).textContent = portfolio.eyebrow;
    $('#'+ids.description).textContent = portfolio.description;
    $('#'+ids.grid).classList.toggle('video-works-grid', works.some(work => work.video));
    $('#'+ids.grid).innerHTML = works.map((work,index) => {
      if(!work.video) return `<a class="work-card" href="${escape(safeUrl(work.url))}" target="_blank" rel="noopener noreferrer">${work.image && safeUrl(work.image) ? `<img loading="lazy" src="${escape(safeUrl(work.image))}" alt="${escape(work.title)}">` : ''}<strong>${escape(work.title)}</strong><p>${escape(work.category || 'شاهد العمل')} ↗</p></a>`;
      const id = /^[a-z][a-z0-9-]*$/i.test(work.id || '') ? work.id : `${ids.grid}-${index+1}`;
      const width = Number(work.width) || 576, height = Number(work.height) || 1024;
      const duration = Math.max(0,Number(work.duration) || 0);
      const time = `${Math.floor(duration/60)}:${String(duration%60).padStart(2,'0')}`;
      const reference = new URL(`#${id}`, `${location.origin}${location.pathname}`).href;
      const message = portfolio.whatsappMessage || `أهلًا ${C.company.name}، ${portfolio.message}\nالنموذج: ${work.title}\nرابط النموذج: ${reference}`;
      // لا src ولا source قبل ضغط التشغيل: لا يتم تحميل أي فيديو مع فتح الصفحة.
      return `<article class="video-work-card${portfolio.aiLabel?' ai-work-card':''}" id="${escape(id)}"><div class="video-stage" style="--media-ratio:${width} / ${height}"><video id="player-${escape(id)}" class="portfolio-video" data-src="${escape(safeUrl(work.video))}" width="${width}" height="${height}" controls playsinline preload="none" tabindex="-1" aria-label="${escape(work.title)}${portfolio.aiLabel?'، '+escape(portfolio.aiLabel):''}"></video>${work.image && safeUrl(work.image) ? `<img class="work-poster" loading="lazy" decoding="async" src="${escape(safeUrl(work.image))}" width="${width}" height="${height}" alt="">` : ''}<button type="button" class="work-play" data-play-work aria-controls="player-${escape(id)}" aria-label="تشغيل ${escape(work.title)}"><span class="play-disc" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg></span><span class="play-label">${escape(portfolio.playLabel)}</span></button>${duration ? `<span class="video-duration" dir="ltr" aria-label="مدة الفيديو">${time}</span>` : ''}</div><div class="video-work-body">${portfolio.aiLabel?`<span class="ai-model-badge">${icon('spark')}${escape(portfolio.aiLabel)}</span>`:''}<h3>${escape(work.title)}</h3>${work.description?`<p class="work-description">${escape(work.description)}</p>`:''}<a class="button button-outline work-whatsapp" href="${escape(waUrl(message))}" data-wa-message="${escape(message)}" aria-haspopup="dialog" aria-controls="whatsapp-dialog" target="_blank" rel="noopener noreferrer" aria-label="${escape(portfolio.actionLabel)}، ${escape(work.title)}">${icon('whatsapp')}${escape(portfolio.actionLabel)}</a><p class="video-status" role="status"></p><a class="video-fallback" href="${escape(safeUrl(work.video))}" target="_blank" rel="noopener noreferrer" hidden>افتح الفيديو مباشرة ↗</a></div></article>`;
    }).join('');
  }
  function initVideoPlayers() {
    const showVideoError = video => {
      const card = video.closest('.video-work-card');
      $('.video-status',card).textContent = 'تعذّر تشغيل الفيديو. جرّب مرة ثانية.';
      $('.video-fallback',card).hidden = false;
      $('[data-play-work]',card).hidden = false;
    };
    document.addEventListener('click', async event => {
      const button = event.target.closest('[data-play-work]');
      if(!button) return;
      const card = button.closest('.video-work-card'), video = $('video',card);
      $$('.portfolio-video').forEach(other => {if(other !== video && !other.paused) other.pause();});
      $('.video-status',card).textContent = '';
      $('.video-fallback',card).hidden = true;
      const poster = $('.work-poster',card);
      if(!video.hasAttribute('src') || video.error) {
        if(poster) video.poster = poster.src;
        video.src = video.dataset.src;
        video.load();
      }
      button.hidden = true;
      video.tabIndex = 0;
      video.focus({preventScroll:true});
      if(poster) poster.hidden = true;
      $('.video-duration',card)?.setAttribute('hidden','');
      try { await video.play(); }
      catch(error) { if(error.name !== 'AbortError') showVideoError(video); }
    });
    $$('.portfolio-video').forEach(video => {
      video.addEventListener('play',() => {
        $$('.portfolio-video').forEach(other => {if(other !== video && !other.paused) other.pause();});
        $('.video-status',video.closest('.video-work-card')).textContent = '';
      });
      video.addEventListener('ended',() => {
        const button = $('[data-play-work]',video.closest('.video-work-card'));
        button.hidden = false;
        $('.play-label',button).textContent = 'إعادة التشغيل';
      });
      video.addEventListener('error',() => showVideoError(video));
    });
    document.addEventListener('visibilitychange',() => {
      if(document.hidden) $$('.portfolio-video').forEach(video => {if(!video.paused) video.pause();});
    });
  }
  function choices(values, field, multi = false, service = false) {
    return `<div class="choice-grid" role="group" aria-label="${escape(labels[step])}">${values.map(value => {
      const key = service ? value.id : value, label = service ? value.label : value;
      const active = multi ? state[field].includes(key) : state[field] === key;
      return `<button type="button" class="choice${active?' selected':''}${multi?'':' radio'}" data-choice="${escape(key)}" data-field="${field}" aria-pressed="${active}">${service?icon(value.icon):''}<span>${escape(label)}</span><span class="check" aria-hidden="true">${active?'✓':''}</span></button>`;
    }).join('')}</div>`;
  }
  function field(id, label, placeholder, max = 100, extra = '') {
    return `<label class="field-label" for="${id}">${label}</label><input id="${id}" name="${id}" data-bind="${id}" value="${escape(state[id])}" placeholder="${escape(placeholder)}" maxlength="${max}" ${extra}>`;
  }
  function explanation() {
    return selectedServices().map(s => `<details open><summary>${escape(s.title)}</summary><p>${escape(s.description)}</p></details>`).join('');
  }
  function previousAnswer() {
    if(step === 0 || step === 6) return '';
    const answers = [selectedServices().map(s=>s.label).join('، '),activityText(),areaText(),state.cooperation,dateText()];
    return `<div class="answer-bubble"><span>${escape(answers[step-1] || '')}</span><button type="button" data-edit="${step-1}" aria-label="تعديل ${escape(labels[step-1])}">تعديل ↗</button></div>`;
  }
  function render(focus = false) {
    $('#step-label').textContent = labels[step];
    $('#step-count').textContent = `${arNumber(step+1)} / ${arNumber(labels.length)}`;
    $('#progress-fill').style.width = `${(step+1)/labels.length*100}%`;
    $('.panel-badge').textContent = step === 6 ? 'راجع طلبك' : 'معاك خطوة بخطوة';
    $('#conversation').innerHTML = `${previousAnswer()}<div class="bot-message" tabindex="-1">${escape(prompts[step])}</div>`;
    $('#form-error').textContent = '';
    $('#back-button').hidden = step === 0;
    $('#step-navigation').hidden = step === 6;
    $('#next-button').innerHTML = (editing ? 'احفظ التعديل' : step === 5 ? 'اعرض ملخص الطلب' : 'التالي') + ' <span aria-hidden="true">←</span>';
    const container = $('#step-content');
    if(step === 0) container.innerHTML = `<p class="step-title">اختار خدمة أو أكثر</p>${choices(C.services,'services',true,true)}<div id="selection-info" class="selection-info" aria-live="polite">${explanation()}</div>`;
    if(step === 1) container.innerHTML = `<ul class="service-explanations">${selectedServices().map(s=>`<li><strong>${escape(s.title)}</strong>${escape(s.description)}</li>`).join('')}</ul>${choices(C.assistant.activities,'activity')}<div id="activity-detail-wrap"${state.activity==='نشاط آخر'?'':' hidden'}>${field('activityDetail','نوع نشاطك <span>اختياري</span>','اكتب نوع النشاط',100)}</div>`;
    if(step === 2) container.innerHTML = `<p class="step-title">اختار المحافظة، أو اكتب المنطقة مباشرة</p>${choices(C.assistant.areas,'area')}${field('areaDetail','المنطقة أو مكان التنفيذ','مثل: السالمية، الشويخ، أو أكثر من منطقة',180)}<p class="input-note">يكفي اختيار المحافظة أو كتابة منطقة داخل الكويت.</p>`;
    if(step === 3) container.innerHTML = choices(C.assistant.cooperation,'cooperation');
    if(step === 4) {
      const today = new Date(); const localDate = [today.getFullYear(), String(today.getMonth()+1).padStart(2,'0'), String(today.getDate()).padStart(2,'0')].join('-');
      container.innerHTML = `${choices(C.assistant.timing,'timing')}<div id="date-wrap"${state.timing==='تاريخ محدد'?'':' hidden'}>${field('date','اختار تاريخًا تقريبيًا','',10,`type="date" min="${localDate}"`)}</div><p class="input-note">الموعد النهائي يتحدد بعد الاتفاق على تفاصيل الشغل.</p>`;
    }
    if(step === 5) container.innerHTML = `<div class="fields-grid"><div>${field('name','اسمك <span>اختياري</span>','الاسم',100,'autocomplete="name"')}</div><div>${field('business','اسم النشاط <span>اختياري</span>','اسم الشركة أو البراند',120,'autocomplete="organization"')}</div></div><label class="field-label" for="notes">ملاحظات <span>اختياري</span></label><textarea id="notes" name="notes" data-bind="notes" maxlength="1500" rows="4" placeholder="احكيلنا عن فكرتك، عدد المنتجات أو أي تفاصيل تهمّك…">${escape(state.notes)}</textarea><p class="input-note">التفاصيل تفضل في الصفحة لحد ما تختار تكمّل على واتساب.</p>`;
    if(step === 6) renderSummary(container);
    updateNext();
    if(focus) {
      const message = $('.bot-message');
      message.focus({preventScroll:true});
      $('#assistant-panel').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
    }
  }
  function renderSummary(container) {
    const rows = [
      ['الخدمات',selectedServices().map(s=>s.title).join('، '),0],['نوع النشاط',activityText(),1],['المنطقة',areaText(),2],['التعاون',state.cooperation,3],['الموعد',dateText(),4],
      ['الاسم',state.name.trim()||'غير مضاف',5],['اسم النشاط',state.business.trim()||'غير مضاف',5],['ملاحظات',state.notes.trim()||'لا توجد ملاحظات',5]
    ];
    container.innerHTML = `<p class="summary-intro">ملخص طلب عرض السعر</p><dl class="summary-list">${rows.map(([label,value,index]) => `<div class="summary-row"><dt>${escape(label)}</dt><dd>${escape(value)}</dd><button class="edit-button" type="button" data-edit="${index}" aria-label="تعديل ${escape(label)}">تعديل</button></div>`).join('')}</dl><div class="summary-whatsapp-actions">${countryLinks(fullMessage(),'request')}</div><p class="send-note">اختار رقم الكويت أو أمريكا لفتح نفس ملخص الطلب.<br>الطلب يتبعت لما تضغط «إرسال» بنفسك داخل واتساب.</p><div class="summary-actions"><button class="copy-button" id="copy-summary" type="button">نسخ تفاصيل الطلب</button><button class="reset-button" id="reset-request" type="button">ابدأ طلب جديد</button></div><p id="copy-status" class="copy-status" role="status"></p>`;
  }
  function isValid() {
    if(step === 0) return state.services.length>0;
    if(step === 1) return !!state.activity;
    if(step === 2) return !!(state.area || state.areaDetail.trim());
    if(step === 3) return !!state.cooperation;
    if(step === 4) return !!state.timing && (state.timing !== 'تاريخ محدد' || !!state.date && state.date >= $('#date').min);
    return true;
  }
  function updateNext() { $('#next-button').disabled = !isValid(); }
  function editStep(index) { editing = editing || step === 6; step = index; render(true); }
  document.addEventListener('click', async event => {
    const whatsapp = event.target.closest('[data-wa-message]');
    if(whatsapp) {
      event.preventDefault();
      openWhatsAppChooser(whatsapp.dataset.waMessage,whatsapp);
    }
    if(event.target.closest('.wa-dialog-close') || event.target === $('#whatsapp-dialog')) closeWhatsAppChooser();
    if(event.target.closest('#whatsapp-dialog .wa-country-link')) closeWhatsAppChooser();
    const choice = event.target.closest('[data-choice]');
    if(choice) {
      const {field: key,choice:value} = choice.dataset;
      if(key === 'services') state.services = state.services.includes(value) ? state.services.filter(id=>id!==value) : [...state.services,value];
      else state[key] = value;
      $$(`[data-field="${key}"]`).forEach(button => {
        const active = key === 'services' ? state.services.includes(button.dataset.choice) : state[key] === button.dataset.choice;
        button.classList.toggle('selected',active); button.setAttribute('aria-pressed',String(active)); $('.check',button).textContent = active?'✓':'';
      });
      if(key === 'services') $('#selection-info').innerHTML = explanation();
      if(key === 'activity') { $('#activity-detail-wrap').hidden = value !== 'نشاط آخر'; if(value!=='نشاط آخر') state.activityDetail=''; }
      if(key === 'timing') $('#date-wrap').hidden = value !== 'تاريخ محدد';
      updateNext();
    }
    const service = event.target.closest('[data-select-service]');
    if(service) { if(!state.services.includes(service.dataset.selectService)) state.services.push(service.dataset.selectService); editing=false; step=0; render(true); }
    const edit = event.target.closest('[data-edit]');
    if(edit) editStep(Number(edit.dataset.edit));
    if(event.target.closest('#back-button')) { if(step>0) {step--; render(true);} }
    if(event.target.closest('#reset-request')) {
      Object.keys(state).forEach(key=>state[key]=key==='services'?[]:''); step=0; editing=false; render(true);
    }
    if(event.target.closest('#copy-summary')) {
      try { await navigator.clipboard.writeText(fullMessage()); $('#copy-status').textContent='تم نسخ تفاصيل الطلب.'; }
      catch { $('#copy-status').textContent='النسخ غير متاح في المتصفح. تقدر تكمّل بالرسالة الجاهزة على واتساب.'; }
    }
  });
  $('#whatsapp-dialog').addEventListener('close',() => whatsappTrigger?.focus({preventScroll:true}));
  document.addEventListener('input', event => {
    if(event.target.dataset.bind) { state[event.target.dataset.bind] = event.target.value; updateNext(); }
  });
  $('#assistant-form').addEventListener('submit', event => {
    event.preventDefault();
    if(!isValid()) { $('#form-error').textContent = step===4 ? 'اختار موعدًا، ولو اخترت تاريخ محدد يكون اليوم أو بعده.' : 'كمّل الاختيار عشان نقدر نجهّز طلبك.'; return; }
    if(editing) {editing=false;step=6;} else step=Math.min(step+1,6);
    render(true);
  });
  initContent(); render();
})();
