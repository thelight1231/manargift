// Visual Novel Game Logic
let selectedCharacter = null;
let currentStoryIndex = 0;
let gameProgress = 0;

// Complex Story Data with Multiple Branches
const storyData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "الراوي",
        text: "في ليلة عاصفة، استيقظ محمد على صوت رسالة نصية غريبة من رقم مجهول: 'منار في خطر... إذا كنت تحبها حقاً، تعال إلى المستودع المهجور في الضواحي. لديك ساعة واحدة فقط.'",
        choices: [
            { text: "اذهب فوراً إلى المستودع", next: 2 },
            { text: "اتصل بالشرطة أولاً", next: 3 },
            { text: "حاول الاتصال بمنار", next: 4 }
        ]
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "محمد",
        text: "وصلت إلى المستودع المظلم. قلبي يخفق بقوة. أسمع أصواتاً غريبة من الداخل... هل هذا فخ؟ لكن إذا كانت منار حقاً في خطر...",
        choices: [
            { text: "ادخل من الباب الرئيسي", next: 5 },
            { text: "تسلل من النافذة الخلفية", next: 6 },
            { text: "ابحث عن طريق آخر", next: 7 }
        ]
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
        speaker: "الشرطي",
        text: "للأسف، لا يمكننا التحرك بناءً على رسالة مجهولة. نحتاج لأدلة أكثر. لكن يمكنك تقديم بلاغ رسمي...",
        choices: [
            { text: "اذهب للمستودع بنفسك", next: 2 },
            { text: "انتظر وحاول جمع أدلة", next: 8 },
            { text: "اطلب المساعدة من الأصدقاء", next: 9 }
        ]
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "محمد",
        text: "الهاتف يرن... لا إجابة. رسالة صوتية غريبة: 'محمد... ساعدني... لا أعرف أين أنا...' صوت منار مختنق بالخوف.",
        choices: [
            { text: "اذهب للمستودع فوراً", next: 2 },
            { text: "حاول تتبع مكان الهاتف", next: 10 },
            { text: "استمع للرسالة مرة أخرى", next: 11 }
        ]
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "محمد",
        text: "دخلت من الباب الرئيسي. المكان مظلم ومليء بالغبار. فجأة، أضواء قوية تنير المكان. صوت يصرخ: 'أخيراً وصلت!' أرى منار مربوطة على كرسي...",
        choices: [
            { text: "اندفع لإنقاذ منار", next: 12 },
            { text: "حاول التفاوض مع الخاطف", next: 13 },
            { text: "ابحث عن سلاح أو أداة", next: 14 }
        ]
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "محمد",
        text: "تسللت من النافذة الخلفية. أسمع أصوات محادثة... 'لقد تأخر كثيراً، ربما لن يأتي.' 'سيأتي، إنه يحبها.' أدرك أن هناك أكثر من شخص واحد.",
        choices: [
            { text: "استمع أكثر لجمع معلومات", next: 15 },
            { text: "حاول رؤية عدد الخاطفين", next: 16 },
            { text: "أرسل رسالة للشرطة بموقعك", next: 17 }
        ]
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
        speaker: "محمد",
        text: "وجدت مدخلاً سرياً في الجانب. يبدو أنه يؤدي إلى القبو. أسمع صوت منار تبكي من الأسفل... لكن قد يكون هذا فخاً أيضاً.",
        choices: [
            { text: "انزل للقبو", next: 18 },
            { text: "ابحث عن طريقة أخرى", next: 19 },
            { text: "اصرخ باسم منار", next: 20 }
        ]
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "محمد",
        text: "مرت 45 دقيقة... لا توجد أدلة جديدة. أتلقى رسالة أخرى: 'الوقت ينفد... إذا لم تأت في 15 دقيقة، ستفقدها إلى الأبد.'",
        choices: [
            { text: "اذهب للمستودع الآن", next: 21 },
            { text: "أرسل الرسالة للشرطة", next: 22 },
            { text: "حاول تتبع مصدر الرسائل", next: 23 }
        ]
    },
    {
        id: 12,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "الخاطف",
        text: "'توقف!' رجل ملثم يشير بمسدس. 'لقد جئت كما توقعت. الآن ستعرف الحقيقة عن منار... وعن نفسك.'",
        choices: [
            { text: "ما الحقيقة التي تتحدث عنها؟", next: 24 },
            { text: "أريد منار فقط، خذ ما تريد", next: 25 },
            { text: "من أنت؟ لماذا تفعل هذا؟", next: 26 }
        ]
    },
    {
        id: 24,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "الخاطف",
        text: "'منار ليست من تظن أنها. لقد كانت تكذب عليك طوال هذا الوقت. اسمها الحقيقي سارة، وهي مطلوبة للعدالة في قضية قتل.'",
        choices: [
            { text: "هذا مستحيل! أنت تكذب!", next: 27 },
            { text: "أريد أن أسمع منها بنفسي", next: 28 },
            { text: "حتى لو كان هذا صحيحاً، أحبها", next: 29 }
        ]
    },
    {
        id: 27,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "منار",
        text: "بصوت مختنق: 'محمد... أنا آسفة... كل شيء قاله صحيح. لم أرد أن تعرف بهذه الطريقة. أحببتك حقاً، لكن ماضي يطاردني.'",
        choices: [
            { text: "لا يهمني ماضيك، سنواجهه معاً", next: 30 },
            { text: "أحتاج لمعرفة الحقيقة كاملة", next: 31 },
            { text: "كيف يمكنني أن أثق بك بعد الآن؟", next: 32 }
        ]
    },
    {
        id: 30,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "الراوي",
        text: "قرر محمد أن الحب أقوى من الماضي. واجه الخاطف وأنقذ منار. اكتشف لاحقاً أنها كانت ضحية وليس مجرمة. بدأت حياة جديدة معاً، مبنية على الصدق والثقة.",
        choices: null
    },
    {
        id: 31,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "منار",
        text: "'قتلت رجلاً... لكنه كان يحاول الاعتداء علي. كان دفاعاً عن النفس، لكن لا أحد صدقني. هربت وغيرت هويتي. ثم قابلتك وأحببتك...'",
        choices: [
            { text: "سنواجه هذا معاً قانونياً", next: 33 },
            { text: "لماذا لم تخبريني من البداية؟", next: 34 },
            { text: "من هو هذا الرجل؟ لماذا يطاردك؟", next: 35 }
        ]
    },
    {
        id: 32,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "محمد",
        text: "الشك يأكل قلب محمد. يحررها لكنه يبتعد. سنوات تمر وهو يعيش في ندم، متسائلاً إن كان قد ترك الحب الحقيقي يفلت من يديه بسبب الخوف.",
        choices: null
    },
    {
        id: 33,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "الراوي",
        text: "قرر محمد ومنار مواجهة العدالة معاً. بعد سنوات من المحاكمات، ثبتت براءتها. بنيا حياة جديدة مبنية على الصدق والعدالة.",
        choices: null
    },
    {
        id: 34,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "منار",
        text: "'خفت أن تتركني. خفت من أن تنظر إلي كمجرمة. أردت أن أعيش حياة طبيعية معك، حتى لو لفترة قصيرة.'",
        choices: [
            { text: "أتفهم خوفك", next: 36 },
            { text: "لا يمكن بناء علاقة على الكذب", next: 37 }
        ]
    },
    {
        id: 35,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "منار",
        text: "'كان رجل أعمال فاسد. ابن عمي الذي حاول الاعتداء علي بعد وفاة والدي. له نفوذ وأموال. لذلك لم يصدقني أحد.'",
        choices: [
            { text: "سنعيد فتح القضية", next: 38 },
            { text: "لماذا لم تطلبي المساعدة؟", next: 39 }
        ]
    },
    // مسار منار المنفصل
    {
        id: 100,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "الراوي",
        text: "منار تعيش في شقة صغيرة تحت هوية مزيفة. كل يوم تعيش في خوف من اكتشاف ماضيها. لكن اليوم وصلت رسالة مريبة...",
        choices: [
            { text: "اقرأ الرسالة", next: 101 },
            { text: "تجاهل الرسالة", next: 102 },
            { text: "اتصل بمحمد", next: 103 }
        ]
    },
    {
        id: 101,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "مجهول",
        text: "'عرفت من أنت يا سارة. عرفت ما فعلتي بعمي. إما أن تأتي إلي أو سأخبر محمد بكل شيء.'",
        choices: [
            { text: "اذهب للقاء المجهول", next: 104 },
            { text: "اخبر محمد بالحقيقة", next: 105 },
            { text: "حاول الهرب من المدينة", next: 106 }
        ]
    },
    {
        id: 104,
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
        speaker: "المجهول",
        text: "'أنا ابن عم الرجل الذي قتلتيه. لقد عرفت الحقيقة... أنه كان مجرماً حقاً. أريد مساعدتك في فضحه.'",
        choices: [
            { text: "اقبل المساعدة", next: 107 },
            { text: "ارفض واهرب", next: 108 }
        ]
    },
    {
        id: 107,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "الراوي",
        text: "بمساعدة ابن عم الضحية، تمكنت منار من فضح شبكة الفساد. عادت لهويتها الحقيقية وتزوجت من محمد في حفل علني.",
        choices: null
    },
    // باقي المسارات المتبقية
    {
        id: 9,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "الصديق",
        text: "'محمد، هذا خطير! لا تذهب وحدك. سأرافقك.' لكن في الطريق، تتعرضون لكمين ويفقد صديقك الوعي.",
        choices: [
            { text: "استمر للمستودع بمفردك", next: 21 },
            { text: "اطلب المساعدة الطبية", next: 40 }
        ]
    },
    {
        id: 10,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "محمد",
        text: "حاولت تتبع موقع الهاتف لكن الإشارة منقطعة. فجأة، رسالة جديدة: 'توقف عن البحث أو ستموت معها.'",
        choices: [
            { text: "اذهب للمستودع فوراً", next: 2 },
            { text: "اتصل بالشرطة وأظهر الرسائل", next: 41 }
        ]
    },
    {
        id: 15,
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
        speaker: "محمد",
        text: "سمعت حديثهم: 'هذه الفتاة قتلت عمي، لكن لا أحد يعرف أنه كان مجرماً.' 'سنجعلها تعترف أمام حبيبها.'",
        choices: [
            { text: "اقتحم المكان بقوة", next: 42 },
            { text: "انتظر اللحظة المناسبة", next: 43 }
        ]
    },
    {
        id: 18,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "محمد",
        text: "نزلت للقبو. وجدت منار مربوطة ومعصوبة العينين. لكن فجأة، سمعت أقداماً تنزل من الأعلى. إنه فخ!",
        choices: [
            { text: "حرر منار بسرعة", next: 44 },
            { text: "اختبئ وانتظر", next: 45 }
        ]
    },
    {
        id: 21,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "محمد",
        text: "وصلت متأخراً. المكان هادئ جداً. هل فات الأوان؟ فجأة، ضوء ينير وأرى منار جالسة على كرسي وحيدة.",
        choices: [
            { text: "اقترب منها بحذر", next: 46 },
            { text: "ناد عليها", next: 47 }
        ]
    },
    {
        id: 46,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "منار",
        text: "'محمد... لقد جئت. أعرف أنك تعرف الحقيقة الآن. لا أستحق حبك.' تبكي بمرارة.",
        choices: [
            { text: "أحبك رغم كل شيء", next: 48 },
            { text: "لماذا لم تخبريني؟", next: 49 }
        ]
    },
    {
        id: 48,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "الراوي",
        text: "قرر محمد أن الحب أهم من الماضي. ساعد منار في مواجهة مخاوفها وبنيا معاً مستقبلاً جديداً مبنياً على الصدق.",
        choices: null
    },
    {
        id: 102,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "الراوي",
        text: "تجاهلت منار الرسالة. لكن في اليوم التالي، ظهر المجهول في مكان عملها. اضطرت للهرب وترك محمد إلى الأبد.",
        choices: null
    },
    {
        id: 105,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "محمد",
        text: "بعد أن أخبرته منار بالحقيقة، وقف محمد بجانبها. قررا معاً مواجهة العدالة وإثبات براءتها. انتصر الحب على الخوف.",
        choices: null
    },
    // باقي المسارات المتبقية
    {
        id: 36,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "الراوي",
        text: "تفهم محمد خوف منار وقرر مساعدتها في مواجهة الماضي. بنيا علاقة أقوى مبنية على التفهم والدعم.",
        choices: null
    },
    {
        id: 37,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "محمد",
        text: "قرر محمد أن الثقة أهم من الحب. انفصلا بمرارة، لكن كلاهما تعلم درساً مهماً عن أهمية الصدق في العلاقات.",
        choices: null
    },
    {
        id: 40,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "الراوي",
        text: "بعد إسعاف صديقه، وصل محمد متأخراً للمستودع. وجد منار محررة لكن مصدومة. الخاطفون هربوا لكن الحب انتصر.",
        choices: null
    },
    {
        id: 42,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "الراوي",
        text: "اقتحم محمد المكان بشجاعة. في المعركة، تمكن من إنقاذ منار لكنه أصيب بجروح. الحب يستحق التضحية.",
        choices: null
    },
    {
        id: 44,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "الراوي",
        text: "حرر محمد منار بسرعة وهربا معاً قبل وصول الخاطفين. لاحقاً، اعترفت له بالحقيقة وقررا مواجهة المستقبل معاً.",
        choices: null
    },
    {
        id: 47,
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800",
        speaker: "منار",
        text: "'محمد! لا تقترب!' فجأة، يظهر الخاطف من الظلام. 'لقد جئت لتسمع الحقيقة عن حبيبتك.'",
        choices: [
            { text: "استمع للحقيقة", next: 24 },
            { text: "ارفض وحاول الهرب", next: 50 }
        ]
    },
    {
        id: 49,
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800",
        speaker: "منار",
        text: "'خفت من رد فعلك. خفت أن تنظر إلي بنظرة مختلفة. أردت أن أعيش في سعادة ولو لفترة قصيرة.'",
        choices: [
            { text: "أتفهم مشاعرك", next: 36 },
            { text: "لا يمكن بناء السعادة على الكذب", next: 37 }
        ]
    },
    {
        id: 103,
        image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800",
        speaker: "محمد",
        text: "'منار، أين أنت؟ أنا قلق عليك!' 'محمد... هناك أشياء لم أخبرك بها. أحتاج لرؤيتك.'",
        choices: [
            { text: "اذهب للقائها فوراً", next: 51 },
            { text: "اطلب منها التوضيح أولاً", next: 52 }
        ]
    },
    {
        id: 51,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
        speaker: "الراوي",
        text: "التقى محمح ومنار في مقهى هادئ. أخبرته بكل شيء بصدق. قرر محمد مساعدتها وبدأت رحلة جديدة معاً.",
        choices: null
    }
];

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing visual novel...');
    
    // DOM Elements
    const characterSelection = document.getElementById('character-selection');
    const storyScreen = document.getElementById('story-screen');
    const characterCards = document.querySelectorAll('.character-card');
    const startBtn = document.getElementById('start-story');
    const storyImage = document.getElementById('story-image');
    const speakerName = document.getElementById('speaker-name');
    const storyText = document.getElementById('story-text');
    const choicesContainer = document.getElementById('choices-container');
    const continueBtn = document.getElementById('continue-btn');
    const progressFill = document.getElementById('progress-fill');
    
    console.log('Elements found:', {
        characterSelection: !!characterSelection,
        storyScreen: !!storyScreen,
        characterCards: characterCards.length,
        startBtn: !!startBtn
    });

