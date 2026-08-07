/* ═══════════════════════════════════════════════════
   Family Shop — Interactive JavaScript
   ═══════════════════════════════════════════════════ */

// ─── Data (synced from GitHub data.json) ───
const DATA_URL = 'https://raw.githubusercontent.com/onelpawarai/family-shop/main/data.json?v=' + Date.now();

// Default data
const DEFAULT_DATA = {
  shopName: 'Family Shop',
  heroTitle: 'আপনার পরিবারের\nসেরা অনলাইন দোকান',
  heroBadge: 'নতুন কালেকশন ২০২৬',
  heroDescription: 'স্মার্টওয়াচ, চশমা, শাড়ি, শার্ট, প্যান্ট, ঘড়ি এবং আরও অনেক কিছু — সবার জন্য সেরা প্রোডাক্ট, সেরা দামে।',
  contactPhone: '+880 1XXX-XXXXXX',
  contactEmail: 'info@familyshop.com',
  contactAddress: 'ঢাকা, বাংলাদেশ',
  facebook: '',
  instagram: '',
  freeDeliveryMin: 1000,
  footerText: 'আপনার পরিবারের অনলাইন দোকান। সেরা প্রোডাক্ট, সেরা দামে।',
  navLinks: [
    { label: 'হোম', href: '#home' },
    { label: 'প্রোডাক্ট', href: '#products' },
    { label: 'ক্যাটাগরি', href: '#categories' },
    { label: 'আমাদের সম্পর্কে', href: '#about' },
    { label: 'যোগাযোগ', href: '#contact' }
  ],
  buttons: {
    heroPrimary: 'এখনই কিনুন',
    heroSecondary: 'ক্যাটাগরি দেখুন',
    newsletter: 'সাবস্ক্রাইব',
    newsletterPlaceholder: 'আপনার ইমেইল দিন...',
    checkout: 'চেকআউট'
  },
  colors: { primary: '#F97316', primaryDark: '#EA580C', dark: '#0F0F0F', accent: '#10B981' },
  categories: [
    { id: 'watch', name: 'ঘড়ি', count: '১২ টি প্রোডাক্ট' },
    { id: 'smartwatch', name: 'স্মার্টওয়াচ', count: '৮ টি প্রোডাক্ট' },
    { id: 'eyewear', name: 'চশমা', count: '১৫ টি প্রোডাক্ট' },
    { id: 'clothing', name: 'পোশাক', count: '২৫ টি প্রোডাক্ট' }
  ],
  products: [
    { id: 1, name: 'স্মার্টওয়াচ প্রো', category: 'smartwatch', price: 2499, oldPrice: 3999, image: 'images/smartwatch.jpg', badge: 'sale', rating: 4.8, reviews: 124 },
    { id: 2, name: 'প্রিমিয়াম সানগ্লাস', category: 'eyewear', price: 1299, oldPrice: 1999, image: 'images/sunglasses.jpg', badge: 'new', rating: 4.6, reviews: 89 },
    { id: 3, name: 'ক্লাসিক শাড়ি', category: 'clothing', price: 1899, oldPrice: 2899, image: 'images/saree.jpg', badge: 'sale', rating: 4.9, reviews: 201 },
    { id: 4, name: 'ক্যাজুয়াল শার্ট', category: 'clothing', price: 799, oldPrice: 1299, image: 'images/shirt.jpg', badge: 'new', rating: 4.5, reviews: 67 },
    { id: 5, name: 'ফ্যাশন প্যান্ট', category: 'clothing', price: 999, oldPrice: 1499, image: 'images/pants.jpg', badge: '', rating: 4.7, reviews: 156 },
    { id: 6, name: 'লাক্সারি ঘড়ি', category: 'watch', price: 3499, oldPrice: 5999, image: 'images/watch.jpg', badge: 'sale', rating: 4.9, reviews: 312 }
  ]
};

let siteData = null;
let PRODUCTS = [...DEFAULT_DATA.products];

// Load from GitHub and apply ALL settings
async function loadSiteData() {
  try {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error('Failed');
    const data = await res.json();
    siteData = { ...DEFAULT_DATA, ...data };
    PRODUCTS = siteData.products || DEFAULT_DATA.products;
    applySiteSettings();
    renderProducts();
  } catch (err) {
    console.log('GitHub load failed, using defaults');
    siteData = { ...DEFAULT_DATA };
    applySiteSettings();
  }
}

