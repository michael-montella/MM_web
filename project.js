gsap.registerPlugin(ScrollTrigger);

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
});