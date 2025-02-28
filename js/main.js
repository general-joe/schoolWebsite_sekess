// Parallax Effect
window.addEventListener("scroll", () => {
  const parallax = document.querySelector(".parallax-bg");
  const scrolled = window.pageYOffset;
  parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Mobile Menu Toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active");
});

// Modal Handling
const modals = document.querySelectorAll(".modal");
const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");

function openModal(modalId) {
  const modal = document.querySelector(modalId);
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Open modals
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openModal("#login");
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openModal("#signup");
});

// Close modals when clicking outside
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Handle form submissions
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Add your login logic here
  console.log("Login submitted");
});

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Add your signup logic here
  console.log("Signup submitted");
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href").length > 1) {
      // Ignore empty "#" links
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
          navLinks.classList.remove("active");
          menuToggle.classList.remove("active");
        }
      }
    }
  });
});

// Active Navigation Link Highlight
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("href").slice(1) === current) {
      item.classList.add("active");
    }
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with animation classes
document
  .querySelectorAll(
    ".feature-card, .about-text, .stats-container, .course-card"
  )
  .forEach((element) => {
    observer.observe(element);
  });
