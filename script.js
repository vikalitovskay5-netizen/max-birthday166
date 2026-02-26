// Данные для сайта
const reasons = [
    "ты всегда меня поддерживаешь ✨",
    "ты знаешь как заставить меня улыбнуться🐱",
    "за твою доброту, как у юи из K-On! 💕",
    "на тебя можно положиться 🌸",
    "за твои шутки (они самые лучшие) 🤪",
    "за то, как ты заботишься, даже на расстоянии 🥰",
    "ты научишь всему (даже игре в пабг) 🎸",
    "за то, что ты понимаешь меня без слов ✨",
    "проконсультируешь какой бобофон стоит брать 🌙",
    "за то, что ты просто есть в моей жизни 🌟"
];

// ПЕСНИ - с правильными названиями файлов!
const songsList = [
    { 
        title: "Slipknot - Danger Keep Away", 
        reason: "Она напоминает тебя из-за содержания текста и атмосферы песни 🎵",
        url: "dr.html/fuwafuwa.mp3"  // Измени на правильное название файла
    },
    { 
        title: "Slipknot - The Heretic Anthem", 
        reason: "тут понятно, у нас она даже в био стоит 🎵",
        url: "dr.html/dontsaylazy.mp3"
    },
    { 
        title: "Slipknot - Wait and Bleed", 
        reason: "ты как эта песня — сильный, но с нежностью внутри 🎵",
        url: "dr.html/astolfo.mp3"
    },
    { 
        title: "УННВ - Письма Убитого Челочека", 
        reason: "у меня в целом все их песни с тобой асоциируются ибо ты подсадил меня на эту группу 🎵",
        url: "dr.html/nothankyou.mp3"
    },
    { 
        title: "УННВ - Мётрвое седрце", 
        reason: "и я до сих пор переслушиваю их песни,с небольшой тоской по тебе 🎵",
        url: "dr.html/nekosong.mp3"
    }
];

const memoriesList = [
    { 
        place: "Место первой встречи", 
        memory: "чат в телеге,админ которого был ну немного конченным🍦"
    },
    { 
        place: "начало наших отношений", 
        memory: "11 агуста 🎀"
    },
    { 
        place: "☕ наше певрое мы (малыш делает первые шаги)", 
        memory: "то же 11 августа,гифка с вибратором) ☕"
    },
    { 
        place: "🌙 наши ночные разговоры", 
        memory: "это то что я никогда не смогу забыть✨"
    },
    { 
        place: "🐱 надеюсь что..", 
        memory: "мы проживем эту жизнь,любя,тут день от дня) 🐈"
    }
];

// Фоновые градиенты
const backgrounds = [
    { name: "K-On! Style", class: "bg-kon" },
    { name: "Astolfo Style", class: "bg-astolfo" },
    { name: "Cats Style", class: "bg-cats" },
    { name: "Sakura", class: "bg-sakura" },
    { name: "Night Sky", class: "bg-night" }
];

// Состояние приложения
let currentReasonIndex = 0;
let shownReasons = 0;
let heartCount = 0;
let currentBgIndex = 0;
let isMusicPlaying = false;
let currentSongIndex = 0;
let fallingInterval = null;
let wrongAttempts = 0; // Счетчик неправильных попыток

// Фраза для отгадывания
const targetPhrase = "МОЙ ОТЕЦ ДЕВСТВЕННИЦА";
const phraseWords = targetPhrase.split('');

