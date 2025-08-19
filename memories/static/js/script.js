// Chapter 1: Page Transition Logic
document.addEventListener('DOMContentLoaded', function() {
    const welcomePage = document.getElementById('welcome-page');
    const firstMeetPage = document.getElementById('first-meet-page');
    const funnyMomentsPage = document.getElementById('funny-moments-page');
    const moreMomentsPage = document.getElementById('more-moments-page');
    
    const nextButton = document.getElementById('next-button');
    const nextButtons = document.querySelectorAll('.next-page');

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            welcomePage.classList.add('hidden');
            firstMeetPage.classList.remove('hidden');
        });
    }

    if (nextButtons) {
        // This is a more flexible way to handle multiple "Next" buttons
        let currentPageIndex = 0;
        const pages = [firstMeetPage, funnyMomentsPage, moreMomentsPage];
        
        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (currentPageIndex < pages.length - 1) {
                    pages[currentPageIndex].classList.add('hidden');
                    currentPageIndex++;
                    pages[currentPageIndex].classList.remove('hidden');
                }
            });
        });
    }
});
