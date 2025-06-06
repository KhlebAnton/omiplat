document.addEventListener('DOMContentLoaded', () => {
    const cookiePopup = document.querySelector('.cookie_popup');
    const btnCookiePopup = cookiePopup.querySelector('.btn_cookie');

    function checkCookieConsent() {
        return document.cookie.split(';').some((item) => item.trim().startsWith('cookieConsent='));
    }

    function showCookiePopup() {
        if (!checkCookieConsent()) {
            cookiePopup.classList.remove('hidden');
        }
    }

    function hideCookiePopup() {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        document.cookie = `cookieConsent=true; expires=${date.toUTCString()}; path=/`;
        
        cookiePopup.classList.add('hidden');
    }

    btnCookiePopup.addEventListener('click', hideCookiePopup);

    showCookiePopup();
});