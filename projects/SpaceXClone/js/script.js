const button = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');
let scrollStarted = false;

button.addEventListener('click', navToggle);

document.addEventListener('scroll', scrollPage);

function navToggle() {
    button.classList.toggle('open');
    overlay.classList.toggle('overlay-show');
    document.body.classList.toggle('stop-scrolling');
    menu.classList.toggle('show-menu');
};

function scrollPage() {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100 && !scrollStarted) {
        countUp();
        scrollStarted = true;
    } else if (scrollPosition < 100) {
        reset();
        scrollStarted = false;
    }
};

function countUp() {
    counters.forEach(counter => {
        counter.innerText = '0';

        const updateCounter = () => {
            const target = +counter.getAttribute('data-target');

            const current = +counter.innerText;

            const increment = target / 100;




            if (current < target) {
                counter.innerText = `${Math.ceil(current + increment)}`

                if (target < 30) setTimeout(updateCounter, 75);
                else if (target < 100) setTimeout(updateCounter, 25);
                else setTimeout(updateCounter, 10);

                // setTimeout(updateCounter, 75);
            } else {
                counter.innerText = target;
            }
        }
        updateCounter()
    })
}

function reset() {
    counters.forEach(counter => counter.innerHTML = '0');
}