gsap.registerPlugin(ScrollTrigger);

// update date and time
function updateDateTime() {
    const now = new Date();
    const formattedDate = `${String(now.getMonth() + 1).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')} ${now.getFullYear()}`;
    const formattedTime = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        timeZoneName: 'short' 
    });


    document.getElementById('info-date').innerHTML = formattedDate;
    document.getElementById('info-time').innerHTML = formattedTime;
    
}
updateDateTime();

function getAspect() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    document.getElementById('info-aspect').innerHTML = window.innerWidth + "x" + window.innerHeight;
}
getAspect();

window.addEventListener('resize', getAspect);
// set 'aria-hidden' to 'true' for split type chars
function hideAria(e) {
    e.setAttribute('aria-hidden', 'true');
}

function textUp(target) {
    gsap.from(target, {
        yPercent: 100,
        opacity: 0,
        ease: "power3.out",
        stagger: {
            each: 0.01,
            from: "start"
        },
        duration: 1,
    })
}

// Animate hero name
// Disappears after load in animation
// reappear/disappear on hover
const heroNameText = document.querySelectorAll(".hero_name");
heroNameText.forEach((el) => { // Sets aria label to account for screen readers and split type
    el.setAttribute('aria-label', el.innerText);
})

const heroNameTextSplit = new SplitType(".hero_name-span", { types: "chars" });
heroNameTextSplit.chars.forEach(l => hideAria(l));

const heroName = document.querySelectorAll(".hero_name");
heroName.forEach((name) => {
    name.addEventListener("mouseover", showName);   // mouse enter state to show name
    name.addEventListener("mouseleave", hideName);  // hide name after mouse out
} )

const nameAnim = gsap.timeline({
    defaults: {
        duration: 1.25,
        filter: "blur(10px)",
        opacity: 0,
        ease: "power3.in",
        stagger: {
            each: 0.03,
            from: "end"
        }
    },
    paused: true
}).to(heroNameTextSplit.chars, {})

function hideName() {
    nameAnim.play(0);
}

function showName() {
    nameAnim.reverse();
}

// Preloader animation
const firstName = document.querySelector(".hero_name");

const heroTitle = document.querySelector(".hero_h1");
heroTitle.setAttribute('aria-label', heroTitle.innerText);

const heroTitleSplit = new SplitType(heroTitle, { types: "chars" });
heroTitleSplit.chars.forEach(l => hideAria(l));

const heroSub = document.querySelector('.hero_text-block');
heroSub.setAttribute('aria-label', heroSub.innerText);

const heroSubSplit = new SplitType(heroSub, { types: "chars" });
heroSubSplit.chars.forEach(l => hideAria(l));

const loaderTextSplit = new SplitType($('.loader_span'), {types: "chars"})

const preloader = gsap.timeline({
    defaults: {
        duration: 1,
        ease: "power3.out"
    },
    // onComplete: hideName
});

const overlays = document.querySelectorAll('.overlay');
console.log(overlays);

function init() {
    preloader
    .from('.loader_h1', {
        autoAlpha: 0
    }, 0.5)
    .from(loaderTextSplit.chars, {
        yPercent: 100,
        ease: "power4.inOut",
        duration: 1,
        stagger: {
            each: 0.01,
            from: "start"
        }
    }, "<")
    .to(loaderTextSplit.chars, {
        yPercent: -100,
        ease: "power2.inOut",
        duration: 1,
        stagger: {
            each: 0.01,
            from: "start"
        }
    }, "+=0.75")
    .to('.overlay', {
        yPercent: -100,
        ease: "power4.inOut",
        duration: 1.5,
        stagger: {
            each: 0.5,
            from: "start"
        }
    }, "-=0.8")
    .to('.hero_img-cover', {
        yPercent: -100,
        duration: 1,
        ease: "power1.inOut"
    }, "-=1")
    .from('.hero_img', {
        filter: "blur(10px)"
    }, "-=0.5")
    .from(heroTitleSplit.chars, {
        yPercent: 100,
        opacity: 0,
        stagger: {
            each: 0.01,
            from: "start"
        },
    }, "<")
    .from(heroSubSplit.chars, {
        yPercent: 100,
        opacity: 0,
        stagger: {
            each: 0.01,
            from: "start"
        },
    }, "<")
    
}


