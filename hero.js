/* =====================================
   NIRVANA 3D MOUSE PARALLAX
===================================== */

const nirvanaHero = document.querySelector(".nirvana-hero");
const nirvanaScene = document.querySelector(".nirvana-scene");
const nirvanaPortal = document.querySelector(".portal");
const heroContent = document.querySelector(".hero-content");

if (nirvanaHero && nirvanaScene) {

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    nirvanaHero.addEventListener("mousemove", (e) => {

        const rect = nirvanaHero.getBoundingClientRect();

        mouseX =
            (e.clientX - rect.left) /
            rect.width - 0.5;

        mouseY =
            (e.clientY - rect.top) /
            rect.height - 0.5;

    });


    function animateParallax() {

        currentX +=
            (mouseX - currentX) * 0.06;

        currentY +=
            (mouseY - currentY) * 0.06;


        nirvanaScene.style.transform =
            `rotateY(${currentX * 8}deg)
             rotateX(${-currentY * 8}deg)`;


        if (nirvanaPortal) {

            nirvanaPortal.style.transform =
                `translate(-50%, -50%)
                 translateZ(100px)
                 rotateY(${currentX * 12}deg)
                 rotateX(${-currentY * 12}deg)`;
        }


        if (heroContent) {

            heroContent.style.transform =
                `translateZ(200px)
                 translate(${currentX * -15}px,
                 ${currentY * -15}px)`;
        }


        requestAnimationFrame(
            animateParallax
        );
    }


    animateParallax();


    /* Reset when mouse leaves */

    nirvanaHero.addEventListener("mouseleave", () => {

        mouseX = 0;
        mouseY = 0;

    });
}


/* =====================================
   SCROLL PARALLAX
===================================== */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector(".nirvana-hero");

    if (!hero) return;

    const scrollY =
        window.scrollY;

    const heroHeight =
        hero.offsetHeight;


    if (scrollY <= heroHeight) {

        const portal =
            document.querySelector(".portal");

        const particles =
            document.querySelector(".particles");

        const content =
            document.querySelector(".hero-content");


        if (portal) {

            portal.style.marginTop =
                `${scrollY * 0.18}px`;
        }


        if (particles) {

            particles.style.transform =
                `translateY(${scrollY * 0.25}px)`;
        }


        if (content) {

            content.style.opacity =
                Math.max(
                    0,
                    1 - scrollY / (heroHeight * 0.8)
                );

            content.style.transform =
                `translateY(${scrollY * 0.35}px)
                 translateZ(200px)`;
        }
    }

});