// Запуск после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('✨ Аниме-сайт загрузился! ✨');
    
    // Получаем все элементы
    const startWindow = document.getElementById('startWindow');
    const mainContent = document.getElementById('mainContent');
    const openEnvelopeBtn = document.getElementById('openEnvelopeBtn');
    const congratsBtn = document.getElementById('congratsBtn');
    const congratsModal = document.getElementById('congratsModal');
    const closeModal = document.getElementById('closeModal');
    const jar = document.getElementById('jar');
    const cardsContainer = document.getElementById('cardsContainer');
    const dialogPopup = document.getElementById('dialogPopup');
    const continueBtn = document.getElementById('continueBtn');
    const moreReasonsBtn = document.getElementById('moreReasonsBtn');
    const songsSection = document.getElementById('songsSection');
    const songsGrid = document.getElementById('songsGrid');
    const voiceBtn = document.getElementById('voiceBtn');
    const voiceMessage = document.getElementById('voiceMessage');
    const memorySection = document.getElementById('memorySection');
    const memoryGrid = document.getElementById('memoryGrid');
    const finalSection = document.getElementById('finalSection');
    const psBtn = document.getElementById('psBtn');
    const psContent = document.getElementById('psContent');
    const hugBtn = document.getElementById('hugBtn');
    const hugMessage = document.getElementById('hugMessage');
    const gameSection = document.getElementById('gameSection');
    const lettersContainer = document.getElementById('lettersContainer');
    const phraseSlotsContainer = document.getElementById('phraseSlotsContainer');
    const checkPhraseBtn = document.getElementById('checkPhraseBtn');
    const winMessage = document.getElementById('winMessage');
    const secretInput = document.getElementById('secretInput');
    const checkSecretBtn = document.getElementById('checkSecretBtn');
    const secretMessage = document.getElementById('secretMessage');
    const themeToggle = document.getElementById('themeToggle');
    const backgroundLayer = document.getElementById('backgroundLayer');
    const heartCountSpan = document.getElementById('heartCount');
    const floatingCats = document.getElementById('floatingCats');
    const floatingElements = document.getElementById('floatingElements');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const nextSongBtn = document.getElementById('nextSongBtn');
    const currentSongTitle = document.getElementById('currentSongTitle');
    const musicPlayer = document.getElementById('musicPlayer');
    const audio = document.getElementById('bgMusic');

    // ========== 1. СТАРТОВЫЕ КНОПКИ ==========
    
    if (openEnvelopeBtn) {
        openEnvelopeBtn.addEventListener('click', function() {
            console.log('📩 Открываем конверт');
            startWindow.style.display = 'none';
            mainContent.classList.remove('hidden');
            startFallingHearts();
            createFloatingCats();
        });
    }

    if (congratsBtn) {
        congratsBtn.addEventListener('click', function() {
            console.log('🎉 Открываем поздравления');
            congratsModal.classList.add('show');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            congratsModal.classList.remove('show');
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === congratsModal) {
            congratsModal.classList.remove('show');
        }
    });

    // ========== 2. БАНОЧКА С ПРИЧИНАМИ ==========
    
    if (jar) {
        jar.addEventListener('click', function() {
            console.log('🏺 Кликнули по баночке');
            
            if (currentReasonIndex < reasons.length) {
                createReasonCard(reasons[currentReasonIndex]);
                currentReasonIndex++;
                shownReasons++;
                addHeart(1);
                
                if (shownReasons === 4) {
                    setTimeout(function() {
                        dialogPopup.classList.remove('hidden');
                    }, 500);
                }
            } else {
                jar.style.animation = 'shake 0.3s';
                setTimeout(function() {
                    jar.style.animation = '';
                    alert('✨ все причины закончились! ты самый лучший! ✨');
                }, 300);
            }
        });
    }

    function createReasonCard(text) {
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.textContent = text;
        
        const randomX = Math.floor(Math.random() * 200);
        const randomY = Math.floor(Math.random() * 200);
        card.style.left = randomX + 'px';
        card.style.top = randomY + 'px';
        
        card.setAttribute('draggable', 'true');
        
        card.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', null);
            this.classList.add('dragging');
        });
        
        card.addEventListener('dragend', function(e) {
            this.classList.remove('dragging');
            const rect = cardsContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - 75;
            const y = e.clientY - rect.top - 50;
            
            const maxX = Math.max(0, rect.width - 200);
            const maxY = Math.max(0, rect.height - 100);
            
            this.style.left = Math.min(maxX, Math.max(0, x)) + 'px';
            this.style.top = Math.min(maxY, Math.max(0, y)) + 'px';
        });
        
        cardsContainer.appendChild(card);
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, 10);
    }

    // ========== 3. ДИАЛОГОВЫЕ КНОПКИ ==========
    
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            console.log('👉 Нажали "Да да да!"');
            dialogPopup.classList.add('hidden');
            
            songsSection.classList.remove('hidden');
            voiceSection.classList.remove('hidden');
            memorySection.classList.remove('hidden');
            finalSection.classList.remove('hidden');
            gameSection.classList.remove('hidden');
            
            fillSongs();
            fillMemories();
            musicPlayer.classList.remove('hidden');
            addHeart(5);
        });
    }

    if (moreReasonsBtn) {
        moreReasonsBtn.addEventListener('click', function() {
            console.log('👉 Нажали "Ещё причины"');
            dialogPopup.classList.add('hidden');
            
            for (let i = 0; i < 3; i++) {
                if (currentReasonIndex < reasons.length) {
                    createReasonCard(reasons[currentReasonIndex]);
                    currentReasonIndex++;
                    shownReasons++;
                    addHeart(1);
                }
            }
        });
    }

    // ========== 4. ЗАПОЛНЕНИЕ ПЕСЕН ==========
    
    function fillSongs() {
        if (!songsGrid) return;
        
        songsGrid.innerHTML = '';
        songsList.forEach(function(song, index) {
            const card = document.createElement('div');
            card.className = 'song-card';
            card.innerHTML = `
                <div class="song-title">${song.title}</div>
                <div class="song-reason">${song.reason}</div>
                <button class="song-play-btn" data-index="${index}">🎵 Слушать</button>
            `;
            
            songsGrid.appendChild(card);
        });
    }

    // ========== 5. ЗАПОЛНЕНИЕ ВОСПОМИНАНИЙ ==========
    
    function fillMemories() {
        if (!memoryGrid) return;
        
        memoryGrid.innerHTML = '';
        memoriesList.forEach(function(item) {
            const card = document.createElement('div');
            card.className = 'memory-card';
            card.innerHTML = `
                <div class="place-name">${item.place}</div>
                <div class="place-memory hidden">${item.memory}</div>
            `;
            
            card.addEventListener('click', function() {
                const memory = this.querySelector('.place-memory');
                memory.classList.toggle('hidden');
                addHeart(1);
            });
            
            memoryGrid.appendChild(card);
        });
    }

    // ========== 6. ГОЛОСОВОЕ С ТВОИМ АУДИО ==========

