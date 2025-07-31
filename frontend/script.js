// تهيئة مكتبة AOS للحركات
AOS.init({
    duration: 800,
    once: true
});

// ===== Animated Petals Background =====
const canvas = document.getElementById('petals-canvas');
const ctx = canvas.getContext('2d');

if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let petals = [];
    const petalImage = new Image();
    petalImage.src = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50'><path d='M25,0 C40,10 40,30 25,50 C10,30 10,10 25,0' fill='%23${'D8A7B1'}'/></svg>`;

    class Petal {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height * 2 - canvas.height;
            this.w = 20 + Math.random() * 15;
            this.h = 20 + Math.random() * 10;
            this.opacity = this.w / 35;
            this.xSpeed = 1 + Math.random();
            this.ySpeed = 1 + Math.random() * 0.5;
            this.flip = Math.random();
            this.flipSpeed = Math.random() * 0.03;
        }

        draw() {
            if (this.y > canvas.height || this.x > canvas.width) {
                this.x = -this.w;
                this.y = Math.random() * canvas.height * 2 - canvas.height;
            }
            ctx.globalAlpha = this.opacity;
            ctx.drawImage(petalImage, this.x, this.y, this.w * (0.6 + (Math.sin(this.flip) / 3)), this.h * (0.8 + (Math.cos(this.flip) / 2)));
        }

        animate() {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.flip += this.flipSpeed;
            this.draw();
        }
    }

    function createPetals() {
        for (let i = 0; i < 30; i++) {
            petals.push(new Petal());
        }
    }

    function handleAnimation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(petal => petal.animate());
        requestAnimationFrame(handleAnimation);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    petalImage.onload = () => {
        createPetals();
        handleAnimation();
    };


// ===== Memories Modal Logic =====
const memories = [
    { id: 1, title: "أول مرة قولتيلي بحبك", date: "12 فبراير 2025 - 6:28 صباحاً", image: "memories/1.png", description: `مش عارف ابتدي منين , كنا متخانقين وقتها وكنت زعلان منك جدًا ,طلبتي تنامي وقتها بس معوزتكيش تنامي ..كان نفسي اخدك في حضني واضمك وننسي العالم كله بس خوفت تفتكريني ضعيف وهش ..لكن كلامك وقتها رغم انك حاولتي تداريها بكلام حواليها بس الكلمه دي غيرت كتير في قلبي ليكي بجد كان نفسي اقولك وقتها وانا كمان ..انا كمان بحبك بس وقتها مقدرتش اقولها لكن انا عاوز احيي الذكري دي تاني واقولك ..انا مش بس بحبك يا منار انتي كل كلي انتي حياتي انتي مراتي ومن زمان وانا ديما بخبي واحاول انكر شغفي ناحيتك لكن مقدار حبي ليكي مقدرش اني اقيسه او افهمه.` },
    { id: 2, title: "مفيش حاجه تقدر تقربلك", date: "10 فبراير 2025", image: "memories/2.png", description: "كانت اول مره تحسسيني اني الراجل بتاعك فعلا , كان وقتها بقولك متكلميش حمدي ..وانتي مأظهرتيش خوف او تردد وقولتيلي اني معك ومفيش حاجه هتقربلك ويا روحي انا فعلا بحميكي بدمي وبحياتي وروحي من وقت ماعرفتك وانا بخاف عليكي وبقلق حتي لو انتي كويسة وبخير .. اول مره حسيتك فعلا واثقة فيا .. شكرًاإنك قدرتي اني الراجل بتاعك يا زوجتي." },
    { id: 3, title: "لما وهبتيلي النور", date: "24 مارس 2025", image: "memories/3.png", description: "مقدرش اوصف انا حسيت ب ايه وقتها , لأني فعلًا اتصدمت..اتصدمت إنك مركزه معايا وعارفه انا زعلان من ايه ومتضايق وشايل جوايا ليه وقدرتي فعلا بكل حرف قولتيهولي إنك تديني امل جديد في الحياة , وصلتيلي وقتها رسالة مهمة جدًا إن اوقات مشاعرنا السلبية بتصغر حدود رؤيتنا جدًا ومش بنقدر نشوف الصورة علي حقيقتها ..خليتيني فعلًا ارجع افكر بأمل وطاقة إيجابية ناحية المجتمع تاني ..وقدرتي توصلي لقلبي وعقلي في نفس الوقت بالأرقام اللي قولتيهالي وكلامك اللي كان فيه وصف كبير عرفت فعلًا انك مراتي وانك بعدين هتقدري توصليلي وتساعديني مهما كنت فين .. عرفت انك ديمًا معايا يا منار!" },
    { id: 4, title: "اول مكالمه بيننا", date: "4 فبراير 2025", image: "memories/4.png", description: "كانت اول مرة نشوف فيلم مع بعض , انا حبيت اشوف ده بالذات معاكي لأني حسيتك شبه البطلة جدًا وكنت عاوز اقولك بشكل سري إني حابب اقضي اللي اتبقي من حياتي معاكي انتي وبس .. الفيلم اللي حسيت كل دقيقة بقضيها معاكي فيه إننا قاعدين جمب بعض.. كان نفسي احضنك واضمك ليا واحب فيكي كده بس كان عيبب وقتها .. بس وحشني الايام دي وانتي وحشتيني." },
    { id: 5, title: "انا مش توتو", date: "1 مارس 2025", image: "memories/5.png", description: "فاكره لما كنتي بتوريني فيديوهات ازاي بياكلو حاجات غريبه ومش مفهمومه.. كل ده عشان قولتلك إني بتسحر زبادي.. وفي الاخر طلعتي انتي اللي توتو في الأخر مش أنا , قال توتو قاللل .. هوريكي مين التوتو بعدين" },
    { id: 6, title: "أنا ديمًا معك", date: "1 مايو 2025", image: "memories/6.png", description: "أنا عايز اقولك يا حبيبتي اني ديمًا معاكي بغض النظر عن الظروف بغض النظر عن المسافات بغض النظر عن الناس والمواقف .. احنا خضنا رحلة طويلة سوا بس لسه كتير نعمله مع بعض.. لسه مشوفتش عيونك وهي بتبصلي ..لسه ملمستش ايدك وحسيت بيها .. لسه محضنتكيش .. لسه مبوستكيش من شفايفك وحسيت بدفاهم . لسه محطتش راسي علي صدرك وفضلتي تلعبي في شعري لحد مانام في حضنك , لكننا حسينا بعض في كل لحظه في كل ثانيه حتي لو انا مش فاتح فيها حتي لو محستنيش فيها , احنا ديمًا مع بعض وعاوز اقولك اني ديما بخاف عليكي زي مانتي بتخافي عليا ويمكن اكتر كمان , عاوزك تعبريلي بكل حاجه في قلبك ليا .. عاوز اسمعك مهما اتكلمتي انا بحبك وبحب صوتك وبحب تعبيرك ليا , متسبنيش لحظه ومتبعديش عني وديما ارجعيلي وخديني في حضنك وضميني لأن مليش وطن غير بين ضلوعك يا منار.. بحبك" }
];
let currentMemoryIndex = 0;

