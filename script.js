import EmblaCarousel from 'https://cdn.jsdelivr.net/npm/embla-carousel/+esm';

// live clock — anchored to Argentina time
const clockEl = document.querySelector('[data-clock]');
if (clockEl) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  const tick = () => { clockEl.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 30_000);
}

// projects carousel
const emblaRoot = document.querySelector('[data-embla]');
if (emblaRoot) {
  const viewport = emblaRoot.querySelector('.embla__viewport');
  const embla = EmblaCarousel(viewport, {
    align: 'start',
    loop: false,
    skipSnaps: false,
    containScroll: 'trimSnaps',
  });

  const prevBtn = emblaRoot.querySelector('[data-embla-prev]');
  const nextBtn = emblaRoot.querySelector('[data-embla-next]');
  const currentEl = emblaRoot.querySelector('[data-embla-current]');
  const totalEl = emblaRoot.querySelector('[data-embla-total]');
  const slides = emblaRoot.querySelectorAll('.embla__slide');

  const pad = (n) => String(n).padStart(2, '0');

  const syncVideos = (activeIdx) => {
    slides.forEach((slide, i) => {
      const v = slide.querySelector('video');
      if (!v) return;
      if (i === activeIdx) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });
  };

  const update = () => {
    const idx = embla.selectedScrollSnap();
    if (currentEl) {
      const next = pad(idx + 1);
      if (currentEl.textContent !== next) {
        currentEl.classList.remove('is-ticking');
        void currentEl.offsetWidth; // restart animation
        currentEl.textContent = next;
        currentEl.classList.add('is-ticking');
      }
    }
    if (prevBtn) prevBtn.disabled = !embla.canScrollPrev();
    if (nextBtn) nextBtn.disabled = !embla.canScrollNext();
    syncVideos(idx);
  };

  if (totalEl) totalEl.textContent = pad(embla.scrollSnapList().length);
  if (prevBtn) prevBtn.addEventListener('click', () => embla.scrollPrev());
  if (nextBtn) nextBtn.addEventListener('click', () => embla.scrollNext());

  embla.on('select', update);
  embla.on('reInit', update);
  update();
}
