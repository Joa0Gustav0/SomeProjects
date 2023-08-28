//change sidebar state
const sideBar = document.querySelector('.hero-section__sidebar')
const sideBarButton = document.querySelector('.hero-section__menu-button')
const screenSaver = document.querySelector('.hero-section__screen-saver')

function setSideBarState(){
    if (sideBarButton.classList.contains('opened') == false){
        screenSaver.style.display = 'block'
        sideBar.classList.add('opened')
        sideBarButton.classList.add('semi-opened')
        function endProcess(){
            sideBarButton.classList.add('opened')
        }
        setTimeout(endProcess, 250)
    }else{
        sideBar.classList.remove('opened')
        sideBarButton.classList.remove('opened')
        function endProcess(){
            sideBarButton.classList.remove('semi-opened')
        }
        setTimeout(endProcess, 250)
        screenSaver.style.display = 'none'
    }
}