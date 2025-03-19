gsap.registerPlugin(ScrollTrigger);

function hideAria(e) {
    e.setAttribute('aria-hidden', 'true');
}

/** Hide Name */
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

window.addEventListener('load', function(event) {
    hideName();
    setImageWidth();
});


/** Set image width */

const getAspect = (img) => {
    const w = img.naturalWidth
    const h = img.naturalHeight

    return w/h
}

setImageWidth = () => {
    const projectGallery = document.querySelectorAll('.project_gallery-list img')
    projectGallery.forEach((img) => {
        if(getAspect(img) < 1) {
            img.classList.add('halfWidth')
            img.parentNode.classList.add('imgCenter')
        }
    })

}


/** Set section links */

const sectionLinks = document.querySelectorAll('.project_section-link')
sectionLinks.forEach((link) => {
    link.setAttribute('href', `#${link.innerText}`)
})


/** Lenis */

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


