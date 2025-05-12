document.addEventListener('DOMContentLoaded', function() {
    // Находим все вопросы (и видимые, и скрытые)
    const allQuestions = document.querySelectorAll('.question__item');
    
    // Добавляем обработчики клика для всех вопросов
    allQuestions.forEach(item => {
        const top = item.querySelector('.question__item-top');
        
        top.addEventListener('click', function() {
            // Закрываем все другие открытые вопросы
            allQuestions.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                }
            });
            
            // Переключаем текущий вопрос
            item.classList.toggle('open');
        });
    });

    // Функция для кнопки "Показать еще/Скрыть всё"
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const hiddenQuestions = document.querySelectorAll('.hidden-question');
    let allShown = false;
    
    if (hiddenQuestions.length === 0) {
        loadMoreBtn.style.display = 'none';
    }
    
    loadMoreBtn.addEventListener('click', function() {
        if (!allShown) {
            // Показываем все скрытые вопросы
            hiddenQuestions.forEach(question => {
                question.classList.remove('hidden-question');
            });
            
            loadMoreBtn.textContent = 'Скрыть все';
            allShown = true;
        } else {
            // Скрываем все вопросы, кроме первых 4
            document.querySelectorAll('.question__item').forEach((question, index) => {
                if (index >= 4) {
                    question.classList.add('hidden-question');
                }
            });
            
            loadMoreBtn.textContent = 'Показать еще';
            allShown = false;
        }
        
        // Скрываем кнопку, если больше нет скрытых вопросов
        if (!allShown && document.querySelectorAll('.hidden-question').length === 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    });
});