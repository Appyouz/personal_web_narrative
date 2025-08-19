document.addEventListener("DOMContentLoaded", function () {
  const welcomePage = document.getElementById("welcome-page");
  const chapters = document.querySelectorAll(".chapter");
  const dynamicallyRenderedPages = document.querySelectorAll(
    "#chapter1 .page:not(#welcome-page):not(#end-of-chapter1)",
  );
  const endOfChapter1 = document.getElementById("end-of-chapter1");

  // Start Journey button
  document.getElementById("next-button").addEventListener("click", () => {
    welcomePage.classList.add("hidden");
    if (dynamicallyRenderedPages.length > 0) {
      dynamicallyRenderedPages[0].classList.remove("hidden");
    } else {
      endOfChapter1.classList.remove("hidden");
    }
  });

  // Next / Prev buttons for chapter 1 memories
  dynamicallyRenderedPages.forEach((page, index) => {
    const nextButton = page.querySelector(".next-page");
    const prevButton = page.querySelector(".prev-page");

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        page.classList.add("hidden");
        if (index < dynamicallyRenderedPages.length - 1) {
          dynamicallyRenderedPages[index + 1].classList.remove("hidden");
        } else {
          endOfChapter1.classList.remove("hidden");
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        page.classList.add("hidden");
        if (index > 0) {
          dynamicallyRenderedPages[index - 1].classList.remove("hidden");
        } else {
          welcomePage.classList.remove("hidden");
        }
      });
    }
  });

  // Next Chapter buttons
  document.querySelectorAll(".next-chapter").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const targetChapter = document.getElementById(targetId);
      const currentChapter = button.closest(".chapter");

      if (targetChapter) {
        if (currentChapter) currentChapter.classList.add("hidden");
        targetChapter.classList.remove("hidden");
      }
    });
  });

  // Prev Chapter buttons & Return Home
  document.querySelectorAll(".prev-chapter, .return-home").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const currentChapter = button.closest(".chapter");

      if (button.classList.contains("return-home")) {
        // Logic for "Back to Start" button
        chapters.forEach((ch) => ch.classList.add("hidden"));
        document.getElementById("chapter1").classList.remove("hidden");
        welcomePage.classList.remove("hidden");
      } else if (targetId) {
        // Logic for "Prev Chapter" button
        const targetChapter = document.getElementById(targetId);
        if (currentChapter) currentChapter.classList.add("hidden");
        targetChapter.classList.remove("hidden");
      }
    });
  });
});
