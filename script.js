document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links a");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");
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

  // Close mobile nav when a menu item is tapped.
  if (navLinks && navList) {
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) navList.classList.remove("open");
      });
    });
  }

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

  // Courses filtering (only applies on courses.html).
  if (filterButtons.length && courseCards.length) {
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
  }
});

