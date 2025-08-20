document.addEventListener("DOMContentLoaded", function () {
  const welcomePage = document.getElementById("welcome-page");
  const dynamicallyRenderedPages = document.querySelectorAll(
    ".page:not(#welcome-page):not(#final-page)",
  );
  const audioElement = document.getElementById("chapter-audio");

  audioElement.volume = 0.5;
  let currentChapter = "chapter1";

  function playChapterMusic(chapter) {
    if (chapterMusic[chapter] && chapterMusic[chapter] !== "") {
      if (audioElement.src !== chapterMusic[chapter]) {
        audioElement.src = chapterMusic[chapter];
      }
      currentChapter = chapter;
      audioElement.play().catch(() => {
        setTimeout(() => audioElement.play().catch(() => {}), 500);
      });
    } else {
      audioElement.pause();
    }
  }

  // Hide all pages except welcome
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  welcomePage.classList.add("active");

  setTimeout(() => playChapterMusic("chapter1"), 500);

  function animateCollageItemsSequentially(page) {
    const items = page.querySelectorAll(".collage-item");
    items.forEach((i) => i.classList.remove("animate-sequential"));
    items.forEach((item, idx) =>
      setTimeout(() => item.classList.add("animate-sequential"), idx * 3500),
    );
  }

  function resetCollageAnimations(page) {
    page
      .querySelectorAll(".collage-item")
      .forEach((i) => i.classList.remove("animate-sequential"));
  }

  // Start Journey
  document
    .getElementById("start-journey-button")
    .addEventListener("click", () => {
      welcomePage.classList.remove("active");
      if (dynamicallyRenderedPages.length > 0) {
        dynamicallyRenderedPages[0].classList.add("active");
        playChapterMusic("chapter1");
        setTimeout(
          () => animateCollageItemsSequentially(dynamicallyRenderedPages[0]),
          800,
        );
      }
    });

  // Memory Pages Navigation
  dynamicallyRenderedPages.forEach((page, idx) => {
    const nextBtn = page.querySelector(".next-page");
    const prevBtn = page.querySelector(".prev-page");

    nextBtn?.addEventListener("click", () => {
      resetCollageAnimations(page);
      page.classList.remove("active");
      if (idx < dynamicallyRenderedPages.length - 1) {
        dynamicallyRenderedPages[idx + 1].classList.add("active");
        playChapterMusic("chapter1");
        setTimeout(
          () =>
            animateCollageItemsSequentially(dynamicallyRenderedPages[idx + 1]),
          800,
        );
      } else {
        const endChapter1 = document.getElementById("end-of-chapter1");
        endChapter1.classList.add("active");
        playChapterMusic("chapter1");
      }
    });

    prevBtn?.addEventListener("click", () => {
      resetCollageAnimations(page);
      page.classList.remove("active");
      if (idx > 0) {
        dynamicallyRenderedPages[idx - 1].classList.add("active");
        playChapterMusic("chapter1");
        setTimeout(
          () =>
            animateCollageItemsSequentially(dynamicallyRenderedPages[idx - 1]),
          800,
        );
      } else {
        welcomePage.classList.add("active");
        playChapterMusic("chapter1");
      }
    });
  });

  // Helper: get chapter from page id
  function getChapterFromPage(page) {
    const id = page.id;
    if (id === "chapter2-page" || id === "end-of-chapter2") return "chapter2";
    if (id === "chapter3-page") return "chapter3";
    if (
      ["whats-next-page", "give-up-page", "choice-page", "final-page"].includes(
        id,
      )
    )
      return "post-chapter3";
    return "chapter1";
  }

  // Delegate next/prev chapter buttons
  document.addEventListener("click", function (e) {
    const currentPage = e.target.closest(".page");
    if (!currentPage) return;

    // Next-chapter
    if (e.target.classList.contains("next-chapter")) {
      e.preventDefault();
      const targetId = e.target.dataset.target;
      const targetPage = document.getElementById(targetId);
      if (!targetPage) return;

      currentPage.classList.remove("active");
      targetPage.classList.add("active");

      // Animate collage items if present
      setTimeout(() => animateCollageItemsSequentially(targetPage), 800);

      // Play music according to target page
      const chapter = getChapterFromPage(targetPage);
      if (targetId === "give-up-page") {
        audioElement.pause(); // stop music on give-up
      } else {
        playChapterMusic(chapter);
      }
    }

    // Prev-chapter
    if (e.target.classList.contains("prev-chapter")) {
      e.preventDefault();
      const targetId = e.target.dataset.target;
      const targetPage = document.getElementById(targetId);
      if (!targetPage) return;

      currentPage.classList.remove("active");
      targetPage.classList.add("active");

      setTimeout(() => animateCollageItemsSequentially(targetPage), 800);
      playChapterMusic(getChapterFromPage(targetPage));
    }
  });

  // Whats Next buttons
  document.querySelectorAll(".whats-next-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.choice;
      const currentPage = button.closest(".page");
      currentPage.classList.remove("active");

      if (choice === "continue") {
        document.getElementById("final-page").classList.add("active");
        playChapterMusic("post-chapter3");
      } else if (choice === "break") {
        document.getElementById("give-up-page").classList.add("active");
        audioElement.pause();
      }
    });
  });

  // Final Page buttons
  document.querySelectorAll(".return-home").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".page.active")
        .forEach((p) => p.classList.remove("active"));
      welcomePage.classList.add("active");
      playChapterMusic("chapter1");
    });
  });

  // Optional: Manual start button for browsers blocking autoplay
  const startMusicBtn = document.createElement("button");
  startMusicBtn.textContent = "Start Music";
  startMusicBtn.style.position = "fixed";
  startMusicBtn.style.bottom = "20px";
  startMusicBtn.style.right = "20px";
  startMusicBtn.style.zIndex = "1000";
  startMusicBtn.style.padding = "10px";
  startMusicBtn.style.backgroundColor = "rgba(0,0,0,0.7)";
  startMusicBtn.style.color = "white";
  startMusicBtn.style.border = "none";
  startMusicBtn.style.borderRadius = "5px";
  startMusicBtn.style.display = "none";

  startMusicBtn.addEventListener("click", () => {
    playChapterMusic(currentChapter);
    startMusicBtn.style.display = "none";
  });

  document.body.appendChild(startMusicBtn);
  setTimeout(() => {
    if (audioElement.paused) startMusicBtn.style.display = "block";
  }, 2000);
});
