// use a script tag or an external JS file
document.addEventListener("DOMContentLoaded", (event) => {
    // gsap code here! 
    gsap.registerPlugin(ScrollTrigger);

    //로고 바운스
    const logo = document.querySelector("h1");
    logo.addEventListener("mouseenter", () => {
    gsap.fromTo(logo,
        {
        scale: 1.2
        },
        {
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.35)"
        }
    );
    });

    //menu Rolling
    document.querySelectorAll(".rolling-text").forEach(text => {

        const letters = [...text.textContent];
        text.innerHTML = "";

        letters.forEach(letter => {

            if(letter === " "){
                text.insertAdjacentHTML(
                    "beforeend",
                    `<span class="char space"></span>`
                );
                return;
            }

            text.insertAdjacentHTML(
                "beforeend",
                `
                <span class="char">
                    <span class="char-inner">
                        <span>${letter}</span>
                        <span>${letter}</span>
                    </span>
                </span>
                `
            );
        });

        const chars = text.querySelectorAll(".char-inner");

        let animating = false;

        text.parentElement.addEventListener("mouseenter", () => {

            if(animating) return;
            animating = true;

            gsap.to(chars,{
                yPercent:-50,
                stagger:0.025,
                duration:0.45,
                ease:"power3.out",
                onComplete(){

                    chars.forEach(char=>{

                        // 첫 번째와 두 번째 글자 교체
                        char.appendChild(char.firstElementChild);

                        // 위치 초기화
                        gsap.set(char,{
                            yPercent:0
                        });

                    });

                    animating = false;
                }
            });

        });

    });
    //loading
    const loading_tl = gsap.timeline();
    loading_tl.from(".hero_intro_logo",{
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
            
    })
    .to({},{
            duration:.5
        })
        .to(".hero_intro_logo",{
            opacity:0,
            scale:0,
            duration:.8,
            ease: "elastic.in(1, 0.5)"
    })
    .set(".loading", {
        display: "none"
    })
    .from(".main_visual", {
        yPercent: 100,
        duration: 1.2,
        ease: "power4.out",
        onComplete: () => {
        hero_tl.play();
        }
    })
    .call(() => {
        ScrollTrigger.refresh();
        hero_tl.play();
    });

    //main_visual


    const hero_tl = gsap.timeline({
    });
    const heroVideo = document.querySelector(".hero-video");
    // 처음에는 멈춤
    heroVideo.load();
    heroVideo.pause();
    heroVideo.currentTime = 0;
    const title1 = new SplitType(".hero-title", {
        types: "chars"
    });
    const title2 = new SplitType(".hero-title2", {
        types: "chars"
    });

    hero_tl.to({},{
        duration:0.1,
        onStart: () => {
            heroVideo.currentTime = 0;
            heroVideo.play();
        }
    },"+=2.5")
    .to(".video_mask",{
        webkitMaskSize: "1000% 1000%",
        maskSize: "250% 250%",
        duration: 1,
        ease: "power2.inOut"
    })
    .from(title1.chars,{
        y:80,
        opacity:0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power3.out"
    })
    .to({},{
        duration: 1//1초 동안 아무 동작 없이 대기
    })
    .to(title1.chars,{
        y:-50,
        opacity:0,
        stagger: 0.02,
        duration: 0.1,
        ease: "power3.in"
    })
    .from(".hero-title2",{
        scale:3,
        opacity:0,
        filter:"blur(30px)",
        duration:0.7,
        ease:"expo.out"
    })
    .to(title2.chars, {
        y: -20,
        stagger: 0.02,
        duration: 0.4,
        ease: "power2.out"
    })
    .to(title2.chars, {
        y: 20,
        stagger: 0.02,
        duration: 0.3,
        ease: "power2.inOut"
    })


    //danceclass

    const classSection = document.querySelector(".danceclass");

    //클래스 타이틀 텍스트 분리
    const danceclass_split = new SplitType(".danceclass .h2_title", {
    types: "chars"
    });
    const danceclass_tl = gsap.timeline(
        {
            scrollTrigger: {
            trigger: ".danceclass",
            start:"top 30%",
           }
         }
    );
    danceclass_tl.from(danceclass_split.chars,{
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out"
    })
    .from(".danceclass .h2_desc",{
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    },"-=0.3")
    .from(".swiper",{
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    })
    .from(".class_btn",{
        y: 40,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out"
    },"-=0.2");
    
    //버튼 애니메이션

const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {

    const spotlight = button.querySelector(".button__spotlight");

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(spotlight, {
            x: x,
            y: y,
            scale: 40,
            duration: 0.3,
            ease: "power2.out"
        });

    });

    button.addEventListener("mouseleave", (e) => {

        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(spotlight, {
            x: x,
            y: y,
            scale: 0,
            duration: 0.3,
            ease: "power2.out"
        });

    });

});

    
    /*
const classtitles = [];

document.querySelectorAll(".class_card h3").forEach(title => {

    classtitles.push(
        new SplitType(title, {
            types: "chars"
        })
    );

});
classtitles.forEach(split => {

    gsap.set(split.chars, {

        y: 60,
        opacity: 0,
        rotateX: -90,
        transformOrigin: "50% 100%"

    });

});
function animateTitle(index){

    const chars = classtitles[index].chars;

    gsap.fromTo(chars,

        {
            y:60,
            opacity:0,
            rotateX:-90
        },

        {
            y:0,
            opacity:1,
            rotateX:0,

            stagger:.03,

            duration:.6,

            ease:"power3.out"

        }

    );

}
function hideTitle(index){

    const chars = classtitles[index].chars;

    gsap.to(chars,{

        y:-40,

        opacity:0,

        stagger:.02,

        duration:.25,

        ease:"power2.in"

    });

}
animateTitle(0);

swiper.on("slideChangeTransitionStart",()=>{

    hideTitle(swiper.previousIndex);

});

swiper.on("slideChangeTransitionEnd",()=>{

    animateTitle(swiper.activeIndex);

});
swiper.on("slideChangeTransitionEnd",()=>{

    const activeVideo = swiper.slides[swiper.activeIndex].querySelector("video");

    gsap.fromTo(activeVideo,

        {
            scale:1.3
        },

        {
            scale:1,

            duration:1.2,

            ease:"power3.out"

        }

    );

});
*/
    //instructors

     //instructors 텍스트 분리
    const instructors_split = new SplitType(".instructors .h2_title", {
    types: "chars"
    });
    
   const instructors_tl = gsap.timeline(
        {
            scrollTrigger: {
            trigger: ".instructors",
            start:"top 30%",
           }
         }
    );
    instructors_tl.from(instructors_split.chars,{
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out"
    })
  .from(".instructors .h2_desc",{
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    },"-=0.3");

    
    //PC 가로 스크롤
    const ins_mm = gsap.matchMedia();
    // 강사 리스트 가로 스크롤
    const ins_list = document.querySelector(".instructors_list");
    ins_mm.add("(min-width: 769px)", () => {
        instructors_tl.from(".instructors_list li",{
            x: 100,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,  
        })
        .from(".logo_ani1",{
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
        });
    
});
    ins_mm.add("(max-width: 768px)", () => {

        // ==========================
        // Mobile / Tablet
        // ==========================

        instructors_tl.from(".instructors_list li",{
            y: 60,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,  
        })
        .from(".logo_ani1",{
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
        });

    });

    // 헤더 배경 지정
    ScrollTrigger.create({

        trigger: ".danceclass",

        start: "top top",

        onEnter: () => {

            header.classList.add("is-dark");

        },

        onLeaveBack: () => {

            header.classList.remove("is-dark");

        }

    });

    //Moments
    //bg,text 색상 변경
    /*
    ScrollTrigger.create({
        trigger: ".moments",
        start: "top center",
        end: "bottom center",

        onEnter: () => {
            document.body.classList.add("light");
        },

        onLeave: () => {
            document.body.classList.remove("light");
        },

        onEnterBack: () => {
            document.body.classList.add("light");
        },

        onLeaveBack: () => {
            document.body.classList.remove("light");
        }
    });
    */
    //moments 텍스트 분리
    const moments_split = new SplitType(".moments .h2_title", {
    types: "chars"
    });
    const moments = gsap.timeline(
        {
            scrollTrigger: {
            trigger: ".moments",
            start:"top center",
           }
         }
    );
    moments.from(moments_split.chars,{
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "power3.out"
    })
    .from(".moments .h2_desc",{
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    },"-=0.3")
    .from(".moments_list li",{
        y:100,
        opacity:0,
        stagger:0.15
    });
    //schedule
