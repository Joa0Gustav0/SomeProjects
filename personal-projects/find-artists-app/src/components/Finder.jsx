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

    const addFavorite = (target) => {
        if (favorites.includes(target.id) === false){
            setFavorites([...favorites, target.id])
        }
    }

    return (
        <main className={mainState}>
            <FavoritesContainer favoritesArray={favorites} favTabState={favBarState} closeEvent={() => {
                setFavBarState("")
            }}/>
            <ResultsContainer favoriteEvent={addFavorite} favArr={favorites}/>

            <ion-icon className={styles.favButton} name="heart" onClick={() => {
                setFavBarState("FavoritesContainer_openedContainer__k6V0o")
            }}>
            </ion-icon>

            <img src={logo} alt="aurora-logo" className={styles.headerLogo} onClick={event}/>
        </main>
    )
}