// Создаем аудио элемент для голосового
const voiceAudio = document.createElement('audio');
voiceAudio.id = 'voiceAudio';
voiceAudio.src = 'dr.html/moj-golos.mp3'; 
document.body.appendChild(voiceAudio);
console.log("voiceBtn:", voiceBtn);
if (voiceBtn) {
    voiceBtn.addEventListener('click', function() {
        console.log('🎤 Воспроизводим голосовое сообщение');
        
        // Пытаемся воспроизвести
        voiceAudio.play()
            .then(() => {
                voiceMessage.classList.remove('hidden');
                voiceMessage.innerHTML = `
                    <span class="emoji-icon">💕</span>
                    <p>✨ Это я говорю тебе... ✨</p>
                    <div class="voice-wave">
                        <span></span><span></span><span></span><span></span>
                    </div>
                `;
                addHeart(2);
                
                // Анимация кнопки
                voiceBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    voiceBtn.style.transform = 'scale(1)';
                }, 200);
            })
            .catch(error => {
                console.log('❌ Ошибка:', error);
                showNotification('❌ Не могу найти файл с голосом');
                
                // Запасной вариант если нет файла
                voiceMessage.classList.remove('hidden');
                voiceMessage.innerHTML = `
                    <span class="emoji-icon">💕</span>
                    <p>Привет, мой хороший! С днём рождения! Очень скучаю и люблю! ❤️</p>
                `;
            });
    });
}

