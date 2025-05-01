const swiper = new Swiper('.swiper-container_img', {
    slidesPerView: 1,
    loop: true,
    
    // Эффект fade (плавное перетекание)
    effect: 'fade',
    fadeEffect: {
        crossFade: true // смягчает переход (если нужно)
    },
    
    // Автопереключение каждые 5 секунд
    autoplay: {
        delay: 5000,
        disableOnInteraction: false, // не останавливать после клика
    },
    
    // Отключение свайпа
    allowTouchMove: true,
    
    // Кликабельная пагинация
    pagination: {
        el: '.swiper-pagination_hero',
        clickable: true,
    },
    
    // Стрелки навигации
    navigation: {
        nextEl: '.swiper-button-next_hero',
        prevEl: '.swiper-button-prev_hero',
    },
    
    // Доп. настройки плавности (опционально)
    speed: 1000, // длительность перехода в ms (1 сек)
});