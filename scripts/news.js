document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.querySelector('.btn_more-news');
    const itemsPerLoad = 4; // Сколько новостей показывать за раз

    function showMoreNews() {
        const hiddenNews = document.querySelectorAll('.news_item__hidden');
        
        // Если новостей нет, скрываем кнопку и выходим
        if (hiddenNews.length === 0) {
            loadMoreBtn.classList.add('hidden');
            return;
        }

        // Показываем N следующих новостей (но не больше, чем осталось)
        const itemsToShow = Math.min(itemsPerLoad, hiddenNews.length);
        for (let i = 0; i < itemsToShow; i++) {
            hiddenNews[i].classList.remove('news_item__hidden');
        }

        // Проверяем снова, остались ли скрытые новости
        const remainingHidden = document.querySelectorAll('.news_item__hidden');
        if (remainingHidden.length === 0) {
            loadMoreBtn.classList.add('hidden');
        }
    }

    // Проверяем при загрузке, нужно ли скрыть кнопку (но не показываем новости)
    function initNews() {
        const hiddenNews = document.querySelectorAll('.news_item__hidden');
        if (hiddenNews.length === 0) {
            loadMoreBtn.classList.add('hidden');
        }
    }

    // Инициализация (без автоматического показа новостей)
    initNews();

    // Вешаем обработчик на кнопку
    loadMoreBtn.addEventListener('click', showMoreNews);
});