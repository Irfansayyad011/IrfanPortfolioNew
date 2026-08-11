// ===== TYPING EFFECT =====
const typedText = document.getElementById("typed-text");
const texts = ["Full-Stack Developer", "DSA Enthusiast", "MERN Stack Developer"];
let t = 0, c = 0, isDeleting = false;

function type() {
  const currentText = texts[t];
  
  if (isDeleting) {
    typedText.textContent = currentText.substring(0, c - 1);
    c--;
  } else {
    typedText.textContent = currentText.substring(0, c + 1);
    c++;
  }

  let typeSpeed = 100;
  
  if (isDeleting) {
    typeSpeed /= 2; // Delete faster
  }

  if (!isDeleting && c === currentText.length) {
    typeSpeed = 2000; // Pause at end of text
    isDeleting = true;
  } else if (isDeleting && c === 0) {
    isDeleting = false;
    t++;
    if (t === texts.length) {
      t = 0; // Loop back
    }
    typeSpeed = 500; // Pause before starting new word
  }

  setTimeout(type, typeSpeed);
}

// Initialize typing effect
document.addEventListener("DOMContentLoaded", () => {
  if (typedText) {
    setTimeout(type, 1000);
  }
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  // Navbar background
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  
  // Back to top button visibility
  if (window.scrollY > 500) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

// Back to top click event
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });
}

// Close menu when clicking a link
navItems.forEach(item => {
  item.addEventListener("click", () => {
    if (hamburger && navLinks) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    }
  });
});

// ===== SCROLL SPY (ACTIVE MENU ITEM) =====
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    // Check if scroll is within section (with a small offset)
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(li => {
    li.classList.remove("active");
    if (li.getAttribute("href") === `#${current}`) {
      li.classList.add("active");
    }
  });
});

// ===== FADE IN ANIMATION ON SCROLL =====
// Add fade-in class to all cards and elements we want to animate
const elementsToAnimate = document.querySelectorAll('.glass-card, .section-title, .hero-text, .hero-image');
elementsToAnimate.forEach(el => {
  el.classList.add('fade-in');
});

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

elementsToAnimate.forEach(el => {
  observer.observe(el);
});
