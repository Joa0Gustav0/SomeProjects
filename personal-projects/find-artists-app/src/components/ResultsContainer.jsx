import styles from './styles/ResultsContainer.module.css'
import SearchBar from './SearchBar'
import noArtistPicture from '../media/no-artist-img.png'
import loadingIcon from '../media/aurora-loading.gif'
import error404 from '../media/aurora-no-results.png'
import { useState } from 'react'

export default function ResultsContainer({favoriteEvent, favArr, setArtistPage, containerState, favButtonHoverEvent}){

    const [accessToken, setAccessToken] = useState("")

    const clientId = "edabadfdfd3a4e8199dafba3817765dd"
    const clientSecret = "4bbec2959922402b87117cc49141a768"

    const getToken = async () => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
        })
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    }

    const apiFunctions = (searchGiven) => {

        const inputValue = searchGiven

        const search = async () => {

            await getToken()

            const response = await fetch('https://api.spotify.com/v1/search?q=' + inputValue + '&type=artist&limit=10', {
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }
            })
            .then(resp =>  resp.json())
            .then((data) => {
                if (inputValue !== ""){
                    if (data.artists !== undefined || null){
                        setResultsArr(data.artists.items)
                    }
                }else{
                    setResultsArr(resultsArr.filter((elem) => elem.name === inputValue))
                }
            })

        }
        search()
    }

    const [resultsArr, setResultsArr] = useState([])
    const [barState, setBarState] = useState("not_on_search")
    const [inputState, setInputState] = useState("not_on_focus")

    const setFocus = (action) => {
        action === "setFocus" ? setInputState("on_focus") : setInputState("not_on_focus")
    }

    return(
        <div className={`${styles.resultsContainer} ${containerState === "deactivated" ? styles.deactivated : ""}`}>
            <SearchBar focus={inputState} focusEvent={setFocus} searchEvent={apiFunctions} barStatusEvent={(searchBar) => {
                searchBar.value === "" ? 
                setBarState("not_on_search") :
                setBarState("on_search")
            }}/>
            <div className={styles.results}>
                {   
                    resultsArr.length === 0 ? barState === "on_search" ? 
                    <div className={styles.notFoundContainer}>
                        <img src={error404} alt="...." />
                        <h1 className={styles.notFoundText}>Aurora couldn't find any results...</h1>
                    </div> : inputState === "on_focus" ?
                    <>
                        <img className={styles.loadingIcon} src={loadingIcon} alt="..." />
                    </> : null
                    : resultsArr.map((currentArtist, i) => (
                        <div onClick={() => {
                            setArtistPage(currentArtist)
                        }} className={styles.artistContainer} key={currentArtist.id}>
                            <img className={styles.artistPicture} src={currentArtist.images[0]?.url || noArtistPicture} alt="artist-pic" />
                            <abbr className={styles.abbr} title={currentArtist.name}>
                                <h1 className={styles.artistName}>{currentArtist.name}</h1>
                            </abbr>
                            <h1 className={styles.artistCategorie}>Artist</h1>
                            <ion-icon name={favArr.findIndex((elem) => elem.id === currentArtist.id) > -1 ? "heart" : "heart-outline"} id={currentArtist.id} onMouseEnter={() => favButtonHoverEvent("on_hover")} onMouseLeave={() => favButtonHoverEvent("!on_hover")} onClick={(e) => {
                                favoriteEvent(currentArtist)
                            }}></ion-icon>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}