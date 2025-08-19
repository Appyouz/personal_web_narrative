// Chapter 1: Page Transition Logic
document.addEventListener('DOMContentLoaded', function() {
    const welcomePage = document.getElementById('welcome-page');
    const nextButton = document.getElementById('next-button');
    const chapter1 = document.getElementById('chapter1');
    const dynamicallyRenderedPages = chapter1.querySelectorAll('.page:not(#welcome-page)');

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            welcomePage.classList.add('hidden');
            if (dynamicallyRenderedPages.length > 0) {
                dynamicallyRenderedPages[0].classList.remove('hidden');
            }
        });
    }

    if (dynamicallyRenderedPages) {
        let currentPageIndex = 0;

        dynamicallyRenderedPages.forEach((page, index) => {
            const nextButton = page.querySelector('.next-page');
            if (nextButton) {
                nextButton.addEventListener('click', () => {
                    if (currentPageIndex < dynamicallyRenderedPages.length - 1) {
                        page.classList.add('hidden');
                        currentPageIndex++;
                        dynamicallyRenderedPages[currentPageIndex].classList.remove('hidden');
                    }
                });
            }
        });
    }
});
