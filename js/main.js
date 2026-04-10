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
