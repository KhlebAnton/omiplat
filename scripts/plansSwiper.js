document.addEventListener('DOMContentLoaded', () => {
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
        tab.addEventListener('click', () => {
            tabs.forEach(tab => tab.classList.remove('active'));

            tab.classList.add('active');
            let tabName = tab.getAttribute('data-tab');
            if (tabName) {
                plansContainer.setAttribute('data-tab-active', tabName)
            }
            swiperPlans.update()
        })
    })
    swiperPlans.update()
})


// channels
const modalChannels = document.querySelector('.modal-channels');
const channelsContent = document.querySelector('.modal-channels__content');
modalChannels.addEventListener('click', (e) => {
    if (!channelsContent.contains(e.target)) {
        hideChannelModal()
    }
})
function showChannelModal() {
    modalChannels.classList.add('open');
    document.body.classList.add('no-scroll');
    document.querySelector('#category-list li.active')?.classList.remove('active');
    document.querySelectorAll('.channel-item').forEach(item => {

        item.style.display = '';

    });
}
function hideChannelModal() {
    modalChannels.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

modalChannels.querySelector('.modal-channels__close').addEventListener('click', () => {
    hideChannelModal()
})

const channelBody = document.querySelector('.modal-channels__body');
channelBody.querySelectorAll('#category-list li').forEach(cat => {
    cat.addEventListener('click', () => {

        if (cat.classList.contains('active')) {
            channelBody.querySelector('#category-list li.active')?.classList.remove('active');
            channelBody.querySelectorAll('.channel-item').forEach(item => {

                item.style.display = '';

            });
        } else {
            channelBody.querySelector('#category-list li.active')?.classList.remove('active');
            cat.classList.add('active');

            const selected = cat.dataset.category;
            channelBody.querySelectorAll('.channel-item').forEach(item => {
                const categories = item.dataset.category.split(" ");
                if (selected === 'all' || categories.includes(selected)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        }


    });
});
// channels mobile
const mobileChannelCat = document.querySelectorAll('.modal-channels__body_mobile ul li');
mobileChannelCat.forEach(cat => {
    cat.addEventListener('click', () => {    
        if (cat.classList.contains('active')) {
            mobileChannelCat.forEach(cat => cat.classList.remove('active'))
        } else {
            mobileChannelCat.forEach(cat => cat.classList.remove('active'))
            cat.classList.add('active');
            
        }

    });
});