function showMemoryDetails(id) {
    const memory = memories.find(m => m.id === id);
    if (!memory) return;

    currentMemoryIndex = memories.findIndex(m => m.id === id);
    const modalContent = document.querySelector('.memory-modal-content');
    document.getElementById('modalTitle').textContent = memory.title;
    document.getElementById('modalDate').textContent = memory.date;
    document.getElementById('modalImage').src = memory.image;

    // Reset styles first
    modalContent.style.background = '';
    modalContent.style.animation = '';

    if (id === 6) {
        document.getElementById('modalDescription').innerHTML = `<div class='special-modal-message'>${memory.description}<div id="surpriseMessage" style="display:none;"></div></div>`;
        modalContent.style.background = 'linear-gradient(135deg, #fff7fa 0%, #f8bbd0 100%)';
        modalContent.style.animation = 'specialModalBg 4s infinite alternate';
        addFallingHeartsToModal();
        setTimeout(() => {
            const msg = document.getElementById('surpriseMessage');
            if (msg) {
                msg.innerHTML = '<div class="surprise-text">هناك وعد أبدي بيننا! 💍</div>';
                msg.style.display = 'block';
            }
        }, 2000);
    } else if (id === 1) {
        document.getElementById('modalDescription').innerHTML = `<div class='victorian-message'>${memory.description}</div>`;
    } else {
        document.getElementById('modalDescription').innerHTML = `<div class='default-message'>${memory.description}</div>`;
    }
    document.getElementById('memoryModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function addFallingHeartsToModal() {
    let oldHearts = document.querySelectorAll('.falling-heart');
    oldHearts.forEach(h => h.remove());
    const modal = document.querySelector('.memory-modal-content');
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = ['❤️', '💖', '💕', '💗', '💝'][Math.floor(Math.random() * 5)];
        heart.style.left = Math.random() * 90 + '%';
        heart.style.animationDuration = (2 + Math.random() * 2) + 's';
        heart.style.top = '-40px';
        modal.appendChild(heart);
    }
}

function closeMemoryModal() {
    document.getElementById('memoryModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigateMemory(direction) {
    currentMemoryIndex = (direction === 'next') 
        ? (currentMemoryIndex + 1) % memories.length 
        : (currentMemoryIndex - 1 + memories.length) % memories.length;
    showMemoryDetails(memories[currentMemoryIndex].id);
}

// ===== Floating Hearts =====
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    if (!container) return;
    const hearts = ['❤️', '💖', '💝', '💕', '💗'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

// ===== Diary Logic =====
const API_URL = 'http://localhost:4000/api/entries';
let currentUser = localStorage.getItem('chatUser');

async function saveDiaryEntry() {
    const diaryText = document.getElementById('diaryText').value.trim();
    if (!diaryText) {
        showNotification('الرجاء كتابة شيء في مذكراتك أولاً.');
        return;
    }
    if (!currentUser) {
        showNotification('الرجاء اختيار مستخدم أولاً!');
        return;
    }

    const newEntry = {
        text: diaryText,
        date: new Date().toLocaleDateString('ar-SA'),
        mood: getRandomMood(),
        name: currentUser
    };

    try {
        const res = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newEntry) });
        if (!res.ok) throw new Error('خطأ في حفظ المذكرة');
        const saved = await res.json();
        addEntryToPage(saved);
        showNotification('تم حفظ المذكرات بنجاح! 💖');
        document.getElementById('diaryText').value = '';
    } catch (err) {
        showNotification('تعذر الاتصال بالخادم');
        console.error(err);
    }
}

