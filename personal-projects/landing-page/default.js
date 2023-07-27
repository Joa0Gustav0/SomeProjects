let goTopButton = document.querySelector('.gtbutton')
let topSection = document.querySelector('#home')
let navBar = document.querySelector('.navbar')
let openNavBarButton = document.querySelector('.open-navbar')
let closeNavBarButton = document.querySelector('.close-navbar')


//makes goTopButton appear or disappear
window.onscroll = function setVisibility(){
    if (window.scrollY > 100){
        console.log('WORKED')
        goTopButton.classList.add('active')
    }else{
        goTopButton.classList.remove('active')
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
//close navbar on scroll
window.onscroll = function closeNavBarScrolling(){
    if(navBar.classList.contains('open')){
        navBar.classList.add('close')
        navBar.classList.remove('open')
    }
}