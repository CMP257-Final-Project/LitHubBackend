document.addEventListener('DOMContentLoaded', function () {

    function scroll() {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };

    if (window.location.hash === '#About') {
        const aboutSection = document.getElementById('About');
        if (aboutSection) {
            setTimeout(scroll(), 500);
        }
    }
});
