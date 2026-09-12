/* =========================================================
   RIZWAN ANSARI — PREMIUM PORTFOLIO
   Vanilla JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const body = document.body;

  /* ---------- PAGE LOADER ---------- */

  const loader = document.getElementById("pageLoader");

  function hideLoader() {
    if (loader) {
      loader.classList.add("hide");
    }

    body.classList.add("loaded");
  }

  window.addEventListener("load", hideLoader);

  // Safety fallback so the loader can never remain stuck
  setTimeout(hideLoader, 2000);


  /* ---------- CURRENT YEAR ---------- */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* ---------- MOBILE MENU ---------- */

  const menuToggle =
    document.querySelector(".menu-toggle") ||
    document.querySelector(".nav-toggle");

  const navMenu =
    document.getElementById("navMenu") ||
    document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", function () {

      const isOpen = navMenu.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      body.classList.toggle("menu-open", isOpen);

    });


    const menuLinks = navMenu.querySelectorAll("a");

    menuLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        navMenu.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

        body.classList.remove("menu-open");

      });

    });

  }


  /* ---------- SCROLL PROGRESS ---------- */

  const progressBar =
    document.getElementById("scrollProgress") ||
    document.querySelector(".scroll-progress");

  const header =
    document.querySelector(".site-header") ||
    document.querySelector("header");

  const backToTop =
    document.querySelector(".back-to-top");


  function updateScroll() {

    const scrollTop = window.scrollY;

    const pageHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    let progress = 0;

    if (pageHeight > 0) {
      progress = (scrollTop / pageHeight) * 100;
    }

    if (progressBar) {
      progressBar.style.width = progress + "%";
    }


    if (header) {

      if (scrollTop > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

    }


    if (backToTop) {

      if (scrollTop > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }

    }

  }


  window.addEventListener(
    "scroll",
    updateScroll,
    { passive: true }
  );

  updateScroll();


  /* ---------- REVEAL ANIMATIONS ---------- */

  const revealItems =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        function (entries, observer) {

          entries.forEach(function (entry) {

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


    revealItems.forEach(function (item) {

      revealObserver.observe(item);

    });

  } else {

    revealItems.forEach(function (item) {

      item.classList.add("visible");

    });

  }


  /* ---------- ACTIVE NAVIGATION ---------- */

  const navLinks =
    Array.from(
      document.querySelectorAll(
        ".nav-menu a[href^='#'], #navMenu a[href^='#']"
      )
    );


  const sections =
    navLinks
      .map(function (link) {

        const id =
          link.getAttribute("href");

        return document.querySelector(id);

      })
      .filter(Boolean);


  if (
    "IntersectionObserver" in window &&
    sections.length > 0
  ) {

    const sectionObserver =
      new IntersectionObserver(
        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              navLinks.forEach(function (link) {

                const target =
                  link.getAttribute("href");

                link.classList.toggle(
                  "active",
                  target === "#" + entry.target.id
                );

              });

            }

          });

        },
        {
          threshold: 0,
          rootMargin:
            "-25% 0px -60% 0px"
        }
      );


    sections.forEach(function (section) {

      sectionObserver.observe(section);

    });

  }


  /* ---------- BACK TO TOP ---------- */

  if (backToTop) {

    backToTop.addEventListener(
      "click",
      function () {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* ---------- CONTACT FORM ---------- */

  const contactForm =
    document.getElementById("contactForm");

  const formNote =
    document.getElementById("formNote");


  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const nameField =
          contactForm.querySelector(
            "[name='name']"
          );

        const emailField =
          contactForm.querySelector(
            "[name='email']"
          );

        const subjectField =
          contactForm.querySelector(
            "[name='subject']"
          );

        const messageField =
          contactForm.querySelector(
            "[name='message']"
          );


        const name =
          nameField
            ? nameField.value.trim()
            : "";

        const email =
          emailField
            ? emailField.value.trim()
            : "";

        const subject =
          subjectField
            ? subjectField.value.trim()
            : "";

        const message =
          messageField
            ? messageField.value.trim()
            : "";


        if (!name || !email || !message) {

          if (formNote) {

            formNote.textContent =
              "Please complete your name, email, and message.";

          }

          return;

        }


        const emailSubject =
          subject ||
          "Portfolio enquiry from " + name;


        const emailBody =
          "Name: " + name +
          "\nEmail: " + email +
          "\n\nMessage:\n" +
          message;


        if (formNote) {

          formNote.textContent =
            "Opening your email application...";

        }


        const mailto =
          "mailto:rriizzwan@gmail.com" +
          "?subject=" +
          encodeURIComponent(emailSubject) +
          "&body=" +
          encodeURIComponent(emailBody);


        window.location.href = mailto;

      }
    );

  }


  /* ---------- DOWNLOAD CV ---------- */

  const cvButton =
    document.getElementById(
      "downloadCvButton"
    );


  if (cvButton) {

    cvButton.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        alert(
          "Your CV has not been added yet.\n\n" +
          "Upload your CV as Rizwan-Ansari-CV.pdf " +
          "to the same GitHub repository."
        );

      }
    );

  }


  /* ---------- SOCIAL PLACEHOLDERS ---------- */

  const placeholderLinks =
    document.querySelectorAll(
      "[data-placeholder]"
    );


  placeholderLinks.forEach(
    function (link) {

      link.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

          const platform =
            link.getAttribute(
              "data-placeholder"
            ) || "Social profile";


          alert(
            platform +
            " link has not been added yet.\n\n" +
            "Replace the # link in index.html " +
            "with your real profile URL."
          );

        }
      );

    }
  );


  /* ---------- PREVENT EMPTY LINKS ---------- */

  document
    .querySelectorAll('a[href="#"]')
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          event.preventDefault();

        }
      );

    });


});
