document.addEventListener("DOMContentLoaded", function () {
  const welcomePage = document.getElementById("welcome-page");
  const dynamicallyRenderedPages = document.querySelectorAll(
    ".page:not(#welcome-page):not(#end-of-chapter1)",
  );
  const endOfChapter1 = document.getElementById("end-of-chapter1");

  // Hide all pages except the welcome page initially
  document.querySelectorAll(".page").forEach((page) => {
    if (page !== welcomePage) {
      page.classList.remove("active");
    }
  });

  // Start Journey button
  document
    .getElementById("start-journey-button")
    .addEventListener("click", () => {
      welcomePage.classList.remove("active");
      if (dynamicallyRenderedPages.length > 0) {
        dynamicallyRenderedPages[0].classList.add("active");
      } else {
        endOfChapter1.classList.add("active");
      }
    });

  // Next / Prev buttons for chapter 1 memories
  dynamicallyRenderedPages.forEach((page, index) => {
    const nextButton = page.querySelector(".next-page");
    const prevButton = page.querySelector(".prev-page");

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        page.classList.remove("active");
        if (index < dynamicallyRenderedPages.length - 1) {
          dynamicallyRenderedPages[index + 1].classList.add("active");
        } else {
          endOfChapter1.classList.add("active");
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        page.classList.remove("active");
        if (index > 0) {
          dynamicallyRenderedPages[index - 1].classList.add("active");
        } else {
          welcomePage.classList.add("active");
        }
      });
    }
  });

  // Next Chapter buttons
  document.querySelectorAll(".next-chapter").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const targetChapter = document.getElementById(targetId);
      const currentPage = button.closest(".page");

      if (targetChapter && currentPage) {
        currentPage.classList.remove("active");
        targetChapter.classList.add("active");
      }
    });
  });

  // Prev Chapter buttons
  document.querySelectorAll(".prev-chapter").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const targetChapter = document.getElementById(targetId);
      const currentPage = button.closest(".page");

      if (targetChapter && currentPage) {
        currentPage.classList.remove("active");
        targetChapter.classList.add("active");
      }
    });
  });

  // Return Home buttons
  document.querySelectorAll(".return-home").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".page.active").forEach((page) => {
        page.classList.remove("active");
      });
      welcomePage.classList.add("active");
    });
  });

  // What's Next buttons
  document.querySelectorAll(".whats-next-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.choice;
      const currentPage = button.closest(".page");

      if (currentPage) {
        currentPage.classList.remove("active");
      }

      if (choice === "continue") {
        document.getElementById("final-page").classList.add("active");
      } else if (choice === "break") {
        // Handle break option if needed
        document.getElementById("final-page").classList.add("active");
      }
    });
  });
});
