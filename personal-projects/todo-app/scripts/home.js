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
        if (sideBarButton.classList.contains('opened')){
            sideBarButton.classList.remove('opened')
        }
        function endProcess(){
            if (sideBarButton.classList.contains('semi-opened')){
                sideBarButton.classList.remove('semi-opened')
            }
        }
        setTimeout(endProcess, 250)
        screenSaver.style.display = 'none'
    }
}

//actions when scrolls
window.onscroll = function actionsWhenScrolling(){
    if (sideBar.classList.contains('opened')){
        setSideBarState()
    }
}