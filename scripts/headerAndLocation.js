document.addEventListener('DOMContentLoaded', () => {
    const modalLocationAsk = document.querySelector('.modal_location-ask');
    const locationNameElements = document.querySelectorAll('.location-name');
    const COOKIE_NAME = 'user_location';
    let selectedLocation = null;

    // Attach click handlers to all location name elements
    locationNameElements.forEach(el => {
        el.addEventListener('click', () => showModalLocatSelect(el));
    });

    // Cookie functions
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

   

    // Modal functions
    function showModalLocatAsk() {
        if (window.innerWidth < 990) {
            document.body.classList.add('no-scroll');
        }
        
        modalLocationAsk.classList.remove('hidden');
    }

    function hideModalLocatAsk() {
        modalLocationAsk.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }

    function showModalLocatSelect(el) {
       
        // Find the modal that's a sibling of the clicked location name
        const modalLocationSelect = el.closest('.location').querySelector('.modal_location-select');
        
        // Before showing, select the active location from cookies
        const savedLocation = getCookie(COOKIE_NAME);
        if (savedLocation) {
            selectLocationOption(savedLocation, modalLocationSelect);
        } else {
            // If no cookie, select the current location (text of the clicked element)
            const currentLocation = el.textContent.trim();
            selectLocationOption(currentLocation, modalLocationSelect);
        }
        
        // Hide all other select modals first
        hideModalLocatSelect();
        
        // Show this specific modal
        modalLocationSelect.classList.remove('hidden');
        
        // Setup event listeners for this specific modal
        setupModalSelectListeners(modalLocationSelect);
    }

    function hideModalLocatSelect() {
        document.body.classList.remove('no-scroll');
        document.querySelectorAll('.modal_location-select').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    function updateLocationName(location) {
        locationNameElements.forEach(el => {
            el.textContent = location;
        });
    }

    function selectLocationOption(location, modal) {
        const locationOptions = modal.querySelectorAll('.location__option');
        locationOptions.forEach(option => {
            option.classList.remove('active');
            if (option.dataset.location === location) {
                option.classList.add('active');
                selectedLocation = location;
            }
        });
    }

    function checkLocationCookie() {
        const location = getCookie(COOKIE_NAME);
        if (location) {
            updateLocationName(location);
        } else {
            showModalLocatAsk();
        }
    }

    function setupModalSelectListeners(modal) {
        if (window.innerWidth < 990) {
            document.body.classList.add('no-scroll');
        }
        // Setup option selection
        const locationOptions = modal.querySelectorAll('.location__option');
        locationOptions.forEach(option => {
            option.addEventListener('click', () => {
                selectLocationOption(option.dataset.location, modal);
            });
        });

        // Setup confirm button
        const confirmBtn = modal.querySelector('.btn-primary');
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

    function setupEventListeners() {
        // Yes button in ask modal
        const yesBtn = modalLocationAsk.querySelector('.btn-primary:first-child');
        if (yesBtn) {
            yesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentLocation = document.querySelector('.location-name').textContent.trim();
                setCookie(COOKIE_NAME, currentLocation, 30);
                hideModalLocatAsk();
            });
        }

        // No button in ask modal
        const noBtn = modalLocationAsk.querySelector('.btn-primary:last-child');
        if (noBtn) {
            noBtn.addEventListener('click', (e) => {
                e.preventDefault();
                hideModalLocatAsk();
                // Show the first location select modal
                if (locationNameElements.length > 0) {
                    showModalLocatSelect(locationNameElements[1]);
                }
            });
        }
    }

    // Initialize
    checkLocationCookie();
    setupEventListeners();


    const headerMenuBtn = document.querySelector('.header__menu-nav');

    headerMenuBtn.addEventListener('click', () => {
        headerMenuBtn.classList.add('open');
        setTimeout(() => {
            headerMenuBtn.classList.remove('open');
        }, 2000)
    })

    const dropdownItems = document.querySelectorAll('.dropdown-item');

    dropdownItems.forEach(el => {
        el.addEventListener('click', () => {
            el.classList.add('open');
            setTimeout(() => {
                el.classList.remove('open');
            }, 2000)
        })
    });

    const headerPhoneContent = document.querySelector('.header_phone-content');
    const headerPhoneLink = headerPhoneContent.querySelector('.header_phone-link');
    headerPhoneLink.addEventListener('click', (e) => {
        // Проверяем, является ли устройство мобильным (ширина экрана меньше 992px)
        if (window.innerWidth < 1400) {
            if (!headerPhoneContent.classList.contains('open')) {
                e.preventDefault();
                headerPhoneContent.classList.add('open');
                setTimeout(() => {
                    headerPhoneContent.classList.remove('open');
                }, 2000);
            }
        }
        // На ПК ничего не делаем - ссылка сработает как обычно
    });

    const headerPhone = document.querySelector('.header_phone');
    headerPhone.addEventListener('click', () => {
        if (!headerPhone.classList.contains('open')) {
            headerPhone.classList.add('open');
            btnMenu.classList.remove('open');
            document.body.classList.add('no-scroll');
        } else {
            headerPhone.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }
    });

    const btnMenu = document.querySelector('.btn-menu');
    btnMenu.addEventListener('click', () => {
        if (!btnMenu.classList.contains('open')) {
            btnMenu.classList.add('open');
            document.body.classList.add('no-scroll');
            headerPhone.classList.remove('open');
        } else {
            btnMenu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }
    });

    const mobileDropdown = document.querySelectorAll('.mobile_nav-dropdown');

    mobileDropdown.forEach(el=> {
        el.addEventListener('click', ()=> {
            el.classList.toggle('open')
        })
    })
});
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}