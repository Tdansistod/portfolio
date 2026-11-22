// ───────── Aparición al hacer scroll ─────────
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// ───────── Videos: si el archivo no existe, mostrar "Video próximamente" ─────────
function showPlaceholder(video) {
  const placeholder = video.nextElementSibling;
  if (!placeholder || !placeholder.classList.contains('project-media-placeholder')) return;
  video.style.display = 'none';
  placeholder.style.display = 'flex';
}

document.querySelectorAll('.project-video').forEach((video) => {
  const source = video.querySelector('source');
  if (source) source.addEventListener('error', () => showPlaceholder(video));
  video.addEventListener('error', () => showPlaceholder(video));
  // Por si el error ocurrió antes de que se registraran los listeners.
  window.addEventListener('load', () => {
    if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) showPlaceholder(video);
  });
});
