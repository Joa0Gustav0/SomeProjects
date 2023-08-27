/*//change about section's slide
const backSlideButton = document.querySelector('.about-section__left-slide-button')
const forwardSlideButton = document.querySelector('.about-section__right-slide-button')
const slide = document.querySelector('.about-section__slide')

function setSlidePos(currentSlideButton){
    console.log(window.innerWidth )
    if (currentSlideButton.classList.contains('forward-slide')){
        let slidePos = slide.style.left
        slidePos = `${slidePos - window.innerWidth}px` 
    }else if(currentSlideButton.classList.contains('back-slide')){
        let slidePos = slide.style.left
        slidePos = `${slidePos + window.innerWidth}px`
    }
}*/ 