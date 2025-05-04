
const modalFormCall = document.querySelector('.modal-form_call');
const modalFormContent = modalFormCall.querySelector('.modal-form__content');

const titleForm = modalFormCall.querySelector('.modal__title');
modalFormCall.addEventListener('click', (e)=> {
    if(!modalFormContent.contains(e.target)) {
        hideFormModal()
    }
})
const formModal = document.getElementById('formModal');
function showFormModal(name) {
    titleForm.textContent = name;
    modalFormCall.classList.add('open');
    document.body.classList.add('no-scroll');
}
function hideFormModal() {
    modalFormCall.classList.remove('open');
    document.body.classList.remove('no-scroll');
}

modalFormCall.querySelector('.modal-close').addEventListener('click', ()=> {
    hideFormModal()
})
const phoneErrorModal = formModal.querySelector('.phone_error')
const phoneInputModal = formModal.querySelector('input[name="phone"]');


phoneInputModal.addEventListener('input', function (e) {
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
            phoneInputModal.classList.remove('error-outline');
            phoneErrorModal.style.display = 'none';
        } 
    }

    e.target.value = formattedValue;
});

phoneInputModal.addEventListener('keydown', function (e) {
    if (e.target.value.replace(/\D/g, '').length >= 11 && e.key !== 'Backspace') {
        e.preventDefault();
    }
});


formModal.addEventListener('submit', function (event) {
    event.preventDefault();
    const phoneValue = phoneInputModal.value.replace(/\D/g, '');
    if (phoneValue.length === 11) {
        alert('Форма отправлена! (имитация)');
        phoneInputModal.classList.remove('error-outline');
        phoneErrorModal.style.display = 'none';
        hideFormModal()
    } else {
        phoneInputModal.classList.add('error-outline');
        phoneErrorModal.style.display = 'inline';
    }
});