function getNewValues(){
    let currentTime = new Date()
    //birthValues
    let birthDay = document.querySelector('#day').value
    let birthMonth = document.querySelector('#month').value
    let birthYear = document.querySelector('#year').value
    
    if ((birthDay == null || birthMonth == null || birthYear == null) || (birthDay <= 0 || birthDay > 31 || birthMonth <= 0 || birthMonth > 12 || birthYear <= 0 || birthYear >= currentTime.getFullYear())){
        alert('Please, select valid values!')
    }
    else{
        //resultsValues
        let yearText = document.querySelector('.years-result span')
        let monthText = document.querySelector('.months-result span')
        let dayText = document.querySelector('.days-result span')
        //setYear
        yearText.innerText=`${currentTime.getFullYear() - birthYear - 1}`
        //setmonth
        monthText.innerText=`${currentTime.getMonth()}`
        //setDay
        dayText.innerText=`${currentTime.getDate()}`
    }
}