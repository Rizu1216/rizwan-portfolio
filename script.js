/* =========================================================
   RIZWAN ANSARI — PREMIUM PORTFOLIO
   Vanilla JavaScript — no libraries required
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const progressBar = document.querySelector(".scroll-progress");
  const backToTop = document.querySelector(".back-to-top");
  const currentYear = document.getElementById("currentYear");
  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const cvButton = document.getElementById("downloadCvButton");

  /* ---------- Page loader ---------- */
  const hideLoader = () => {
    body.classList.add("loaded");
  };

  window.addEventListener("load", hideLoader);
  setTimeout(hideLoader, 1800);

  /* ---------- Current year ---------- */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* ---------- Mobile navigation ---------- */
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      body.classList.toggle("menu-open", isOpen);
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      });
    });
  }

  /* ---------- Scroll effects ---------- */
  const updateScrollUI = () => {
    const scrollTop = window.scrollY;
    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (header) {
      header.classList.toggle("scrolled", scrollTop > 30);
    }

    if (backToTop) {
      backToTop.classList.toggle("show", scrollTop > 500);
    }
  };

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  /* ---------- Reveal animations ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  /* ---------- Active navigation ---------- */
  const navLinks = [...document.querySelectorAll(".nav-menu a[href^='#']")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${entry.target.id}`
              );
            });
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "-25% 0px -60% 0px"
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Back to top ---------- */
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* ---------- Contact form ---------- */
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameField = contactForm.querySelector("[name='name']");
      const emailField = contactForm.querySelector("[name='email']");
      const subjectField = contactForm.querySelector("[name='subject']");
      const messageField = contactForm.querySelector("[name='message']");

      const name = nameField ? nameField.value.trim() : "";
      const email = emailField ? emailField.value.trim() : "";
      const subject = subjectField ? subjectField.value.trim() : "";
      const message = messageField ? messageField.value.trim() : "";

      if (!name || !email || !message) {
        if (formNote) {
          formNote.textContent =
            "Please complete your name, email, and message.";
        }
        return;
      }

      const emailSubject =
        subject || `Portfolio enquiry from ${name}`;

      const emailBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message
      ].join("\n");

      const mailto =
        `mailto:rriizzwan@gmail.com` +
        `?subject=${encodeURIComponent(emailSubject)}` +
        `&body=${encodeURIComponent(emailBody)}`;

      if (formNote) {
        formNote.textContent =
          "Opening your email app. Your message is not stored on this website.";
      }

      window.location.href = mailto;
    });
  }

  /* ---------- CV button ---------- */
  if (cvButton) {
    cvButton.addEventListener("click", (event) => {
      event.preventDefault();

      const cvFileName = "Rizwan-Ansari-CV.pdf";

      /*
        No CV file has been added to the repository yet.
        After uploading Rizwan-Ansari-CV.pdf, replace this handler
        with: window.location.href = cvFileName;
      */
      alert(
        `Your CV is not added to the website yet.\n\n` +
        `Upload "${cvFileName}" to the same GitHub repository, ` +
        `then this button can download it.`
      );
    });
  }

  /* ---------- Placeholder social links ---------- */
  document.querySelectorAll("[data-placeholder]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const platform =
        link.getAttribute("data-placeholder") || "social profile";

      alert(
        `${platform} link has not been added yet.\n\n` +
        `You can replace the # link in index.html with your real profile URL.`
      );
    });
  });

  /* ---------- Prevent accidental empty hash jumps ---------- */
  document.querySelectorAll('a[href="#"]').forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });
});
