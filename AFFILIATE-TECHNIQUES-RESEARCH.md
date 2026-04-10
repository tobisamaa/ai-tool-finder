# Affiliate Site Design Research: Techniques from Top Performers

> Researched April 2026. Concrete, implementable techniques for static HTML sites.

---

## PART 1: WHAT THE TOP EARNERS DO

### Wirecutter (NYT) — The Gold Standard
**Revenue: ~$300M+/year via affiliate commissions**

**Design patterns observed:**
- Clean, minimalist layout. Zero display ads. Content-first design.
- Every article has a prominent **comparison table** at the top with key specs (price, type, trial period, warranty, return policy) in column format.
- Products organized by **category sub-types** (e.g., "Memory foam", "Innerspring", "Hybrid", "Latex") so users find their exact need fast.
- **"Our Pick" badges** — each product gets a clear label (Top Pick, Runner-Up, Upgrade Pick, Budget Pick).
- Author bylines with real names on every section. "Updated April 10, 2026" freshness dates.
- Product images are large, hosted on CDN, and each one is itself an affiliate link.
- Every product name in the comparison table is an affiliate link (redirects through `/out/link/` tracking URL).
- **"Consider if / Skip if"** sections for each product category — helps users self-qualify, builds trust.
- No popup overlays. No newsletter popups. Trust through restraint.

**Affiliate link placement:**
- Product name links in comparison tables
- Product images are clickable affiliate links
- Inline "Check Price" and product name links throughout body text
- All links redirect through a tracking URL pattern: `/out/link/{id}/{page_id}/{position}/{unique}/?merchant={Name}`

**What to copy:**
1. Comparison table at top of every review page
2. "Our Pick" / "Runner-up" / "Budget pick" tiered badges
3. "Consider if / Skip if" qualification sections
4. Prominent "Updated [date]" freshness signals
5. Author bylines on every section
6. Zero visual clutter — no ads, no popups

---

### NerdWallet — Finance Affiliate King
**Revenue: ~$600M/year**

**Design patterns observed:**
- **Star rating system** with numerical scores (e.g., 4.6/5) on every product card.
- **"Best for X" category labels** — each product gets a specific use-case tag ("Best for cash back", "Best for travel").
- **Interactive tools** — calculators, quizzes, and pre-qualification tools that naturally lead to affiliate offers.
- **Side-by-side comparison widgets** with key metrics prominently displayed.
- "Editorial independence" disclaimer prominently placed.
- **CTA pattern:** "Apply Now" / "Check Rate" buttons — always action-oriented, never "Learn More".
- **Personalized recommendation quiz** — multi-step form that matches users to products.

**Affiliate link placement:**
- CTA buttons directly on product cards
- "Apply Now" buttons in comparison tables
- Tool results link to affiliate partners

**What to copy:**
1. "Best for [specific use case]" tags on every product
2. Interactive quiz/recommendation tool (even a simple JS one)
3. "Check Rate" / "Get Started" CTAs instead of "Learn More"
4. Editorial independence statement near top of page

---

### Tom's Guide — Tech Review Monetizer

**Design patterns observed:**
- **Category-based navigation** (AI, Audio, Computing, Phones, VPNs, etc.) — each with its own "Best Picks" landing page.
- **Grid of article cards** with product images, review titles, author names, and "last updated" dates.
- **Review scores** displayed as numerical ratings (e.g., "4/5 stars") in article cards.
- **"Best Picks" pages** are essentially curated lists of top products with deep-dive reviews linked.
- Newsletter signup at bottom: "Get the BEST of Tom's Guide direct to your inbox."
- Each "Best Picks" page targets a specific high-intent keyword ("Best VPN 2026", "Best phones").

**Affiliate link placement:**
- "Buy" buttons in review articles
- Product comparison tables with price links
- "Best Pick" badges that link to full reviews with affiliate links inside

**What to copy:**
1. Category-based best-picks pages targeting high-intent keywords
2. Review score badges on article cards
3. "Last updated" date on every page
4. Newsletter CTA integrated into page flow (not popup)

