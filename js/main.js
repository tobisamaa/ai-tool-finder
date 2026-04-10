// AI Tool Finder - Main JS v2.0
// Exit intent, social proof, sticky CTA, analytics, conversion optimization

// ==================== NEWSLETTER ====================
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    const emails = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
    emails.push({ email, date: new Date().toISOString() });
    localStorage.setItem('newsletter_emails', JSON.stringify(emails));
    e.target.innerHTML = '<p style="color: white; font-weight: 700; font-size: 18px;">✓ You\'re in! Check your inbox for the best AI deals.</p>';
}

// ==================== CLICK TRACKING ====================
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href*="go/"]');
    if (link) {
        const slug = link.href.match(/go\/([^/]+)/);
        const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
        clicks.push({
            slug: slug ? slug[1] : 'unknown',
            text: link.textContent.trim(),
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        });
        localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
    }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== EXIT INTENT POPUP ====================
function showExitPopup() {
    if (sessionStorage.getItem('exit_popup_shown')) return;
    if (window.location.hash === '#noexit') return;
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.style.display = 'flex';
        sessionStorage.setItem('exit_popup_shown', '1');
    }
}

function closeExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) popup.style.display = 'none';
}

// Desktop: detect mouse leaving viewport (upward)
document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 10) showExitPopup();
});

// Mobile: detect scroll-up after 50% page scroll
(function() {
    let maxScroll = 0;
    let shownAtScroll = false;
    window.addEventListener('scroll', function() {
        const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        if (scrollPct > 0.5) {
            maxScroll = scrollPct;
            shownAtScroll = true;
        }
        if (shownAtScroll && scrollPct < maxScroll - 0.1) {
            showExitPopup();
            shownAtScroll = false;
        }
    });
})();

// Close popup on overlay click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('exit-popup-overlay')) closeExitPopup();
});

// ==================== SOCIAL PROOF TOAST ====================
(function() {
    const messages = [
        { icon: '👥', text: '<strong>{n} people</strong> are comparing AI tools right now' },
        { icon: '🔥', text: 'Someone just got <strong>50% off Jasper AI</strong>' },
        { icon: '📊', text: '<strong>{n} people</strong> viewed Semrush today' },
        { icon: '✅', text: 'A user just signed up for <strong>Canva Pro</strong>' },
        { icon: '🔥', text: '<strong>{n} deals</strong> claimed today' },
        { icon: '⭐', text: 'Jasper AI rated <strong>4.8/5</strong> by 2,847 users' },
        { icon: '✅', text: 'Someone just started a <strong>Semrush free trial</strong>' },
        { icon: '🔥', text: 'NordVPN <strong>70% off</strong> deal ends soon' }
    ];

    function showProof() {
        const el = document.getElementById('social-proof');
        const textEl = document.getElementById('sp-text');
        if (!el || !textEl) return;

        const msg = messages[Math.floor(Math.random() * messages.length)];
        const n = Math.floor(Math.random() * 50) + 20;
        textEl.innerHTML = msg.text.replace('{n}', n);

        el.style.display = 'block';
        el.classList.add('sp-show');

        setTimeout(function() {
            el.classList.remove('sp-show');
            setTimeout(function() { el.style.display = 'none'; }, 400);
        }, 4000);
    }

    // Show first proof after 8 seconds, then every 20-40 seconds
    setTimeout(function() {
        showProof();
        setInterval(showProof, Math.random() * 20000 + 20000);
    }, 8000);
})();

// ==================== STICKY MOBILE CTA ====================
(function() {
    const cta = document.getElementById('stickyCTA');
    if (!cta) return;

    const mq = window.matchMedia('(max-width: 768px)');
    if (!mq.matches) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 600) {
            cta.style.display = 'block';
        } else {
            cta.style.display = 'none';
        }
    });
})();

// ==================== LIVE VIEWER COUNT ====================
(function() {
    const el = document.getElementById('viewerCount');
    if (!el) return;

    function updateCount() {
        const base = 35;
        const variance = Math.floor(Math.random() * 25);
        el.textContent = base + variance;
    }

    updateCount();
    setInterval(updateCount, 15000);
})();

// ==================== PAGE VIEW TRACKING ====================
(function() {
    const views = JSON.parse(localStorage.getItem('page_views') || '[]');
    views.push({ page: window.location.pathname, timestamp: new Date().toISOString() });
    localStorage.setItem('page_views', JSON.stringify(views));
})();

