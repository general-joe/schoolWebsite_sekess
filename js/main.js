// Parallax Effect
window.addEventListener("scroll", () => {
  const parallax = document.querySelector(".parallax-bg");
  if (parallax) {
    const scrolled = window.pageYOffset;
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  // Modal Handling
  const modals = document.querySelectorAll(".modal");
  const loginBtn = document.querySelector(".login-btn");
  const signupBtn = document.querySelector(".signup-btn");
  const loginModal = document.querySelector("#login");
  const signupModal = document.querySelector("#signup");
  const switchToSignup = document.querySelector(".switch-to-signup");
  const switchToLogin = document.querySelector(".switch-to-login");

  function openModal(modalId) {
    const modal = document.querySelector(modalId);
    if (modal) {
      closeAllModals(); // Close any open modals first
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function closeAllModals() {
    modals.forEach((modal) => {
      modal.classList.remove("active");
    });
  }

  // Login button click
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("#login");
    });
  }

  // Signup button click
  if (signupBtn) {
    signupBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal("#signup");
    });
  }

  // Switch to Signup form
  if (switchToSignup) {
    switchToSignup.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal(loginModal);
      openModal("#signup");
    });
  }

  // Switch to Login form
  if (switchToLogin) {
    switchToLogin.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal(signupModal);
      openModal("#login");
    });
  }

  // Close modal when clicking outside
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

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Login submitted");
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Signup submitted");
    });
  }

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href").length > 1) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          // Close mobile menu if open
          if (window.innerWidth <= 768) {
            navLinks?.classList.remove("active");
            menuToggle?.classList.remove("active");
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

  // Hero Section Text Animation
  function animateHeroText() {
    const textElements = document.querySelectorAll(".text-reveal");
    let currentIndex = 0;

    function showText(element) {
      const letters = element.querySelector(".letters");
      if (!letters) return;

      element.style.opacity = "1";
      element.style.transform = "translateY(0)";

      const text = letters.textContent;
      letters.textContent = "";

      text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.opacity = "0";
        span.style.transform = "translateY(20px)";
        span.style.transition = `all 0.3s ease ${i * 0.05}s`;
        letters.appendChild(span);

        // Trigger animation after a small delay
        setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
        }, 10);
      });
    }

    function hideText(element) {
      const letters = element.querySelector(".letters");
      if (!letters) return;

      const spans = letters.querySelectorAll("span");
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.style.opacity = "0";
          span.style.transform = "translateY(-20px)";
        }, i * 30);
      });
    }

    function animateNextText() {
      // Hide previous text if exists
      if (currentIndex > 0) {
        hideText(textElements[currentIndex - 1]);
      }

      // Show current text
      showText(textElements[currentIndex]);

      // Move to next text after delay
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % textElements.length;
        if (currentIndex === 0) {
          // Reset all texts when cycle completes
          textElements.forEach(hideText);
          setTimeout(animateNextText, 1000);
        } else {
          animateNextText();
        }
      }, 3000);
    }

    // Start animation
    animateNextText();
  }

  // Start hero animation when DOM is loaded
  setTimeout(animateHeroText, 1000);

  // Staff Filters Functionality
  const filterBtns = document.querySelectorAll(".filter-btn");
  const staffCards = document.querySelectorAll(".staff-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      staffCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
          }, 100);
        } else {
          if (card.getAttribute("data-department") === filter) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
            }, 100);
          } else {
            card.style.opacity = "0";
            setTimeout(() => {
              card.style.display = "none";
            }, 500);
          }
        }
      });
    });
  });

  // Menu Tabs Functionality
  const tabBtns = document.querySelectorAll(".tab-btn");
  const menuDays = document.querySelectorAll(".menu-day");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      menuDays.forEach((day) => {
        day.classList.remove("active");
        day.style.display = "none";
      });

      btn.classList.add("active");
      const dayId = btn.getAttribute("data-day");
      const targetDay = document.getElementById(dayId);
      if (targetDay) {
        targetDay.style.display = "grid";
        setTimeout(() => {
          targetDay.classList.add("active");
        }, 50);
      }
    });
  });

  // Initialize animations for elements
  const animatedElements = document.querySelectorAll(
    ".feature-card, .about-text, .about-image, .stats-container, .course-card, .value-card, .meal-card, .staff-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach((element) => observer.observe(element));
});
