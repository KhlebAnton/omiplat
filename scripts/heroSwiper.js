// Инициализация слайдера изображений
const imgSwiper = new Swiper('.swiper-container_img', {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    allowTouchMove: true,
    pagination: {
        el: '.swiper-pagination_hero',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next_hero',
        prevEl: '.swiper-button-prev_hero',
    },
    speed: 1000,
});

// Инициализация текстового слайдера
const textSwiper = new Swiper('.swiper-container_text', {
    slidesPerView: 1,
    loop: true,
    effect: 'slide',
    fadeEffect: {
        crossFade: true
    },
    allowTouchMove: false, // отключаем свайп для текстового слайдера
    autoHeight: true, // автоматическая высота под контент
});

// Синхронизация слайдеров
imgSwiper.controller.control = textSwiper;
textSwiper.controller.control = imgSwiper;