const sche_container = document.querySelector(".schedule_box");
gsap.set(sche_container, { visibility: "visible" });

const schedule_link = document.querySelector(".schedule_link");

// line1 / line2
const line1 = new SplitType(".line1", {
    types: "chars"
});

const line2 = new SplitType(".line2", {
    types: "chars"
});

const transformOrigin = "50% 50% -30px";

// perspective는 부모에 주는 것이 좋음
gsap.set(".schedule_link", {
    perspective: 700
});

gsap.set(".line", {
    transformStyle: "preserve-3d"
});

// 두 번째 줄은 처음에 아래에서 대기
gsap.set(line2.chars, {
    rotationX: -90,
    transformOrigin
});

const sche_tl = gsap.timeline({
    paused: true
});

// 첫 번째 줄 사라짐
sche_tl.to(line1.chars, {
    rotationX: 90,
    transformOrigin,
    stagger: 0.05,
    duration: 0.45,
    ease: "power2.inOut"
}, 0);

// 두 번째 줄 등장
sche_tl.to(line2.chars, {
    rotationX: 0,
    transformOrigin,
    stagger: 0.05,
    duration: 0.45,
    ease: "power2.inOut"
}, 0);

schedule_link.addEventListener("mouseenter", () => {

    if (!sche_tl.isActive()) {
        sche_tl.restart();
    }

});
schedule_link.addEventListener("mouseleave", () => {

    gsap.set(line1.chars, {
        rotationX: 0
    });

    gsap.set(line2.chars, {
        rotationX: -90
    });

});
    //contact
    const contact_tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".contact",
            start: "top 40%",
        }
    });
    contact_tl.from(".contact .h2_title",{
        y:50,
        opacity:0,
        duration:0.6,
        ease:"power3.out",
    })
    .from(".contact_form",{
        y:50,
        opacity:0,
        duration:0.8,
        ease:"power3.out",    
    },"-=0.2");

    

    const instagram_tl= gsap.timeline({
        scrollTrigger: {
            trigger: ".instagram",
            start: "top 40%"
        }
    });
     //instagram 텍스트 분리
    const insta_split = new SplitType(".instagram .h2_title", {
    types: "chars"
    });
    
    instagram_tl.from(insta_split.chars,{
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out"
    })
   .from(".insta_account",{
        y:40,
        opacity:0,
    }, "-=0.5")
    .from(".insta_marquee1 ul li",{
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power3.out"     
    }, "-=0.5")
    .from(".insta_marquee2 ul li",{
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power3.out"     
    }, "-=1");

    //footer
    const footer_tl=gsap.timeline({
        scrollTrigger: {
            trigger: ".footer",
            start: "top 80%",
        }
    });
    footer_tl.from(".footer_sns",{
        y: 80,
        opacity: 0,
        duration: 0.3,
        ease: "power3.out"            
    },)
    .from(".footer_logo",{
        y: 80,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out"            
    },"-=0.2")
    .from(".footer p",{
        y: 40,
        opacity: 0,
        duration: 0.3,
        ease: "power3.out"            
    },"-=0.1");
    ScrollTrigger.refresh();
});