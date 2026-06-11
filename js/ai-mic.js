/**
 * AqiNode AI Support Bot - Global Component
 * Handles auto-injection, chat persistence, AI communication, STT, and TTS.
 */

(function() {
    const STORAGE_KEY = "aqinode_chat_v1";
    const API_ENDPOINT = 'https://aqinode-support-bot.onrender.com/chat.php';

    const ICONS = {
        message: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>`,
        close: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
        bin: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,
        send: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,
        mic: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>`,
        speaker: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>`,
        copy: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`,
        cancel: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`
    };

    function init() {
        injectHTML();
        injectStyles();

        const chatToggle    = document.getElementById('chat-toggle');
        const chatContainer = document.getElementById('chat-container');
        const chatMessages  = document.getElementById('chat-messages');
        const userInput     = document.getElementById('user-input');
        const sendButton    = document.getElementById('send-button');
        const micButton     = document.getElementById('mic-button');
        const clearButton   = document.getElementById('chat-clear');
        const confirmModal  = document.getElementById('chat-confirm-modal');
        const confirmYes    = document.getElementById('chat-confirm-yes');
        const confirmNo     = document.getElementById('chat-confirm-no');
        const voiceOverlay  = document.getElementById('voice-overlay');
        const voiceTimer    = document.getElementById('voice-timer');
        const voiceCancel   = document.getElementById('voice-cancel-hint');

        let isOpen       = false;
        let isRecording  = false;
        let cancelRecord = false;
        let timerInterval = null;
        let timerSeconds  = 0;
        let startX        = 0;
        let chatHistory   = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

        // Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = null;

        if (SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event) => {
                if (cancelRecord) return;
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    transcript += event.results[i][0].transcript;
                }
                if (transcript.trim()) {
                    userInput.value = transcript.trim();
                }
            };

            recognition.onerror = (e) => {
                console.error('Speech error:', e.error);
                stopRecording(true);
            };

            recognition.onend = () => {
                if (isRecording && !cancelRecord) {
                    // Auto-restart if still holding (continuous fix for mobile)
                    try { recognition.start(); } catch(_) {}
                }
            };
        } else {
            micButton.style.display = 'none';
        }

        // Init
        chatToggle.innerHTML = ICONS.message;
        renderHistory();
        if (chatHistory.length === 0) {
            addMessage("Yo! I'm the AqiNode Support Assistant. How can I help you today?", 'bot', false);
        }

        // Chat toggle listeners
        chatToggle.onclick = (e) => { e.stopPropagation(); toggleChat(!isOpen); };
        chatContainer.onclick = (e) => e.stopPropagation();
        document.addEventListener('click', () => { if (isOpen) toggleChat(false); });

        // Send
        sendButton.onclick = sendMessage;
        userInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                const isMobile = window.matchMedia('(pointer: coarse)').matches;
                if (isMobile) return;
                if (!e.shiftKey) { e.preventDefault(); sendMessage(); }
            }
        };

        // Clear
        clearButton.onclick = (e) => { e.stopPropagation(); showConfirmModal(); };
        confirmNo.onclick  = hideConfirmModal;
        confirmYes.onclick = () => { clearChat(); hideConfirmModal(); };

        // ── Mic: Hold to Record (mouse + touch) ──────────────────────────

        function startRecording(x) {
            if (!recognition || isRecording) return;
            isRecording  = true;
            cancelRecord = false;
            startX       = x;
            timerSeconds = 0;

            micButton.classList.add('recording');
            voiceOverlay.classList.add('active');
            updateTimer();
            timerInterval = setInterval(updateTimer, 1000);

            try { recognition.start(); } catch(_) {}
        }

        function stopRecording(forceCancel = false) {
            if (!isRecording) return;
            isRecording = false;

            clearInterval(timerInterval);
            micButton.classList.remove('recording');
            voiceOverlay.classList.remove('active');
            voiceCancel.style.opacity = '1';
            voiceCancel.style.transform = 'translateX(0)';

            try { recognition.stop(); } catch(_) {}

            if (forceCancel || cancelRecord) {
                userInput.value = '';
            } else {
                if (userInput.value.trim()) sendMessage();
            }
            cancelRecord = false;
        }

        function updateTimer() {
            const m = String(Math.floor(timerSeconds / 60)).padStart(2, '0');
            const s = String(timerSeconds % 60).padStart(2, '0');
            voiceTimer.textContent = `${m}:${s}`;
            timerSeconds++;
        }

        function checkSlideCancel(currentX) {
            const diff = startX - currentX;
            if (diff > 80) {
                // Sliding left — show cancel feedback
                const ratio = Math.min((diff - 80) / 60, 1);
                voiceCancel.style.opacity = String(1 - ratio * 0.4);
                voiceCancel.style.transform = `translateX(-${diff - 80}px)`;
            }
            if (diff > 140) {
                cancelRecord = true;
                stopRecording(true);
            }
        }

        // Mouse events
        micButton.addEventListener('mousedown', (e) => { e.preventDefault(); startRecording(e.clientX); });
        document.addEventListener('mouseup',   ()  => { if (isRecording) stopRecording(); });
        document.addEventListener('mousemove', (e) => { if (isRecording) checkSlideCancel(e.clientX); });

        // Touch events
        micButton.addEventListener('touchstart', (e) => { e.preventDefault(); startRecording(e.touches[0].clientX); }, { passive: false });
        document.addEventListener('touchend',    ()  => { if (isRecording) stopRecording(); });
        document.addEventListener('touchmove',   (e) => { if (isRecording) checkSlideCancel(e.touches[0].clientX); }, { passive: true });

        // ── Core Functions ────────────────────────────────────────────────

        function toggleChat(state) {
            isOpen = state;
            chatContainer.classList.toggle('active', isOpen);
            chatToggle.innerHTML = isOpen ? ICONS.close : ICONS.message;
            if (isOpen) {
                userInput.focus();
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        }

        function renderHistory() {
            chatMessages.innerHTML = "";
            chatHistory.forEach(m => {
                const msgEl = createMessageElement(m.text, m.sender);
                chatMessages.appendChild(msgEl);
            });
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function createMessageElement(text, sender) {
            const wrap = document.createElement("div");
            wrap.classList.add("message-wrapper", sender === "user" ? "user-wrap" : "bot-wrap");

            const div = document.createElement("div");
            div.classList.add("message", sender === "user" ? "user-message" : "bot-message");
            div.textContent = text;
            wrap.appendChild(div);

            if (sender === "bot") {
                const tools = document.createElement("div");
                tools.classList.add("message-tools");

                const copyBtn = document.createElement("button");
                copyBtn.innerHTML = ICONS.copy;
                copyBtn.title = "Copy";
                copyBtn.onclick = () => {
                    navigator.clipboard.writeText(text);
                    copyBtn.style.color = "#4BB543";
                    setTimeout(() => copyBtn.style.color = "", 1000);
                };

                const speakBtn = document.createElement("button");
                speakBtn.innerHTML = ICONS.speaker;
                speakBtn.title = "Listen";
                speakBtn.onclick = () => speak(text);

                tools.appendChild(copyBtn);
                tools.appendChild(speakBtn);
                wrap.appendChild(tools);
            }

            return wrap;
        }

        function addMessage(text, sender, save = true) {
            const cleanText = text.replace(/\*/g, '');
            const msgEl = createMessageElement(cleanText, sender);
            chatMessages.appendChild(msgEl);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            if (save) {
                chatHistory.push({ text: cleanText, sender });
                localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
            }
        }

        async function sendMessage() {
            const text = userInput.value.trim();
            if (!text) return;

            addMessage(text, 'user');
            userInput.value = '';
            userInput.style.height = 'auto';

            const loadingDiv = document.createElement('div');
            loadingDiv.classList.add('message', 'bot-message', 'loading');
            loadingDiv.textContent = 'Typing...';
            const loadingWrap = document.createElement('div');
            loadingWrap.classList.add('message-wrapper', 'bot-wrap');
            loadingWrap.appendChild(loadingDiv);
            chatMessages.appendChild(loadingWrap);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            try {
                const response = await fetch(API_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: text,
                        history: chatHistory,
                        context: {
                            url: window.location.href,
                            pageTitle: document.title,
                            referrer: document.referrer,
                            language: navigator.language,
                            screen: `${window.screen.width}x${window.screen.height}`,
                            theme: document.documentElement.dataset.theme || 'light',
                            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                            timestamp: new Date().toISOString(),
                            metaDescription: document.querySelector('meta[name="description"]')?.content || "",
                            metaKeywords: document.querySelector('meta[name="keywords"]')?.content || ""
                        }
                    })
                });

                const data = await response.json();
                if (chatMessages.contains(loadingWrap)) chatMessages.removeChild(loadingWrap);
                if (data.error) {
                    addMessage('Error: ' + data.error, 'bot');
                } else {
                    addMessage(data.response, 'bot');
                }
            } catch (error) {
                if (chatMessages.contains(loadingWrap)) chatMessages.removeChild(loadingWrap);
                addMessage('Error: Could not connect to the server.', 'bot');
            }
        }

        function speak(text) {
            if (!window.speechSynthesis) return;
            window.speechSynthesis.cancel();
            const phoneticText = text.replace(/AqiNode/gi, 'AkiNode');
            const utterance = new SpeechSynthesisUtterance(phoneticText);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            window.speechSynthesis.speak(utterance);
        }

        function clearChat() {
            chatHistory = [];
            localStorage.removeItem(STORAGE_KEY);
            chatMessages.innerHTML = "";
            addMessage("Yo! I'm the AqiNode Support Assistant. How can I help you today?", 'bot', false);
        }

        function showConfirmModal() {
            confirmModal.style.display = 'flex';
            setTimeout(() => confirmModal.classList.add('active'), 10);
        }

        function hideConfirmModal() {
            confirmModal.classList.remove('active');
            setTimeout(() => confirmModal.style.display = 'none', 300);
        }
    }

    function injectHTML() {
        if (document.getElementById('chat-container')) return;

        const html = `
            <div id="chat-toggle"></div>
            <div id="chat-container">
                <div id="chat-header">
                    <span>AqiNode Support</span>
                    <button id="chat-clear" title="Clear Chat">${ICONS.bin}</button>
                </div>
                <div id="chat-messages"></div>

                <!-- Voice recording overlay (WhatsApp-style) -->
                <div id="voice-overlay">
                    <div id="voice-pulse"></div>
                    <span id="voice-timer">00:00</span>
                    <span id="voice-cancel-hint">&#8592; Slide to cancel</span>
                </div>

                <div id="chat-input-area">
                    <textarea id="user-input" placeholder="Ask something..." rows="1"></textarea>
                    <button id="mic-button" title="Hold to speak">${ICONS.mic}</button>
                    <button id="send-button" title="Send">${ICONS.send}</button>
                </div>
                <center><h6>AI CAN MAKE MISTAKES</h6></center>
                <div id="chat-confirm-modal">
                    <div class="chat-confirm-content">
                        <p>Clear all chat history?</p>
                        <div class="chat-confirm-btns">
                            <button id="chat-confirm-yes">Yes, Clear</button>
                            <button id="chat-confirm-no">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const div = document.createElement('div');
        div.innerHTML = html;
        while (div.children.length > 0) {
            document.body.appendChild(div.children[0]);
        }
    }

    function injectStyles() {
        if (document.getElementById('aqinode-voice-styles')) return;
        const style = document.createElement('style');
        style.id = 'aqinode-voice-styles';
        style.textContent = `
            #mic-button {
                user-select: none;
                -webkit-user-select: none;
                touch-action: none;
                transition: background 0.2s, transform 0.1s;
            }
            #mic-button.recording {
                background: #e53935 !important;
                transform: scale(1.15);
                color: #fff;
            }
            #voice-overlay {
                display: none;
                align-items: center;
                justify-content: center;
                gap: 12px;
                padding: 10px 16px;
                background: var(--input-bg, #1a1a2e);
                border-top: 1px solid var(--glass-border, rgba(255,255,255,0.1));
                position: relative;
                overflow: hidden;
            }
            #voice-overlay.active {
                display: flex;
            }
            #voice-pulse {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: #e53935;
                animation: voicePulse 1s ease-in-out infinite;
                flex-shrink: 0;
            }
            @keyframes voicePulse {
                0%, 100% { transform: scale(1);   opacity: 1;   box-shadow: 0 0 0 0 rgba(229,57,53,0.6); }
                50%       { transform: scale(1.3); opacity: 0.8; box-shadow: 0 0 0 8px rgba(229,57,53,0);  }
            }
            #voice-timer {
                font-size: 0.95rem;
                font-weight: 600;
                color: var(--chat-text, #fff);
                min-width: 42px;
                font-variant-numeric: tabular-nums;
            }
            #voice-cancel-hint {
                font-size: 0.8rem;
                color: var(--chat-text, #aaa);
                opacity: 0.7;
                margin-left: auto;
                transition: opacity 0.2s, transform 0.2s;
                white-space: nowrap;
            }
        `;
        document.head.appendChild(style);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();