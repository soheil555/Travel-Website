let controller;
let slideScene;
let pageScene;

function animateSlides(){

     controller = new ScrollMagic.Controller();

     const slides = document.querySelectorAll(".slide");
     const nav = document.querySelector(".nav-header");

     slides.forEach((slide,index,slides) => {

          const img = slide.querySelector("img");
          const revealImg = slide.querySelector(".reveal-img");
          const revealText = slide.querySelector(".reveal-text");

          const slideTl = gsap.timeline({defaults:{duration:1,ease:"power.inOut"}});
          slideTl.fromTo(nav,{y:"-100%"},{y:"0%"});
          slideTl.fromTo(revealImg,{x:"0%"},{x:"100%"},"-=1");
          slideTl.fromTo(revealText,{x:"0%"},{x:"100%"},'-=0.75');
          slideTl.fromTo(img,{scale:1.5},{scale:1},"-=1");


          slideScene = new ScrollMagic.Scene({
               triggerElement:slide,
               triggerHook:0.25,
               reverse:false
          })
          .setTween(slideTl)
          .addIndicators({
               colorStart:'white',
               colorTrigger:'white',
               name:'slide'
          })
          .addTo(controller);

          const pageTl = gsap.timeline();
          let nextSlide = slides.length-1 == index ? 'last':slides[index+1];
          pageTl.fromTo(nextSlide,{y:"0%"},{y:"50%"});
          pageTl.fromTo(slide,{opacity:1,scale:1},{opacity:0,scale:0.5})
          pageTl.fromTo(nextSlide,{y:"50%"},{y:"0%"},'-=0.5');
          pageScene = new ScrollMagic.Scene({
               triggerElement:slide,
               duration:'100%',
               triggerHook:0
          })
          .setPin(slide,{pushFollowers:false})
          .setTween(pageTl)
          .addIndicators({
               colorStart:'white',
               colorTrigger:'white',
               name:'page',
               indent:200
          })
          .addTo(controller)


     });

}


const cursor = document.querySelector(".cursor-div");
const cursorText = cursor.querySelector("span");

function mouse(e){


     cursor.style.top = e.pageY + "px";
     cursor.style.left = e.pageX + "px";

}

function activeMouse(e){
     if(e.target.id == "logo" || e.target.classList.contains("burger")){
          cursor.classList.add("active");
     }
     else{
          cursor.classList.remove("active");
     }

     if(e.target.classList.contains("explore")){

          
          cursor.classList.add("active-explore");
          cursorText.innerText = "Tap";

          gsap.to(".title-swipe",1,{y:"0%"})
          

     }
     else{
          cursor.classList.remove("active-explore");
          cursorText.innerText = "";
          gsap.to(".title-swipe",1,{y:"100%"})

     }

}


window.addEventListener("mousemove",mouse);
window.addEventListener("mouseover",activeMouse);



animateSlides();