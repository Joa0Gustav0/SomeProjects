//change sidebar state
const sideBarButton = document.querySelector('.hero-section__menu-button')
const screenSaver = document.querySelector('.hero-section__screen-saver')

function setSideBarState(){
    function setSideBarButtonState(){
        if (sideBarButton.classList.contains('opened') == false){
            screenSaver.style.display = 'block'
            sideBarButton.classList.add('semi-opened')
            function endProcess(){
                sideBarButton.classList.add('opened')
            }
            setTimeout(endProcess, 250)
        }else{
            screenSaver.style.display = 'none'
            sideBarButton.classList.remove('opened')
            function endProcess(){
                sideBarButton.classList.remove('semi-opened')
            }
            setTimeout(endProcess, 250)
        }
    }
    setSideBarButtonState()
}