// Добавляем стили для визуализации звука
const voiceWaveStyle = document.createElement('style');
voiceWaveStyle.textContent = `
    .voice-wave {
        display: flex;
        align-items: center;
        gap: 5px;
        height: 30px;
        margin-top: 10px;
    }
    .voice-wave span {
        width: 5px;
        height: 100%;
        background: #ff6b6b;
        border-radius: 5px;
        animation: wave 1s ease-in-out infinite;
    }
    .voice-wave span:nth-child(2) { animation-delay: 0.1s; }
    .voice-wave span:nth-child(3) { animation-delay: 0.2s; }
    .voice-wave span:nth-child(4) { animation-delay: 0.3s; }
    @keyframes wave {
        0%, 100% { height: 10px; }
        50% { height: 30px; }
    }
`;
document.head.appendChild(voiceWaveStyle);

    // ========== 7. P.S., ОТКРЫТКА И ОБНИМАШКИ ==========

if (psBtn) {
    psBtn.addEventListener('click', function() {
        console.log('📝 Открыли P.S.');
        psContent.classList.toggle('hidden');
    });
}

// Создаем конверт для открытки
function createPostcard() {
    const postcard = document.createElement('div');
    postcard.className = 'postcard hidden';
    postcard.id = 'postcard';
    postcard.innerHTML = `
        <div class="postcard-content">
            <div class="postcard-front">
                <span class="emoji-icon large">💌</span>
                <h3>Виртуальная открытка</h3>
                <p>Нажми, чтобы открыть</p>
            </div>
            <div class="postcard-inside">
                <span class="emoji-icon">🌸</span>
                <p>с днём рождения, любимый!</p>
                <p>ты лучшее, что случилось со мной за эти несколько лет ✨</p>
                <p>я очень скучаю и жду нашей встречи!</p>
                <div class="postcard-actions">
                    <button class="action-btn hug-action">🤗 обнять</button>
                    <button class="action-btn kiss-action">💋 поцеловать</button>
                </div>
                <div class="action-feedback hidden"></div>
                <p class="signature">вкуся ❤️</p>
            </div>
        </div>
    `;
    
    finalSection.appendChild(postcard);
    
    // Открытие открытки
    const postcardFront = postcard.querySelector('.postcard-front');
    postcardFront.addEventListener('click', function() {
        postcard.classList.add('open');
        addHeart(2);
        showNotification('💌 открытка открыта!');
    });
    
    // Кнопка "Обнять"
    const hugAction = postcard.querySelector('.hug-action');
    hugAction.addEventListener('click', function() {
        const feedback = postcard.querySelector('.action-feedback');
        feedback.classList.remove('hidden');
        feedback.innerHTML = '🤗 объятия доставлены! ты чувствуешь тепло?';
        feedback.style.color = '#ff9f43';
        
        // Создаем летящие сердечки
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
        
        addHeart(3);
        showNotification('❤️ объятия отправлены!');
    });
    
    // Кнопка "Поцеловать"
    const kissAction = postcard.querySelector('.kiss-action');
    kissAction.addEventListener('click', function() {
        const feedback = postcard.querySelector('.action-feedback');
        feedback.classList.remove('hidden');
        feedback.innerHTML = '💋 поцелуйчик прилетел! *чмок*';
        feedback.style.color = '#ff6b6b';
        
        // Создаем летящие поцелуйчики
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const kiss = document.createElement('div');
                kiss.className = 'fall-item';
                kiss.innerHTML = '💋';
                kiss.style.left = Math.random() * 100 + '%';
                kiss.style.fontSize = '30px';
                kiss.style.animationDuration = '3s';
                floatingElements.appendChild(kiss);
                setTimeout(() => kiss.remove(), 3000);
            }, i * 100);
        }
        
        addHeart(3);
        showNotification('💋 поцелуй отправлен!');
    });
}

