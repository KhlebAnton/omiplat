document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('form').forEach(function(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        
        function checkForm() {
            let isFormValid = true;
            
            form.querySelectorAll('input[required], select[required]').forEach(function(input) {

                if (input.classList.contains('original-select')) {
                    if (!input.value) isFormValid = false;
                } 
                // Для обычных input-полей
                else if (!input.value.trim()) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                submitBtn.classList.remove('disabled');
                submitBtn.disabled = false;
            } else {
                submitBtn.classList.add('disabled');
                submitBtn.disabled = true;
            }
        }
        
        checkForm();
        
        form.querySelectorAll('input[required], select[required]').forEach(function(input) {
            if (input.tagName === 'INPUT') {
                input.addEventListener('input', checkForm);
            }
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', checkForm);
            }
        });
        
        form.querySelectorAll('.custom-option').forEach(function(option) {
            option.addEventListener('click', checkForm);
        });
    });
});