// AI Tool Finder - Main JS
// Handles newsletter, tracking, and analytics

// Newsletter handler
function handleNewsletter(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    // Store email locally (in production, connect to email service)
    const emails = JSON.parse(localStorage.getItem('newsletter_emails') || '[]');
    emails.push({ email, date: new Date().toISOString() });
    localStorage.setItem('newsletter_emails', JSON.stringify(emails));

    e.target.innerHTML = '<p style="color: white; font-weight: 700; font-size: 18px;">✓ You\'re in! Check your inbox for the best AI deals.</p>';
}

// Click tracking for affiliate links
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href*="AFFILIATE_LINK"]');
    if (link) {
        const toolName = link.textContent.trim();
        const clicks = JSON.parse(localStorage.getItem('affiliate_clicks') || '[]');
        clicks.push({
            tool: toolName,
            link: link.href,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        });
        localStorage.setItem('affiliate_clicks', JSON.stringify(clicks));
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    imgObserver.unobserve(img);
                }
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
}

// Track page views
(function() {
    const views = JSON.parse(localStorage.getItem('page_views') || '[]');
    views.push({ page: window.location.pathname, timestamp: new Date().toISOString() });
    localStorage.setItem('page_views', JSON.stringify(views));
})();
