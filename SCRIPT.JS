/* ============================================
   1. MOBILE MENU
   Needs a menu button in the HTML. Add this
   inside .nav, right after </a> for .logo:
   <button class="menu-btn" id="menuBtn">Menu</button>
   And add class="nav-links" id="navLinks" is
   already on your <ul> — no other change needed.
   ============================================ */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ============================================
   2. SEARCH / FILTER ON THE LISTINGS
   Reads the search box and two selects in your
   .search bar, then hides cards that don't match.
   Add data-type="House" and data-status="sale"
   (or "rent") to each .card in your HTML, e.g:
   <article class="card" data-type="House" data-status="sale">
   ============================================ */
const searchInput = document.querySelector('.search input');
const typeSelect = document.querySelectorAll('.search select')[0];
const priceSelect = document.querySelectorAll('.search select')[1];
const searchBtn = document.querySelector('.search .btn');
const cards = document.querySelectorAll('#listings > .wrap > .grid:not(.photo-grid) > .card');

function priceOf(card) {
  const text = card.querySelector('.price').textContent;
  return Number(text.replace(/[^0-9]/g, ''));
}

function filterListings() {
  const term = searchInput.value.trim().toLowerCase();
  const type = typeSelect.value;
  const priceLimit = Number(priceSelect.value.replace(/[^0-9]/g, '')) || 0;

  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const area = card.querySelector('.area').textContent.toLowerCase();
    const matchesTerm = !term || title.includes(term) || area.includes(term);
    const matchesType = type === 'Any type' || card.dataset.type === type;
    const matchesPrice = !priceLimit || priceOf(card) <= priceLimit;

    card.style.display = (matchesTerm && matchesType && matchesPrice) ? '' : 'none';
  });
}

if (searchBtn) {
  searchBtn.addEventListener('click', e => {
    e.preventDefault();
    filterListings();
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
  });
}

/* ============================================
   3. CLICK A PROPERTY PHOTO TO ENLARGE IT
   No HTML changes needed — this builds its own
   popup and adds it to the page automatically.
   ============================================ */
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = '<img alt=""><button aria-label="Close">&times;</button>';
Object.assign(lightbox.style, {
  position: 'fixed', inset: '0', display: 'none',
  background: 'rgba(10,25,22,0.85)', alignItems: 'center',
  justifyContent: 'center', zIndex: '999', cursor: 'zoom-out'
});
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector('img');
Object.assign(lbImg.style, { maxWidth: '90%', maxHeight: '85%', borderRadius: '10px' });

const lbClose = lightbox.querySelector('button');
Object.assign(lbClose.style, {
  position: 'absolute', top: '16px', right: '24px', fontSize: '2rem',
  background: 'none', border: 'none', color: '#fff', cursor: 'pointer'
});

document.querySelectorAll('.card .pic img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.style.display = 'flex';
  });
});

function closeLightbox() { lightbox.style.display = 'none'; }
lbClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

/* ============================================
   4. AUTO-UPDATE THE YEAR IN THE FOOTER
   Replace "2026" in your footer with:
   <span id="year"></span>
   ============================================ */
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();