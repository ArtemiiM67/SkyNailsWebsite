const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");
const revealItems = document.querySelectorAll(".reveal");
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const hourRows = document.querySelectorAll(".hour-row");
const todayStatus = document.getElementById("todayStatus");
const faqButtons = document.querySelectorAll(".faq-question");

// Mobile nav
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    const clickedInsideMenu = navMenu.contains(e.target);
    const clickedToggle = menuToggle.contains(e.target);

    if (!clickedInsideMenu && !clickedToggle) {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// Back to top visibility
window.addEventListener("scroll", () => {
  if (!backToTop) return;

  if (window.scrollY > 500) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

// Scroll reveal
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Gallery lightbox
function closeLightbox() {
  if (!lightbox || !lightboxImage) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;

    const imgPath = item.getAttribute("data-image");
    lightboxImage.src = imgPath;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && lightbox.classList.contains("open")) {
    closeLightbox();
  }
});

// Highlight today's hours
const today = new Date().getDay();

hourRows.forEach((row) => {
  if (Number(row.dataset.day) === today) {
    row.classList.add("active");
  }
});

if (todayStatus) {
  todayStatus.textContent = "Open Today • 9:30 AM – 8:00 PM";
}

// FAQ accordion
faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    if (!item) return;

    const isOpen = item.classList.contains("open");

    faqButtons.forEach((btn) => {
      const parent = btn.closest(".faq-item");
      if (!parent) return;
      parent.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
    }
  });
});