let sideBar = document.querySelector('.sidebar')
let sideBarButton = document.querySelector('.header__side-bar-button')
let sideBarStatus = false

function setButtonState(){
    let sideBarLine1 = document.querySelector('.l1')
    let sideBarLine2 = document.querySelector('.l2')
    let sideBarLine3 = document.querySelector('.l3')
    let lines = [sideBarLine1,sideBarLine2,sideBarLine3]

    if(sideBarStatus == false){
        sideBar.style.position = 'fixed'
        sideBar.style.transition = '.5s'
        sideBar.style.right = '0%'
        sideBarButton.style.transition = '.5s'
        sideBarButton.style.left = '10%'

        lines[0].style.transition = '.25s'
        lines[1].style.transition = '.25s'
        lines[2].style.transition = '.25s'

        lines[0].style.top = '30%'
        lines[1].style.top = '30%'
        lines[2].style.top = '30%'

        function adquireFormat(){
            lines[0].style.transform = 'rotateZ(-45deg)'
            lines[1].style.transform = 'rotateZ(45deg)'
            lines[2].style.transform = 'rotateZ(45deg)'
        }
        setTimeout(adquireFormat, 250)
        sideBarStatus = true
    }
    else if(sideBarStatus == true){
        sideBar.style.transition = '.5s'
        sideBar.style.right = '-300px'
        sideBarButton.style.transition = '.5s'
        sideBarButton.style.left = '-30%'

        lines[0].style.transition = '.25s'
        lines[1].style.transition = '.25s'
        lines[2].style.transition = '.25s'
        
        lines[0].style.transform = 'rotateZ(0deg)'
        lines[1].style.transform = 'rotateZ(0deg)'
        lines[2].style.transform = 'rotateZ(0deg)'
        

        function adquireFormat(){
            lines[0].style.top = '0%'
            lines[1].style.top = '30%'
            lines[2].style.top = '60%'
        }
        function returnPos(){
            sideBar.style.position = 'absolute'
        }
        setTimeout(adquireFormat, 250)
        setTimeout(returnPos, 500)
        sideBarStatus = false
    }
}