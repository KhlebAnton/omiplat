document.addEventListener('DOMContentLoaded', () => {
    const modalLocationAsk = document.querySelector('.modal_location-ask');
    const modalLocationSelect = document.querySelector('.modal_location-select');
    const locationNameElements = document.querySelectorAll('.location-name');
    const COOKIE_NAME = 'user_location';
    let selectedLocation = null;

    locationNameElements.forEach(el => {
        el.addEventListener('click', showModalLocatSelect)
    })
    // Функции для работы с cookies
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }

    // Функции для работы с модальными окнами
    function showModalLocatAsk() {
        modalLocationAsk.classList.remove('hidden');
    }

    function hideModalLocatAsk() {
        modalLocationAsk.classList.add('hidden');
    }

    function showModalLocatSelect() {
        // Перед показом модального окна выбираем активную локацию из cookies
        const savedLocation = getCookie(COOKIE_NAME);
        if (savedLocation) {
            selectLocationOption(savedLocation);
        }
        modalLocationSelect.classList.remove('hidden');
    }

    function hideModalLocatSelect() {
        modalLocationSelect.classList.add('hidden');
    }

    // Обновляем все элементы с названием локации
    function updateLocationName(location) {
        locationNameElements.forEach(el => {
            el.textContent = location;
        });
    }

    // Выбираем опцию локации
    function selectLocationOption(location) {
        const locationOptions = modalLocationSelect.querySelectorAll('.location__option');
        locationOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.location === location) {
                option.classList.add('active');
                selectedLocation = location;
            }
        });
    }

    // Проверяем cookie при загрузке страницы
    function checkLocationCookie() {
        const location = getCookie(COOKIE_NAME);
        if (location) {
            updateLocationName(location);
        } else {
            showModalLocatAsk();
        }
    }

    // Обработчики событий для выбора локации
    function setupLocationSelection() {
        const locationOptions = modalLocationSelect.querySelectorAll('.location__option');
        
        locationOptions.forEach(option => {
            option.addEventListener('click', () => {
                selectLocationOption(option.dataset.location);
            });
        });
    }

    // Обработчик для кнопки подтверждения выбора
    function setupConfirmButton() {
        const confirmBtn = modalLocationSelect.querySelector('.btn-primary');
        
        confirmBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (selectedLocation) {
                setCookie(COOKIE_NAME, selectedLocation, 30);
                updateLocationName(selectedLocation);
                hideModalLocatSelect();
            } else {
                alert('Пожалуйста, выберите ваше местоположение');
            }
        });
    }

    // Обработчики событий для кнопок
    function setupEventListeners() {
        // Обработчик для кнопки "Да"
        const yesBtn = modalLocationAsk.querySelector('.btn-primary:first-child');
        yesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentLocation = document.querySelector('.location-name').textContent;
            setCookie(COOKIE_NAME, currentLocation, 30);
            hideModalLocatAsk();
        });

        // Обработчик для кнопки "Нет"
        const noBtn = modalLocationAsk.querySelector('.btn-primary:last-child');
        noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            hideModalLocatAsk();
            showModalLocatSelect();
        });
    }

    // Инициализация
    checkLocationCookie();
    setupEventListeners();
    setupLocationSelection();
    setupConfirmButton();

    const headerMenuBtn = document.querySelector('.header__menu-nav');

    headerMenuBtn.addEventListener('click', ()=> {
        headerMenuBtn.classList.add('open');
        setTimeout(()=> {
            headerMenuBtn.classList.remove('open');
        },2000)
    })

    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(el => {
        el.addEventListener('click', ()=> {
            el.classList.add('open');
            setTimeout(()=> {
                el.classList.remove('open');
            },2000)
        })
    });

    const headerPhone = document.querySelector('.header_phone-content');
    const headerPhoneLink = headerPhone.querySelector('.header_phone-link');
    headerPhoneLink.addEventListener('click', (e) => {
        // Проверяем, является ли устройство мобильным (ширина экрана меньше 992px)
        if (window.innerWidth < 992) {
            if (!headerPhone.classList.contains('open')) {
                e.preventDefault();
                headerPhone.classList.add('open');
                setTimeout(() => {
                    headerPhone.classList.remove('open');
                }, 2000);
            }
        }
        // На ПК ничего не делаем - ссылка сработает как обычно
    });
});
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}