
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
    document.documentElement.classList.add('no-scroll');
}
function hideFormModal() {
    modalFormCall.classList.remove('open');
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
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

formModal.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.custom-select__trigger');
    const options = select.querySelectorAll('.custom-option');
    const originalSelect = select.querySelector('.original-select');
    const placeholder = select.querySelector('.placeholder');

    // Открытие/закрытие выпадающего списка
    trigger.addEventListener('click', function (e) {
        e.stopPropagation();
        select.classList.toggle('open');

        // Закрытие других открытых селектов
        document.querySelectorAll('.custom-select').forEach(otherSelect => {
            if (otherSelect !== select) {
                otherSelect.classList.remove('open');
            }
        });
    });

    // Выбор опции
    options.forEach(option => {
        option.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            const text = this.textContent;

            // Обновляем оригинальный select
            originalSelect.value = value;

            // Обновляем отображаемый текст
            placeholder.textContent = text;
            placeholder.classList.add('active');

            // Помечаем выбранную опцию
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            // Триггерим событие change для оригинального select
            const event = new Event('change');
            originalSelect.dispatchEvent(event);

            // Закрываем выпадающий список
            select.classList.remove('open');
        });
    });

    // Синхронизация с оригинальным select
    originalSelect.addEventListener('change', function () {
        const selectedOption = this.options[this.selectedIndex];
        placeholder.textContent = selectedOption.textContent;

        // Обновляем стиль выбранной опции
        options.forEach(option => {
            option.classList.remove('selected');
            if (option.getAttribute('data-value') === this.value) {
                option.classList.add('selected');

            }
        });
    });

    // Закрытие при клике вне селекта
    document.addEventListener('click', function (e) {
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    });

    // Инициализация выбранного значения
    if (originalSelect.value) {
        const selectedOption = Array.from(options).find(
            opt => opt.getAttribute('data-value') === originalSelect.value
        );
        if (selectedOption) {
            placeholder.textContent = selectedOption.textContent;

            selectedOption.classList.add('selected');
        }
    }
});