// Обновляем существующую кнопку "Обнять"
if (hugBtn) {
    hugBtn.addEventListener('click', function() {
        console.log('🤗 обнимашки!');
        hugMessage.classList.remove('hidden');
        addHeart(3);
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFloatingHeart();
            }, i * 100);
        }
        
        // Показываем открытку если ещё не открыта
        const postcard = document.getElementById('postcard');
        if (postcard) {
            postcard.classList.remove('hidden');
        } else {
            createPostcard();
        }
    });
}

// Создаем открытку при загрузке (скрытую)
setTimeout(() => {
    if (finalSection) {
        createPostcard();
    }
}, 1000);
    // ========== 8. СЕКРЕТНОЕ СЛОВО ==========
    
    if (checkSecretBtn) {
        checkSecretBtn.addEventListener('click', function() {
            const word = secretInput.value.trim().toUpperCase();
            console.log('🔐 Проверяем слово:', word);
            
            if (word === 'ЛЮБОВЬ' || word === 'LOVE') {
                secretMessage.classList.remove('hidden');
                addHeart(5);
                alert('💕 Правильно! Ты меня любишь! 💕');
            } else {
                alert('😊 Попробуй ещё! Подсказка: это слово о чувствах');
            }
        });
        
        secretInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkSecretBtn.click();
            }
        });
    }

    // ========== 9. МУЗЫКАЛЬНЫЙ ПЛЕЕР (iPhone версия) ==========

function playSong(index) {
    currentSongIndex = index;
    const song = songsList[index];
    
    if (currentSongTitle) {
        currentSongTitle.textContent = song.title;
    }
    
    if (audio) {
        audio.src = song.url;
        audio.load(); // Важно для iPhone: принудительная загрузка
        
        // Для iPhone нужно явное разрешение пользователя
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('🎵 Музыка играет:', song.title);
                    isMusicPlaying = true;
                    if (playPauseBtn) playPauseBtn.textContent = '⏸️';
                    showNotification(`🎵 Играет: ${song.title}`);
                })
                .catch(error => {
                    console.log('❌ Ошибка iPhone:', error);
                    
                    // Понятное сообщение для iPhone
                    showNotification('📱 Нажми на кнопку "Слушать" ещё раз');
                    
                    // Создаём кнопку для явного разрешения (если нужно)
                    if (!document.getElementById('iphone-fix-btn')) {
                        const fixBtn = document.createElement('button');
                        fixBtn.id = 'iphone-fix-btn';
                        fixBtn.innerHTML = '🔊 Разрешить звук';
                        fixBtn.style.cssText = `
                            background: #ff6b6b;
                            color: white;
                            border: none;
                            padding: 15px 30px;
                            border-radius: 50px;
                            font-size: 18px;
                            margin: 20px auto;
                            display: block;
                            cursor: pointer;
                            z-index: 10000;
                            border: 2px solid white;
                        `;
                        fixBtn.onclick = function() {
                            audio.play();
                            this.remove();
                            showNotification('🎵 Звук разрешён!');
                        };
                        
                        // Добавляем кнопку после списка песен
                        const songsSection = document.querySelector('.songs-section');
                        if (songsSection) {
                            songsSection.appendChild(fixBtn);
                        }
                    }
                });
        }
    }
    
    addHeart(1);
}

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', function() {
        if (!audio) return;
        
        if (audio.paused) {
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        this.textContent = '⏸️';
                        isMusicPlaying = true;
                        showNotification('🎵 Музыка играет');
                    })
                    .catch(() => {
                        showNotification('📱 Нажми ещё раз');
                    });
            }
        } else {
            audio.pause();
            this.textContent = '▶️';
            isMusicPlaying = false;
            showNotification('🎵 Музыка на паузе');
        }
    });
}

