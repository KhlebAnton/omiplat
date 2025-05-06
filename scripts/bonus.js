const bonusBtns = document.querySelectorAll('.btn-bonus');


bonusBtns.forEach(btn => {
    const bonushidden = btn.closest('.bonus_item').querySelector('.bonus_item-hidden');
    btn.addEventListener('click', ()=> {
        btn.style.display = 'none';
        bonushidden.classList.add('open')
    })
})