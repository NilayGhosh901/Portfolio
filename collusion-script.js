/**
 * COLLUSION X RAYAN - Interactive Brutalist Experience Script
 * Handles customizer color shifting, Jibbitz placement, cart, modals, and hot-spots.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Color Customizer Logic
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  const clogImage = document.querySelector('.clog-primary-image');
  const activeColorLabel = document.getElementById('active-color-label');

  const colorProfiles = {
    white: {
      filter: 'none',
      name: 'Pure Cloud White'
    },
    lime: {
      filter: 'hue-rotate(65deg) saturate(220%) brightness(1.05)',
      name: 'Acid Cyber Lime'
    },
    lilac: {
      filter: 'hue-rotate(220deg) saturate(140%) brightness(1.1)',
      name: 'Pastel Lilac Mist'
    },
    pink: {
      filter: 'hue-rotate(300deg) saturate(180%) brightness(1.05)',
      name: 'Bubblegum Punch Pink'
    },
    black: {
      filter: 'brightness(0.22) contrast(1.6)',
      name: 'Stealth Onyx Black'
    }
  };

  swatchButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const colorKey = btn.dataset.color;
      if (colorProfiles[colorKey] && clogImage) {
        clogImage.style.filter = colorProfiles[colorKey].filter;
        if (activeColorLabel) {
          activeColorLabel.textContent = colorProfiles[colorKey].name;
        }
        showToast(`Selected Color: ${colorProfiles[colorKey].name}`);
      }
    });
  });

  // 2. Interactive Jibbitz Charms Tray
  const charmChips = document.querySelectorAll('.charm-chip');
  const charmSlots = document.querySelectorAll('.clog-charm-pin-slot');
  let charmIndex = 0;

  charmChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const emoji = chip.dataset.emoji;
      
      // Find empty slot or overwrite sequentially
      const targetSlot = charmSlots[charmIndex % charmSlots.length];
      targetSlot.textContent = emoji;
      targetSlot.classList.add('visible');
      
      chip.classList.toggle('active-charm');
      showToast(`Added Charm: ${chip.textContent.trim()} to Clog`);
      
      charmIndex++;
    });
  });

  // Clicking placed charm removes it
  charmSlots.forEach(slot => {
    slot.style.pointerEvents = 'auto';
    slot.style.cursor = 'pointer';
    slot.addEventListener('click', () => {
      slot.classList.remove('visible');
      slot.textContent = '';
      showToast('Charm detached');
    });
  });

  // 3. Hotspot Callout interactions
  const hotspots = document.querySelectorAll('.hotspot-badge');
  hotspots.forEach(spot => {
    spot.addEventListener('click', () => {
      const callout = spot.querySelector('.callout-bubble-card');
      if (callout) {
        callout.classList.toggle('active-mobile');
        const num = spot.querySelector('.badge-pin-circle').textContent.trim();
        showToast(`Feature Point #${num} highlighted`);
      }
    });
  });

  // 4. Customizer Form Submission
  const orderForm = document.getElementById('custom-order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cust-name').value || 'Friend';
      showToast(`⚡ Thanks ${name}! Your custom Clog spec was dispatched.`);
      orderForm.reset();
      updateCartCount(1);
    });
  }

  // 5. Cart Drawer Logic
  const cartBtn = document.querySelector('.cart-button');
  const shopAllBtn = document.querySelector('.btn-shop-all');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartCountEl = document.getElementById('cart-count-val');
  let cartCount = 0;

  function openCart() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.add('open');
      cartBackdrop.classList.add('open');
    }
  }

  function closeCart() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove('open');
      cartBackdrop.classList.remove('open');
    }
  }

  function updateCartCount(qty) {
    cartCount += qty;
    if (cartCountEl) {
      cartCountEl.textContent = cartCount;
    }
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (shopAllBtn) shopAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openCart();
  });
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  // 6. Get In Touch Modal Logic
  const getInTouchBtn = document.getElementById('btn-get-in-touch');
  const contactModal = document.getElementById('contact-modal');
  const contactModalClose = document.getElementById('contact-modal-close');
  const dropAlertForm = document.getElementById('drop-alert-form');

  if (getInTouchBtn && contactModal) {
    getInTouchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactModal.classList.add('open');
    });
  }

  if (contactModalClose && contactModal) {
    contactModalClose.addEventListener('click', () => {
      contactModal.classList.remove('open');
    });
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('open');
      }
    });
  }

  if (dropAlertForm) {
    dropAlertForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactModal.classList.remove('open');
      showToast('🔥 You are locked in for the next Summer drop!');
      dropAlertForm.reset();
    });
  }

  // 7. Lightbox for Editorial Lookbook Cards
  const editorialCards = document.querySelectorAll('.editorial-card');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxClose = document.getElementById('lightbox-close');

  editorialCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.card-photo');
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxTitle) {
          lightboxTitle.textContent = card.dataset.title || 'COLLUSION SUMMER 2024';
        }
        lightboxModal.classList.add('open');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('open');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('open');
      }
    });
  }

  // 8. 3D Tilt Effect on Editorial Cards
  editorialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / rect.height) * 12;
      const rotateY = (x / rect.width) * 12;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // 9. Floating Chrome Chain Mouse Parallax
  const chainCanvas = document.querySelector('.chain-svg-canvas');
  if (chainCanvas) {
    window.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.02;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
      chainCanvas.style.transform = `rotate(-18deg) translate(${moveX}px, ${moveY}px)`;
    });
  }

  // Helper Toast System
  function showToast(message) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
});

