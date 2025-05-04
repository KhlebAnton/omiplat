// mask phone
const phoneError = document.getElementById('phoneErr')
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length > 0) {
        formattedValue = '+7 ';
        if (value.length > 1) {
            formattedValue += '(' + value.substring(1, 4);
        }
        if (value.length > 4) {
            formattedValue += ')' + value.substring(4, 7);
        }
        if (value.length > 7) {
            formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length > 9) {
            formattedValue += '-' + value.substring(9, 11);
        }

        // Проверка на полноту номера
        if (value.length === 11) {
            phoneInput.classList.remove('error-outline');
            phoneError.style.display = 'none';
        } 
    }

    e.target.value = formattedValue;
});

phoneInput.addEventListener('keydown', function (e) {
    if (e.target.value.replace(/\D/g, '').length >= 11 && e.key !== 'Backspace') {
        e.preventDefault();
    }
});


document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    const phoneValue = phoneInput.value.replace(/\D/g, '');
    if (phoneValue.length === 11) {
        alert('Форма отправлена! (имитация)');
        phoneInput.classList.remove('error-outline');
        phoneError.style.display = 'none';
    } else {
        phoneInput.classList.add('error-outline');
        phoneError.style.display = 'inline';
    }
});