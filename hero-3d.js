/* =====================================
   NIRVANA 3D MOUSE + SCROLL PARALLAX
===================================== */

const nirvanaHero = document.querySelector(".nirvana-hero");
const nirvanaScene = document.querySelector(".nirvana-scene");
const nirvanaPortal = document.querySelector(".portal");
const heroContent = document.querySelector(".hero-content");
const particles = document.querySelector(".particles");


if (nirvanaHero && nirvanaScene) {

    /* =====================================
       VARIABLES
    ===================================== */

    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    let scrollY = 0;


    /* =====================================
       MOUSE MOVE
    ===================================== */

    nirvanaHero.addEventListener("mousemove", (e) => {

        const rect =
            nirvanaHero.getBoundingClientRect();

        mouseX =
            (e.clientX - rect.left) /
            rect.width - 0.5;

        mouseY =
            (e.clientY - rect.top) /
            rect.height - 0.5;

    });


    /* =====================================
       MOUSE LEAVE
    ===================================== */

    nirvanaHero.addEventListener("mouseleave", () => {

        mouseX = 0;
        mouseY = 0;

    });


    /* =====================================
       SCROLL
    ===================================== */

    window.addEventListener("scroll", () => {

        scrollY = window.scrollY;

        const heroHeight =
            nirvanaHero.offsetHeight;

        /*
         * Limit scroll effect to hero height
         */

        if (scrollY > heroHeight) {
            scrollY = heroHeight;
        }

    });


    /* =====================================
       MAIN ANIMATION LOOP
    ===================================== */

    function animateParallax() {

        /*
         * Smooth mouse movement
         */

        currentX +=
            (mouseX - currentX) * 0.06;

        currentY +=
            (mouseY - currentY) * 0.06;


        /* =================================
           1. BACKGROUND SCENE
        ================================= */

        nirvanaScene.style.transform = `
            translateZ(0)
            rotateY(${currentX * 8}deg)
            rotateX(${-currentY * 8}deg)
        `;


        /* =================================
           2. PORTAL
        ================================= */

        if (nirvanaPortal) {

            nirvanaPortal.style.transform = `
                translate(-50%, -50%)
                translateZ(100px)
                translate(
                    ${currentX * 25}px,
                    ${currentY * 25}px
                )
                rotateY(${currentX * 15}deg)
                rotateX(${-currentY * 15}deg)
            `;

        }


        /* =================================
           3. PARTICLES
        ================================= */

        if (particles) {

            particles.style.transform = `
                translate3d(
                    ${currentX * 35}px,
                    ${currentY * 35 + scrollY * 0.15}px,
                    80px
                )
            `;

        }


        /* =================================
           4. HERO TEXT
        ================================= */

        if (heroContent) {

            heroContent.style.transform = `
                translate3d(
                    ${currentX * -20}px,
                    ${currentY * -20 + scrollY * 0.35}px,
                    200px
                )
            `;


            /*
             * Fade text while scrolling
             */

            const heroHeight =
                nirvanaHero.offsetHeight;

            heroContent.style.opacity =
                Math.max(
                    0,
                    1 -
                    scrollY /
                    (heroHeight * 0.8)
                );

        }


        /* =================================
           CONTINUE ANIMATION
        ================================= */

        requestAnimationFrame(
            animateParallax
        );

    }


    /* =====================================
       START
    ===================================== */

    animateParallax();

}