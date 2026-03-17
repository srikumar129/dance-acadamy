document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-links");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");
  const contactForm = document.getElementById("contact-form");
  const successMessage = document.getElementById("form-success");
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const smoothScroll = (targetId) => {
    const target = document.querySelector(targetId);
    if (!target) return;

    const headerOffset = header ? header.offsetHeight + 8 : 0;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const scrollTo = targetPosition - headerOffset;

    window.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      if (!href) return;
      smoothScroll(href);
      if (window.innerWidth <= 768) {
        navList.classList.remove("open");
      }
    });
  });

  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScroll("#top");
    });
  }

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("open");
    });
  }

  const sections = document.querySelectorAll("main section[id]");
  const highlightActiveNav = () => {
    const scrollPos = window.scrollY;
    let currentId = null;

    sections.forEach((section) => {
      const offsetTop = section.offsetTop - (header ? header.offsetHeight + 40 : 40);
      if (scrollPos >= offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const id = href.replace("#", "");
      if (id === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  highlightActiveNav();
  window.addEventListener("scroll", () => {
    highlightActiveNav();
  });

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.filter || "all";

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      courseCards.forEach((card) => {
        const cardCats = (card.dataset.category || "").split(" ");
        if (category === "all" || cardCats.includes(category)) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  const showFieldError = (fieldName, message) => {
    const errorSpan = document.querySelector(`.field-error[data-for='${fieldName}']`);
    if (errorSpan) {
      errorSpan.textContent = message || "";
    }
  };

  const clearErrors = () => {
    document.querySelectorAll(".field-error").forEach((el) => {
      el.textContent = "";
    });
  };

  const validateForm = () => {
    if (!contactForm) return false;

    clearErrors();
    let valid = true;

    const name = contactForm.name.value.trim();
    const phone = contactForm.phone.value.trim();
    const email = contactForm.email.value.trim();
    const branch = contactForm.branch.value.trim();

    if (!name) {
      showFieldError("name", "Please enter your name.");
      valid = false;
    }

    if (!phone) {
      showFieldError("phone", "Please enter your phone number.");
      valid = false;
    } else if (!/^[0-9+\-\s]{7,15}$/.test(phone)) {
      showFieldError("phone", "Please enter a valid phone number.");
      valid = false;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFieldError("email", "Please enter a valid email address.");
      valid = false;
    }

    if (!branch) {
      showFieldError("branch", "Please select a branch.");
      valid = false;
    }

    return valid;
  };

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validateForm()) {
        if (successMessage) {
          successMessage.textContent = "";
        }
        return;
      }

      contactForm.reset();
      clearErrors();
      if (successMessage) {
        successMessage.textContent = "Thank you! We have received your details and will contact you shortly.";
      }
    });
  }
});

