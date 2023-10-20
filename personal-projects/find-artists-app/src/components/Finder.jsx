import FavoritesContainer from './FavoritesContainer'
import ResultsContainer from './ResultsContainer'
import ArtistsPageContainer from './ArtistsPageContainer'
import logo from '../media/aurora-logo.png'
import styles from './styles/Finder.module.css'
import FavContainerStyles from './styles/FavoritesContainer.module.css'
import { useState } from 'react'

export default function Finder({mainState, event}){

    const [favBarState, setFavBarState] = useState("")

    window.onresize = () => {
        if (window.matchMedia("(min-width: 900px)").matches){
            setFavBarState("")
        }
    }

    const [favorites, setFavorites] = useState([])

    const setFavorite = (artistInfo) => {
        var detected =  false
        var detectedI = null
        favorites.map((elem, i) => {
            if (elem.id === artistInfo.id){
                detected = true
                detectedI = i
            }
        })
        if (detected === false){
            setFavorites([...favorites, artistInfo])
        }else {
            setFavorites(favorites.filter((elem, i, arr) => i !== detectedI))
        }
    }

    const [accessToken, setAccessToken] = useState("")

    const clientId = "edabadfdfd3a4e8199dafba3817765dd"
    const clientSecret = "4bbec2959922402b87117cc49141a768"


    const apiFunctions = (artistInfos) => {

        const search = () => {

            const getToken = async () => {
                await fetch('https://accounts.spotify.com/api/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
                })
                .then(result => result.json())
                .then(data => {
                    setAccessToken(data.access_token)
                    conclusion()
                })
            }
            getToken()

            const conclusion = async () => {
                await fetch('https://api.spotify.com/v1/artists/' + artistInfos.id +'/albums?include_groups=single&limit=10', {
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }
            })
            .then(resp =>  resp.json())
            .then(data => {
                if (data.error === undefined){
                    setAlbums(data)
                }else{
                    search()
                }
            })
            }
        }
        search()
    }

    const [albums, setAlbums] = useState(undefined)

    const [artistToPage, setArtistToPage] = useState(undefined)
    const [rcState, setRCState] = useState("")
    const [apState, setAPState] = useState("")
    const [favButtonHover, setFavButtonHover] = useState(false)

    return (
        <main className={mainState}>
            <FavoritesContainer favoritesArray={favorites} favTabState={favBarState} closeEvent={() => {
                setFavBarState("")
            }} openArtistPageEvent={(artist) => {
                setAlbums(undefined)
                setArtistToPage(artist)
                apiFunctions(artist)
                setFavBarState("")
                setRCState("deactivated")
                setAPState("activated")
            }}/>
            <ResultsContainer containerState={rcState} favButtonHoverEvent={(state) => state === "on_hover" ? setFavButtonHover(true) : setFavButtonHover(false)} setArtistPage={(artist) => {
                if (!favButtonHover){
                    setAlbums(undefined)
                    setArtistToPage(artist)
                    apiFunctions(artist)
                    setRCState("deactivated")
                    setAPState("activated")
                }
            }} favoriteEvent={setFavorite} favArr={favorites}/>
            <ArtistsPageContainer refreshEvent={apiFunctions} favEvent={setFavorite} favArr={favorites} albums={albums} closeContainerEvent={() => {
                setAPState("deactivated")
                setRCState("activated")
            }} containerState={apState} artistInfos={artistToPage}/>

            <ion-icon className={styles.favButton} name="heart" onClick={() => {
                setFavBarState(FavContainerStyles.openedContainer)
            }}>
            </ion-icon>

            <img src={logo} alt="aurora-logo" className={styles.headerLogo} onClick={event}/>
        </main>
    )
}