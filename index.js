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



const charSplit = (el, selector) => {
    const text = el.querySelector(selector)
    text.setAttribute('aria-label', text.innerText)

    return new SplitType(text, { types: 'chars' })
}

const selected = () => {
    let projectNum = 1
    gsap.utils.toArray('.selected_div').forEach((el) => {
        const selectedNumber = el.querySelector('.selected_number-div')
        const title = charSplit(el, '.selected_title')
        const subTitle = charSplit(el, 'h6.selected_subtitle')
        const linkChars = charSplit(el, '.selected_link-text span')
        // const dateChars = charSplit(el, 'selected_date span')


        selectedNumber.setAttribute("href", `#project-${projectNum}`)
        projectNum++

        const selectedFill = el.querySelector('.selected_fill')

        selectedNumber.tl = gsap.timeline({ // Create timeline for selected number
            paused: true,
            defaults: {
                duration: 0.5,
                ease: "power2.inOut"
            }
        });

        selectedNumber.tl.fromTo(selectedFill, {
            width: "0%"
        }, {
            width: "100%"
        });
        selectedNumber.tl.add("midway");
        selectedNumber.tl.fromTo(selectedFill, {
            width: "100%",
            left: 0
        }, {
            width: "0%",
            left: "100%",
            immediateRender: false
        });
        

        selectedNumber.addEventListener("mouseenter", function() {
            selectedNumber.tl.tweenFromTo(0, "midway");
        })

        selectedNumber.addEventListener("mouseleave", function() {
            selectedNumber.tl.play();
        })

        selectedNumber.addEventListener('mouseenter', () => {

        })
    })
}





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



window.addEventListener('load', function(event) {
    hideName();
    init();
    selected();
});
