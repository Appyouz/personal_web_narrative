document.addEventListener("DOMContentLoaded", function () {
  const welcomePage = document.getElementById("welcome-page");
  const dynamicallyRenderedPages = document.querySelectorAll(
    ".page:not(#welcome-page):not(#end-of-chapter1):not(#chapter2-page):not(#chapter3-page):not(#whats-next-page):not(#final-page)",
  );
  const endOfChapter1 = document.getElementById("end-of-chapter1");
  const chapter2Page = document.getElementById("chapter2-page");
  const chapter3Page = document.getElementById("chapter3-page");
  const whatsNextPage = document.getElementById("whats-next-page");
  const finalPage = document.getElementById("final-page");
  const audioElement = document.getElementById("chapter-audio");

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
    }
  }

  audioElement.volume = 0.5;

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
      } else {
        endOfChapter1.classList.add("active");
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
        endOfChapter1.classList.add("active");
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

  // End of Chapter 1 → Chapter 2
  endOfChapter1.querySelector(".next-chapter").addEventListener("click", () => {
    endOfChapter1.classList.remove("active");
    chapter2Page.classList.add("active");
    playChapterMusic("chapter2");
    setTimeout(() => animateCollageItemsSequentially(chapter2Page), 800);
  });

  // Chapter 2 Navigation
  chapter2Page.querySelector(".prev-chapter").addEventListener("click", () => {
    chapter2Page.classList.remove("active");
    endOfChapter1.classList.add("active");
    playChapterMusic("chapter1");
  });

  chapter2Page.querySelector(".next-chapter").addEventListener("click", () => {
    chapter2Page.classList.remove("active");
    chapter3Page.classList.add("active");
    playChapterMusic("chapter3");
  });

  // Chapter 3 Navigation
  chapter3Page.querySelector(".prev-chapter").addEventListener("click", () => {
    chapter3Page.classList.remove("active");
    chapter2Page.classList.add("active");
    playChapterMusic("chapter2");
  });

  chapter3Page.querySelector(".next-chapter").addEventListener("click", () => {
    chapter3Page.classList.remove("active");
    whatsNextPage.classList.add("active");
    playChapterMusic("post-chapter3");
  });

  // Whats Next Buttons
  whatsNextPage.querySelectorAll(".whats-next-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      whatsNextPage.classList.remove("active");
      finalPage.classList.add("active");
      playChapterMusic("post-chapter3");
    });
  });

  // Final Page Buttons
  finalPage.querySelector(".prev-chapter").addEventListener("click", () => {
    finalPage.classList.remove("active");
    chapter3Page.classList.add("active");
    playChapterMusic("chapter3");
  });

  finalPage.querySelector(".return-home").addEventListener("click", () => {
    document
      .querySelectorAll(".page.active")
      .forEach((p) => p.classList.remove("active"));
    welcomePage.classList.add("active");
    playChapterMusic("chapter1");
  });

  // Manual start button for browsers blocking autoplay
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
