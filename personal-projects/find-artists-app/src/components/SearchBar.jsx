import styles from './styles/SearchBar.module.css'
import { useState } from 'react'

export default function SearchBar({searchEvent, barStatusEvent, focus, focusEvent}){

    const [divClass, setDivClass] = useState(styles.SearchBarContainer)

    return (
        <div className={divClass}>
            <label htmlFor="search-bar">
                <ion-icon name="search"></ion-icon>
            </label>
            <input className={focus} type="text" id="search-bar" placeholder='Let Aurora guide you...' autoComplete='off' onFocus={() => focusEvent("setFocus")} onBlur={() => focusEvent("unsetFocus")} onChange={(e) => {
                if (e.target.value !== ""){
                    setDivClass(`${styles.SearchBarContainer} ${styles.onSearch}`)
                }else{
                    setDivClass(styles.SearchBarContainer)
                }
                barStatusEvent(e.target)
                searchEvent(e.target.value)
            }}/>
        </div>
    )
}