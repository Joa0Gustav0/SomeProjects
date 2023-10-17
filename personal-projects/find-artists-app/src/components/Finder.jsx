import FavoritesContainer from './FavoritesContainer'
import ResultsContainer from './ResultsContainer'
import ArtistsPageContainer from './ArtistsPageContainer'
import logo from '../media/aurora-logo.png'
import styles from './styles/Finder.module.css'
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

    const [artistToPage, setArtistToPage] = useState({})
    const [rcState, setRCState] = useState("")
    const [apState, setAPState] = useState("")
    const [favButtonHover, setFavButtonHover] = useState(false)

    return (
        <main className={mainState}>
            <FavoritesContainer favoritesArray={favorites} favTabState={favBarState} closeEvent={() => {
                setFavBarState("")
            }} openArtistPageEvent={() => {
                setFavBarState("")
                setRCState("deactivated")
                setAPState("activated")
            }}/>
            <ResultsContainer containerState={rcState} favButtonHoverEvent={(state) => state === "on_hover" ? setFavButtonHover(true) : setFavButtonHover(false)} setArtistPage={(artist) => {
                if (!favButtonHover){
                    setArtistToPage(artist)
                    setRCState("deactivated")
                    setAPState("activated")
                }
            }} favoriteEvent={setFavorite} favArr={favorites}/>
            <ArtistsPageContainer closeContainerEvent={() => {
                setAPState("deactivated")
                setRCState("activated")
            }} containerState={apState} artistInfos={artistToPage}/>

            <ion-icon className={styles.favButton} name="heart" onClick={() => {
                setFavBarState("FavoritesContainer_openedContainer__k6V0o")
                console.log(favorites)
            }}>
            </ion-icon>

            <img src={logo} alt="aurora-logo" className={styles.headerLogo} onClick={event}/>
        </main>
    )
}