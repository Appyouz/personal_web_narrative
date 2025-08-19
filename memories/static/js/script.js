document.addEventListener("DOMContentLoaded", function () {
  const welcomePage = document.getElementById("welcome-page");
  const dynamicallyRenderedPages = document.querySelectorAll(
    "#chapter1 .page:not(#welcome-page):not(#end-of-chapter1)",
  );
  const endOfChapter1 = document.getElementById("end-of-chapter1");

  // Handle "Start the Journey"
  document.getElementById("next-button").addEventListener("click", () => {
    welcomePage.classList.add("hidden");
    if (dynamicallyRenderedPages.length > 0) {
      dynamicallyRenderedPages[0].classList.remove("hidden");
    } else {
      endOfChapter1.classList.remove("hidden");
    }
  });

  // Handle "Next" inside memory pages
  dynamicallyRenderedPages.forEach((page, index) => {
    const nextButton = page.querySelector(".next-page");
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
  });

  // Handle "Next Chapter" buttons
  document.querySelectorAll(".next-chapter").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.target;
      const targetChapter = document.getElementById(targetId);
      const currentChapter = button.closest(".chapter");

      if (targetChapter) {
        if (currentChapter) {
          currentChapter.classList.add("hidden");
        }
        targetChapter.classList.remove("hidden");
      }
    });
  });
});
