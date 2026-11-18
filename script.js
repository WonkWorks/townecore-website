const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navLinks.classList.toggle('is-open', !open);
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
      closeMenu();
      menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });
}

const lightbox = document.querySelector('.image-lightbox');
const lightboxImage = lightbox?.querySelector('.lightbox-image');
const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
let activeImage = null;

if (lightbox && lightboxImage && lightboxCaption && lightboxClose) {
  const openLightbox = (image) => {
    activeImage = image;
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = image.alt;
    lightbox.showModal();
  };

  document.querySelectorAll('main img').forEach((image) => {
    image.classList.add('zoomable-image');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Enlarge image: ${image.alt}`);

    image.addEventListener('click', () => openLightbox(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  lightboxClose.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    lightboxImage.src = '';
    activeImage?.focus();
    activeImage = null;
  });
}
