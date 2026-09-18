// ───────── Lightbox: กดรูปเพื่อขยาย ─────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightboxCaption.textContent = alt || '';
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.work__media img, .certcard img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.currentSrc || img.src, img.alt));
});

lightboxClose.addEventListener('click', closeLightbox);

// คลิกพื้นหลัง (นอกรูป) เพื่อปิด
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

// กด Esc เพื่อปิด
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
});

// ปุ่มลูกศรเลื่อนแถบใบรับรอง
const track = document.getElementById('certsTrack');
const prevBtn = document.querySelector('.certs__nav--prev');
const nextBtn = document.querySelector('.certs__nav--next');

function scrollByCard(dir) {
  if (!track) return;
  const card = track.querySelector('.certcard');
  const step = card ? card.getBoundingClientRect().width + 18 : 280;
  track.scrollBy({ left: dir * step, behavior: 'smooth' });
}

prevBtn?.addEventListener('click', () => scrollByCard(-1));
nextBtn?.addEventListener('click', () => scrollByCard(1));

// ไฮไลต์เมนูตามหัวข้อที่กำลังอ่านอยู่
const links = [...document.querySelectorAll('.topbar__links a')];
const sections = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id);
      });
    });
  },
  { rootMargin: '-20% 0px -70% 0px' }
);

sections.forEach(section => observer.observe(section));
