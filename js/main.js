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

function openMenu() {

    menuBtn.classList.add("active");
    mobileMenu.classList.add("active");
    overlay.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeMenu() {

    menuBtn.classList.remove("active");
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");

    document.body.style.overflow = "";
}

menuBtn.addEventListener("click", () => {

    if (menuBtn.classList.contains("active")) {

        closeMenu();

    } else {

        openMenu();

    }

});


overlay.addEventListener("click", closeMenu);


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
 var swiper = new Swiper('.classSwiper', {
    autoplay:true,
    speed:1000,
    loop:true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true, // 클릭시 해당 슬라이더로 이동
    },

});