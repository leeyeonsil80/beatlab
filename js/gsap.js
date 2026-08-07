// use a script tag or an external JS file

let playMenuReveal = () => {}; // 기본값은 빈 함수 (PC 등 조건 미매치 시 안전하게)
document.addEventListener("DOMContentLoaded", (event) => {
    // gsap code here! 
    gsap.registerPlugin(ScrollTrigger);

       
    //loading
    const loading_tl = gsap.timeline();

    loading_tl
        .to(".hero_intro_logo", {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.45)",
        })
        .to({}, {
            duration: .5
        })
        .to(".hero_intro_logo", {
            opacity: 0,
            scale: 0,
            duration: .8,
            ease: "elastic.in(1, 0.5)"
        })
        .set(".loading", {
            display: "none"
        })
        .call(() => {
            const heroSection = document.querySelector(".main_visual");
            const heroBottom = heroSection.getBoundingClientRect().bottom;

            if (heroBottom <= 0 || window.scrollY > 10) {
                gsap.set(".main_visual", { yPercent: 0 });
                hero_tl.play();
                ScrollTrigger.refresh();
            } else {
                gsap.from(".main_visual", {
                    yPercent: 100,
                    duration: 1.2,
                    ease: "power4.out",
                    onComplete: () => {
                        hero_tl.play();
                    }
                });
            }
        })
        .call(() => {
            ScrollTrigger.refresh();
        });

    //loading 끝

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
    // ▼ 여기부터 추가
    .to(".scroll-indicator", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
            gsap.to(".scroll-indicator", {
                y: 8,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
            });
        }
    });

    // scroll-indicator 클릭 시 danceclass 섹션으로 이동
    document.querySelector('.scroll-indicator').addEventListener('click', () => {
        const target = document.querySelector('.danceclass');
        const offset = 0; // 헤더 높이만큼
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });

    // 스크롤 시작하면 scroll-indicator 자연스럽게 사라짐
    gsap.to(".scroll-indicator", {
        opacity: 0,
        scrollTrigger: {
            trigger: ".main_visual",
            start: "top top",
            end: "bottom top",
            scrub: true,
        }
    });

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
        duration: 0.4,
        ease: "power3.out"
    })
    .from(".danceclass .h2_desc",{
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    },"-=0.5")
    .from(".swiper",{
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    },"-=0.5")
    .from(".class_btn",{
        y: 40,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out"
    },"-=0.7");


 let currentTl = null;

    function resetSlide(slideEl) {
        const video = slideEl.querySelector('.class_card video');
        const titleSpan = slideEl.querySelector('.class_card h3 span');
        const info = slideEl.querySelector('.class_name');

        if (video) gsap.set(video, { scale: 1 });
        if (titleSpan) gsap.set(titleSpan, { y: '120%', scale: 1, opacity: 0 });
        if (info) gsap.set(info, { x:20, opacity: 0 });
    }

    function animateSlideIn(slideEl) {
        if (!slideEl) return;

        const video = slideEl.querySelector('.class_card video');
        const titleSpan = slideEl.querySelector('.class_card h3 span');
        const info = slideEl.querySelector('.class_name');

        if (!video || !titleSpan || !info) return;

        if (currentTl) currentTl.kill();

        currentTl = gsap.timeline();

        currentTl.to(video, {
            scale: 1,
            duration: 1.6,
            ease: 'power2.out',
        }, 0)
        .to(titleSpan, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(0.8)'
        }, 0.05)
        .to(info, {
            x:0,
            opacity: 1,
            duration: 0.2,
            ease: 'ease.out',
        }, 0.2);
    }

    function handleSlideChange(swiperInstance) {
        swiperInstance.slides.forEach((slideEl, index) => {
            if (index === swiperInstance.activeIndex) {
                animateSlideIn(slideEl);
            } else {
                resetSlide(slideEl);
            }
        });
    }

    const swiper = new Swiper('.classSwiper', {
        effect: 'cube',
        cubeEffect: {
            shadow: false, // 그림자 제거
            slideShadows: false, // 옆면 음영은 유지 (입체감은 살림)
        },
        grabCursor: true,

        loop: true,

        pagination: {
            el: '.class_page',
            clickable: true,
        },

        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },

        speed: 700, // 큐브 회전은 느긋한 속도가 자연스러움

        on: {
            init: function () {
                handleSlideChange(this);
            },
            slideChangeTransitionEnd: function () {
                handleSlideChange(this);
            },
            loopFix: function () {
                handleSlideChange(this);
            },
        },
    });


     //instructors 텍스트 분리
    const instructors_split = new SplitType(".instructors .h2_title", {
    types: "chars"
    });
    
        
    const ins_mm = gsap.matchMedia();
    const ins_list = document.querySelector(".instructors_list");
    ins_mm.add("(min-width: 769px)", () => {
         // 이 안의 코드는 뷰포트 너비가 769px 이상일 때만 실행됩니다.
        // 타이틀은 pin 전에 미리 트리거 (별도 타임라인)
        const tl_title = gsap.timeline({
            scrollTrigger: {
                trigger: ".instructors",
                start: "top 30%", // pin의 start(top 100px)보다 훨씬 이른 시점
            }
        });

        tl_title
            .from(instructors_split.chars, {
                y: 80,
                opacity: 0,
                stagger: 0.05,
                duration: 0.6,
                ease: "power3.out"
            })
            .from(".instructors .h2_desc", {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out"
            }, "-=0.3");

        // 사진/텍스트만 pin+scrub으로 남김
        const tl_pc = gsap.timeline({
            scrollTrigger: {
                trigger: ".instructors",
                start: "top 100px",
                pin: true,
                scrub: 1,
            }
        });

        tl_pc
            .from(".logo_ani1", {
                opacity: 0,
                duration: 0.6,
                ease: "power3.out"
            })
        .to(".instructors_list li .instructors_photo img", {
                y: '0%',
                rotate: 0,
                scale: 1,
                duration: 1.1,
                stagger: 0.1,
                ease: 'back.out(1.6)',
            })
            .to(".instructors_name", {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: 'power2.out',
            }, "-=0.6")
        return () => {
            tl_title.scrollTrigger && tl_title.scrollTrigger.kill();
            tl_title.kill();

            tl_pc.scrollTrigger && tl_pc.scrollTrigger.kill();
            tl_pc.kill();

            gsap.set(".instructors_list li .instructors_photo img", {
                clearProps: "transform,opacity"
            });
            gsap.set(".instructors_name", {
                clearProps: "transform,opacity"
            });
            gsap.set(instructors_split.chars, {
                clearProps: "transform,opacity"
            });
            gsap.set(".instructors .h2_desc", {
                clearProps: "transform,opacity"
            });
            gsap.set(".logo_ani1", {
                clearProps: "opacity"
            });
        };
    });
     ins_mm.add("(max-width: 768px)", () => {

        // ==========================
        // Mobile / Tablet
        // ==========================

    // 혹시 모를 잔여 인라인 스타일 정리 후 시작
        gsap.set(".instructors_list li .instructors_photo img", {
            clearProps: "transform,opacity"
        });
        const tl_mobile = gsap.timeline({
            scrollTrigger: {
                trigger: ".instructors",
                start: "top 30%",
            }
        });
        tl_mobile.from(".instructors_list li",{
            y: 60,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,  
        })
        .to(".instructors_name", {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power2.out',
        }, "-=0.6")
        .from(".logo_ani1",{
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
        })
        ;

        return () => {
            tl_mobile.scrollTrigger && tl_mobile.scrollTrigger.kill();
        };

    });
    ins_mm.add("(max-width: 1280px)", () => {
        const mobileMenu_tl = gsap.timeline();
        // 이 브레이크포인트에서 실행할 리빌 함수 정의
        playMenuReveal = () => {
           mobileMenu_tl.from(".mobile_menu_logo",{
                opacity:0,
                y:40,
                duration: 0.4,
           })
           .to(menuLinks, {
                y:0,
                opacity: 1,
                duration: 1,
                stagger: 0.18,
                ease: 'power3.out',
            });
        };

        // cleanup: 브레이크포인트를 벗어나면 다시 빈 함수로 초기화
        return () => {
            playMenuReveal = () => {};
            gsap.set(menuLinks, { y: '100%', opacity: 0 }); // 상태도 리셋
        };
    });
  
    const menuPanel = document.querySelector('.mobile-menu');       // 패널
    const menuLinks = document.querySelectorAll('.mobile-menu ul li a'); // 텍스트 (a 태그들)
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            window.closeMenu(); 
            // closeMenu(); // 같은 파일 안에 있다면 window 없이 호출
        });
    });
    // 초기 상태: 항상 숨겨둠
    gsap.set(menuLinks, { y: '100%', opacity: 0 });



    // openMenu, closeMenu 모두 같은 스코프 안으로 이동
    window.openMenu = function () {

        menuBtn.classList.add("active");
        mobileMenu.classList.add("active");
        overlay.classList.add("active");

        document.body.style.overflow = "hidden";

        playMenuReveal(); // 지역 변수라 그냥 호출 가능
    };

    window.closeMenu = function () {

        menuBtn.classList.remove("active");
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");

        document.body.style.overflow = "";

        gsap.to(menuLinks, {
            y: '100%',
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.in',
        });
    };

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
        duration: 0.5,
        ease: "power3.out"
    })
    .from(".moments .h2_desc",{
        y: 50,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out"
    },"-=0.3")
    .from(".moments_list li",{
        y:100,
        opacity:0,
        stagger:0.1
    },"-=0.8")
    .from(".logo_ani2",{
        opacity:0,
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
            start: "top 60%",
        }
    });
    contact_tl.from(".contact .h2_title",{
        y:50,
        opacity:0,
        duration:0.4,
        ease:"power3.out",
    })
    .from(".contact_form",{
        y:50,
        opacity:0,
        duration:0.4,
        ease:"power3.out",    
    },"-=0.2");

    

    const instagram_tl= gsap.timeline({
        scrollTrigger: {
            trigger: ".instagram",
            start: "top 60%"
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
        duration: 0.4,
        ease: "power3.out"
    },"-=0.2")
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

    const mm = gsap.matchMedia();

    mm.add("(hover: hover)", () => {
    // 마우스가 있는 기기(PC)에서만 실행
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
    //로고 바운스 끝

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
    //menu Rolling 끝
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
    //버튼 애니메이션 끝
    const asideBtns = document.querySelectorAll('.aside_menu .chatbot img, .aside_menu .btn_top img');

        asideBtns.forEach(btn => {

            btn.addEventListener('mouseenter', () => {
                gsap.timeline()
                    .to(btn, {
                        scale: 0.85,
                        opacity:.7,
                        duration: 0.15,
                        ease: 'power2.out',
                    })
                    .to(btn, {
                        scale: 1,
                        duration: 0.5,
                        opacity:1,
                        ease: 'elastic.out(1, 0.4)', // 탄성 바운스
                    });
            });

        });
   
    
    //여기까지 
    });


});