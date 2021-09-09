// Reveal elements on scroll
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(r => {
        var windowHeight = window.innerHeight;
        var revealTop = r.getBoundingClientRect().top;
        var revealPoint = 150; //same as in css
        if (revealTop < windowHeight - revealPoint) { //when we reach revealPoint, then the section is active = shown
            r.classList.add('active');
        } else {
            r.classList.remove('active');
        }
    });
}