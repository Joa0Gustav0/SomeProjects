import FavoritesContainer from './FavoritesContainer'
import ResultsContainer from './ResultsContainer'
import logo from '../media/aurora-logo.png'
import styles from './styles/Finder.module.css'
import { useState } from 'react'

export default function Finder({mainState, event}){
    const [favorites, setFavorites] = useState([])

    var current = ''

    return (
        <main className={mainState}>
            <FavoritesContainer favoritesArray={favorites}/>
            <ResultsContainer />

            <img src={logo} alt="aurora-logo" className={styles.headerLogo} onClick={event}/>
        </main>
    )
}