/*스크롤 감지 fixed menu*/
const fixedMenu = document.querySelector('.aside_menu');

window.addEventListener('scroll', () => {

    if (window.scrollY > 3000) {
        fixedMenu.classList.add('active');
    } else {
        fixedMenu.classList.remove('active');
    }

});

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".menu-overlay");
const menuLinks = document.querySelectorAll(".mobile-menu a");




menuBtn.addEventListener("click", () => {
    if (mobileMenu.classList.contains("active")) {
        window.closeMenu();
    } else {
        window.openMenu();
    }
});

overlay.addEventListener("click", window.closeMenu);


menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMenu();

    });

});


window.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeMenu();

    }

});
/* Scroll Top 버튼 */
const btnTop = document.querySelector(".btn_top");        
btnTop.addEventListener("click", () => {
    window.scrollTo({
    top: 0,
    behavior: "smooth"
    });
});



/* href="#" 화면 스크롤 방지 */
document.addEventListener("click", function (e) {
    const link = e.target.closest('a[href="#"]');

    if (link) {
        e.preventDefault();
    }
});

/*클래스 슬라이드*/
//  var swiper = new Swiper('.classSwiper', {
//     loop:true,
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true, // 클릭시 해당 슬라이더로 이동
//     },
//     speed: 450,              // 전환 속도 (기본 300보다 살짝 여유, 너무 빠르면 급작스러움)

//     // 드래그 반응성을 예민하게
//     threshold: 2,             // 아주 살짝만 움직여도 스와이프로 인식
//     followFinger: true,       // 손가락 움직임에 실시간으로 슬라이드가 따라옴
//     shortSwipes: true,        // 짧고 빠른 스와이프도 다음 슬라이드로 인정
//     longSwipesRatio: 0.15,    // 슬라이드 폭의 15%만 넘겨도 다음으로 전환 (기본 0.5보다 훨씬 예민)
//     longSwipesMs: 150,        // 150ms 안에 스와이프하면 속도 기반으로 즉시 전환

//     // 탄성 있는 저항감 (끝부분 당길 때 자연스럽게)
//     resistance: true,
//     resistanceRatio: 0.65,    // 낮을수록 뻣뻣, 조금 낮춰서 탄탄한 느낌

//     // 전환 이징 (기본은 ease, cubic-bezier로 스피디한 느낌 추가)
//     cssMode: false,
//     grabCursor: true,         // 마우스 오버 시 grab 커서로 인터랙티브함 강조
//     autoplay: {
//         delay: 2500,               // 다음 슬라이드까지 대기 (빠른 템포)
//         disableOnInteraction: false,
//     },
//      spaceBetween: 0,
// });