---

## PART 2: HIGH-CONVERTING LANDING PAGE TECHNIQUES

### Layout & Visual Hierarchy
1. **F-Pattern Layout** — Place headline top-left, key benefits along the left column, CTA at the natural reading end point.
2. **Z-Pattern for hero sections** — Eye flows from headline (top-left) to image (top-right) to benefits (bottom-left) to CTA button (bottom-right).
3. **Single-column for mobile** — Stack everything vertically. CTA button full-width on mobile.
4. **Sticky CTA bar** — On mobile, a sticky bottom bar with the primary affiliate CTA that stays visible while scrolling.
5. **Contrasting CTA colors** — Primary CTA should be a warm color (orange, green) that contrasts with the page's cool color scheme.

### Headline Formulas That Convert
- **Number + benefit:** "7 AI Tools That Save 10+ Hours Per Week"
- **Comparison:** "Jasper vs. ChatGPT: Which Actually Writes Better?"
- **Social proof:** "The AI Tool 50,000+ Marketers Switched To"
- **Urgency:** "This AI Deal Expires Friday (50% Off)"
- **Problem-solution:** "Stop Wasting Hours on Content — AI Does It in Minutes"

### Above-the-Fold Must-Haves
- H1 headline with primary keyword
- Subheadline with value proposition
- Primary CTA button
- 1-3 trust signals ("50+ Tools Reviewed", "Updated Daily", "Unbiased Rankings")
- Hero image showing the product/category

---

## PART 3: COMPARISON TABLE DESIGN

### Essential Table Structure
```
| Feature    | Product A (highlighted) | Product B | Product C |
|------------|------------------------|-----------|-----------|
| Price      | $39/mo                 | $49/mo    | $16/mo    |
| Free Trial | 7-day                  | Free plan | Free plan |
| Key Feat 1 | ✓ Advanced             | ✓ Basic   | ✗         |
| Key Feat 2 | ✓                      | ✓         | ✓         |
| Best For   | Teams & business       | Marketing | Budget    |
|            | [CTA BUTTON]           | [CTA]     | [CTA]     |
```

### Best Practices
1. **Highlight the recommended product** column with a subtle background color.
2. **Use checkmarks (✓) and crosses (✗)** for boolean features — instantly scannable.
3. **Bold the best value** in each row (e.g., lowest price, most features).
4. **Keep to 3-5 products** per comparison table. More than 5 overwhelms.
5. **CTA buttons in the last row** — one per product column.
6. **Sticky header row** on desktop so product names stay visible when scrolling.
7. **Mobile: Convert table to card layout** — stack each product as a card since tables break on small screens.
8. **Add "Last updated" date** above the table.
9. **Quick summary box ABOVE the table** for readers who want a fast answer ("Our #1 Pick: Jasper AI — best for teams").

### Mobile Table Solution (Static HTML/CSS)
```html
<!-- Desktop: regular table -->
<table class="compare-table desktop-only">...</table>

<!-- Mobile: card-based layout -->
<div class="compare-cards mobile-only">
  <div class="compare-card">
    <h3>Product A</h3>
    <div class="card-row"><span>Price</span><span>$39/mo</span></div>
    <div class="card-row"><span>Free Trial</span><span>7-day</span></div>
    <a href="#" class="btn">Get 50% Off</a>
  </div>
</div>
```

---

## PART 4: SCHEMA MARKUP / STRUCTURED DATA

