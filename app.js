// Smooth scroll active nav highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
  threshold: 0.6, // Trigger when 60% of section is visible
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === entry.target.id) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Typing animation
const typingElement = document.getElementById("typing");
const typingTexts = ["Software & Web Developer  ", "3D & 2D Artist  ", "Game Developer  "];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = typingTexts[textIndex];
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, 1000); // pause before deleting
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
  }

  setTimeout(type, isDeleting ? 80 : 120);
}
type();

function showArtGallery() {
  document.getElementById("projects").classList.add("inactive");
  document.getElementById("art-gallery").classList.remove("inactive");

  // keep user where they are, no scroll reset
}

function hideArtGallery() {
  document.getElementById("art-gallery").classList.add("inactive");
  document.getElementById("projects").classList.remove("inactive");

  // when going back, scroll up to the Projects header
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src; // show clicked image
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

// Scroll reveal animations
const hiddenElements = document.querySelectorAll(".hidden");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target); // reveal once
    }
  });
}, { threshold: 0.2 });

hiddenElements.forEach((el) => revealObserver.observe(el));
