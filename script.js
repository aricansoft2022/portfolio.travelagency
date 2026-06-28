const mobileMenuBtn = document.querySelector("button");
const topMenu = document.querySelector("ul");
const topMenuOverlay = document.querySelector(".top-menu-overlay");

const sections = document.querySelectorAll("section");

[mobileMenuBtn, topMenuOverlay].forEach((el) => {
  el.addEventListener("click", () => {
    topMenu.classList.toggle("ul-hidden");
    topMenuOverlay.classList.toggle("hidden");
  });
});

const createIntersectionObserver = (el) => {
  let intersectedCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("not-intersected");
        entry.target.classList.add("intersected");
      }
    });
  };
  const observer = new IntersectionObserver(intersectedCallback, {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  });
  observer.observe(el);
};
sections.forEach((section, i) => {
  createIntersectionObserver(section, i);
});

window.addEventListener("resize", updateSlidesNumber);
window.addEventListener("DOMContentLoaded", updateSlidesNumber);
function updateSlidesNumber() {
  let slidesNumber = 0;
  if (window.innerWidth < 700) slidesNumber = 1;
  else if (window.innerWidth < 1000) slidesNumber = 2;
  else slidesNumber = 3;
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: slidesNumber,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 2800,
      disableOnInteraction: false,
    },
  });
  return swiper;
}
