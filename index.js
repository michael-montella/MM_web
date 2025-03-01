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


// set 'aria-hidden' to 'true' for split type chars
function hideAria(e) {
    e.setAttribute('aria-hidden', 'true');
}




// Stagger blur load
const firstName = document.querySelector(".hero_name");

const heroTitle = document.querySelector(".hero_h1");
heroTitle.setAttribute('aria-label', heroTitle.innerText);

const heroTitleSplit = new SplitType(heroTitle, { types: "chars" });
heroTitleSplit.chars.forEach(l => hideAria(l));

const heroSub = document.querySelector('.hero_text-block');
heroSub.setAttribute('aria-label', heroSub.innerText);

const heroSubSplit = new SplitType(heroSub, { types: "chars" });
heroSubSplit.chars.forEach(l => hideAria(l));

const staggerBlur = gsap.timeline({
    defaults: {
        ease: "power1.out",
        stagger: {
            each: 0.02,
            from: "random"
        }
    },
    onComplete: hideName
});

staggerBlur
    .from(heroTitleSplit.chars, {
        y: 30,
        filter: "blur(30px)",
        opacity: 0,
        duration: 0.75
    }, 0.1)
    .from(heroSubSplit.chars, {
        y: 30,
        filter: "blur(30px)",
        opacity: 0,
        duration: 1
    }, "<=0.1")



const heroText = document.querySelectorAll(".hero_h1");
// heroText.forEach((text) => {
//     text.addEventListener("mouseover", animateText);
// })
// function animateText() {
//     const title = new SplitType(".hero_h1", { types: "words" });
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
//     const words = title.words;
//     const finalText = document.querySelector('.hero_h1').innerText;
//     words.forEach((el) => {
//         const word = new SplitType(el, { types: "chars" });

//         gsap.to(word, {
//             y: 100,
//             stagger: {
//                 each: 0.05,
//                 from: "random"
//             }
//         })
//     })

//     // gsap.set(charElements, {opacity: 1});
//     // charElements.forEach((char, i) => {
//     //   gsap.to(char, {
//     //     duration: 1,
//     //     textContent: finalText[i],
//     //     ease: "power2.out",
//     //     repeat: 0,
//     //     delay: i * 0.1,
//     //     modifiers: {
//     //         textContent: () => chars[Math.floor(Math.random() * chars.length)]
//     //     },
//     //     onComplete: () => {
//     //         char.innerText = finalText[i];
//     //     }
//     //   });  
//     // });
//     // const originalText = this.innerText;
//     // const
//     // const splitText = new SplitType(this, { types: "chars" });

//     // const charElements = splitText.chars;
//     // const indices = [...Array(charElements.length).keys()];

//     // indices.sort(() => Math.random() - 0.5);
//     // indices.forEach((charIndex, i) => {
//     //     gsap.to(charElements[charIndex], {
//     //         duration: 0.7,
//     //         textContent: finalText[charIndex],
//     //         repeat: 0,
//     //         delay: i * 0.1,
//     //         modifiers: {
//     //             textContent: () => chars[Math.floor(Math.random() * chars.length)]
//     //         },
//     //         onComplete: () => {
//     //             charElements[charIndex].innerText = originalText;
//     //         }
//     //     })
//     // })
// }


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


function hideName() {
    gsap.to(heroNameTextSplit.chars, {
        filter: "blur(10px)",
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
        stagger: {
            each: 0.06,
            from: "end"
        }
    })
}

function showName() {
    gsap.to(heroNameTextSplit.chars, {
        filter: "blur(0px)",
        opacity: 1,
        stagger: {
            each: 0.06,
            from: "start"
        }
    })
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
        stagger: {
            each: 0.01,
            from: "random"
        },
        ease: "power2.out"
    }
});
tl.from([infoTextSplit.chars, infoSub.chars, infoP.chars], {
    y: 2,
    filter: "blur(5px)",
    opacity: 0,
    onComplete: startCounting
})
tl.pause(0);
const playST = ScrollTrigger.create({
    trigger: '.home-section-2',
    onEnter: () => tl.play()
});

const resetST = ScrollTrigger.create({
    trigger: '.home-section-2',
    onLeaveBack: stopCounting
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





// Selected Work Sticky Scroll
const projectTitles = Array.from(document.querySelectorAll('.project-title'));
const projectContainers = Array.from(document.querySelectorAll('.selected_container'));

function textUp(text, el) {
    
}

projectContainers.forEach((el) => {
    const title = el.querySelector('.selected_title span');
    const titleChars = new SplitType(title, { types: 'chars' });

    const subTitle = el.querySelector('.selected_number span');
    const subTitleChars = new SplitType(subTitle, { types: 'chars' });

    const linkText = el.querySelector('.selected_link-text span');
    const linkChars = new SplitType(linkText, { types: 'chars' });

    const dateText = el.querySelector('.selected_date span');
    const dateChars = new SplitType(dateText, { types: 'chars' });

    const bodyText = el.querySelectorAll('.selected_categories span');
    const bodyLines = [];
    bodyText.forEach((line) => {
        const split = new SplitType(line, { types: 'chars' });
        bodyLines.push(split);
    })
    // I think to get each line I might need to query selector all, then store the split type object in an array to pass into tween
    console.log(bodyLines);
    const projectTL = gsap.timeline({
        scrollTrigger: {
            trigger: el,
            start: "top 95%",
            toggleActions: "restart none none reverse"
        },
    })
    
    //each element might need its own timeline
    //create variables for each delay for easier editing
    // const titleDelay = 0.25;
    // const dateDelay = 0.75

    //maybe not. maybe best to keep one master timeline for all animations with same trigger (container)

    console.log(bodyLines.lines);
    projectTL.from(subTitleChars.chars, {
        y: 100,
        duration: 1,
        opacity: 0,
        ease: "power2.out",
        stagger: {
            each: 0.01,
            from: "start"
        }
    })
    .from([titleChars.chars, linkChars.chars], {
        y: 100,
        duration: 1,
        opacity: 0,
        ease: "power2.out",
        stagger: {
            each: 0.01,
            from: "start"
        }
    }, "-=0.75")
    .from(dateChars.chars, {
        y: 100,
        duration: 1,
        opacity: 0,
        ease: "power2.out",
        stagger: {
            each: 0.01,
            from: "start"
        }
    }, "-=0.75")
    .from(bodylines, {
        y: 100,
        duration: 1,
        opacity: 0,
        ease: "power2.out",
        stagger: {
            each: 0.01,
            from: "start"
        }
    }, "-=0.75")

})






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
    lerp: 0.1,
    wheelMultiplier: 0.9,
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