// Character Selection
characterCards.forEach(card => {
    card.addEventListener('click', () => {
        selectedCharacter = card.dataset.character;
        console.log('Selected character:', selectedCharacter);
        
        // Remove active class from all cards
        characterCards.forEach(c => c.classList.remove('active'));
        
        // Add active class to selected card
        card.classList.add('active');
        
        // Show start button
        startBtn.style.display = 'block';
        startBtn.disabled = false;
    });
});

// Start Story
startBtn.addEventListener('click', () => {
    console.log('Start button clicked, selected character:', selectedCharacter);
    if (selectedCharacter) {
        characterSelection.classList.remove('active');
        storyScreen.classList.add('active');
        
        // Load story based on character selection
        if (selectedCharacter === 'منار') {
            console.log('Loading منار story from id 100');
            loadStory(100); // منار's story starts at id 100
        } else {
            console.log('Loading محمد story from id 1');
            loadStory(1); // محمد's story starts at id 1
        }
    } else {
        console.log('No character selected');
    }
});

// Load Story Scene
function loadStory(storyId) {
    console.log('Loading story with ID:', storyId);
    const story = storyData.find(s => s.id === storyId);
    if (!story) {
        console.error('Story not found with ID:', storyId);
        return;
    }
    
    console.log('Story found:', story);
    currentStoryIndex = storyId;
    
    // Update UI
    storyImage.src = story.image;
    speakerName.textContent = story.speaker;
    storyText.textContent = story.text;
    
    // Update progress
    gameProgress = (storyId / storyData.length) * 100;
    progressFill.style.width = gameProgress + '%';
    
    // Handle choices
    choicesContainer.innerHTML = '';
    if (story.choices) {
        continueBtn.classList.add('hidden');
        story.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.onclick = () => loadStory(choice.next);
            choicesContainer.appendChild(btn);
        });
    } else {
        continueBtn.classList.remove('hidden');
    }
}

// Continue Button
continueBtn.addEventListener('click', () => {
    if (currentStoryIndex < storyData.length) {
        loadStory(currentStoryIndex + 1);
    } else {
        // End of story
        alert('انتهت القصة! شكراً لك على اللعب');
        window.location.href = 'index.html';
    }
});

// Navigation
document.getElementById('back-btn').addEventListener('click', () => {
    if (currentStoryIndex > 1) {
        loadStory(currentStoryIndex - 1);
    }
});

document.getElementById('menu-btn').addEventListener('click', () => {
    if (confirm('هل تريد العودة للقائمة الرئيسية؟')) {
        window.location.href = 'index.html';
    }
});
