let goTopButton = document.querySelector('.gtbutton')
let topSection = document.querySelector('#home')

window.onscroll = function setVisibility(){
    if (window.scrollY > 100){
        console.log('WORKED')
        goTopButton.classList.add('active')
    }else{
        goTopButton.classList.remove('active')
    }
}