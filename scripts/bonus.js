const bonusBtns = document.querySelectorAll('.btn-bonus');


bonusBtns.forEach(btn => {
    const bonushidden = btn.closest('.bonus_item').querySelector('.bonus_item-hidden');
    btn.addEventListener('click', ()=> {
        if(bonushidden.classList.contains('open')) {
            btn.textContent = 'Подробнее';
             bonushidden.classList.remove('open')
        } else {
            btn.textContent = 'Скрыть';

             bonushidden.classList.add('open')
        }
       
       
    })
})