document.addEventListener('DOMContentLoaded', ()=> {
    const swiperPlans = new Swiper('.swiper-container_plans', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        loop: false,
        
        
        // Стрелки навигации
        navigation: {
            nextEl: '.swiper-button-next_plans',
            prevEl: '.swiper-button-prev_plans',
        },
        breakpoints: {
       
            830: {
                spaceBetween: 30,
            },
        },
        // Кликабельная пагинация
    pagination: {
        el: '.swiper-pagination_plans',
        clickable: true,
    },
    });
    
    const tabs = document.querySelectorAll('.plans__tab');
    const plansContainer = document.querySelector('.swiper-container_plans');
    tabs.forEach(tab => {
        tab.addEventListener('click', ()=> {
            tabs.forEach(tab=> tab.classList.remove('active'));

            tab.classList.add('active');
            let tabName = tab.getAttribute('data-tab');
            if(tabName) {
                plansContainer.setAttribute('data-tab-active', tabName)
            }
            swiperPlans.update()
        })
    })
    swiperPlans.update()
})

