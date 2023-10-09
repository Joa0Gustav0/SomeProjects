import styles from './styles/SearchBar.module.css'
import { useState } from 'react'

export default function SearchBar(){

    const [divClass, setDivClass] = useState(styles.SearchBarContainer)

    return (
        <div className={divClass}>
            <label htmlFor="search-bar">
                <ion-icon name="search"></ion-icon>
            </label>
            <input type="text" id="search-bar" placeholder='Let Aurora guide you...' onChange={(e) => {
                if (e.target.value !== ""){
                    setDivClass(`${styles.SearchBarContainer} ${styles.onSearch}`)
                }else{
                    setDivClass(styles.SearchBarContainer)
                }
            }}/>
        </div>
    )
}