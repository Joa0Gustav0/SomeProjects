let goTopButton = document.querySelector('.gtbutton')
let topSection = document.querySelector('#home')
let navBar = document.querySelector('.navbar')
let openNavBarButton = document.querySelector('.open-navbar')
let closeNavBarButton = document.querySelector('.close-navbar')

window.onscroll = function onScroll(){
    //makes goTopButton appear or disappear
    if (window.scrollY > 100){
        goTopButton.classList.add('active')
    }else{
        goTopButton.classList.remove('active')
    }

    //makes navBar close on scroll
    if(navBar.classList.contains('open')){
        navBar.classList.add('close')
        navBar.classList.remove('open')
    }
}

//open and close navbar
function setNavbarState(navBarButton){
    if (navBarButton.name == 'menu-sharp'){
        navBar.classList.remove('close')
        navBar.classList.add('open')
    }
    if (navBarButton.name == 'close-sharp'
        || navBarButton.name == 'navbar-ancors'){
        navBar.classList.add('close')
        navBar.classList.remove('open')
    }
}
