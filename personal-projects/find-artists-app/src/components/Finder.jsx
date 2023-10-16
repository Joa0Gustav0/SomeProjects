import FavoritesContainer from './FavoritesContainer'
import ResultsContainer from './ResultsContainer'
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
            if (window.matchMedia("(max-width: 899px)").matches){
                setFavBarState("FavoritesContainer_openedContainer__k6V0o")
            }
        }else {
            setFavorites(favorites.filter((elem, i, arr) => i !== detectedI))
        }
    }

    return (
        <main className={mainState}>
            <FavoritesContainer removeFavoriteEvent={setFavorite} favoritesArray={favorites} favTabState={favBarState} closeEvent={() => {
                setFavBarState("")
            }}/>
            <ResultsContainer favoriteEvent={setFavorite} favArr={favorites}/>

            <ion-icon className={styles.favButton} name="heart" onClick={() => {
                setFavBarState("FavoritesContainer_openedContainer__k6V0o")
                console.log(favorites)
            }}>
            </ion-icon>

            <img src={logo} alt="aurora-logo" className={styles.headerLogo} onClick={event}/>
        </main>
    )
}