// Apply ALL settings from data.json to the main page
function applySiteSettings() {
  if (!siteData) return;

  // Apply colors as CSS custom properties
  const c = siteData.colors || {};
  if (c.primary) document.documentElement.style.setProperty('--orange', c.primary);
  if (c.primaryDark) document.documentElement.style.setProperty('--orange-dark', c.primaryDark);
  if (c.dark) document.documentElement.style.setProperty('--dark', c.dark);
  if (c.accent) document.documentElement.style.setProperty('--green', c.accent);

  // Hero section
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge && siteData.heroBadge) {
    heroBadge.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z"/></svg> ' + siteData.heroBadge;
  }
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && siteData.heroTitle) {
    const parts = siteData.heroTitle.split('\n');
    heroTitle.innerHTML = parts[0] + (parts[1] ? '<br/><span class="gradient-text">' + parts[1] + '</span>' : '');
  }
  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc && siteData.heroDescription) heroDesc.textContent = siteData.heroDescription;

  // Hero buttons
  const heroBtns = document.querySelectorAll('.hero-buttons .btn');
  if (heroBtns[0] && siteData.buttons) {
    heroBtns[0].innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg> ' + (siteData.buttons.heroPrimary || 'এখনই কিনুন');
    heroBtns[1].innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> ' + (siteData.buttons.heroSecondary || 'ক্যাটাগরি দেখুন');
  }

  // Nav links
  const navLinksEl = document.getElementById('navLinks');
  if (navLinksEl && siteData.navLinks) {
    navLinksEl.innerHTML = siteData.navLinks.map((l, i) =>
      '<a href="' + l.href + '" class="nav-link' + (i === 0 ? ' active' : '') + '">' + l.label + '</a>'
    ).join('');
    // Re-attach mobile menu close listeners
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => navLinksEl.classList.remove('open'));
    });
  }

  // Categories section
  const categoryGrid = document.querySelector('.category-grid');
  if (categoryGrid && siteData.categories) {
    const icons = {
      watch: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      smartwatch: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6V3M15 6V3M9 18v3M15 18v3"/></svg>',
      eyewear: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
      clothing: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M20.38 3.46L16 2 12 5 8 2 3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"/></svg>'
    };
    categoryGrid.innerHTML = siteData.categories.map(cat =>
      '<a href="#products" class="category-card" data-filter="' + cat.id + '">' +
        '<div class="category-icon">' + (icons[cat.id] || icons.clothing) + '</div>' +
        '<h3>' + cat.name + '</h3>' +
        '<span class="cat-count">' + cat.count + '</span>' +
      '</a>'
    ).join('');
    // Re-attach category filter click
    categoryGrid.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const filter = card.dataset.filter;
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.filter === filter);
        });
        activeFilter = filter;
        renderProducts(filter);
      });
    });
  }

  // Filter bar
  const filterBar = document.querySelector('.filter-bar');
  if (filterBar && siteData.categories) {
    filterBar.innerHTML = '<button class="filter-btn active" data-filter="all">সব</button>' +
      siteData.categories.map(cat =>
        '<button class="filter-btn" data-filter="' + cat.id + '">' + cat.name + '</button>'
      ).join('');
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        renderProducts(activeFilter, searchInput ? searchInput.value : '');
      });
    });
  }

  // Newsletter
  const nlBtn = document.querySelector('.newsletter-form .btn');
  if (nlBtn && siteData.buttons) {
    nlBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg> ' + (siteData.buttons.newsletter || 'সাবস্ক্রাইব');
  }
  const nlInput = document.querySelector('.newsletter-form input');
  if (nlInput && siteData.buttons) nlInput.placeholder = siteData.buttons.newsletterPlaceholder || 'আপনার ইমেইল দিন...';

  // Contact info
  const contactCards = document.querySelectorAll('.contact-card p');
  if (contactCards.length >= 3) {
    if (siteData.contactPhone) contactCards[0].textContent = siteData.contactPhone;
    if (siteData.contactEmail) contactCards[1].textContent = siteData.contactEmail;
    if (siteData.contactAddress) contactCards[2].textContent = siteData.contactAddress;
  }

  // About section
  const aboutTitle = document.querySelector('.about-content .section-title');
  if (aboutTitle) aboutTitle.textContent = 'আমাদের সম্পর্কে';

  // Footer text
  const footerBrand = document.querySelector('.footer-brand p');
  if (footerBrand && siteData.footerText) footerBrand.textContent = siteData.footerText;

  // Footer social links
  if (siteData.facebook || siteData.instagram) {
    const socialLinks = document.querySelectorAll('.footer-links:last-child .social-link');
    if (socialLinks[0] && siteData.facebook) socialLinks[0].href = siteData.facebook;
    if (socialLinks[1] && siteData.instagram) socialLinks[1].href = siteData.instagram;
  }

  // Cart checkout button
  const checkoutBtn = document.querySelector('.cart-footer .btn');
  if (checkoutBtn && siteData.buttons) {
    checkoutBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg> ' + (siteData.buttons.checkout || 'চেকআউট');
  }

  // Features free delivery text
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards[0] && siteData.freeDeliveryMin) {
    const p = featureCards[0].querySelector('p');
    if (p) p.textContent = siteData.freeDeliveryMin + ' টাকার উপরে অর্ডারে ফ্রি হোম ডেলিভারি।';
  }
}