window.addEventListener('load', function(event) {
    hideName();
    init();
});





// Animate info below the fold on scroll
// Opacity, blur, y
const infoText = document.querySelector(".info_p-heading");
infoText.setAttribute("aria-label", infoText.innerText);
const infoTextSplit = new SplitType(".info_p-heading", { types: "chars" });
const infoSub = new SplitType(".info_p-sub", { types: "chars" });
const infoP = new SplitType(".info_p-span", { types: "chars" });
let interval;
function startCounting() {
    interval = setInterval(updateDateTime, 1000);
}
function stopCounting() {
    tl.pause(0);
    clearInterval(interval);
}

const tl = gsap.timeline({
    defaults: {
        opacity: 0,
        yPercent: 100,
        duration: 0.75,
        ease: "power3.out",
        stagger: {
            each: 0.005,
            from: "start"
        },
        delay: 0.1
    },
    paused: true,
});

tl.from([infoTextSplit.chars, infoSub.chars, infoP.chars], {
    onComplete: startCounting
})

const playST = ScrollTrigger.create({
    trigger: '.home-section-2',
    onEnter: () => tl.play(),
    onLeaveBack: stopCounting,
});



// Animate underline on link hover
const infoLink = document.querySelector('.info_p-span');
const underline = document.querySelector('.underline');
function enterAnimation() {
    infoLink.tl.tweenFromTo(0, "midway");
}
function leaveAnimation() {
    infoLink.tl.play();
}


infoLink.tl = gsap.timeline({
    paused: true,
    defaults: {
        ease: "power2.inOut",
        duration: 0.5
    }
});
infoLink.tl.fromTo(underline, {
    width: "0%",
    left: "0%"
}, {
    width: "100%",
})
infoLink.tl.add("midway");
infoLink.tl.fromTo(underline, {
    width: "100%",
    left: "0%"
}, {
    width: "0%",
    left: "100%",
    immediateRender: false,
});

infoLink.addEventListener("mouseenter", enterAnimation);
infoLink.addEventListener("mouseleave", leaveAnimation);



// Quote text animate in -> gotta wrap in span or something I think

// gsap.utils.toArray(".indent").forEach((el) => {
//     console.log(el.innerText);
//     const quoteLines = new SplitType(el, { types: "lines" });

//     gsap.from(quoteLines.lines, {
//         yPercent: 100,
//         duration: 0.9,
//         ease: "power3.out",
//         stagger: {
//             each: 0.01,
//             from: "start"
//         }
//     })
// })



// Selected Work Sticky Scroll
// Get each container and store in array
gsap.utils.toArray(".selected_container").forEach((el) => { // iterate through each container, get elements, and create gsap timeline w/ scroll trigger


    const title = el.querySelector('.selected_title span'); // Project Title
    title.setAttribute('aria-label', title.innerText);
    const titleChars = new SplitType(title, { types: 'chars' });

    const subTitle = el.querySelector('.selected_number span'); // Project SubTitle
    subTitle.setAttribute('aria-label', subTitle.innerText);
    const subTitleChars = new SplitType(subTitle, { types: 'chars' });

    const linkText = el.querySelector('.selected_link-text span'); // Project link
    const linkChars = new SplitType(linkText, { types: 'chars' });

    const dateText = el.querySelector('.selected_date span'); // Project date
    const dateChars = new SplitType(dateText, { types: 'chars' });

    const bodyText = el.querySelectorAll('.selected_categories span'); // Project body text
   
    
    const projectTL = gsap.timeline({ // Create timeline
        scrollTrigger: {
            trigger: el,    // This container is trigger
            start: "top 95%",
            toggleActions: "restart none none reverse",     // Reverses animation when it leaves out the bottom
        },
        defaults: { // Each element is animated in the same way so all properties are in defaults
            yPercent: 100,
            duration: 0.9,
            ease: "power3.out",
            stagger: {
                each: 0.01,
                from: "start"
            }
        }
    });

    projectTL.from(subTitleChars.chars, {}) 
    .from([titleChars.chars, linkChars.chars], {}, "-=0.75")
    .from(dateChars.chars, {}, "-=0.75")

    bodyText.forEach((line) => { // each line of body text is stored in an array, loop through array and create split type
        line.setAttribute('aria-label', line.innerText);
        const split = new SplitType(line, { types: 'chars' });
        projectTL.from(split.chars, {}, "<");   // Add animation to end of timeline
    });
});






