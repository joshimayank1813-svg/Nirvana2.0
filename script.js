/* =========================================================
   NIRVANA 2026
   PREMIUM MASTER JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. NIRVANA 3D HERO PARALLAX
       ===================================================== */

    const hero = document.querySelector(".nirvana-hero");
    const scene = document.querySelector(".nirvana-scene");
    const portal = document.querySelector(".portal");
    const particles = document.querySelector(".particles");
    const heroContent = document.querySelector(".hero-content");

    if (hero && scene) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;

        let targetScroll = 0;
        let currentScroll = 0;

        let mouseInside = false;

        /* ---------------------------------------------
           Mouse movement
        --------------------------------------------- */

        hero.addEventListener("mousemove", (e) => {

            const rect = hero.getBoundingClientRect();

            targetX =
                ((e.clientX - rect.left) / rect.width - 0.5);

            targetY =
                ((e.clientY - rect.top) / rect.height - 0.5);

            mouseInside = true;

        });


        /* ---------------------------------------------
           Mouse leave
        --------------------------------------------- */

        hero.addEventListener("mouseleave", () => {

            targetX = 0;
            targetY = 0;

            mouseInside = false;

        });


        /* ---------------------------------------------
           Scroll
        --------------------------------------------- */

        function updateScroll() {

            const heroHeight = hero.offsetHeight;

            targetScroll = Math.min(
                window.scrollY,
                heroHeight
            );

        }

        window.addEventListener(
            "scroll",
            updateScroll,
            { passive: true }
        );

        updateScroll();


        /* ---------------------------------------------
           Smooth animation
        --------------------------------------------- */

        function animateHero() {

            /*
             * Smooth mouse interpolation
             */

            currentX +=
                (targetX - currentX) * 0.055;

            currentY +=
                (targetY - currentY) * 0.055;


            /*
             * Smooth scroll interpolation
             */

            currentScroll +=
                (targetScroll - currentScroll) * 0.08;


            /* =========================================
               BACKGROUND SCENE
            ========================================= */

            const sceneRotateY =
                currentX * 7;

            const sceneRotateX =
                currentY * -7;

            const sceneScroll =
                currentScroll * 0.05;

            scene.style.transform = `
                translate3d(
                    ${currentX * 8}px,
                    ${sceneScroll}px,
                    0
                )
                rotateX(${sceneRotateX}deg)
                rotateY(${sceneRotateY}deg)
            `;


            /* =========================================
               PORTAL
            ========================================= */

            if (portal) {

                const portalX =
                    currentX * 28;

                const portalY =
                    currentY * 28;

                const portalScroll =
                    currentScroll * 0.18;

                portal.style.transform = `
                    translate3d(
                        calc(-50% + ${portalX}px),
                        calc(-50% + ${portalY + portalScroll}px),
                        100px
                    )
                    rotateY(${currentX * 16}deg)
                    rotateX(${currentY * -16}deg)
                `;

            }


            /* =========================================
               PARTICLES
            ========================================= */

            if (particles) {

                const particlesX =
                    currentX * 45;

                const particlesY =
                    currentY * 45;

                const particlesScroll =
                    currentScroll * 0.25;

                particles.style.transform = `
                    translate3d(
                        ${particlesX}px,
                        ${particlesY + particlesScroll}px,
                        120px
                    )
                `;

            }


            /* =========================================
               HERO TEXT
            ========================================= */

            if (heroContent) {

                const textX =
                    currentX * -18;

                const textY =
                    currentY * -18;

                const textScroll =
                    currentScroll * 0.32;

                heroContent.style.transform = `
                    translate3d(
                        ${textX}px,
                        ${textY + textScroll}px,
                        200px
                    )
                `;


                /*
                 * Fade hero content during scroll
                 */

                const heroHeight =
                    hero.offsetHeight;

                const fadeStart =
                    heroHeight * 0.05;

                const fadeEnd =
                    heroHeight * 0.75;

                let opacity =
                    1 -
                    (
                        (currentScroll - fadeStart) /
                        (fadeEnd - fadeStart)
                    );

                opacity =
                    Math.max(
                        0,
                        Math.min(1, opacity)
                    );

                heroContent.style.opacity =
                    opacity;

            }


            requestAnimationFrame(
                animateHero
            );

        }

        animateHero();

    }


    /* =====================================================
       2. STARFIELD
       ===================================================== */

    const starField =
        document.getElementById("stars");

    if (starField) {

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

        const starCount =
            window.innerWidth < 700
                ? 70
                : 140;

        const fragment =
            document.createDocumentFragment();

        for (let i = 0; i < starCount; i++) {

            const star =
                document.createElement("div");

            star.className =
                "star" +
                (
                    Math.random() < 0.15
                        ? " big"
                        : ""
                ) +
                (
                    reducedMotion
                        ? ""
                        : " twinkle"
                );

            star.style.left =
                Math.random() * 100 + "%";

            star.style.top =
                Math.random() * 100 + "%";

            star.style.setProperty(
                "--dur",
                (
                    3 +
                    Math.random() * 5
                ).toFixed(1) + "s"
            );

            star.style.setProperty(
                "--delay",
                (
                    Math.random() * 5
                ).toFixed(1) + "s"
            );

            fragment.appendChild(star);

        }

        starField.appendChild(fragment);

    }


    /* =====================================================
       3. COUNTDOWN
       October 14, 2026 — 09:00
       ===================================================== */

    const countdownElements = {

        days:
            document.getElementById("cd-days"),

        hours:
            document.getElementById("cd-hours"),

        minutes:
            document.getElementById("cd-mins"),

        seconds:
            document.getElementById("cd-secs")

    };


    if (
        countdownElements.days &&
        countdownElements.hours &&
        countdownElements.minutes &&
        countdownElements.seconds
    ) {

        const targetDate =
            new Date(
                "2026-10-14T09:00:00"
            ).getTime();


        function updateCountdown() {

            const now =
                Date.now();

            const difference =
                targetDate - now;


            if (difference <= 0) {

                countdownElements.days.textContent =
                    "00";

                countdownElements.hours.textContent =
                    "00";

                countdownElements.minutes.textContent =
                    "00";

                countdownElements.seconds.textContent =
                    "00";

                return;

            }


            const days =
                Math.floor(
                    difference /
                    86400000
                );


            const hours =
                Math.floor(
                    (difference % 86400000) /
                    3600000
                );


            const minutes =
                Math.floor(
                    (difference % 3600000) /
                    60000
                );


            const seconds =
                Math.floor(
                    (difference % 60000) /
                    1000
                );


            countdownElements.days.textContent =
                String(days).padStart(2, "0");

            countdownElements.hours.textContent =
                String(hours).padStart(2, "0");

            countdownElements.minutes.textContent =
                String(minutes).padStart(2, "0");

            countdownElements.seconds.textContent =
                String(seconds).padStart(2, "0");

        }


        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );

    }


    /* =====================================================
       4. ONE GLOBAL SCROLL REVEAL SYSTEM
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            entry.target.classList.add(
                                "in"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    }


    /* =====================================================
       5. EVENT FILTER
       FIXED — USES data-filter EVERYWHERE
       ===================================================== */

    const filterButtons =
        document.querySelectorAll(
            ".filter-btn"
        );

    const eventCards =
        document.querySelectorAll(
            ".event-card"
        );


    if (
        filterButtons.length &&
        eventCards.length
    ) {

        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.filter ||
                        "all";


                    /*
                     * Active button
                     */

                    filterButtons.forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });

                    button.classList.add(
                        "active"
                    );


                    /*
                     * Filter cards
                     */

                    eventCards.forEach(card => {

                        const cardFilter =
                            card.dataset.filter;


                        const shouldShow =
                            filter === "all" ||
                            cardFilter === filter;


                        card.classList.toggle(
                            "is-hidden",
                            !shouldShow
                        );

                        card.classList.toggle(
                            "hide",
                            !shouldShow
                        );

                    });


                    /*
                     * Recalculate orbit
                     */

                    if (
                        typeof window.updateEventOrbit ===
                        "function"
                    ) {

                        window.updateEventOrbit();

                    }

                }
            );

        });

    }


    /* =====================================================
       6. DAY TABS
       ===================================================== */

    const dayTabs =
        document.querySelectorAll(
            ".day-tab"
        );

    const timelines =
        document.querySelectorAll(
            ".timeline"
        );


    if (
        dayTabs.length &&
        timelines.length
    ) {

        dayTabs.forEach(tab => {

            tab.addEventListener(
                "click",
                () => {

                    const selectedDay =
                        tab.dataset.day;


                    dayTabs.forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                    tab.classList.add(
                        "active"
                    );


                    timelines.forEach(
                        panel => {

                            panel.classList.toggle(
                                "active",
                                panel.dataset.day ===
                                selectedDay
                            );

                        }
                    );

                }
            );

        });

    }


    /* =====================================================
       7. FAQ ACCORDION
       ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-q");

        const answer =
            item.querySelector(".faq-a");


        if (
            !question ||
            !answer
        ) {
            return;
        }


        question.addEventListener(
            "click",
            () => {

                const alreadyOpen =
                    item.classList.contains(
                        "open"
                    );


                /*
                 * Close all
                 */

                faqItems.forEach(
                    otherItem => {

                        otherItem.classList.remove(
                            "open"
                        );

                        const otherAnswer =
                            otherItem.querySelector(
                                ".faq-a"
                            );

                        if (otherAnswer) {

                            otherAnswer.style.maxHeight =
                                null;

                        }

                    }
                );


                /*
                 * Open selected
                 */

                if (!alreadyOpen) {

                    item.classList.add(
                        "open"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";

                }

            }
        );

    });


    /* =====================================================
       8. MOBILE NAVIGATION
       ===================================================== */

    const burger =
        document.querySelector(
            ".burger"
        );

    const navLinks =
        document.querySelector(
            "nav.links"
        );


    if (
        burger &&
        navLinks
    ) {

        burger.setAttribute(
            "aria-expanded",
            "false"
        );


        burger.addEventListener(
            "click",
            () => {

                const isOpen =
                    navLinks.classList.toggle(
                        "mobile-open"
                    );


                burger.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                burger.classList.toggle(
                    "active",
                    isOpen
                );

            }
        );


        /*
         * Close menu after clicking a link
         */

        navLinks
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navLinks.classList.remove(
                            "mobile-open"
                        );

                        burger.classList.remove(
                            "active"
                        );

                        burger.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            });

    }


    /* =====================================================
       9. INFINITE IMAGE CAROUSEL
       ===================================================== */

    const carouselGroup =
        document.querySelector(
            ".group"
        );


    if (carouselGroup) {

        const carouselCards =
            carouselGroup.querySelectorAll(
                ".card"
            );


        function updateCarouselWidth() {

            if (
                carouselCards.length < 2
            ) {
                return;
            }


            const originalCount =
                Math.floor(
                    carouselCards.length / 2
                );


            let width = 0;


            for (
                let i = 0;
                i < originalCount;
                i++
            ) {

                width +=
                    carouselCards[i]
                        .offsetWidth;

            }


            const styles =
                getComputedStyle(
                    carouselGroup
                );


            const gap =
                parseFloat(
                    styles.gap
                ) || 0;


            width +=
                gap * originalCount;


            carouselGroup.style.setProperty(
                "--scroll-distance",
                `-${width}px`
            );

        }


        updateCarouselWidth();


        let carouselResizeTimer;


        window.addEventListener(
            "resize",
            () => {

                clearTimeout(
                    carouselResizeTimer
                );


                carouselResizeTimer =
                    setTimeout(
                        updateCarouselWidth,
                        150
                    );

            }
        );

    }


    /* =====================================================
       10. PREMIUM EVENT ORBIT
       ===================================================== */

    const eventOrbit =
        document.getElementById(
            "eventOrbit"
        );

    const cardsOrbit =
        document.getElementById(
            "cardsOrbit"
        );


    if (
        eventOrbit &&
        cardsOrbit
    ) {

        const orbitCards =
            Array.from(
                cardsOrbit.querySelectorAll(
                    ".event-card"
                )
            );


        const orbitFilterButtons =
            document.querySelectorAll(
                ".filter-btn"
            );


        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        const mobileQuery =
            window.matchMedia(
                "(max-width: 1000px)"
            );


        let rotation = 0;

        let rotationSpeed =
            reducedMotion
                ? 0
                : 0.28;

        let orbitHovered = false;


        /* ---------------------------------------------
           Visible cards
        --------------------------------------------- */

        function getVisibleCards() {

            return orbitCards.filter(
                card =>
                    !card.classList.contains(
                        "is-hidden"
                    )
            );

        }


        /* ---------------------------------------------
           Position orbit
        --------------------------------------------- */

        function positionEventCards() {

            if (
                mobileQuery.matches
            ) {

                orbitCards.forEach(
                    card => {

                        card.style.transform =
                            "";

                    }
                );

                return;

            }


            const styles =
                getComputedStyle(
                    eventOrbit
                );


            const radius =
                parseFloat(
                    styles.getPropertyValue(
                        "--orbit-radius"
                    )
                ) || 320;


            const visible =
                getVisibleCards();


            const total =
                Math.max(
                    visible.length,
                    1
                );


            visible.forEach(
                (card, index) => {

                    const angle =
                        (
                            360 / total
                        ) * index -
                        90 +
                        rotation;


                    const radians =
                        angle *
                        Math.PI /
                        180;


                    const x =
                        Math.cos(
                            radians
                        ) *
                        radius;


                    const y =
                        Math.sin(
                            radians
                        ) *
                        radius;


                    card.style.transform = `
                        translate(-50%, -50%)
                        translate3d(
                            ${x}px,
                            ${y}px,
                            0
                        )
                        rotate(
                            ${angle + 90}deg
                        )
                    `;

                }
            );

        }


        /*
         * Expose function for filter system
         */

        window.updateEventOrbit =
            positionEventCards;


        /* ---------------------------------------------
           Orbit animation
        --------------------------------------------- */

        function orbitLoop() {

            if (
                !orbitHovered &&
                !reducedMotion &&
                !mobileQuery.matches
            ) {

                rotation +=
                    rotationSpeed;

            }


            positionEventCards();


            requestAnimationFrame(
                orbitLoop
            );

        }


        /* ---------------------------------------------
           Hover pause
        --------------------------------------------- */

        eventOrbit.addEventListener(
            "mouseenter",
            () => {

                orbitHovered = true;

            }
        );


        eventOrbit.addEventListener(
            "mouseleave",
            () => {

                orbitHovered = false;

            }
        );


        /* ---------------------------------------------
           Card hover
        --------------------------------------------- */

        orbitCards.forEach(
            card => {

                card.addEventListener(
                    "mouseenter",
                    () => {

                        card.classList.add(
                            "is-hovered"
                        );

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.classList.remove(
                            "is-hovered"
                        );

                    }
                );

            }
        );


        /* ---------------------------------------------
           Resize
        --------------------------------------------- */

        let orbitResizeTimer;


        window.addEventListener(
            "resize",
            () => {

                clearTimeout(
                    orbitResizeTimer
                );


                orbitResizeTimer =
                    setTimeout(
                        positionEventCards,
                        150
                    );

            }
        );


        positionEventCards();


        if (!reducedMotion) {

            requestAnimationFrame(
                orbitLoop
            );

        }

    }


    /* =====================================================
       11. PREMIUM BUTTON MAGNETIC EFFECT
       ===================================================== */

    const magneticButtons =
        document.querySelectorAll(
            ".hero-btn, .nav-cta, .register-btn"
        );


    magneticButtons.forEach(button => {

        button.addEventListener(
            "mousemove",
            e => {

                /*
                 * Disable on touch devices
                 */

                if (
                    window.matchMedia(
                        "(hover: none)"
                    ).matches
                ) {
                    return;
                }


                const rect =
                    button.getBoundingClientRect();


                const x =
                    e.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    e.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform = `
                    translate(
                        ${x * 0.08}px,
                        ${y * 0.08}px
                    )
                `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       12. HERO TILT RESET ON TAB SWITCH
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden &&
                hero
            ) {

                hero.style.setProperty(
                    "--hero-paused",
                    "1"
                );

            }

        }
    );


    /* =====================================================
       13. SMOOTH ANCHOR SCROLL
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                e => {

                    const targetID =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetID ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetID
                        );


                    if (!target) {
                        return;
                    }


                    e.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


});