function addEntryToPage(entry) {
    const entriesList = document.getElementById('entriesList');
    if (!entriesList) return;
    const entryElement = document.createElement('div');
    entryElement.className = 'entry-item';
    entryElement.setAttribute('data-aos', 'fade-up');
    entryElement.innerHTML = `
        <div class="entry-content">
            <div class="entry-mood"><i class="fas ${entry.mood}"></i></div>
            <p>${entry.text}</p>
            <div class="entry-footer">
                <span class="entry-name">${entry.name}</span>
                <div class="entry-date"><i class="far fa-calendar-alt"></i> ${entry.date}</div>
            </div>
        </div>`;
    entriesList.insertBefore(entryElement, entriesList.firstChild);
}

async function loadEntries() {
    const entriesList = document.getElementById('entriesList');
    if (!entriesList) return;
    entriesList.innerHTML = '';
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch entries');
        const entries = await res.json();
        entries.forEach(addEntryToPage);
    } catch (err) {
        console.error(err);
        showNotification('تعذر جلب المذكرات');
    }
}

function toggleEntries() {
    const savedEntries = document.getElementById('savedEntries');
    const showBtn = document.querySelector('.show-entries-btn');
    if (savedEntries.style.display === 'none' || savedEntries.style.display === '') {
        savedEntries.style.display = 'block';
        showBtn.innerHTML = '<i class="fas fa-times"></i> إخفاء المذكرات';
        loadEntries();
    } else {
        savedEntries.style.display = 'none';
        showBtn.innerHTML = '<i class="fas fa-book-open"></i> عرض مذكراتنا';
    }
}

function getRandomMood() {
    const moods = ['fa-heart', 'fa-star', 'fa-moon', 'fa-sun', 'fa-cloud', 'fa-bell'];
    return moods[Math.floor(Math.random() * moods.length)];
}

// ===== Notifications =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== Main App Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    const userSelectionModal = document.getElementById('user-selection-modal');
    const chatToggleLink = document.getElementById('chat-toggle-link');
    const selectMohamed = document.getElementById('select-mohamed');
    const selectManar = document.getElementById('select-manar');

    // 1. User Selection Logic
    function selectUser(name) {
        if (userSelectionModal) userSelectionModal.style.display = 'none';
        localStorage.setItem('chatUser', name);
        currentUser = name;
        // Show chat button by removing hidden class
        if (chatToggleLink) chatToggleLink.classList.remove('hidden');
    }

    // Check if user is already selected
    if (localStorage.getItem('chatUser')) {
        currentUser = localStorage.getItem('chatUser');
        if (userSelectionModal) userSelectionModal.style.display = 'none';
        if (chatToggleLink) chatToggleLink.classList.remove('hidden');
    } else {
        if (userSelectionModal) userSelectionModal.style.display = 'flex';
        if (chatToggleLink) chatToggleLink.classList.add('hidden');
    }

    if (selectMohamed) selectMohamed.addEventListener('click', () => selectUser('محمد'));
    if (selectManar) selectManar.addEventListener('click', () => selectUser('منار'));

    // 2. Music Player
    if (musicToggle && backgroundMusic) {
        musicToggle.addEventListener('click', () => {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                backgroundMusic.pause();
                musicToggle.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }

    // 3. Initialize Animations & Diary
    createFloatingHearts();
    if (currentUser) {
        loadEntries();
    }

    // 4. Close memory modal on outside click
    const memoryModal = document.getElementById('memoryModal');
    if (memoryModal) {
        window.addEventListener('click', (event) => {
            if (event.target === memoryModal) {
                closeMemoryModal();
            }
        });
    }
});

// Global functions that need to be accessible outside DOMContentLoaded
function openImageLightbox() {
    const modalImg = document.getElementById('modalImage');
    const lightbox = document.getElementById('imageLightbox');
    if (modalImg && lightbox) {
        const lightboxImg = document.getElementById('lightboxImg');
        lightboxImg.src = modalImg.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageLightbox(event) {
    // أغلق فقط إذا كان الضغط خارج الصورة أو على زر الإغلاق
    if (!event || event.target === event.currentTarget || event.target.classList.contains('close-lightbox')) {
        document.getElementById('imageLightbox').classList.remove('active');
        document.body.style.overflow = '';
    }
}

// تهيئة الصفحة
window.onload = function() {
    const savedEntries = document.getElementById('savedEntries');
    savedEntries.style.display = 'none';
    AOS.init({
        duration: 800,
        once: true
    });
    if (backgroundMusic) {
        backgroundMusic.load();
        backgroundMusic.volume = 1;
    }
}}