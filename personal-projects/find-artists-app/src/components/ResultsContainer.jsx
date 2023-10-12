import styles from './styles/ResultsContainer.module.css'
import SearchBar from './SearchBar'
import noArtistPicture from '../media/no-artist-img.png'
import { useState } from 'react'

export default function ResultsContainer({favoriteEvent, favArr}){

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
                }
            })

        }
        inputValue.length > 0 ? search() : setResultsArr([])
    }

    const [resultsArr, setResultsArr] = useState([])

    return(
        <div className={styles.resultsContainer}>
            <SearchBar searchEvent={apiFunctions}/>
            <div className={styles.results}>
                {   
                    resultsArr.length === 0 ? null : resultsArr.map((currentArtist, i) => (
                        <div className={styles.artistContainer} key={currentArtist.id}>
                            <img className={styles.artistPicture} src={currentArtist.images[0]?.url || noArtistPicture} alt="artist-pic" />
                            <abbr className={styles.abbr} title={currentArtist.name}>
                                <h1 className={styles.artistName}>{currentArtist.name}</h1>
                            </abbr>
                            <h1 className={styles.artistCategorie}>Artist</h1>
                            <ion-icon name={favArr.findIndex((elem) => elem.id === currentArtist.id) > -1 ? "heart" : "heart-outline"} id={currentArtist.id} onClick={(e) => {
                                favoriteEvent({id: currentArtist.id, name: currentArtist.name, img: currentArtist.images[0]?.url || noArtistPicture})
                            }}></ion-icon>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}