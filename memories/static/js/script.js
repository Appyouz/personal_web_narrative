document.addEventListener("DOMContentLoaded", function () {
  const allPages = document.querySelectorAll(".page");
  let currentPageIndex = 0;

  function showPage(index) {
    // Hide all pages
    allPages.forEach((page) => {
      page.classList.add("hidden");
      page.classList.remove("active");
    });

    // Show the new page at the given index
    const currentPage = allPages[index];
    if (currentPage) {
      currentPage.classList.remove("hidden");
      currentPage.classList.add("active");
      playChapterMusic(currentPage);
    }
  }

  function playChapterMusic(pageElement) {
    const chapterClass = Array.from(pageElement.classList).find((cls) =>
      cls.startsWith("chapter"),
    );
    if (chapterClass) {
      const chapterId = chapterClass.split("-")[0];
      const url = chapterMusic[chapterId];
      if (url) {
        audioElement.src = url;
        audioElement.play().catch(() => {
          console.log("Autoplay blocked, user interaction required to play.");
        });
      }
    }
  }

  // Initial setup: Hide all pages except the welcome page
  showPage(0);

  // Get references to the navigation buttons after the initial setup
  const startJourneyButton = document.getElementById("start-journey-button");
  const navigationButtons = document.querySelectorAll(
    ".next-page, .prev-page, .next-chapter, .prev-chapter, .return-home",
  );
  const audioElement = document.getElementById("chapter-audio");

  // Add event listeners to all navigation buttons
  if (startJourneyButton) {
    startJourneyButton.addEventListener("click", () => {
      currentPageIndex = 1;
      showPage(currentPageIndex);
    });
  }

  navigationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("next-page")) {
        currentPageIndex++;
      } else if (button.classList.contains("prev-page")) {
        currentPageIndex--;
      } else if (button.classList.contains("next-chapter")) {
        const targetId = button.dataset.target;
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
          currentPageIndex = Array.from(allPages).indexOf(targetPage);
        }
      } else if (button.classList.contains("prev-chapter")) {
        const targetId = button.dataset.target;
        const targetPage = document.getElementById(targetId);
        if (targetPage) {
          currentPageIndex = Array.from(allPages).indexOf(targetPage);
        }
      } else if (button.classList.contains("return-home")) {
        currentPageIndex = 0;
      }
      showPage(currentPageIndex);
    });
  });
});