if (nextSongBtn) {
    nextSongBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songsList.length;
        playSong(currentSongIndex);
    });
}

if (audio) {
    audio.addEventListener('ended', function() {
        currentSongIndex = (currentSongIndex + 1) % songsList.length;
        playSong(currentSongIndex);
    });
}

// Обработчик кликов на кнопки "Слушать" в песнях
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('song-play-btn')) {
        const index = e.target.dataset.index;
        if (index !== undefined) {
            playSong(parseInt(index));
        }
    }
});

    // ========== 10. СМЕНА ФОНА ==========
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            console.log('🌈 Меняем фон');
            currentBgIndex = (currentBgIndex + 1) % backgrounds.length;
            const bg = backgrounds[currentBgIndex];
            
            backgroundLayer.className = 'background-layer';
            backgroundLayer.classList.add(bg.class);
            
            showNotification(`Фон: ${bg.name}`);
            addHeart(1);
        });
    }

    // ========== 11. МИНИ-ИГРА (ИСПРАВЛЕННАЯ) ==========
    
    // Создание слотов для фразы
    function createPhraseSlots() {
        if (!phraseSlotsContainer) return;
        
        phraseSlotsContainer.innerHTML = '';
        for (let i = 0; i < phraseWords.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'phrase-slot';
            slot.dataset.index = i;
            slot.dataset.letter = phraseWords[i];
            
            // Drag & drop для слотов
            slot.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.style.borderColor = '#ff6b6b';
                this.style.transform = 'scale(1.1)';
            });
            
            slot.addEventListener('dragleave', function() {
                this.style.borderColor = 'rgba(255, 182, 193, 0.7)';
                this.style.transform = 'scale(1)';
            });
            
            slot.addEventListener('drop', function(e) {
                e.preventDefault();
                this.style.borderColor = 'rgba(255, 182, 193, 0.7)';
                this.style.transform = 'scale(1)';
                
                const draggedTile = document.querySelector('.letter-tile.dragging');
                const draggedSlot = document.querySelector('.phrase-slot.dragging');
                
                // Если перетаскиваем букву из контейнера букв
                if (draggedTile && !this.classList.contains('filled')) {
                    const letter = draggedTile.textContent;
                    this.textContent = letter;
                    this.classList.add('filled');
                    draggedTile.remove();
                }
                
                // Если перетаскиваем из другого слота (меняем местами)
                if (draggedSlot && draggedSlot !== this) {
                    const tempLetter = this.textContent;
                    this.textContent = draggedSlot.textContent;
                    draggedSlot.textContent = tempLetter;
                    
                    draggedSlot.classList.remove('dragging');
                }
                
                checkAllSlotsFilled();
            });
            
            // Добавляем возможность перетаскивать из слота
            slot.setAttribute('draggable', 'true');
            
            slot.addEventListener('dragstart', function(e) {
                if (this.classList.contains('filled')) {
                    e.dataTransfer.setData('text/plain', this.textContent);
                    this.classList.add('dragging');
                } else {
                    e.preventDefault();
                }
            });
            
            slot.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
            
            phraseSlotsContainer.appendChild(slot);
        }
        
        // Добавляем кнопку очистки
        const clearBtn = document.createElement('button');
        clearBtn.className = 'btn small-btn clear-btn';
        clearBtn.textContent = '🧹 Очистить всё';
        clearBtn.addEventListener('click', resetGame);
        phraseSlotsContainer.parentNode.appendChild(clearBtn);
    }

    // Сброс игры
    function resetGame() {
        const slots = document.querySelectorAll('.phrase-slot');
        slots.forEach(slot => {
            slot.textContent = '';
            slot.classList.remove('filled');
        });
        
        // Возвращаем буквы в контейнер
        lettersContainer.innerHTML = '';
        const shuffled = [...phraseWords].sort(() => Math.random() - 0.5);
        shuffled.forEach(letter => createLetterTile(letter));
        
        checkPhraseBtn.classList.add('hidden');
        wrongAttempts = 0;
    }

    // Создание буквы
    function createLetterTile(letter) {
        const tile = document.createElement('div');
        tile.className = 'letter-tile';
        tile.textContent = letter;
        tile.setAttribute('draggable', 'true');
        
        tile.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', letter);
            this.classList.add('dragging');
        });
        
        tile.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
        
        lettersContainer.appendChild(tile);
    }

    // Проверка заполненности слотов
    function checkAllSlotsFilled() {
        const slots = document.querySelectorAll('.phrase-slot');
        const filledSlots = document.querySelectorAll('.phrase-slot.filled');
        
        if (filledSlots.length === slots.length && checkPhraseBtn) {
            checkPhraseBtn.classList.remove('hidden');
        }
    }

    // Показать буквы
    function showLetters() {
        if (!lettersContainer) return;
        if (lettersContainer.children.length > 0) return;
        
        const shuffled = [...phraseWords].sort(() => Math.random() - 0.5);
        
        shuffled.forEach(function(letter) {
            createLetterTile(letter);
        });
        
        createPhraseSlots();
        showNotification('🎮 Буквы появились! Собери фразу!');
    }

    // Проверка фразы с подсказками
