let controller;
let slideScene;
let pageScene;

let controller2;
let fashionScene;

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
const burger = document.querySelector(".burger");


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

function openNav(){
     burger.classList.toggle("active");
     if(burger.classList.contains("active")){

          gsap.to(".line1",0.5,{rotate:"45",y:5,background:"black"});
          gsap.to(".line2",0.5,{rotate:"-45",y:-5,background:"black"});
          gsap.to(".nav-bar",1,{clipPath:"circle(2500px at 100% -10%)"});
          gsap.to("#logo",1,{color:"black"});
          document.body.classList.add("hide");

     }
     else{

          gsap.to(".line1",0.5,{rotate:"0",y:0,background:"white"});
          gsap.to(".line2",0.5,{rotate:"0",y:0,background:"white"});
          gsap.to(".nav-bar",1,{clipPath:"circle(50px at 100% -100%)"});
          gsap.to("#logo",1,{color:"white"});
          document.body.classList.remove("hide");

     }
}




function fashionAnimation(){

     controller2 = new ScrollMagic.Controller();

     details = document.querySelectorAll(".fashion-detail");

     gsap.fromTo('.nav-header',1,{y:'-100%'},{y:'0%',ease:'power2.inOut'});

     details.forEach((detail,index,details) => {



          const detailTl = gsap.timeline({defaults:{duration:1,ease:"power.inOut"}});
          detailTl.fromTo(detail,{opacity:1},{opacity:0});

          const nextDetail = index === details.length-1 ? "none" : details[index+1];

          const detailImg = detail.querySelector("img");

          detailTl.fromTo(nextDetail,{opacity:0},{opacity:1},'-=1');

          detailTl.fromTo(detailImg,{x:"0%"},{x:"50%"},'-=1');


          fashionScene = new ScrollMagic.Scene({
               triggerElement:detail,
               triggerHook:0,
               duration:'100%'
     
          }).setTween(detailTl)
          .setPin(detail,{pushFollowers:false})
          .addIndicators({
                    colorStart:'white',
                    colorTrigger:'white',
                    name:'fashion',
                    indent:200
               })
               .addTo(controller2)



     });


}






const logo = document.querySelector("#logo");

barba.init({

     views:[{

          namespace:"home",
          beforeEnter(){
               logo.href = "./index.html";
               animateSlides();
          },
          beforeLeave(){
               slideScene.destroy();
               pageScene.destroy();
               controller.destroy();
          }
          
     },{
          namespace:"fashion",
          beforeEnter(){
               
               fashionAnimation();
               logo.href = "../index.html";
               
          }
     }],

     transitions:[{
          name: "default",
          leave({current,next}){
              let done = this.async();

               const tl = gsap.timeline({defaults:{ease:"power2.inOut"}});
               tl.fromTo(current.container,1,{opacity:1},{opacity:0});
               tl.fromTo(".swipe",0.75,{x:'-100%'},{x:'0%',onComplete:done},'-=0.5');

               
          },
          enter({current,next}){

               window.scrollTo(0,0);

              let done = this.async();

               const tl = gsap.timeline({defaults:{ease:"power2.inOut"}});
               tl.fromTo(".swipe",0.75,{x:'0%'},{x:'100%',onComplete:done,stagger:0.25});
               tl.fromTo(next.container,1,{opacity:0},{opacity:1});
          }
     }]

});


burger.addEventListener("click",openNav);
window.addEventListener("mousemove",mouse);
window.addEventListener("mouseover",activeMouse);