loadSiteData();

// ─── State ───────────────────────────────────────────
let cart = [];
let activeFilter = 'all';

// ─── DOM Elements ────────────────────────────────────
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const mobileToggle = document.getElementById('mobileToggle');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');
const productGrid = document.getElementById('productGrid');
const cartToggle = document.getElementById('cartToggle');
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const cartClose = document.getElementById('cartClose');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const toastContainer = document.getElementById('toastContainer');

// ─── Render Products ─────────────────────────────────
function renderProducts(filter = 'all', search = '') {
  const filtered = PRODUCTS.filter((p) => {
    const matchFilter = filter === 'all' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.category.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:#999">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <p style="margin-top:12px;font-size:15px">কোনো প্রোডাক্ট পাওয়া যায়নি</p>
      </div>`;
    return;
  }

  productGrid.innerHTML = filtered.map((p) => `
    <div class="product-card fade-in" data-category="${p.category}">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<span class="product-badge ${p.badge}">${p.badge === 'new' ? 'নতুন' : 'অফার'}</span>` : ''}
        <button class="product-quick" onclick="addToCart(${p.id})" title="কার্টে যোগ করুন">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${getCategoryLabel(p.category)}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-rating">
          ${renderStars(p.rating)}
          <span>(${p.reviews})</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            ৳${p.price.toLocaleString()}
            ${p.oldPrice ? `<span class="old">৳${p.oldPrice.toLocaleString()}</span>` : ''}
          </div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})" title="কার্টে যোগ করুন">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Trigger fade-in animation
  requestAnimationFrame(() => {
    productGrid.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  });
}

function getCategoryLabel(cat) {
  if (siteData && siteData.categories) {
    const found = siteData.categories.find(c => c.id === cat);
    if (found) return found.name;
  }
  const labels = { watch: 'ঘড়ি', smartwatch: 'স্মার্টওয়াচ', eyewear: 'চশমা', clothing: 'পোশাক' };
  return labels[cat] || cat;
}

function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<svg width="14" height="14" viewBox="0 0 24 24" fill="${i <= Math.round(rating) ? '#F59E0B' : 'none'}" stroke="${i <= Math.round(rating) ? '#F59E0B' : '#ddd'}" stroke-width="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`;
  }
  return html;
}

// ─── Cart ────────────────────────────────────────────
function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  showToast(`${product.name} কার্টে যোগ হয়েছে`);
}

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  updateCart();
}

function updateCart() {
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const count = cart.reduce((sum, c) => sum + c.qty, 0);

  // Update count badge
  cartCount.textContent = count;
  cartCount.classList.toggle('show', count > 0);

  // Update cart items
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1" stroke-linecap="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
        </svg>
        <p>আপনার কার্ট খালি</p>
      </div>`;
    cartFooter.style.display = 'none';
  } else {
    cartItems.innerHTML = cart.map((c) => `
      <div class="cart-item">
        <img src="${c.image}" alt="${c.name}" />
        <div class="cart-item-info">
          <div class="cart-item-name">${c.name} x${c.qty}</div>
          <div class="cart-item-price">৳${(c.price * c.qty).toLocaleString()}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${c.id})" title="সরান">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
    `).join('');
    cartFooter.style.display = 'block';
    cartTotal.textContent = `৳${total.toLocaleString()}`;
  }
}

// ─── Cart Sidebar Toggle ─────────────────────────────
function openCart() { cartSidebar.classList.add('open'); cartOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeCart() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('open'); document.body.style.overflow = ''; }

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// ─── Search ──────────────────────────────────────────
searchToggle.addEventListener('click', () => {
  searchBar.classList.toggle('open');
  if (searchBar.classList.contains('open')) searchInput.focus();
});
searchClose.addEventListener('click', () => {
  searchBar.classList.remove('open');
  searchInput.value = '';
  renderProducts(activeFilter, '');
});
searchInput.addEventListener('input', () => {
  renderProducts(activeFilter, searchInput.value);
});

// ─── Filter Buttons ──────────────────────────────────
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts(activeFilter, searchInput.value);
  });
});

// ─── Mobile Menu ─────────────────────────────────────
mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── Navbar Scroll ───────────────────────────────────
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  navbar.classList.toggle('scrolled', scroll > 20);
  lastScroll = scroll;
});

// ─── Active Nav Link on Scroll ───────────────────────
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// ─── Toast Notification ──────────────────────────────
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
    ${message}`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ─── Intersection Observer for Fade-In ────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

// ─── Init ────────────────────────────────────────────
renderProducts();
updateCart();