if (checkPhraseBtn) {
    checkPhraseBtn.addEventListener('click', function() {
        const slots = document.querySelectorAll('.phrase-slot');
        let correct = true;
        let correctCount = 0;
        
        // Сначала убираем все подсветки
        slots.forEach(function(slot) {
            slot.style.backgroundColor = '';
            slot.style.borderColor = 'rgba(255, 182, 193, 0.7)';
        });
        
        // Проверяем каждую букву
        slots.forEach(function(slot, index) {
            const userLetter = slot.textContent;
            const correctLetter = phraseWords[index];
            
            if (userLetter === correctLetter) {
                // Правильная буква - зеленая подсветка
                slot.style.backgroundColor = 'rgba(0, 255, 0, 0.2)';
                slot.style.borderColor = '#00ff00';
                correctCount++;
            } else {
                // Неправильная буква - красная подсветка
                slot.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                slot.style.borderColor = '#ff0000';
                correct = false;
            }
        });
        
        if (correct) {
            winMessage.classList.remove('hidden');
            addHeart(10);
            
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    createFloatingHeart();
                }, i * 100);
            }
            
            // Показываем поздравительное сообщение
            showNotification('🎉 ПОБЕДА! Ты собрал фразу! 🎉');
        } else {
            wrongAttempts++;
            
            // Подсказка после 3 неудачных попыток
            if (wrongAttempts === 3) {
                showHint();
            } else {
                alert(`😊 Неправильно! Правильных букв: ${correctCount} из ${phraseWords.length}. Попытка ${wrongAttempts}/3`);
            }
            
            // Подсвечиваем первую неправильную букву для подсказки
            if (wrongAttempts === 2) {
                showNotification('💡 Подсказка: первая буква "М"');
            }
        }
    });
}

// Функция для сброса подсветки
function resetHighlights() {
    const slots = document.querySelectorAll('.phrase-slot');
    slots.forEach(function(slot) {
        slot.style.backgroundColor = '';
        slot.style.borderColor = 'rgba(255, 182, 193, 0.7)';
    });
}

// Обновляем функцию сброса игры
function resetGame() {
    const slots = document.querySelectorAll('.phrase-slot');
    slots.forEach(slot => {
        slot.textContent = '';
        slot.classList.remove('filled');
        slot.style.backgroundColor = '';
        slot.style.borderColor = 'rgba(255, 182, 193, 0.7)';
    });
    
    // Возвращаем буквы в контейнер
    lettersContainer.innerHTML = '';
    const shuffled = [...phraseWords].sort(() => Math.random() - 0.5);
    shuffled.forEach(letter => createLetterTile(letter));
    
    checkPhraseBtn.classList.add('hidden');
    wrongAttempts = 0;
    winMessage.classList.add('hidden');
}

