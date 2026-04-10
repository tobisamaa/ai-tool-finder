// ============================================================
// CONVERSION OPTIMIZATION ENGINE v1.0
// AI Tool Finder - All interactive conversion components
// Works on static GitHub Pages - no server required
// ============================================================

(function() {
    'use strict';

    // ============================================================
    // 1. PRODUCT RECOMMENDATION QUIZ
    // ============================================================
    window.AffiliateQuiz = {
        currentStep: 0,
        answers: {},
        tools: [
            {
                name: 'Jasper AI',
                icon: '✍️',
                slug: 'jasper',
                price: '$39/mo',
                tagline: 'Best for long-form content & business writing',
                url: 'go/jasper/index.html',
                review: 'reviews/jasper-ai.html',
                categories: ['writing', 'content', 'marketing'],
                bestFor: ['business', 'professional'],
                budget: ['mid', 'high']
            },
            {
                name: 'Cursor AI',
                icon: '💻',
                slug: 'cursor',
                price: '$20/mo',
                tagline: 'Best AI code editor for developers',
                url: 'go/cursor/index.html',
                review: 'reviews/cursor.html',
                categories: ['coding', 'development'],
                bestFor: ['professional', 'business'],
                budget: ['low', 'mid']
            },
            {
                name: 'Semrush',
                icon: '📊',
                slug: 'semrush',
                price: '$129/mo',
                tagline: 'All-in-one SEO & digital marketing',
                url: 'go/semrush/index.html',
                review: 'reviews/semrush.html',
                categories: ['seo', 'marketing'],
                bestFor: ['business', 'professional'],
                budget: ['high']
            },
            {
                name: 'Copy.ai',
                icon: '📝',
                slug: 'copyai',
                price: 'Free / $49/mo',
                tagline: 'Quick marketing copy & social media',
                url: 'go/copyai/index.html',
                review: 'reviews/copyai.html',
                categories: ['writing', 'copywriting', 'marketing'],
                bestFor: ['beginner', 'professional'],
                budget: ['free', 'low', 'mid']
            },
            {
                name: 'Canva Pro',
                icon: '🎨',
                slug: 'canva',
                price: '$13/mo',
                tagline: 'AI-powered design for everyone',
                url: 'go/canva/index.html',
                review: 'reviews/canva.html',
                categories: ['design', 'marketing', 'video'],
                bestFor: ['beginner', 'professional', 'business'],
                budget: ['low', 'mid']
            },
            {
                name: 'Notion AI',
                icon: '📋',
                slug: 'notion',
                price: 'Free / $10/mo',
                tagline: 'AI workspace for notes & projects',
                url: 'go/notion/index.html',
                review: 'reviews/notion.html',
                categories: ['productivity', 'writing'],
                bestFor: ['beginner', 'professional', 'business'],
                budget: ['free', 'low']
            },
            {
                name: 'Hostinger',
                icon: '🌐',
                slug: 'hostinger',
                price: '$2.99/mo',
                tagline: 'AI website builder + hosting',
                url: 'go/hostinger/index.html',
                review: 'reviews/hostinger.html',
                categories: ['web', 'development'],
                bestFor: ['beginner', 'business'],
                budget: ['free', 'low']
            },
            {
                name: 'NordVPN',
                icon: '🔒',
                slug: 'nordvpn',
                price: '$3.39/mo',
                tagline: '#1 VPN for privacy & security',
                url: 'go/nordvpn/index.html',
                review: 'reviews/nordvpn.html',
                categories: ['security', 'productivity'],
                bestFor: ['beginner', 'professional', 'business'],
                budget: ['low']
            }
        ],

        questions: [
            {
                id: 'category',
                question: 'What do you need help with most?',
                options: [
                    { value: 'writing', icon: '✍️', text: 'Writing & Content', desc: 'Blog posts, copy, emails' },
                    { value: 'coding', icon: '💻', text: 'Coding & Development', desc: 'Code generation, debugging' },
                    { value: 'design', icon: '🎨', text: 'Design & Creativity', desc: 'Images, graphics, videos' },
                    { value: 'seo', icon: '📈', text: 'SEO & Marketing', desc: 'Rankings, analytics, ads' },
                    { value: 'productivity', icon: '📋', text: 'Productivity', desc: 'Notes, projects, workspace' },
                    { value: 'web', icon: '🌐', text: 'Website Building', desc: 'Create a website fast' }
                ]
            },
            {
                id: 'experience',
                question: 'What is your experience level?',
                options: [
                    { value: 'beginner', icon: '🌱', text: 'Beginner', desc: 'New to AI tools' },
                    { value: 'professional', icon: '⚡', text: 'Intermediate', desc: 'Used a few AI tools' },
                    { value: 'business', icon: '🏢', text: 'Business Owner', desc: 'Need tools for my team' }
                ]
            },
            {
                id: 'budget',
                question: 'What is your monthly budget?',
                options: [
                    { value: 'free', icon: '🆓', text: 'Free Only', desc: '$0 — I want free tools' },
                    { value: 'low', icon: '💰', text: 'Under $20/mo', desc: 'Budget-friendly options' },
                    { value: 'mid', icon: '💎', text: '$20-$50/mo', desc: 'Best value picks' },
                    { value: 'high', icon: '👑', text: '$50+/mo', desc: 'Premium tools only' }
                ]
            },
            {
                id: 'priority',
                question: 'What matters most to you?',
                options: [
                    { value: 'ease', icon: '🎯', text: 'Ease of Use', desc: 'Simple & intuitive' },
                    { value: 'features', icon: '🔧', text: 'Powerful Features', desc: 'Advanced capabilities' },
                    { value: 'value', icon: '💵', text: 'Best Value', desc: 'Most bang for buck' },
                    { value: 'support', icon: '🤝', text: 'Great Support', desc: 'Help when I need it' }
                ]
            }
        ],

        init: function(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            this.render();
        },

        render: function() {
            var html = '<div class="quiz-container">';
            html += '<h2>Find Your Perfect AI Tool</h2>';
            html += '<p class="quiz-subtitle">Answer 4 quick questions and get personalized recommendations</p>';

            // Progress bar
            html += '<div class="quiz-progress">';
            html += '<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quizProgressFill" style="width:0%"></div></div>';
            html += '<span class="quiz-progress-text" id="quizProgressText">0%</span>';
            html += '</div>';

            // Questions
            for (var i = 0; i < this.questions.length; i++) {
                var q = this.questions[i];
                html += '<div class="quiz-step' + (i === 0 ? ' active' : '') + '" data-step="' + i + '">';
                html += '<div class="quiz-question">' + q.question + '</div>';
                html += '<div class="quiz-options">';
                for (var j = 0; j < q.options.length; j++) {
                    var opt = q.options[j];
                    html += '<div class="quiz-option" data-question="' + q.id + '" data-value="' + opt.value + '" onclick="AffiliateQuiz.selectOption(this)">';
                    html += '<span class="quiz-option-icon">' + opt.icon + '</span>';
                    html += '<div class="quiz-option-text">' + opt.text + '<div class="quiz-option-desc">' + opt.desc + '</div></div>';
                    html += '</div>';
                }
                html += '</div>';
                html += '<div class="quiz-nav">';
                html += (i > 0 ? '<button class="quiz-btn quiz-btn-back" onclick="AffiliateQuiz.prevStep()">&#8592; Back</button>' : '<span></span>');
                html += '<button class="quiz-btn quiz-btn-next" onclick="AffiliateQuiz.nextStep()">' + (i === this.questions.length - 1 ? 'See Results &#8594;' : 'Next &#8594;') + '</button>';
                html += '</div>';
                html += '</div>';
            }

            // Results
            html += '<div class="quiz-results" id="quizResults"></div>';

            html += '</div>';
            this.container.innerHTML = html;
        },

        selectOption: function(el) {
            var siblings = el.parentElement.querySelectorAll('.quiz-option');
            for (var i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('selected');
            }
            el.classList.add('selected');
            this.answers[el.dataset.question] = el.dataset.value;
        },

        nextStep: function() {
            var q = this.questions[this.currentStep];
            if (!this.answers[q.id]) {
                // Highlight options to prompt selection
                var opts = document.querySelectorAll('[data-step="' + this.currentStep + '"] .quiz-option');
                opts.forEach(function(o) { o.style.animation = 'none'; o.offsetHeight; o.style.animation = 'pulse 0.5s'; });
                return;
            }
            if (this.currentStep < this.questions.length - 1) {
                var steps = document.querySelectorAll('.quiz-step');
                steps[this.currentStep].classList.remove('active');
                this.currentStep++;
                steps[this.currentStep].classList.add('active');
                this.updateProgress();
            } else {
                this.showResults();
            }
        },

        prevStep: function() {
            if (this.currentStep > 0) {
                var steps = document.querySelectorAll('.quiz-step');
                steps[this.currentStep].classList.remove('active');
                this.currentStep--;
                steps[this.currentStep].classList.add('active');
                this.updateProgress();
            }
        },

        updateProgress: function() {
            var pct = Math.round((this.currentStep / this.questions.length) * 100);
            var fill = document.getElementById('quizProgressFill');
            var text = document.getElementById('quizProgressText');
            if (fill) fill.style.width = pct + '%';
            if (text) text.textContent = pct + '%';
        },

        showResults: function() {
            // Score each tool
            var scored = this.tools.map(function(tool) {
                var score = 0;
                // Category match (most important)
                if (tool.categories.indexOf(AffiliateQuiz.answers.category) !== -1) score += 40;
                // Budget match
                if (tool.budget.indexOf(AffiliateQuiz.answers.budget) !== -1) score += 25;
                // Experience match
                if (tool.bestFor.indexOf(AffiliateQuiz.answers.experience) !== -1) score += 20;
                // Priority bonus (general boost for features/value)
                if (AffiliateQuiz.answers.priority === 'value' && tool.budget.indexOf('free') !== -1) score += 15;
                if (AffiliateQuiz.answers.priority === 'ease' && tool.bestFor.indexOf('beginner') !== -1) score += 15;
                return { tool: tool, score: score };
            });

            scored.sort(function(a, b) { return b.score - a.score; });
            var top = scored.slice(0, 3);

            var html = '<div class="quiz-results active">';
            html += '<div class="quiz-results-header">';
            html += '<h3>Your Top Matches</h3>';
            html += '<p>Based on your answers, here are the best tools for you</p>';
            html += '</div>';

            // Hide question steps
            document.querySelectorAll('.quiz-step').forEach(function(s) { s.style.display = 'none'; });
            document.querySelector('.quiz-progress').style.display = 'none';

            for (var i = 0; i < top.length; i++) {
                var t = top[i].tool;
                var matchPct = Math.min(99, Math.max(72, top[i].score + Math.floor(Math.random() * 8)));
                html += '<div class="quiz-result-card' + (i === 0 ? ' top-pick' : '') + '">';
                html += '<div class="quiz-result-rank">' + (i + 1) + '</div>';
                html += '<div class="quiz-result-info">';
                html += '<h4>' + t.icon + ' ' + t.name + '</h4>';
                html += '<p>' + t.tagline + '</p>';
                html += '<span class="quiz-result-match">' + matchPct + '% Match</span>';
                html += '<span style="margin-left:8px;font-size:14px;font-weight:700;color:var(--c-primary)">' + t.price + '</span>';
                html += '</div>';
                html += '<div class="quiz-result-cta">';
                html += '<a href="' + t.url + '" class="btn btn-primary" rel="nofollow sponsored" target="_blank">Get ' + t.name + ' →</a>';
                html += '<br><a href="' + t.review + '" style="font-size:13px;color:var(--c-text-light);text-decoration:none;margin-top:6px;display:inline-block">Read Review →</a>';
                html += '</div>';
                html += '</div>';
            }

            html += '<div class="quiz-restart">';
            html += '<button class="quiz-btn quiz-btn-back" onclick="AffiliateQuiz.restart()">↺ Retake Quiz</button>';
            html += '</div>';
            html += '</div>';

            var resultsEl = document.getElementById('quizResults');
            if (resultsEl) {
                resultsEl.innerHTML = html;
                resultsEl.style.display = 'block';
            }

            // Track quiz completion
            trackEvent('quiz_completed', { answers: this.answers, topPick: top[0].tool.name });
        },

        restart: function() {
            this.currentStep = 0;
            this.answers = {};
            this.render();
        }
    };

    // ============================================================
    // 2. COUNTDOWN / URGENCY TIMERS
    // ============================================================
    window.UrgencyTimer = {
        init: function() {
            this.initCountdownBar();
            this.initEvergreenTimers();
        },

        initCountdownBar: function() {
            var bar = document.getElementById('countdownBar');
            if (!bar) return;

            var endDate = new Date();
            endDate.setDate(endDate.getDate() + 3); // 3 days from now
            var endMs = endDate.getTime();

            // Store end date so it persists across page loads
            if (!localStorage.getItem('countdown_end')) {
                localStorage.setItem('countdown_end', endMs);
            }
            endMs = parseInt(localStorage.getItem('countdown_end'));

            // If expired, reset
            if (endMs < Date.now()) {
                var newEnd = new Date();
                newEnd.setDate(newEnd.getDate() + 3);
                endMs = newEnd.getTime();
                localStorage.setItem('countdown_end', endMs);
            }

            var self = this;
            function tick() {
                var now = Date.now();
                var diff = endMs - now;
                if (diff <= 0) {
                    bar.innerHTML = '<div class="container"><span>This deal has expired. Check our <a href="#deals" style="color:white;text-decoration:underline">current deals</a>.</span></div>';
                    return;
                }
                var d = Math.floor(diff / 86400000);
                var h = Math.floor((diff % 86400000) / 3600000);
                var m = Math.floor((diff % 3600000) / 60000);
                var s = Math.floor((diff % 60000) / 1000);

                var digitsEl = bar.querySelector('.countdown-digits');
                if (digitsEl) {
                    digitsEl.innerHTML =
                        '<span class="countdown-unit">' + self.pad(d) + '</span><span class="countdown-sep">:</span>' +
                        '<span class="countdown-unit">' + self.pad(h) + '</span><span class="countdown-sep">:</span>' +
                        '<span class="countdown-unit">' + self.pad(m) + '</span><span class="countdown-sep">:</span>' +
                        '<span class="countdown-unit">' + self.pad(s) + '</span>';
                }
            }
            tick();
            setInterval(tick, 1000);
        },

        initEvergreenTimers: function() {
            var timers = document.querySelectorAll('.evergreen-timer');
            timers.forEach(function(timer) {
                var duration = parseInt(timer.dataset.minutes) || 60;
                var key = 'eg_timer_' + timer.dataset.id;
                var endTime = localStorage.getItem(key);

                if (!endTime || parseInt(endTime) < Date.now()) {
                    endTime = Date.now() + duration * 60 * 1000;
                    localStorage.setItem(key, endTime);
                }

                function tickEvergreen() {
                    var diff = parseInt(endTime) - Date.now();
                    if (diff <= 0) {
                        timer.innerHTML = '<span style="color:var(--c-danger)">Expired</span>';
                        return;
                    }
                    var h = Math.floor(diff / 3600000);
                    var m = Math.floor((diff % 3600000) / 60000);
                    var s = Math.floor((diff % 60000) / 1000);
                    timer.innerHTML = 'Ends in <span class="et-num">' + UrgencyTimer.pad(h) + '</span>:<span class="et-num">' + UrgencyTimer.pad(m) + '</span>:<span class="et-num">' + UrgencyTimer.pad(s) + '</span>';
                }
                tickEvergreen();
                setInterval(tickEvergreen, 1000);
            });
        },

        pad: function(n) {
            return n < 10 ? '0' + n : '' + n;
        }
    };

    // ============================================================
    // 3. COOKIE CONSENT BANNER (GDPR/CCPA)
    // ============================================================
    window.CookieConsent = {
        cookieName: 'aitf_consent',

        init: function() {
            var consent = this.getConsent();
            if (consent) {
                this.applyConsent(consent);
                return;
            }
            this.showBanner();
        },

        getConsent: function() {
            try {
                var raw = localStorage.getItem(this.cookieName);
                return raw ? JSON.parse(raw) : null;
            } catch (e) { return null; }
        },

        setConsent: function(categories) {
            var consent = {
                categories: categories,
                timestamp: new Date().toISOString(),
                version: '1.0'
            };
            localStorage.setItem(this.cookieName, JSON.stringify(consent));
            this.applyConsent(consent);
            this.hideBanner();
            trackEvent('cookie_consent', { categories: categories });
        },

        applyConsent: function(consent) {
            var cats = consent.categories || {};
            // Enable/disable analytics
            if (cats.analytics && typeof gtag === 'function') {
                gtag('consent', 'update', { analytics_storage: 'granted' });
            }
            // Enable/disable marketing
            if (cats.marketing && typeof gtag === 'function') {
                gtag('consent', 'update', { ad_storage: 'granted' });
            }
        },

        showBanner: function() {
            var banner = document.getElementById('cookieBanner');
            if (banner) {
                setTimeout(function() { banner.classList.add('visible'); }, 1000);
            }
        },

        hideBanner: function() {
            var banner = document.getElementById('cookieBanner');
            if (banner) banner.classList.remove('visible');
            var modal = document.getElementById('cookieModal');
            if (modal) modal.classList.remove('visible');
        },

        acceptAll: function() {
            this.setConsent({ necessary: true, analytics: true, marketing: true });
        },

        rejectAll: function() {
            this.setConsent({ necessary: true, analytics: false, marketing: false });
        },

        savePreferences: function() {
            var cats = {
                necessary: true,
                analytics: document.getElementById('cookieAnalytics') ? document.getElementById('cookieAnalytics').checked : false,
                marketing: document.getElementById('cookieMarketing') ? document.getElementById('cookieMarketing').checked : false
            };
            this.setConsent(cats);
        },

        showSettings: function() {
            var modal = document.getElementById('cookieModal');
            if (modal) modal.classList.add('visible');
        },

        hideSettings: function() {
            var modal = document.getElementById('cookieModal');
            if (modal) modal.classList.remove('visible');
        }
    };

    // ============================================================
    // 4. FLOATING BUTTONS (Back to Top + Share)
    // ============================================================
    window.FloatingButtons = {
        init: function() {
            var container = document.getElementById('floatingButtons');
            if (!container) return;

            var self = this;
            window.addEventListener('scroll', function() {
                if (window.scrollY > 400) {
                    container.classList.add('visible');
                } else {
                    container.classList.remove('visible');
                }
            });

            // Share button toggle
            var shareBtn = container.querySelector('.float-btn-share');
            if (shareBtn) {
                shareBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    var dropdown = container.querySelector('.share-dropdown');
                    if (dropdown) dropdown.classList.toggle('open');
                });
            }

            // Close share dropdown on outside click
            document.addEventListener('click', function() {
                var dropdown = container.querySelector('.share-dropdown');
                if (dropdown) dropdown.classList.remove('open');
            });

            // Back to top
            var topBtn = container.querySelector('.float-btn-top');
            if (topBtn) {
                topBtn.addEventListener('click', function() {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        }
    };

    // ============================================================
    // 5. PRICE COMPARISON WIDGET
    //    (Data-driven, renders from JS object)
    // ============================================================
    window.PriceCompare = {
        // Example data - customize per product
        data: {
            'ai-writing': {
                title: 'AI Writing Tools — Price Comparison',
                badge: 'Updated Daily',
                plans: [
                    { provider: 'Jasper AI', icon: '✍️', price: 39, oldPrice: 59, savings: '34%', url: 'go/jasper/index.html', best: true },
                    { provider: 'Copy.ai', icon: '📝', price: 49, oldPrice: 49, savings: null, url: 'go/copyai/index.html', best: false },
                    { provider: 'Writesonic', icon: '✏️', price: 16, oldPrice: 29, savings: '45%', url: 'go/writesonic/index.html', best: false },
                    { provider: 'ChatGPT+', icon: '🤖', price: 20, oldPrice: 20, savings: null, url: 'go/chatgpt/index.html', best: false }
                ]
            }
        },

        init: function(widgetId, category) {
            var el = document.getElementById(widgetId);
            if (!el || !this.data[category]) return;
            el.innerHTML = this.render(this.data[category]);
        },

        render: function(data) {
            var html = '<div class="price-compare-widget">';
            html += '<div class="price-compare-header">';
            html += '<h3>' + data.title + '</h3>';
            html += '<span class="price-compare-badge">' + data.badge + '</span>';
            html += '</div>';
            html += '<div class="price-compare-body">';
            data.plans.forEach(function(plan) {
                html += '<div class="price-row' + (plan.best ? ' best' : '') + '">';
                html += '<div class="price-provider">';
                html += '<span class="price-provider-logo">' + plan.icon + '</span>';
                html += '<span class="price-provider-name">' + plan.provider + (plan.best ? ' ★ Best Value' : '') + '</span>';
                html += '</div>';
                html += '<div class="price-amount-col">';
                if (plan.oldPrice !== plan.price) html += '<div class="price-old">$' + plan.oldPrice + '/mo</div>';
                html += '<div class="price-current">$' + plan.price + '/mo</div>';
                html += '</div>';
                html += '<div class="price-savings">';
                if (plan.savings) html += '<span class="price-savings-tag">Save ' + plan.savings + '</span>';
                html += '</div>';
                html += '<div class="price-action-col"><a href="' + plan.url + '" class="btn btn-small btn-primary" rel="nofollow sponsored" target="_blank">Get Deal →</a></div>';
                html += '</div>';
            });
            html += '</div></div>';
            return html;
        }
    };

    // ============================================================
    // 10. PUSH NOTIFICATION OPT-IN
    // ============================================================
    window.PushOptIn = {
        init: function() {
            if (localStorage.getItem('push_dismissed')) return;
            if (!('Notification' in window)) return;

            var prompt = document.getElementById('pushPrompt');
            if (!prompt) return;

            // Show after 30 seconds on page
            setTimeout(function() {
                if (Notification.permission === 'default') {
                    prompt.classList.add('visible');
                }
            }, 30000);
        },

        allow: function() {
            var self = this;
            Notification.requestPermission().then(function(result) {
                if (result === 'granted') {
                    // For static sites, we can register for basic notifications
                    // or integrate with a push service like OneSignal/WebPushr
                    trackEvent('push_subscribed', { result: result });
                }
                self.dismiss();
            });
        },

        dismiss: function() {
            localStorage.setItem('push_dismissed', '1');
            var prompt = document.getElementById('pushPrompt');
            if (prompt) prompt.classList.remove('visible');
        }
    };

    // ============================================================
    // 12. RETARGETING PIXEL LOADER
    //     Loads pixels only after consent is given
    // ============================================================
    window.RetargetingPixels = {
        init: function() {
            var consent = CookieConsent.getConsent();
            if (consent && consent.categories && consent.categories.marketing) {
                this.loadAll();
            }
        },

        loadAll: function() {
            this.loadMetaPixel();
            this.loadTwitterPixel();
            this.loadTikTokPixel();
            // Add more pixels as needed
        },

        loadMetaPixel: function() {
            if (document.getElementById('meta-pixel')) return;
            // Replace YOUR_PIXEL_ID with actual Meta Pixel ID
            /*
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;t.id='meta-pixel';
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
            */
        },

        loadTwitterPixel: function() {
            // Replace YOUR_TWITTER_PIXEL_ID
            /*
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','YOUR_TWITTER_PIXEL_ID');
            */
        },

        loadTikTokPixel: function() {
            // Replace YOUR_TIKTOK_PIXEL_ID
            /*
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
              ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);
              return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
              ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date;
              var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;
              var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('YOUR_TIKTOK_PIXEL_ID');
              ttq.page();
            }(window, document, 'ttq');
            */
        }
    };

    // ============================================================
    // 13. DYNAMIC CONTENT PERSONALIZATION
    // ============================================================
    window.DynamicPersonalization = {
        init: function() {
            var referrer = document.referrer;
            var params = new URLSearchParams(window.location.search);
            var source = params.get('ref') || params.get('utm_source') || '';
            var banner = document.getElementById('personalizedBanner');

            if (!banner) return;

            // Personalize based on referrer/source
            var message = '';
            if (referrer.indexOf('twitter.com') !== -1 || source === 'twitter') {
                message = 'Welcome from Twitter! Here are the best AI tools for content creators.';
            } else if (referrer.indexOf('reddit.com') !== -1 || source === 'reddit') {
                message = 'Fellow Redditor! Check out our unbiased AI tool rankings.';
            } else if (referrer.indexOf('youtube.com') !== -1 || source === 'youtube') {
                message = 'From YouTube? These are the exact AI tools we recommend.';
            } else if (referrer.indexOf('linkedin.com') !== -1 || source === 'linkedin') {
                message = 'Welcome LinkedIn professional! Best AI tools for business.';
            } else if (source === 'email') {
                message = 'Your exclusive email subscriber deal is waiting below!';
            } else if (params.get('utm_campaign')) {
                message = 'Special offer just for you! See our top picks below.';
            }

            if (message) {
                banner.innerHTML = '<div class="container">' + message + ' <a href="#best-picks">See Top Picks →</a></div>';
                banner.classList.add('visible');
            }

            // Personalize product order based on source
            this.reorderProducts(source, referrer);
        },

        reorderProducts: function(source, referrer) {
            // Move relevant category to top based on referrer
            var targetId = null;
            if (source === 'twitter' || referrer.indexOf('twitter') !== -1) targetId = 'ai-writing';
            if (source === 'linkedin' || referrer.indexOf('linkedin') !== -1) targetId = 'ai-marketing';
            if (source === 'github' || referrer.indexOf('github') !== -1) targetId = 'ai-coding';

            if (targetId) {
                var card = document.getElementById(targetId);
                var parent = card ? card.parentElement : null;
                if (card && parent && parent.firstChild) {
                    parent.insertBefore(card, parent.firstChild);
                }
            }
        }
    };

    // ============================================================
    // 14. PWA FEATURES
    // ============================================================
    window.PWAFeatures = {
        init: function() {
            this.registerServiceWorker();
            this.initInstallPrompt();
        },

        registerServiceWorker: function() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(function() {
                    // SW not available on GitHub Pages without specific setup
                    // This is a graceful fallback
                });
            }
        },

        initInstallPrompt: function() {
            var self = this;
            window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                self.deferredPrompt = e;
                self.showInstallBanner();
            });
        },

        showInstallBanner: function() {
            var banner = document.getElementById('pwaInstallBanner');
            if (banner) banner.classList.add('visible');
        },

        install: function() {
            var self = this;
            if (!this.deferredPrompt) return;
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then(function(result) {
                trackEvent('pwa_install', { outcome: result.outcome });
                self.deferredPrompt = null;
                var banner = document.getElementById('pwaInstallBanner');
                if (banner) banner.classList.remove('visible');
            });
        },

        dismissInstall: function() {
            var banner = document.getElementById('pwaInstallBanner');
            if (banner) banner.classList.remove('visible');
            localStorage.setItem('pwa_install_dismissed', '1');
        }
    };

    // ============================================================
    // 6. EMAIL DRIP SEQUENCE TRACKER
    //    (Stores subscription data for email service integration)
    // ============================================================
    window.EmailCapture = {
        init: function() {
            this.enhanceForms();
        },

        enhanceForms: function() {
            var forms = document.querySelectorAll('[data-email-capture]');
            forms.forEach(function(form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    var email = form.querySelector('input[type="email"]');
                    if (!email || !email.value) return;

                    var source = form.dataset.source || 'unknown';
                    var data = {
                        email: email.value,
                        source: source,
                        page: window.location.pathname,
                        referrer: document.referrer,
                        timestamp: new Date().toISOString(),
                        utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
                        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || ''
                    };

                    // Store locally (sync with email service via their API or Zapier webhook)
                    var leads = JSON.parse(localStorage.getItem('email_leads') || '[]');
                    leads.push(data);
                    localStorage.setItem('email_leads', JSON.stringify(leads));

                    // Send to webhook if configured
                    EmailCapture.sendToWebhook(data);

                    // Success state
                    form.innerHTML = '<p style="color:white;font-weight:700;font-size:18px;">✓ You\'re in! Check your inbox for the best AI deals.</p>';

                    trackEvent('email_captured', { source: source });
                });
            });
        },

        sendToWebhook: function(data) {
            // Integrate with: Mailchimp, ConvertKit, Brevo, or Zapier webhook
            // Example Zapier webhook:
            /*
            fetch('YOUR_ZAPIER_WEBHOOK_URL', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).catch(function(err) {
                console.log('Webhook failed, data stored locally:', err);
            });
            */
        }
    };

    // ============================================================
    // UTILITY: Event Tracking
    // ============================================================
    function trackEvent(eventName, data) {
        // Google Analytics 4
        if (typeof gtag === 'function') {
            gtag('event', eventName, data);
        }
        // Store locally for dashboard
        var events = JSON.parse(localStorage.getItem('aitf_events') || '[]');
        events.push({ event: eventName, data: data, timestamp: new Date().toISOString() });
        // Keep last 500 events
        if (events.length > 500) events = events.slice(-500);
        localStorage.setItem('aitf_events', JSON.stringify(events));
    }
    window.trackEvent = trackEvent;

    // ============================================================
    // AUTO-INIT on DOM ready
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        UrgencyTimer.init();
        CookieConsent.init();
        FloatingButtons.init();
        PushOptIn.init();
        RetargetingPixels.init();
        DynamicPersonalization.init();
        EmailCapture.init();
        // PWAFeatures.init(); // Uncomment when sw.js is ready
    });

})();
