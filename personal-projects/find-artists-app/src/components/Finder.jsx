import FavoritesContainer from './FavoritesContainer'
import ResultsContainer from './ResultsContainer'
import styles from './styles/Finder.module.css'
import { useState } from 'react'

export default function Finder(){
    const [favorites, setFavorites] = useState([])

    return (
        <main>
            <FavoritesContainer favoritesArray={favorites}/>
            <ResultsContainer />
        </main>
    )
}