// Добавляем обработчик для кнопки очистки
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('clear-btn')) {
        resetGame();
        resetHighlights();
    }
});
                
                

    // ========== 12. СЧЕТЧИК СЕРДЕЧЕК ==========
    
    function addHeart(amount) {
        heartCount += amount;
        if (heartCount > 16) heartCount = 16;
        
        if (heartCountSpan) {
            heartCountSpan.textContent = `${heartCount}/16`;
        }
        
        console.log(`❤️ Сердечек: ${heartCount}/16`);
        
        if (heartCount === 16) {
            showLetters();
        }
    }

    // ========== 13. ПАДАЮЩИЕ СЕРДЕЧКИ ==========
    
    function startFallingHearts() {
        if (fallingInterval) clearInterval(fallingInterval);
        
        fallingInterval = setInterval(() => {
            createFallingHeart();
        }, 500);
    }
    
    function createFallingHeart() {
        if (!floatingElements) return;
        
        const heart = document.createElement('div');
        heart.className = 'fall-item';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        floatingElements.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
    
    function createFloatingHeart() {
        createFallingHeart();
    }

    // ========== 14. ПЛАВАЮЩИЕ КОТИКИ ==========
    
    function createFloatingCats() {
        if (!floatingCats) return;
        
        const catEmojis = ['🐱', '😺', '😸', '😻', '😽'];
        
        for (let i = 0; i < 5; i++) {
            const cat = document.createElement('div');
            cat.className = 'floating-cat-item';
            cat.innerHTML = catEmojis[Math.floor(Math.random() * catEmojis.length)];
            cat.style.fontSize = '2rem';
            
            cat.style.left = Math.random() * 90 + '%';
            cat.style.top = Math.random() * 90 + '%';
            cat.style.animationDelay = Math.random() * 10 + 's';
            cat.style.animationDuration = (Math.random() * 10 + 20) + 's';
            
            floatingCats.appendChild(cat);
        }
    }

    // ========== 15. УВЕДОМЛЕНИЯ ==========
    
    function showNotification(text) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            color: #ff6b6b;
            padding: 10px 20px;
            border-radius: 30px;
            border: 2px solid rgba(255, 255, 255, 0.5);
            z-index: 10000;
            font-weight: bold;
            animation: fadeIn 0.3s;
        `;
        notification.textContent = text;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // ========== 16. ДОБАВЛЯЕМ СТИЛИ ==========
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            to { opacity: 0; transform: translateY(-20px); }
        }
        
        .fall-item {
            position: fixed;
            top: -50px;
            animation: fall linear forwards;
            pointer-events: none;
            z-index: 9999;
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
        
        .floating-cat-item {
            position: fixed;
            animation: floatAround linear infinite;
            pointer-events: none;
            z-index: -1;
            opacity: 0.5;
        }
        
        @keyframes floatAround {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(100px, 50px) rotate(5deg); }
            50% { transform: translate(200px, 0) rotate(0deg); }
            75% { transform: translate(100px, -50px) rotate(-5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        .letter-tile.dragging {
            opacity: 0.5;
            transform: scale(0.9);
        }
        
        .phrase-slot {
            transition: all 0.3s;
            cursor: move;
        }
        
        .phrase-slot.dragging {
            opacity: 0.5;
            transform: scale(0.9);
        }
        
        .phrase-slot.filled {
            border: 3px solid #ff6b6b;
            background: rgba(255, 107, 107, 0.2);
        }
        
        .clear-btn {
            margin-top: 1rem;
            background: rgba(255, 107, 107, 0.3);
            color: white;
            border: 2px solid white;
        }
        
        .clear-btn:hover {
            background: rgba(255, 107, 107, 0.5);
        }
        
        .hint-message {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);

    console.log('✨ Сайт полностью загружен и готов! ✨');

});