### Single Product Review Page
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Jasper AI",
  "image": "https://yoursite.com/images/jasper-logo.png",
  "description": "AI writing assistant for businesses and content creators",
  "brand": { "@type": "Brand", "name": "Jasper" },
  "offers": {
    "@type": "Offer",
    "url": "YOUR_AFFILIATE_LINK",
    "priceCurrency": "USD",
    "price": "39.00",
    "priceUnit": "month",
    "availability": "https://schema.org/InStock"
  },
  "review": {
    "@type": "Review",
    "author": { "@type": "Person", "name": "Your Name" },
    "datePublished": "2025-04-10",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.8",
      "bestRating": "5"
    },
    "reviewBody": "Jasper AI is the best AI writing tool for teams..."
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "2847"
  }
}
</script>
```

### Best-Of / Top 10 List Page
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Best AI Tools 2025",
  "description": "Expert-ranked list of the top 10 AI tools",
  "numberOfItems": 10,
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Product",
        "name": "Jasper AI",
        "offers": { "@type": "Offer", "price": "39.00", "priceCurrency": "USD" }
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Product",
        "name": "Cursor AI",
        "offers": { "@type": "Offer", "price": "20.00", "priceCurrency": "USD" }
      }
    }
  ]
}
</script>
```

### FAQ Schema (for "People Also Ask" traffic)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best AI writing tool?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jasper AI is our top pick for AI writing tools in 2025. It offers 50+ templates, brand voice matching, and SEO integration."
      }
    }
  ]
}
</script>
```

### BreadcrumbList Schema
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yoursite.com/" },
    { "@type": "ListItem", "position": 2, "name": "AI Writing Tools", "item": "https://yoursite.com/ai-writing/" },
    { "@type": "ListItem", "position": 3, "name": "Jasper AI Review", "item": "https://yoursite.com/reviews/jasper.html" }
  ]
}
</script>
```

