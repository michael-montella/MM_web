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

document.addEventListener('DOMContentLoaded', () => {
    setImageWidth()
})




/** Lenis */

// Lenis
const lenis = new Lenis({
    autoRaf: true,
  });
  
  // Scroll-To Anchor Lenis
  function initScrollToAnchorLenis() {
    
    // Set scroll links
    const sectionLinks = document.querySelectorAll('.project_section-link')
    sectionLinks.forEach((link) => {
        console.log(link.getAttribute('data-anchor-target'))
        link.setAttribute('href', `#${link.getAttribute('data-anchor-target')}`)
    })

    // Scroll to section
    document.querySelectorAll("[data-anchor-target]").forEach(element => {
      element.addEventListener("click", function () {
        console.log(this.getAttribute("data-anchor-target"))
        const targetScrollToAnchorLenis = this.getAttribute("data-anchor-target");
  
        lenis.scrollTo(targetScrollToAnchorLenis, {
          easing: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2),
          duration: 1.2,
          offset: 0 // Option to create an offset when there is a fixed navigation for example
        });
      });
    });
  }
  
  // Initialize Scroll-To Anchor Lenis
  document.addEventListener('DOMContentLoaded', () => {
    initScrollToAnchorLenis();
  });


