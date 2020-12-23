let controller;
let slideScene;

function animateSlides(){
     controller = new ScrollMagic.Controller();

     let sliders = document.querySelectorAll(".slide");
     let nav = document.querySelector(".nav-header");

     sliders.forEach(slide =>{

            let revealImg = slide.querySelector(".reveal-img");
            let img = slide.querySelector("img");
            let revealText = slide.querySelector(".reveal-text");


            let slideTl = gsap.timeline({defaults:{duration:1,ease:'power2.inOut'}});

            slideTl.fromTo(revealImg,{x:'0%'},{x:'100%'});
            slideTl.fromTo(img,{scale:2},{scale:1},'-=1');
            slideTl.fromTo(revealText,{x:'0%'},{x:'100%'},'-=0.75');
            slideTl.fromTo(nav,{y:"-100%"},{y:'0%'},'-=0.5');
     });
}

animateSlides();