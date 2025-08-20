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

  // Function to animate collage items sequentially with much slower timing
  function animateCollageItemsSequentially(page) {
    const collageItems = page.querySelectorAll(".collage-item");

    // Reset all items first
    collageItems.forEach((item) => {
      item.classList.remove("animate-sequential");
    });

    // Animate items one by one with a much longer delay (3500ms between each pair)
    collageItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("animate-sequential");
      }, index * 3500); // Increased to 3500ms (3.5 seconds) between each image+comment pair
    });
  }

  // Function to reset collage animations
  function resetCollageAnimations(page) {
    const collageItems = page.querySelectorAll(".collage-item");
    collageItems.forEach((item) => {
      item.classList.remove("animate-sequential");
    });
  }

  // Start Journey button
  document
    .getElementById("start-journey-button")
    .addEventListener("click", () => {
      welcomePage.classList.remove("active");
      if (dynamicallyRenderedPages.length > 0) {
        dynamicallyRenderedPages[0].classList.add("active");
        // Animate the first page's collage items sequentially with a longer delay
        setTimeout(() => {
          animateCollageItemsSequentially(dynamicallyRenderedPages[0]);
        }, 800); // Increased to 800ms
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
        resetCollageAnimations(page);
        page.classList.remove("active");
        if (index < dynamicallyRenderedPages.length - 1) {
          dynamicallyRenderedPages[index + 1].classList.add("active");
          // Animate the next page's collage items sequentially
          setTimeout(() => {
            animateCollageItemsSequentially(
              dynamicallyRenderedPages[index + 1],
            );
          }, 800); // Increased to 800ms
        } else {
          endOfChapter1.classList.add("active");
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        resetCollageAnimations(page);
        page.classList.remove("active");
        if (index > 0) {
          dynamicallyRenderedPages[index - 1].classList.add("active");
          // Animate the previous page's collage items sequentially
          setTimeout(() => {
            animateCollageItemsSequentially(
              dynamicallyRenderedPages[index - 1],
            );
          }, 800); // Increased to 800ms
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

        // Animate collage items in the target chapter sequentially
        setTimeout(() => {
          animateCollageItemsSequentially(targetChapter);
        }, 800); // Increased to 800ms
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

        // If going back to a page with collage items, animate them sequentially
        setTimeout(() => {
          animateCollageItemsSequentially(targetChapter);
        }, 800); // Increased to 800ms
      }
    });
  });

  // Return Home buttons
  document.querySelectorAll(".return-home").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".page.active").forEach((page) => {
        resetCollageAnimations(page);
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
        document.getElementById("final-page").classList.add("active");
      }
    });
  });
});
