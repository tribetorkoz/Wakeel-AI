
export const content = {
  en: {
    nav: {
      solutions: "Solutions",
      showcase: "Platform",
      cta: "Client Login" // Changed from Access Console
    },
    hero: {
      badge: "Production Ready System",
      title: "Deploy Autonomous Digital Workforce.",
      subtitle: "Reduce overhead by 70%. Deploy persistent AI agents that learn your business, execute workflows, and scale infinitely without human intervention.",
      placeholder_name: "Full Name",
      placeholder_company: "Organization Name",
      placeholder_email: "Business Email",
      btn_join: "Request Access",
      footer_text: "Trusted by Modern Enterprises",
      privacy: "Priority Waitlist Active. Approvals within 24h.",
      no_card: "No credit card required for waitlist",
      success: {
        title: "Request Received",
        desc: "Check your email for the access code once approved."
      }
    },
    dashboard: {
      welcome: "Enterprise Core",
      subtitle: "System Status: ONLINE | Memory Integrity: 100%",
      agents_tab: "Active Units",
      create_tab: "Provision Unit",
      supervisor_tab: "Neural Hive",
      chat_tab: "Direct Uplink",
      integrations_tab: "Knowledge Base", 
      logout: "Secure Logout",
      all_agents: "Deployed Workforce",
      no_integrations: "No Knowledge Loaded",
      add_new: "Provision New Unit",
      back: "Return",
      integration_hub: "Corporate Memory Bank",
      manage_sources: "Inject Data for:",
      active_connections: "Ingested Knowledge",
      add_source: "Add Data Source",
      upload_docs: "Ingest Policy/Docs",
      upload_desc: "Real-time OCR & Text embedding.",
      connect_whatsapp: "WhatsApp Business API",
      whatsapp_desc: "Connect real number via Meta API.",
      connect_gmail: "SMTP / IMAP",
      gmail_desc: "Full email read/write access.",
      connect_db: "SQL Connector",
      db_desc: "Direct read/write to PostgreSQL/MySQL.",
      deploy: "Initialize Neural Path",
      agent_name: "Unit Designation",
      agent_role: "Primary Function",
      system_prompt: "Core Directive (System Prompt)",
      online: "ACTIVE",
      type_message: "Transmit directive...",
      bulk_campaign: "Mass Operation",
      launch_campaign: "Execute Operation",
      recipient_list: "Target List (CSV/Text)",
      subject: "Header",
      body: "Payload",
      cancel: "Abort",
      close: "Dismiss",
      templates_title: "Specialized Kernels",
      templates_subtitle: "Load pre-configured expertise modules.",
      template_sales: "Sales Executive",
      template_sales_desc: "Expert in negotiation and closing.",
      template_support: "Senior Support",
      template_support_desc: "Deep technical resolution capability.",
      template_hr: "HR Director",
      template_hr_desc: "Policy enforcement and recruitment.",
      template_accounting: "CPA Auditor",
      template_accounting_desc: "Financial compliance and entry.",
      quick_task: "Voice Command",
      assign_task: "Broadcast Directive",
      broadcast_placeholder: "Issue a global command to the entire workforce...",
      agent_status: { idle: "Standby", working: "Processing", waiting: "Analysis" },
      metrics: {
          money_saved: "Cost Efficiency",
          hours_saved: "Man-Hours Saved",
          human_equivalent: "FTE Replacement"
      },
      autopilot: "AUTONOMOUS MODE",
      knowledge_placeholder: "Paste company policies, product data, or instructions here. The AI will memorize this."
    },
    howItWorks: {
      title: "Production Deployment",
      subtitle: "This is not a simulation. Data is processed in real-time.",
      steps: [
        { title: "1. Ingest Data", desc: "Upload real PDF/TXT files or paste policies." },
        { title: "2. Vectorize", desc: "System embeds knowledge into long-term memory." },
        { title: "3. Execute", desc: "Agents act based on YOUR specific data." }
      ]
    },
    testimonials: {
      title: "Enterprise Deployments",
      subtitle: "Real companies running on Wakeel OS.",
      items: [
        { quote: "It actually learned our entire handbook in seconds.", author: "Alex Chen", role: "CTO, FinFlow", avatar: "AC" },
        { quote: "Replaced our Tier 1 support completely.", author: "Sarah Jenkins", role: "Ops Manager", avatar: "SJ" },
        { quote: "The persistent memory feature is a game changer.", author: "Michael Ross", role: "Director", avatar: "MR" }
      ]
    },
    productShowcase: {
      title: "Live Execution Log",
      subtitle: "Real-time kernel operations.",
      simulation: {
        input_label: "System Log",
        input_text: "./wakeel execute --context=full",
        processing: ["> Loading Corporate Memory...", "> Authenticating APIs...", "> Optimizing Neural Paths...", "> Task Executed Successfully."],
        output_label: "Result",
        output_json: { status: "Confirmed", latency: "42ms", data: { vendor: "RealData Inc", revenue: "$4.2M", growth: "+120%", insight: "Actionable", action: "DB Commit" } }
      }
    },
    features: {
      badge: "Core Features",
      title: "Enterprise Operating System",
      subtitle: "A complete replacement for manual workflows.",
      cta_banner: { title: "Deploy your workforce.", btn: "Start Now" },
      cards: {
        support: { title: "Omnichannel", desc: "Unified inbox for all agents.", stat1: "Uptime", stat2: "SLA" },
        docs: { title: "Deep Learning", desc: "Ingests entire knowledge bases.", stat: "Capacity" },
        content: { title: "Auto-Generation", desc: "Creates enterprise assets.", stat1: "Speed", stat2: "Quality" },
        security: { title: "Bank-Grade", desc: "End-to-end encrypted memory.", stat1: "Sec", stat2: "Enc" },
        agent: { title: "Custom Logic", desc: "Scriptable behaviors.", cta: "Code" }
      }
    },
    demo: {
      badge: "Live Tool",
      title: "Neural Studio",
      subtitle: "Test the generation engine.",
      input_label: "Directive",
      output_label: "Generated Asset",
      placeholder: "e.g., Draft a legal contract...",
      processing: "Processing...",
      generate: "Execute",
      ready: "System Ready.",
      waiting: "Awaiting input.",
      copy: "Copy to Clipboard",
      inspire: "Load Template",
      options: { post: "External", desc: "Internal", ad: "Creative" }
    },
    faq: {
      title: "Technical FAQ",
      items: [
        { q: "Is the data persistent?", a: "Yes. All ingested data is stored in the local secure vault." },
        { q: "Can I connect real APIs?", a: "Yes. Use the Data Nexus to configure endpoints." },
        { q: "Is this production ready?", a: "Yes. The system is designed for live deployment." }
      ]
    },
    pricing: {
      title: "License Tiers",
      subtitle: "Invest in automation.",
      starter: { title: "Startup License", price: "$499", desc: "Up to 5 Units.", cta: "Purchase", features: ["Persistent Memory", "Basic API Access"] },
      growth: { title: "Business License", price: "$1299", desc: "Up to 20 Units.", cta: "Purchase", features: ["Full Knowledge Base", "Priority Processing"] },
      enterprise: { title: "Corp License", price: "Custom", desc: "Unlimited.", cta: "Contact Sales", features: ["Dedicated Server", "SLA Guarantee"] },
      guarantee: ["30-Day Money Back", "Full IP Ownership", "24/7 Support"]
    },
    footer: {
      desc: "The OS for the autonomous enterprise.",
      sections: { product: "Platform", company: "Corporation", legal: "Compliance" },
      copyright: "© 2024 Wakeel AI Systems.",
      made: "Engineered for Performance"
    }
  },
  ar: {
    nav: { solutions: "حلول الشركات", showcase: "النواة", cta: "دخول العملاء" },
    hero: {
      badge: "نظام جاهز للإنتاج",
      title: "أنشر قوة عاملة رقمية مستقلة.",
      subtitle: "خفض التكاليف التشغيلية بنسبة ٧٠٪. انشر وكلاء ذكاء اصطناعي دائمين يتعلمون أعمالك، ينفذون المهام، ويتوسعون بلا حدود دون تدخل بشري.",
      placeholder_name: "الاسم الكامل",
      placeholder_company: "اسم المؤسسة",
      placeholder_email: "البريد العملي",
      btn_join: "طلب انضمام",
      footer_text: "تثق بنا الشركات الحديثة",
      privacy: "قائمة الانتظار نشطة. الموافقة خلال 24 ساعة.",
      no_card: "لا يتطلب بطاقة ائتمان للتسجيل",
      success: { title: "تم استلام الطلب", desc: "يرجى انتظار الموافقة وكود الدخول عبر البريد." }
    },
    dashboard: {
      welcome: "القيادة المركزية",
      subtitle: "حالة النظام: متصل | سلامة الذاكرة: ١٠٠٪",
      agents_tab: "الوحدات النشطة",
      create_tab: "تجهيز وحدة",
      supervisor_tab: "الخلية العصبية",
      chat_tab: "اتصال مباشر",
      integrations_tab: "قاعدة المعرفة", // Changed
      logout: "خروج آمن",
      all_agents: "القوى العاملة",
      no_integrations: "لا توجد معرفة محملة",
      add_new: "تجهيز وحدة جديدة",
      back: "عودة",
      integration_hub: "بنك الذاكرة المؤسسي",
      manage_sources: "تغذية البيانات لـ:",
      active_connections: "المعرفة المستوعبة",
      add_source: "إضافة مصدر بيانات",
      upload_docs: "استيعاب وثائق/سياسات",
      upload_desc: "قراءة وتحليل النصوص فعلياً.",
      connect_whatsapp: "واتساب للأعمال API",
      whatsapp_desc: "ربط رقم حقيقي عبر Meta.",
      connect_gmail: "بريد SMTP / IMAP",
      gmail_desc: "قراءة وإرسال حقيقي.",
      connect_db: "رابط SQL المباشر",
      db_desc: "اتصال قراءة/كتابة بقواعد البيانات.",
      deploy: "تفعيل المسار العصبي",
      agent_name: "تسمية الوحدة",
      agent_role: "الوظيفة الأساسية",
      system_prompt: "التوجيه الأساسي (System Prompt)",
      online: "نشط",
      type_message: "إرسال توجيه...",
      bulk_campaign: "عملية جماعية",
      launch_campaign: "تنفيذ العملية",
      recipient_list: "قائمة الأهداف (CSV/نص)",
      subject: "العنوان",
      body: "المحتوى",
      cancel: "إلغاء",
      close: "إغلاق",
      templates_title: "أنوية متخصصة",
      templates_subtitle: "تحميل وحدات خبرة معدة مسبقاً.",
      template_sales: "مدير مبيعات",
      template_sales_desc: "خبير في التفاوض والإغلاق.",
      template_support: "دعم فني متقدم",
      template_support_desc: "قدرة حل تقنية عميقة.",
      template_hr: "مدير موارد بشرية",
      template_hr_desc: "تطبيق السياسات والتوظيف.",
      template_accounting: "مدقق مالي (CPA)",
      template_accounting_desc: "الامتثال المالي والإدخال.",
      quick_task: "أمر صوتي",
      assign_task: "بث التوجيه",
      broadcast_placeholder: "إصدار أمر شامل لكامل القوى العاملة...",
      agent_status: { idle: "استعداد", working: "معالجة", waiting: "تحليل" },
      metrics: {
          money_saved: "كفاءة التكلفة",
          hours_saved: "ساعات عمل موفرة",
          human_equivalent: "بديل للموظفين"
      },
      autopilot: "الوضع المستقل",
      knowledge_placeholder: "الصق سياسات الشركة، بيانات المنتجات، أو التعليمات هنا. سيقوم النظام بحفظها وتذكرها."
    },
    howItWorks: {
      title: "نشر الإنتاج",
      subtitle: "هذه ليست محاكاة. تتم معالجة البيانات في الوقت الفعلي.",
      steps: [
        { title: "١. استيعاب البيانات", desc: "ارفع ملفات حقيقية أو الصق السياسات." },
        { title: "٢. التضمين", desc: "النظام يدمج المعرفة في الذاكرة طويلة المدى." },
        { title: "٣. التنفيذ", desc: "الوكلاء يتصرفون بناءً على بياناتك الخاصة." }
      ]
    },
    testimonials: {
      title: "نشر مؤسسي",
      subtitle: "شركات حقيقية تعمل بنظام وكيل.",
      items: [
        { quote: "لقد تعلم كتيب الموظفين بالكامل في ثوانٍ.", author: "أحمد العلي", role: "مدير تقني", avatar: "أع" },
        { quote: "استبدل دعم المستوى الأول لدينا بالكامل.", author: "سارة جاسم", role: "مديرة عمليات", avatar: "سج" },
        { quote: "ميزة الذاكرة الدائمة غيرت قواعد اللعبة.", author: "ماجد الروس", role: "مدير", avatar: "مر" }
      ]
    },
    productShowcase: {
      title: "سجل التنفيذ الحي",
      subtitle: "عمليات النواة في الوقت الفعلي.",
      simulation: {
        input_label: "سجل النظام",
        input_text: "./wakeel execute --context=full",
        processing: ["> تحميل الذاكرة المؤسسية...", "> المصادقة على APIs...", "> تحسين المسارات العصبية...", "> تم تنفيذ المهمة بنجاح."],
        output_label: "النتيجة",
        output_json: { status: "مؤكد", latency: "٤٢ملي ثانية", data: { vendor: "بيانات حقيقية", revenue: "٤.٢م", growth: "+١٢٠٪", insight: "قابل للتنفيذ", action: "التزام DB" } }
      }
    },
    features: {
      badge: "الميزات الأساسية",
      title: "نظام تشغيل المؤسسات",
      subtitle: "بديل كامل لتدفقات العمل اليدوية.",
      cta_banner: { title: "انشر قوتك العاملة.", btn: "ابدأ الآن" },
      cards: {
        support: { title: "شامل القنوات", desc: "صندوق موحد لجميع الوكلاء.", stat1: "التوافر", stat2: "الجودة" },
        docs: { title: "تعلم عميق", desc: "يستوعب قواعد معرفة كاملة.", stat: "السعة" },
        content: { title: "توليد تلقائي", desc: "يخلق أصولاً مؤسسية.", stat1: "السرعة", stat2: "الجودة" },
        security: { title: "درجة بنكية", desc: "ذاكرة مشفرة بالكامل.", stat1: "أمان", stat2: "تشفير" },
        agent: { title: "منطق مخصص", desc: "سلوكيات قابلة للبرمجة.", cta: "كود" }
      }
    },
    demo: {
      badge: "أداة حية",
      title: "الاستوديو العصبي",
      subtitle: "اختبار محرك التوليد.",
      input_label: "التوجيه",
      output_label: "الأصل المولد",
      placeholder: "مثال: صغ عقداً قانونياً...",
      processing: "جاري المعالجة...",
      generate: "تنفيذ",
      ready: "النظام جاهز.",
      waiting: "بانتظار المدخلات.",
      copy: "نسخ للحافظة",
      inspire: "تحميل قالب",
      options: { post: "خارجي", desc: "داخلي", ad: "إبداعي" }
    },
    faq: {
      title: "الأسئلة التقنية",
      items: [
        { q: "هل البيانات دائمة؟", a: "نعم. يتم تخزين جميع البيانات في الخزنة المحلية الآمنة." },
        { q: "هل يمكنني ربط APIs حقيقية؟", a: "نعم. استخدم مركز البيانات لتهيئة نقاط الاتصال." },
        { q: "هل هذا جاهز للإنتاج؟", a: "نعم. النظام مصمم للنشر الحي." }
      ]
    },
    pricing: {
      title: "باقات الترخيص",
      subtitle: "استثمر في الأتمتة.",
      starter: { title: "رخصة ناشئة", price: "٤٩٩$", desc: "حتى ٥ وحدات.", cta: "شراء", features: ["ذاكرة دائمة", "وصول API أساسي"] },
      growth: { title: "رخصة أعمال", price: "١٢٩٩$", desc: "حتى ٢٠ وحدة.", cta: "شراء", features: ["قاعدة معرفة كاملة", "معالجة ذات أولوية"] },
      enterprise: { title: "رخصة شركة", price: "مخصص", desc: "غير محدود.", cta: "تواصل للمبيعات", features: ["سيرفر مخصص", "ضمان SLA"] },
      guarantee: ["ضمان ٣٠ يوم", "ملكية فكرية كاملة", "دعم ٢٤/٧"]
    },
    footer: {
      desc: "نظام التشغيل للمؤسسة المستقلة.",
      sections: { product: "المنصة", company: "المؤسسة", legal: "الامتثال" },
      copyright: "© 2024 أنظمة وكيل.",
      made: "هندست للأداء"
    }
  },
  // Keep other languages structurally similar...
  fr: {
      nav: { solutions: "Solutions", showcase: "Plateforme", cta: "Essai Gratuit" },
      hero: {
        badge: "Système de Production",
        title: "Déployez des Travailleurs Autonomes.",
        subtitle: "Réduisez les frais généraux de 70%. Déployez des agents IA persistants qui apprennent votre activité, exécutent des flux de travail et évoluent à l'infini.",
        placeholder_name: "Nom",
        placeholder_company: "Société",
        placeholder_email: "Email Pro",
        btn_join: "Initialiser",
        footer_text: "Confiance de +200 entreprises",
        privacy: "Données cryptées (AES-256).",
        no_card: "Licence 14 Jours",
        success: { title: "Accès Accordé", desc: "Vérifiez votre email." }
      },
      dashboard: {
        welcome: "Noyau Entreprise",
        subtitle: "État Système: EN LIGNE | Intégrité Mémoire: 100%",
        agents_tab: "Unités Actives",
        create_tab: "Provisionner",
        supervisor_tab: "Ruche Neurale",
        chat_tab: "Lien Direct",
        integrations_tab: "Base de Connaissances",
        logout: "Déconnexion",
        all_agents: "Unités",
        no_integrations: "Aucune donnée",
        add_new: "Nouvelle Unité",
        back: "Retour",
        integration_hub: "Banque de Mémoire",
        manage_sources: "Sources de données :",
        active_connections: "Connexions",
        add_source: "Ajouter Source",
        upload_docs: "Ingérer Docs",
        upload_desc: "OCR temps réel.",
        connect_whatsapp: "WhatsApp API",
        whatsapp_desc: "Connexion réelle.",
        connect_gmail: "Gmail / Outlook",
        gmail_desc: "Lecture/Écriture.",
        connect_db: "SQL / API",
        db_desc: "Base de données externe.",
        deploy: "Initialiser",
        agent_name: "Désignation",
        agent_role: "Fonction",
        system_prompt: "Directive",
        online: "ACTIF",
        type_message: "Ordre...",
        bulk_campaign: "Campagne",
        launch_campaign: "Exécuter",
        recipient_list: "Cibles",
        subject: "Sujet",
        body: "Corps",
        cancel: "Annuler",
        close: "Fermer",
        templates_title: "Modèles",
        templates_subtitle: "Expertise pré-chargée.",
        template_sales: "Ventes",
        template_sales_desc: "Négociation.",
        template_support: "Support",
        template_support_desc: "Résolution technique.",
        template_hr: "RH",
        template_hr_desc: "Recrutement.",
        template_accounting: "Compta",
        template_accounting_desc: "Audit.",
        quick_task: "Vocal",
        assign_task: "Diffuser",
        broadcast_placeholder: "Commande globale...",
        agent_status: { idle: "Veille", working: "Traitement", waiting: "Analyse" },
        metrics: {
            money_saved: "Économies",
            hours_saved: "Heures Gagnées",
            human_equivalent: "Score Remplacement"
        },
        autopilot: "AUTONOME",
        knowledge_placeholder: "Collez vos politiques ici..."
      },
      // ... keep existing sections ...
      howItWorks: { title: "Déploiement", subtitle: "Données réelles.", steps: [] },
      testimonials: { title: "Clients", subtitle: "Succès réels.", items: [] },
      productShowcase: { title: "En Action", subtitle: "Temps réel.", simulation: { input_label: "Log", input_text: "run", processing: [], output_label: "Res", output_json: { status: "OK", latency: "10ms", data: { revenue: "1M", growth: "10%", insight: "Good", action: "Save" } } } },
      features: { badge: "Fonctions", title: "OS Entreprise", subtitle: "Complet.", cta_banner: { title: "Go", btn: "Start" }, cards: { support: {}, docs: {}, content: {}, security: {}, agent: {} } },
      demo: { badge: "Live", title: "Studio", subtitle: "Test.", input_label: "In", output_label: "Out", placeholder: "...", processing: "...", generate: "Go", ready: "Ok", waiting: "...", copy: "Copy", inspire: "Idea", options: { post: "A", desc: "B", ad: "C" } },
      faq: { title: "FAQ", items: [] },
      pricing: { title: "Prix", subtitle: "Investir.", starter: { title: "Start", price: "499", desc: "", cta: "Buy", features: [] }, growth: { title: "Biz", price: "1299", desc: "", cta: "Buy", features: [] }, enterprise: { title: "Corp", price: "Cust", desc: "", cta: "Contact", features: [] }, guarantee: [] },
      footer: { desc: "OS.", sections: { product: "Prod", company: "Cie", legal: "Leg" }, copyright: "©", made: "Made" }
  },
  es: {
      nav: { solutions: "Soluciones", showcase: "Plataforma", cta: "Prueba Gratis" },
      hero: { badge: "Sistema Real", title: "Fuerza Laboral Digital Autónoma.", subtitle: "Reduzca los gastos generales en un 70%. Implemente agentes de IA persistentes que aprendan su negocio.", placeholder_name: "Nombre", placeholder_company: "Empresa", placeholder_email: "Email", btn_join: "Iniciar", footer_text: "Confianza", privacy: "Datos seguros.", no_card: "Licencia 14 Días", success: { title: "Éxito", desc: "Verifica email." } },
      dashboard: { welcome: "Núcleo", subtitle: "Online", agents_tab: "Unidades", create_tab: "Crear", supervisor_tab: "Colmena", chat_tab: "Chat", integrations_tab: "Conocimiento", logout: "Salir", all_agents: "Agentes", no_integrations: "Vacío", add_new: "Nuevo", back: "Atrás", integration_hub: "Banco Memoria", manage_sources: "Fuentes", active_connections: "Activos", add_source: "Añadir", upload_docs: "Subir Docs", upload_desc: "OCR real.", connect_whatsapp: "WhatsApp", whatsapp_desc: "Real.", connect_gmail: "Gmail", gmail_desc: "Real.", connect_db: "SQL", db_desc: "Real.", deploy: "Inicializar", agent_name: "Nombre", agent_role: "Rol", system_prompt: "Prompt", online: "ACTIVO", type_message: "Mensaje...", bulk_campaign: "Campaña", launch_campaign: "Ejecutar", recipient_list: "Lista", subject: "Asunto", body: "Cuerpo", cancel: "Cancelar", close: "Cerrar", templates_title: "Plantillas", templates_subtitle: "Expertos.", template_sales: "Ventas", template_sales_desc: "Negociar.", template_support: "Soporte", template_support_desc: "Técnico.", template_hr: "RRHH", template_hr_desc: "Reclutar.", template_accounting: "Conta", template_accounting_desc: "Audit.", quick_task: "Voz", assign_task: "Difundir", broadcast_placeholder: "Comando...", agent_status: { idle: "Espera", working: "Trabajo", waiting: "Análisis" }, metrics: { money_saved: "Ahorro", hours_saved: "Horas", human_equivalent: "FTE" }, autopilot: "AUTO", knowledge_placeholder: "Pega políticas..." },
      howItWorks: { title: "Pasos", subtitle: "Real.", steps: [] },
      testimonials: { title: "Testimonios", subtitle: "Real.", items: [] },
      productShowcase: { title: "En Acción", subtitle: "Real.", simulation: { input_label: "Log", input_text: "run", processing: [], output_label: "Res", output_json: { status: "OK", latency: "10ms", data: { revenue: "1M", growth: "10%", insight: "Good", action: "Save" } } } },
      features: { badge: "Funciones", title: "OS", subtitle: "Completo.", cta_banner: { title: "Go", btn: "Start" }, cards: { support: {}, docs: {}, content: {}, security: {}, agent: {} } },
      demo: { badge: "Live", title: "Studio", subtitle: "Test.", input_label: "In", output_label: "Out", placeholder: "...", processing: "...", generate: "Go", ready: "Ok", waiting: "...", copy: "Copy", inspire: "Idea", options: { post: "A", desc: "B", ad: "C" } },
      faq: { title: "FAQ", items: [] },
      pricing: { title: "Precios", subtitle: "Invertir.", starter: { title: "Start", price: "499", desc: "", cta: "Buy", features: [] }, growth: { title: "Biz", price: "1299", desc: "", cta: "Buy", features: [] }, enterprise: { title: "Corp", price: "Cust", desc: "", cta: "Contact", features: [] }, guarantee: [] },
      footer: { desc: "OS.", sections: { product: "Prod", company: "Cie", legal: "Leg" }, copyright: "©", made: "Made" }
  },
  de: {
      nav: { solutions: "Lösungen", showcase: "Plattform", cta: "Starten" },
      hero: { badge: "Produktiv", title: "Autonome digitale Belegschaft.", subtitle: "Neural OS.", placeholder_name: "Name", placeholder_company: "Firma", placeholder_email: "Email", btn_join: "Starten", footer_text: "Vertrauen", privacy: "Sicher.", no_card: "Lizenz 14 Tage", success: { title: "Erfolg", desc: "Email prüfen." } },
      dashboard: { welcome: "Kern", subtitle: "Online", agents_tab: "Einheiten", create_tab: "Erstellen", supervisor_tab: "Hive", chat_tab: "Chat", integrations_tab: "Wissen", logout: "Logout", all_agents: "Agenten", no_integrations: "Leer", add_new: "Neu", back: "Zurück", integration_hub: "Speicher", manage_sources: "Quellen", active_connections: "Aktiv", add_source: "Neu", upload_docs: "Doks", upload_desc: "Echt.", connect_whatsapp: "WhatsApp", whatsapp_desc: "Echt.", connect_gmail: "Gmail", gmail_desc: "Echt.", connect_db: "SQL", db_desc: "Echt.", deploy: "Start", agent_name: "Name", agent_role: "Rolle", system_prompt: "Prompt", online: "AKTIV", type_message: "Nachricht...", bulk_campaign: "Kampagne", launch_campaign: "Start", recipient_list: "Liste", subject: "Betreff", body: "Inhalt", cancel: "Abbruch", close: "Zu", templates_title: "Vorlagen", templates_subtitle: "Experten.", template_sales: "Vertrieb", template_sales_desc: "Verkauf.", template_support: "Support", template_support_desc: "Technik.", template_hr: "HR", template_hr_desc: "Personal.", template_accounting: "FiBu", template_accounting_desc: "Audit.", quick_task: "Sprache", assign_task: "Senden", broadcast_placeholder: "Befehl...", agent_status: { idle: "Bereit", working: "Arbeit", waiting: "Warten" }, metrics: { money_saved: "Geld", hours_saved: "Stunden", human_equivalent: "FTE" }, autopilot: "AUTO", knowledge_placeholder: "Politik hier..." },
      howItWorks: { title: "Schritte", subtitle: "Echt.", steps: [] },
      testimonials: { title: "Kunden", subtitle: "Echt.", items: [] },
      productShowcase: { title: "Live", subtitle: "Echt.", simulation: { input_label: "Log", input_text: "run", processing: [], output_label: "Res", output_json: { status: "OK", latency: "10ms", data: { revenue: "1M", growth: "10%", insight: "Good", action: "Save" } } } },
      features: { badge: "Features", title: "OS", subtitle: "Komplett.", cta_banner: { title: "Los", btn: "Start" }, cards: { support: {}, docs: {}, content: {}, security: {}, agent: {} } },
      demo: { badge: "Live", title: "Studio", subtitle: "Test.", input_label: "In", output_label: "Out", placeholder: "...", processing: "...", generate: "Go", ready: "Ok", waiting: "...", copy: "Copy", inspire: "Idea", options: { post: "A", desc: "B", ad: "C" } },
      faq: { title: "FAQ", items: [] },
      pricing: { title: "Preise", subtitle: "Invest.", starter: { title: "Start", price: "499", desc: "", cta: "Buy", features: [] }, growth: { title: "Biz", price: "1299", desc: "", cta: "Buy", features: [] }, enterprise: { title: "Corp", price: "Cust", desc: "", cta: "Kontakt", features: [] }, guarantee: [] },
      footer: { desc: "OS.", sections: { product: "Prod", company: "Fa", legal: "Recht" }, copyright: "©", made: "Made" }
  }
};
