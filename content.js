/* مكان تعديل بيانات الشركة، النصوص، الخدمات، وخيارات المساعد وروابط الأعمال. */
window.SITE_CONTENT = {
  company: {
    name: 'بصمة ضوء', english: 'BASMAT DAW STUDIO',
    tagline: 'نصنع محتوى… يترك أثر', location: 'الكويت',
    phone: '+96560979388', whatsapp: '96560979388'
  },
  /* أرقام واتساب: number للرابط دون مسافات أو +، وdisplay للشكل المعروض. */
  whatsappContacts: [
    { id: 'kuwait', label: 'واتساب الكويت 🇰🇼', summaryLabel: 'إرسال الطلب إلى واتساب الكويت', display: '+96560979388', number: '96560979388' },
    { id: 'usa', label: 'واتساب أمريكا 🇺🇸', summaryLabel: 'إرسال الطلب إلى واتساب أمريكا', display: '+1 (949) 257-3300', number: '19492573300' }
  ],
  hero: {
    title: 'فكرتك… تستاهل تتشاف', highlight: 'تستاهل تتشاف',
    description: 'من التصوير لإعلانات الـAI وتصميم المواقع… بنحوّل فكرتك لحضور يلفت النظر',
    primary: 'شوف شغلنا', secondary: 'ابدأ مشروعك',
    primaryHref: '#works-section', secondaryHref: '#assistant',
    videoDesktop: 'assets/hero/reel-desktop.mp4', videoMobile: 'assets/hero/reel-mobile.mp4',
    posterDesktop: 'assets/hero/reel-poster-desktop.webp', posterMobile: 'assets/hero/reel-poster-mobile.webp'
  },
  sections: {
    servicesEyebrow: 'خدماتنا', servicesTitle: 'من الفكرة… للصورة اللي تترك أثر',
    servicesDescription: 'خدمات إنتاج ومحتوى تكمّل بعض، اختار منها اللي يناسب نشاطك.',
    assistantTitle: 'خلّينا نعرف محتاج إيه',
    assistantDescription: 'فكرتك هي البداية. جاوب على كام سؤال بسيط، وخلّينا نجهّز تفاصيل طلبك سوا.',
    greeting: 'أهلًا بيك في بصمة ضوء 👋 اختار الخدمة اللي محتاجها، ونجهّز تفاصيل طلبك عشان تتواصل معانا',
    contactTitle: 'بصمتك… تبدأ من هنا',
    contactDescription: 'عندك فكرة أو محتاج تعرف أنسب خدمة لنشاطك؟ خلّينا نتكلم.',
    contactNote: 'الإنتاج الإعلامي وصناعة المحتوى في الكويت'
  },
  services: [
    { id: 'photography', icon: 'camera', title: 'التصوير الاحترافي', label: 'تصوير احترافي', english: 'PHOTOGRAPHY', description: 'تصوير منتجات، مطاعم وكافيهات، شركات وبراندات، وتغطية فعاليات ومناسبات.', tags: ['منتجات وبراندات', 'مطاعم وكافيهات', 'فعاليات ومناسبات'] },
    { id: 'video', icon: 'film', title: 'المونتاج وصناعة الفيديو', label: 'مونتاج وصناعة فيديو', english: 'VIDEO PRODUCTION', description: 'مونتاج احترافي، فيديوهات سوشيال ميديا، إعلانات تجارية، وتصحيح ألوان وColor Grading.', tags: ['فيديوهات سوشيال', 'إعلانات تجارية', 'Color Grading'] },
    { id: 'motion', icon: 'cube', title: 'موشن جرافيك 2D و3D', label: 'موشن جرافيك 2D و3D', english: 'MOTION GRAPHICS', description: 'فيديوهات لشرح الخدمات، عناوين ومقدمات فيديو، ومحتوى بصري متحرك.', tags: ['شرح الخدمات', 'مقدمات فيديو', 'محتوى متحرك'] },
    { id: 'social', icon: 'social', title: 'إدارة حسابات السوشيال ميديا', label: 'إدارة سوشيال ميديا', english: 'SOCIAL MEDIA', description: 'إدارة الحسابات، تجهيز المحتوى الشهري، الجدولة والنشر، وتقارير وتحليل الأداء.', tags: ['محتوى شهري', 'جدولة ونشر', 'تقارير وتحليل'] },
    { id: 'ads', icon: 'target', title: 'الحملات الإعلانية الممولة', label: 'حملات إعلانية ممولة', english: 'PAID CAMPAIGNS', description: 'إعداد الحملات، تحديد الجمهور، ومتابعة الأداء وتحسينه.', tags: ['إعداد الحملات', 'تحديد الجمهور', 'متابعة الأداء'] },
    { id: 'extra', icon: 'spark', title: 'خدمات إضافية', label: 'خدمات إضافية', english: 'BRAND & SUPPORT', description: 'استشارات تطوير البراند، تحسين الهوية البصرية، الدعم الفني، والمساعدة في إجراءات توثيق الحسابات حسب متطلبات المنصة.', tags: ['تطوير البراند', 'هوية بصرية', 'دعم واستشارات'] }
  ],
  assistant: {
    steps: ['الخدمات', 'نوع النشاط', 'منطقة التنفيذ', 'نوع التعاون', 'الموعد التقريبي', 'تفاصيل إضافية', 'ملخص الطلب'],
    prompts: [
      '', /* الرسالة الأولى مأخوذة من sections.greeting */
      'جميل! إيه نوع نشاطك؟',
      'التنفيذ في أي منطقة داخل الكويت؟',
      'محتاج شغل مرة واحدة، ولا نكمل معاك بشكل شهري؟',
      'إمتى تحب نبدأ؟ اختار الموعد التقريبي المناسب ليك.',
      'تحب تضيف أي تفاصيل؟ الاسم واسم النشاط والملاحظات كلّها اختيارية.',
      'طلبك جاهز للمراجعة. راجع التفاصيل، وتقدر تعدّل أي اختيار قبل ما تكمّل على واتساب.'
    ],
    activities: ['مطعم أو كافيه', 'عيادة أو مركز طبي', 'متجر أو منتجات', 'شركة', 'نشاط شخصي', 'نشاط آخر'],
    areas: ['العاصمة', 'حولي', 'الفروانية', 'الأحمدي', 'الجهراء', 'مبارك الكبير'],
    cooperation: ['شغل مرة واحدة', 'تعاون شهري', 'محتاج ترشيح'],
    timing: ['في أقرب وقت', 'خلال أسبوع', 'خلال شهر', 'الموعد مرن', 'تاريخ محدد']
  },
  portfolio: {
    title: 'نماذج من شغلنا', eyebrow: 'الصورة تحكي',
    description: 'شاهد الفيديوهات، واختار النموذج الأقرب لفكرتك.',
    actionLabel: 'عايز شغل زي ده', playLabel: 'تشغيل الفيديو',
    message: 'عايز شغل زي ده. حابب أعرف التفاصيل وعرض السعر لنشاطي في الكويت.'
  },
  /* نماذج الفيديو: عدّل العنوان والملف وصورة المعاينة هنا.
     ضع الملفات في assets/works. احتفظ بمعرّف id ثابتًا لروابط واتساب.
     يدعم القسم أيضًا روابط أعمال خارجية بحقلي url وimage.
     يبقى القسم مخفيًا تلقائيًا إذا أصبحت القائمة فارغة. */
  works: [
    { id: 'work-01', title: 'نموذج ١', video: 'assets/works/work-01.mp4', image: 'assets/works/work-01.jpg', width: 576, height: 1024, duration: 39 },
    { id: 'work-02', title: 'نموذج ٢', video: 'assets/works/work-02.mp4', image: 'assets/works/work-02.jpg', width: 576, height: 1024, duration: 44 },
    { id: 'work-03', title: 'نموذج ٣', video: 'assets/works/work-03.mp4', image: 'assets/works/work-03.jpg', width: 576, height: 1024, duration: 69 },
    { id: 'work-04', title: 'نموذج ٤', video: 'assets/works/work-04.mp4', image: 'assets/works/work-04.jpg', width: 576, height: 1024, duration: 25 },
    { id: 'work-05', title: 'نموذج ٥', video: 'assets/works/work-05.mp4', image: 'assets/works/work-05.jpg', width: 576, height: 1024, duration: 59 },
    { id: 'work-06', title: 'نموذج ٦', video: 'assets/works/work-06.mp4', image: 'assets/works/work-06.jpg', width: 576, height: 1024, duration: 47 },
    { id: 'work-07', title: 'نموذج ٧', video: 'assets/works/work-07.mp4', image: 'assets/works/work-07.jpg', width: 576, height: 1024, duration: 24 },
    { id: 'work-08', title: 'نموذج ٨', video: 'assets/works/work-08.mp4', image: 'assets/works/work-08.jpg', width: 1024, height: 576, duration: 45 }
  ],
  /* قسم مستقل: فيديوهات إعلانات AI وأوصافها ورسالة واتساب. */
  aiAds: {
    "title": "إعلانات الأغذية والألبان بالذكاء الاصطناعي",
    "eyebrow": "إبداع بالذكاء الاصطناعي",
    "description": "نماذج إعلانية مبتكرة لمنتجات الأغذية والألبان، مصممة باستخدام تقنيات الذكاء الاصطناعي.",
    "aiLabel": "مصنوع بالذكاء الاصطناعي",
    "actionLabel": "عايز إعلان AI لمنتجي",
    "playLabel": "تشغيل الفيديو",
    "whatsappMessage": "أهلًا بصمة ضوء، شاهدت نموذج إعلان الأغذية والألبان المصنوع بالذكاء الاصطناعي، وأرغب في عمل إعلان مشابه لمنتجي.",
    "videos": [
      {
        "id": "ai-food-01",
        "video": "assets/ai-food/ai-food-01.mp4",
        "image": "assets/ai-food/ai-food-01.jpg",
        "width": 464,
        "height": 688,
        "duration": 31,
        "title": "زبادي بالفواكه",
        "description": "عبوة زبادي مع الفواكه وانسياب كريمي في مشاهد مشرقة."
      },
      {
        "id": "ai-food-02",
        "video": "assets/ai-food/ai-food-02.mp4",
        "image": "assets/ai-food/ai-food-02.jpg",
        "width": 464,
        "height": 688,
        "duration": 23,
        "title": "مشروب وردي بالفراولة",
        "description": "مشروب بالفراولة بين الزهور ومشاهد تقديم بطابع وردي."
      },
      {
        "id": "ai-food-03",
        "video": "assets/ai-food/ai-food-03.mp4",
        "image": "assets/ai-food/ai-food-03.jpg",
        "width": 464,
        "height": 848,
        "duration": 36,
        "title": "حليب ووصفات حلوة",
        "description": "لقطات سكب كريمية مع الفواكه ومشروبات باردة."
      },
      {
        "id": "ai-food-04",
        "video": "assets/ai-food/ai-food-04.mp4",
        "image": "assets/ai-food/ai-food-04.jpg",
        "width": 464,
        "height": 832,
        "duration": 16,
        "title": "منتج غذائي بإضاءة ذهبية",
        "description": "تقديم بصري لمنتج غذائي بإضاءة ذهبية وخلفية مطبخ."
      },
      {
        "id": "ai-food-05",
        "video": "assets/ai-food/ai-food-05.mp4",
        "image": "assets/ai-food/ai-food-05.jpg",
        "width": 576,
        "height": 1040,
        "duration": 24,
        "title": "حلويات ومخبوزات منزلية",
        "description": "مشاهد تحضير وتقديم حلويات ومخبوزات في أجواء منزلية دافئة."
      },
      {
        "id": "ai-food-06",
        "video": "assets/ai-food/ai-food-06.mp4",
        "image": "assets/ai-food/ai-food-06.jpg",
        "width": 464,
        "height": 688,
        "duration": 36,
        "title": "إضافات للحلويات",
        "description": "صلصات حلوة مع الكيك والآيس كريم ومشاهد تقديم متنوعة."
      },
      {
        "id": "ai-food-07",
        "video": "assets/ai-food/ai-food-07.mp4",
        "image": "assets/ai-food/ai-food-07.jpg",
        "width": 576,
        "height": 848,
        "duration": 6,
        "title": "مشروب بطعم الفراولة",
        "description": "عرض عبوة مشروب بالفراولة وسط ألوان وردية وقلوب وزهور."
      },
      {
        "id": "ai-food-08",
        "video": "assets/ai-food/ai-food-08.mp4",
        "image": "assets/ai-food/ai-food-08.jpg",
        "width": 464,
        "height": 848,
        "duration": 15,
        "title": "عطر بأجواء خليجية",
        "description": "عرض زجاجة عطر بين مشاهد ليلية ولقطات بطابع خليجي."
      },
      {
        "id": "ai-food-09",
        "video": "assets/ai-food/ai-food-09.mp4",
        "image": "assets/ai-food/ai-food-09.jpg",
        "width": 576,
        "height": 1024,
        "duration": 8,
        "title": "شراب حلو بأجواء رمضانية",
        "description": "عبوات شراب للحلويات مع فوانيس وزخارف رمضانية."
      },
      {
        "id": "ai-food-10",
        "video": "assets/ai-food/ai-food-10.mp4",
        "image": "assets/ai-food/ai-food-10.jpg",
        "width": 576,
        "height": 1024,
        "duration": 8,
        "title": "عصائر بألوان الفاكهة",
        "description": "عرض عبوات عصائر متنوعة بألوان الفاكهة وأجواء رمضانية."
      },
      {
        "id": "ai-food-11",
        "video": "assets/ai-food/ai-food-11.mp4",
        "image": "assets/ai-food/ai-food-11.jpg",
        "width": 576,
        "height": 864,
        "duration": 6,
        "title": "هريس الطماطم",
        "description": "عبوة منتج طماطم وسط الخضراوات الطازجة."
      },
      {
        "id": "ai-food-12",
        "video": "assets/ai-food/ai-food-12.mp4",
        "image": "assets/ai-food/ai-food-12.jpg",
        "width": 464,
        "height": 848,
        "duration": 32,
        "title": "معجون الطماطم في المطبخ",
        "description": "انتقال بصري من حقول الطماطم إلى مشاهد الطبخ وتقديم العبوة."
      },
      {
        "id": "ai-food-13",
        "video": "assets/ai-food/ai-food-13.mp4",
        "image": "assets/ai-food/ai-food-13.jpg",
        "width": 576,
        "height": 1040,
        "duration": 6,
        "title": "زبادي بأجواء رمضانية",
        "description": "عبوة زبادي مع فوانيس وهلال وخلفية شرقية دافئة."
      }
    ]
  },
  /* قسم الأزياء والموضة: الفيديوهات ووصفها ورسالة واتساب. */
  fashion: {
    "title": "الأزياء والموضة",
    "eyebrow": "أناقة في كل كادر",
    "description": "نموذج إعلاني للأزياء يبرز تفاصيل التصميم وجمال الإطلالة.",
    "actionLabel": "عايز إعلان أزياء زي ده",
    "playLabel": "تشغيل الفيديو",
    "message": "شاهدت نموذج الأزياء وأرغب في عمل إعلان مشابه لمنتجاتي.",
    "videos": [
      {
        "id": "fashion-01",
        "title": "إطلالة وردية",
        "description": "فستان وردي بتفاصيل بارزة، بين الأقواس والزهور.",
        "video": "assets/fashion/fashion-01.mp4",
        "image": "assets/fashion/fashion-01.jpg",
        "width": 720,
        "height": 1280,
        "duration": 5
      }
    ]
  }
};