// individual text opacity change on hover

// const text = new SplitType('#info-link', { types: 'chars' });
// const chars = document.querySelectorAll('.char');

// chars.forEach((char) => {
//     char.addEventListener("mouseenter", function() {
//         gsap.to(char, {opacity: 0.3});
//     });
//     char.addEventListener("mouseleave", function() {
//         gsap.to(char, {opacity: 1});
//     });
// });



// lenis smooth scroll
let lenis = new Lenis({
    lerp: 0.2,
    wheelMultiplier: 1,
    gestureOrientation: "vertical",
    normalizeWheel: false,
    smoothTouch: false,
});
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
$("[data-lenis-start]").on("click", function () {
    lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
    lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
        $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
     lenis.stop();
    } else {
        lenis.start();
    }
});


// Pixelated image
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".pixelated-image");

    images.forEach((img) => {
        // Ensure the image is fully loaded before processing
        if (!img.complete) {
            img.onload = () => setupCanvas(img);
        } else {
            setupCanvas(img);
        }
    });

    function setupCanvas(img) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Get the image's natural size
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        if (width === 0 || height === 0) {
            console.error("Image dimensions are 0. Check if the image is fully loaded.");
            return;
        }

        // Set canvas size to match image
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = img.width + "px";
        canvas.style.height = img.height + "px";
        canvas.style.transition = "opacity 0.5s ease-in-out"; // Optional fade-in

        // Replace the image with the canvas
        img.parentNode.replaceChild(canvas, img);

        let percent = 0.05; // Start at 5% resolution

        function reveal() {
            if (percent >= 1) return; // Stop when fully revealed

            percent += (percent < 0.1) ? 0.001 : 0.02; // Faster progression after 10%

            const scaledWidth = Math.max(1, width * percent);
            const scaledHeight = Math.max(1, height * percent);

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
            ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height);

            requestAnimationFrame(reveal);
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    reveal();
                    observer.unobserve(canvas); // Run animation once
                }
            });
        }, { threshold: 0.5 });

        observer.observe(canvas);
    }
});










// Text scramble
// document.addEventListener("DOMContentLoaded", function() {
    // function animateText(className) {
        // const names = document.querySelectorAll(`.${className}`);
        // const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~✓✗★☆◆◇■□▲▼●○◎♠♣♥♦✈∞→←↑↓↔↕";
    
        // names.forEach((el) => {
        //     const originalName = el.innerText;
        //     const finalText = originalName.split("");
        //     const splitText = new SplitType(el, { types: "chars" });
    
        //     const charElements = splitText.chars;
        //     const indices = [...Array(charElements.length).keys()];
    
        //     indices.sort(() => Math.random() - 0.5);
        //     indices.forEach((charIndex, i) => {
        //         gsap.to(charElements[charIndex], {
        //             duration: 0.7,
        //             textContent: finalText[charIndex],
        //             ease: "power2.in",
        //             repeat: 0,
        //             delay: i * 0.1,
        //             modifiers: {
        //                 textContent: () => chars[Math.floor(Math.random() * chars.length)]
        //             },
        //             onComplete: () => {
        //                 charElements[charIndex].innerText = finalText[charIndex];
        //             }
        //         });
        //     });
        // });

        // console.log('wow');
    // }
    
    //     animateText("hero_name");
    // });