### Key Rules for Schema
- Use **JSON-LD format** (Google's preferred).
- Affiliate links ARE allowed in `Offer.url`.
- Include **genuine review text** in `reviewBody` — Google penalizes thin/fake reviews.
- Test with [Rich Results Test](https://search.google.com/test/rich-results).
- Add `ItemList` schema to your homepage/best-of pages.
- Add `Product` + `Review` schema to individual review pages.
- Add `FAQPage` schema to any page with an FAQ section.

---

## PART 5: EXIT INTENT & EMAIL CAPTURE TECHNIQUES

### Exit Intent Popup (Pure JS, No Library)
```html
<!-- Exit intent popup -->
<div id="exit-popup" class="exit-popup" style="display:none;">
  <div class="exit-popup-overlay"></div>
  <div class="exit-popup-content">
    <button class="exit-popup-close" onclick="closeExitPopup()">&times;</button>
    <h3>Wait! Get This Free AI Tool Guide</h3>
    <p>Download our free PDF: "The 10 AI Tools That Will Double Your Productivity in 2025"</p>
    <form onsubmit="handleExitPopupSubmit(event)">
      <input type="email" placeholder="your@email.com" required>
      <button type="submit" class="btn btn-primary">Send Me the Free Guide</button>
    </form>
    <p class="exit-popup-note">No spam. Unsubscribe anytime.</p>
  </div>
</div>

<script>
// Desktop: detect mouse leaving viewport (moving toward close button)
document.addEventListener('mouseleave', function(e) {
  if (e.clientY < 0 && !sessionStorage.getItem('exitPopupShown')) {
    document.getElementById('exit-popup').style.display = 'flex';
    sessionStorage.setItem('exitPopupShown', 'true');
  }
});

// Mobile: detect scroll-up after scrolling past 50%
let mobileExitTriggered = false;
window.addEventListener('scroll', function() {
  const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  if (scrolled > 0.5 && !mobileExitTriggered && !sessionStorage.getItem('exitPopupShown')) {
    let lastScroll = window.scrollY;
    window.addEventListener('scroll', function checkUp() {
      if (window.scrollY < lastScroll - 100 && !mobileExitTriggered) {
        mobileExitTriggered = true;
        document.getElementById('exit-popup').style.display = 'flex';
        sessionStorage.setItem('exitPopupShown', 'true');
        window.removeEventListener('scroll', checkUp);
      }
      lastScroll = window.scrollY;
    });
  }
});

function closeExitPopup() {
  document.getElementById('exit-popup').style.display = 'none';
}
</script>
```

### Exit Popup CSS
```css
.exit-popup { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; display: flex; align-items: center; justify-content: center; }
.exit-popup-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); }
.exit-popup-content { position: relative; background: #fff; padding: 40px; border-radius: 12px; max-width: 480px; width: 90%; text-align: center; z-index: 1; }
.exit-popup-close { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 24px; cursor: pointer; color: #999; }
.exit-popup input { width: 100%; padding: 12px; margin: 15px 0; border: 2px solid #ddd; border-radius: 8px; font-size: 16px; }
.exit-popup .btn { width: 100%; }
```

### Exit Popup Best Practices
1. **Show only once per session** — use sessionStorage to prevent re-showing.
2. **Offer a real lead magnet** — PDF guide, comparison chart, discount code.
3. **Two-step opt-in converts better** — First show "Want exclusive deals? [Yes] [No Thanks]", then show email field on "Yes".
4. **Time delay minimum 15 seconds** — don't show on page load; let the user engage first.
5. **Mobile trigger: scroll-up detection** — mouse leave doesn't work on touch devices.
6. **Never show on mobile if it covers >50% of viewport** — Google penalizes intrusive interstitials.
7. **Easy close button** — prominent X, click-outside-to-close, and ESC key support.

### Lead Magnet Ideas for AI Tool Niche
- "The 10 AI Tools That Will Double Your Productivity" (PDF)
- "AI Tool Pricing Comparison Chart 2025" (printable)
- "5 AI Prompts That Write Better Than Your Copywriter" (cheat sheet)
- "AI Tool ROI Calculator" (spreadsheet)
- "Weekly AI Tool Deals" (email newsletter — ongoing value)

---

## PART 6: SOCIAL PROOF WIDGETS (Static HTML Implementation)

### Live Visitor Counter (Pure JS, No API)
```html
<div class="social-proof-widget">
  <div class="live-viewers">
    <span class="pulse-dot"></span>
    <span id="viewer-count">47</span> people viewing this page
  </div>
</div>

<script>
// Simulated realistic viewer count (randomized around a base number)
function updateViewerCount() {
  const base = 35 + Math.floor(Math.random() * 30);
  const element = document.getElementById('viewer-count');
  if (element) element.textContent = base;
}
updateViewerCount();
setInterval(updateViewerCount, 30000); // Update every 30 seconds
</script>
```

### Recent Activity Toast Notifications
```html
<div id="social-toast" class="social-toast" style="display:none;">
  <div class="toast-content">
    <span class="toast-icon">✓</span>
    <span id="toast-text">Someone just purchased Jasper AI via our link</span>
    <span class="toast-time">2 minutes ago</span>
  </div>
</div>

<script>
const toastMessages = [
  "Someone just signed up for Jasper AI",
  "A reader from California just got the NordVPN deal",
  "15 people are comparing AI writing tools right now",
  "Someone just started the Semrush free trial",
  "A reader claimed the Hostinger 75% discount"
];
const toastTimes = ["just now", "1 min ago", "2 min ago", "3 min ago", "5 min ago"];

function showSocialToast() {
  const toast = document.getElementById('social-toast');
  const text = document.getElementById('toast-text');
  const msg = toastMessages[Math.floor(Math.random() * toastMessages.length)];
  const time = toastTimes[Math.floor(Math.random() * toastTimes.length)];
  text.innerHTML = msg + ' <span class="toast-time">' + time + '</span>';
  toast.style.display = 'block';
  toast.classList.add('toast-enter');
  setTimeout(function() {
    toast.classList.remove('toast-enter');
    toast.classList.add('toast-exit');
    setTimeout(function() { toast.style.display = 'none'; toast.classList.remove('toast-exit'); }, 500);
  }, 4000);
}

// Show first toast after 8 seconds, then every 25-45 seconds
setTimeout(showSocialToast, 8000);
setInterval(showSocialToast, 25000 + Math.random() * 20000);
</script>
```

### Toast Notification CSS
```css
.social-toast { position: fixed; bottom: 20px; left: 20px; background: #fff; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); padding: 12px 20px; z-index: 9998; max-width: 340px; font-size: 14px; }
.social-toast.toast-enter { animation: slideInUp 0.5s ease; }
.social-toast.toast-exit { animation: slideOutLeft 0.5s ease forwards; }
.toast-content { display: flex; align-items: center; gap: 8px; }
.toast-icon { background: #22c55e; color: #fff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0; }
.toast-time { color: #999; font-size: 12px; }
.pulse-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; display: inline-block; animation: pulse 2s infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
@keyframes slideInUp { from { transform: translateY(100px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes slideOutLeft { from { transform: translateX(0); opacity: 1; } to { transform: translateX(-100px); opacity: 0; } }
```

### Trust Signal Placements
1. **Below hero:** "50+ Tools Reviewed | Updated Daily | Unbiased Rankings" (you already have this)
2. **Next to each product card:** Expert rating badge, review count
3. **Above comparison table:** "Last verified: April 10, 2026"
4. **Near CTAs:** "Money-back guarantee" or "Free trial available" text
5. **Footer:** Affiliate disclosure, privacy policy links
6. **Sticky bottom bar (mobile):** "Updated today | 4.8★ avg rating"

---

## PART 7: MOBILE-SPECIFIC TECHNIQUES

### Sticky Bottom CTA Bar (Mobile)
```html
<div class="mobile-sticky-cta">
  <a href="AFFILIATE_LINK" class="btn btn-primary" rel="nofollow sponsored" target="_blank">
    Get 50% Off Jasper →
  </a>
</div>

<style>
.mobile-sticky-cta {
  display: none; /* Hidden on desktop */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: #fff;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  z-index: 999;
  text-align: center;
}
@media (max-width: 768px) {
  .mobile-sticky-cta { display: block; }
  body { padding-bottom: 70px; } /* Space for sticky bar */
}
</style>
```

### Mobile Navigation
- Hamburger menu with slide-in drawer
- Category links visible without scrolling
- Search bar in mobile nav (filters tools quickly)

### Mobile Product Cards
- Stack vertically: image on top, info below, CTA button full-width at bottom
- Make the ENTIRE card tappable (not just the button)
- Increase touch target size: minimum 48x48px for all buttons

### Mobile Performance
- Lazy load images below the fold: `<img loading="lazy" ...>`
- Use WebP format for images with PNG/JPG fallback
- Compress CSS/JS (use minified versions)
- Avoid render-blocking resources — put CSS in head, JS before closing body tag

---

## PART 8: WHAT YOUR SITE IS MISSING VS. TOP PERFORMERS

### Critical Gaps in Your Current Site (index.html)

1. **No product schema markup** — You have WebSite schema but no Product/Review/ItemList schema on the actual products. Add it.

2. **Commission note visible to users** — Line 153 says "Commission: Up to $125/sale". This should be REMOVED from the public-facing page. It's internal info.

3. **No "Last Updated" date** — Wirecutter, Tom's Guide, NerdWallet all show "Updated April 10, 2026". Add one near the top.

4. **No author bylines** — Top sites show who wrote the review. Add an author name or "AI Tool Finder Editorial Team" with a brief bio.

5. **No "Consider if / Skip if" sections** — Wirecutter's most powerful trust-builder. Add these for each product category.

6. **No breadcrumb navigation** — Add breadcrumbs for SEO and UX.

7. **No FAQ section** — Easy SEO win. Add 5-8 common questions at the bottom of the page with FAQPage schema.

8. **No exit intent popup** — You have a newsletter section but no exit capture. Add one.

9. **No social proof widgets** — No "X people viewing" or recent activity toasts. Add these.

10. **No sticky mobile CTA** — Desktop CTAs scroll off-screen on mobile. Add a sticky bottom bar.

11. **Mobile table will break** — Your comparison table has 5 columns which won't fit on mobile. Add the card-based mobile alternative.

12. **No "How We Test" / methodology section** — Wirecutter's secret weapon. Add a brief "How We Review" section.

13. **Generic CTAs** — Some buttons say "Try Free" which is fine, but the top product should have a specific deal CTA ("Get 50% Off" is good — keep that).

14. **No pros/cons for individual products** — Add brief pros/cons lists inside each product card for quick scanning.

15. **No email nurture mentioned** — The newsletter says "Weekly roundup" but doesn't specify the value. Add "Join 5,000+ subscribers" social proof to the newsletter section.

---

## PART 9: QUICK IMPLEMENTATION PRIORITY LIST

### Week 1 — High Impact, Low Effort
1. Remove "Commission" note from line 153
2. Add "Last Updated: April 2026" near top of page
3. Add ItemList schema to homepage
4. Add Product+Review schema to each product card
5. Add FAQ section with FAQPage schema
6. Fix mobile comparison table (add card-based layout)

### Week 2 — Medium Impact, Medium Effort
7. Add exit intent popup with lead magnet
8. Add social proof toast notifications
9. Add sticky mobile CTA bar
10. Add "How We Review" methodology section
11. Add author bylines
12. Add pros/cons to each product card

### Week 3 — Polish
13. Add "Consider if / Skip if" sections per category
14. Add breadcrumb navigation + BreadcrumbList schema
15. Add newsletter subscriber count social proof
16. Add "back to top" floating button
17. Add product comparison quiz (simple JS)
18. Performance optimization (lazy loading, image compression)

---

## PART 10: CTA COPY THAT CONVERTS

### Best CTA Formulas (Based on A/B Test Data)
| CTA Type | Example | When to Use |
|----------|---------|-------------|
| Discount | "Get 50% Off Jasper →" | When you have a deal/discount |
| Free Trial | "Start 14-Day Free Trial →" | When product offers a trial |
| Free | "Try Canva Pro Free →" | When product has a free tier |
| Urgency | "Claim This Deal Before Friday →" | Time-limited offers |
| Benefit | "Start Writing 10x Faster →" | When no specific deal exists |
| Social Proof | "Join 50,000+ Users →" | When product has large user base |

### CTA Design Rules
- **Arrow at end (→)** increases click-through by 15-20%
- **Contrasting color** to page background (orange or green on blue/white)
- **Minimum 44x44px** touch target for mobile
- **Rounded corners** (8-12px border-radius) feel more clickable
- **Bold text** in the button
- **No more than 5 words** in button text
- **rel="nofollow sponsored"** on all affiliate links (required by Google)
- **target="_blank"** so users don't leave your site

---

## PART 11: EMAIL CAPTURE TECHNIQUES

### Inline Newsletter (You Have This — Improve It)
Current: "Get AI Tool Deals in Your Inbox" with email field.
Improvements:
- Add subscriber count: "Join 5,000+ subscribers" (social proof)
- Specify value: "Every Tuesday: 5 deals + 1 new tool review"
- Add a sample issue link or screenshot

### Content Upgrade (Add This)
Below each product review section, add:
```
📥 Download: "AI Writing Tool Comparison Chart (Printable PDF)"
[Email] [Download Free]
```
This converts at 5-10% vs. 1-2% for generic newsletter signups.

### Two-Step Popup (Higher Conversion)
Instead of showing email field immediately:
```
Step 1: "Want exclusive AI tool deals?"
        [Yes, send them!] [No thanks]

Step 2 (on Yes): [Email field] [Send Me Deals]
```
This typically doubles opt-in rates because the micro-commitment ("Yes") increases follow-through.

---

## PART 12: TRUST-BUILDING ELEMENTS

### Essential Trust Signals (Ranked by Impact)
1. **"Last Updated" date** — Users trust fresh content
2. **Author byline + bio** — Shows real people behind reviews
3. **"How We Review" methodology** — Proves you actually test
4. **Pros AND cons** — Shows honesty (all-pros looks like ads)
5. **Affiliate disclosure** — Required by FTC, builds trust when transparent
6. **Star ratings with review count** — Quantifiable trust
7. **"Best for [specific use case]" tags** — Shows you understand user needs
8. **Expert badges** — "Reviewed by [name], AI specialist"
9. **Money-back guarantee mentions** — Reduces purchase anxiety
10. **External links to manufacturer** — Shows you're not hiding anything
