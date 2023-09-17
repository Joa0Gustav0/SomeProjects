//API informations
const APIAuthKey = "7453c886c1d4cedc457664da1b118841"
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

//addEventListener(eventHandler:onclick) to submit button
var userInput
const submitButton = document.querySelector('.search-container__submit-button')
submitButton.addEventListener('click', () => {
    userInput = document.querySelector('#search-input').value.toLowerCase()
    if (userInput == ""){
        alert('City name is required for research.')
    }else{
        getData()
    }
})

//function for getting API data
async function getData(){
    setTabsState("deactive")
    var response = await fetch(APIurl + `&q=${userInput}` + `&appid=${APIAuthKey}`)
    if (response.ok == true){
        var data = await response.json()
        console.log(data)
        //insert data into html
        function dataUsage(){
            cityNameElem.innerText = data.name
            cityTempElem.InnerText = data.main.temp + "°C"
            cityMinTempElem.innerText = data.main.temp_min + "°C"
            cityMaxTempElem.innerText = data.main.temp_max + "°C"
            cityWindSpeedElem.innerText = data.wind.speed + "Km/h"
            cityHumidityElem.innerText = data.main.humidity + "%"
        }
        dataUsage()
        setTabsState("active")
    }else{
        alert('City not found. | Error 404 (Not Found)')
    }
}

//Set tabs state function
const tabs = document.getElementsByClassName("containers")

const setTabsState = (setState) => {
    if (setState == "active"){
        for (var i = 0; i < tabs.length; i++){
            if (tabs[i].classList.contains("active-tab") == false){
                tabs[i].classList.add("active-tab")
            }
        }
    }else if (setState == "deactive"){
        for (var i = 0; i < tabs.length; i++){
            if (tabs[i].classList.contains("active-tab")){
                tabs[i].classList.remove("active-tab")
            }
        }
    }
}

const cityNameElem = document.querySelector('.results-container__main__city-name')
const cityTempElem = document.querySelector('.results-container__main__main-temperature')
const cityMinTempElem = document.querySelector('.results-container__main__alt-temperatures__min-temp')
const cityMaxTempElem = document.querySelector('.results-container__main__alt-temperatures__max-temp')
const cityWindSpeedElem = document.querySelector('.results-container__main__add-wind-speed-container__info__data')
const cityHumidityElem = document.querySelector('.results-container__main__add-informations__humidity-container__info__data')