// ==================== LAZY LOAD IMAGES ====================
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    imgObserver.unobserve(img);
                }
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(function(img) { imgObserver.observe(img); });
}

// ==================== PRODUCT RECOMMENDATION QUIZ ====================
var quizData = { use: '', budget: '', team: '' };

function quizAnswer(step, value) {
    if (step === 1) quizData.use = value;
    if (step === 2) quizData.budget = value;
    if (step === 3) quizData.team = value;

    // Hide current step, show next
    var steps = document.querySelectorAll('.quiz-step');
    steps.forEach(function(s) { s.classList.remove('active'); });

    if (step < 3) {
        var next = document.querySelector('.quiz-step[data-step="' + (step + 1) + '"]');
        if (next) next.classList.add('active');
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    var recommendations = {
        'writing': { name: 'Jasper AI', link: 'go/jasper/index.html', why: 'Best AI writing tool with 50+ templates, brand voice matching, and SEO integration. Perfect for content creators and businesses.' },
        'coding': { name: 'Cursor AI', link: 'go/cursor/index.html', why: 'AI-powered code editor that understands your entire codebase. Built on VS Code with multi-file AI editing.' },
        'design': { name: 'Canva Pro', link: 'go/canva/index.html', why: 'AI-powered design with Magic Design, text-to-image, and 100M+ templates. Free 30-day trial available.' },
        'marketing': { name: 'Semrush', link: 'go/semrush/index.html', why: 'All-in-one SEO and marketing platform with keyword research, competitor analysis, and AI writing. 14-day free trial.' },
        'video': { name: 'Synthesia', link: 'go/synthesia/index.html', why: 'Create AI videos with 230+ realistic avatars in 140+ languages. No camera needed.' },
        'productivity': { name: 'Notion AI', link: 'go/notion/index.html', why: 'AI-powered workspace for notes, docs, projects, and databases. Free plan available.' }
    };

    var rec = recommendations[quizData.use] || recommendations['writing'];

    // Budget override
    if (quizData.budget === 'free' && quizData.use === 'writing') {
        rec = { name: 'Copy.ai', link: 'go/copyai/index.html', why: 'Free plan with 2,000 words/month. Great for trying AI writing without commitment.' };
    }

    document.getElementById('quizResultName').textContent = rec.name;
    document.getElementById('quizResultWhy').textContent = rec.why;
    document.getElementById('quizResultLink').href = rec.link;

    document.getElementById('quizResult').style.display = 'block';
    document.getElementById('quizContainer').querySelector('.quiz-step.active')?.classList.remove('active');
}

// ==================== COUNTDOWN TIMER ====================
(function() {
    var endKey = 'countdown_end';
    var end = localStorage.getItem(endKey);
    if (!end) {
        end = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
        localStorage.setItem(endKey, end);
    }

    function updateCountdown() {
        var remaining = Math.max(0, end - Date.now());
        var hours = Math.floor(remaining / 3600000);
        var mins = Math.floor((remaining % 3600000) / 60000);
        var secs = Math.floor((remaining % 60000) / 1000);

        var hEl = document.getElementById('cdHours');
        var mEl = document.getElementById('cdMins');
        var sEl = document.getElementById('cdSecs');
        if (hEl) hEl.textContent = String(hours).padStart(2, '0');
        if (mEl) mEl.textContent = String(mins).padStart(2, '0');
        if (sEl) sEl.textContent = String(secs).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
})();

// ==================== COOKIE CONSENT ====================
(function() {
    if (localStorage.getItem('cookies_accepted')) return;
    var banner = document.getElementById('cookieBanner');
    if (banner) {
        setTimeout(function() { banner.style.display = 'flex'; }, 2000);
    }
})();

function acceptCookies() {
    localStorage.setItem('cookies_accepted', '1');
    var banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
}

// ==================== BACK TO TOP ====================
(function() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', function() {
        btn.style.display = window.scrollY > 800 ? 'block' : 'none';
    });
})();

// ==================== SHARE BAR VISIBILITY ====================
(function() {
    var bar = document.getElementById('shareBar');
    if (!bar) return;
    window.addEventListener('scroll', function() {
        bar.style.opacity = window.scrollY > 400 ? '1' : '0';
    });
})();
