document.addEventListener('DOMContentLoaded', function() {
    // Функция для раскрытия/закрытия вопросов
    const items = document.querySelectorAll('.question__item:not(.hidden-question)');
    
    items.forEach(item => {
        const top = item.querySelector('.question__item-top');
        
        top.addEventListener('click', function() {
            items.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                }
            });
            item.classList.toggle('open');
        });
    });

    // Функция для кнопки "Показать еще"
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const hiddenQuestions = document.querySelectorAll('.hidden-question');
    let questionsToShow = 4; // Сколько вопросов показывать за раз
    
    if (hiddenQuestions.length === 0) {
        loadMoreBtn.style.display = 'none';
    }
    
    loadMoreBtn.addEventListener('click', function() {
        let shown = 0;
        
        for (let i = 0; i < hiddenQuestions.length && shown < questionsToShow; i++) {
            if (hiddenQuestions[i].classList.contains('hidden-question')) {
                hiddenQuestions[i].classList.remove('hidden-question');
                shown++;
                
                const top = hiddenQuestions[i].querySelector('.question__item-top');
                top.addEventListener('click', function() {
                    document.querySelectorAll('.question__item:not(.hidden-question)').forEach(otherItem => {
                        if (otherItem !== hiddenQuestions[i] && otherItem.classList.contains('open')) {
                            otherItem.classList.remove('open');
                        }
                    });
                    
                    hiddenQuestions[i].classList.toggle('open');
                });
            }
        }
        
        const remainingHidden = document.querySelectorAll('.hidden-question').length;
        if (remainingHidden === 0) {
            loadMoreBtn.style.display = 'none';
        }
    });
});