const docTabs = document.querySelectorAll('.docs__tab');

const tabCont = document.querySelector('.docs__tabs');

docTabs.forEach(tab=> {
    tab.addEventListener('click', ()=> {
        docTabs.forEach(tab=> tab.classList.remove('active'))
        tab.classList.add('active');

        tabCont.setAttribute('data-tab', tab.getAttribute('data-tab'))
    })
})