import styles from './styles/SearchBar.module.css'

export default function SearchBar(){
    return (
        <div className={styles.SearchBarContainer}>
            <label htmlFor="search-bar">
                <ion-icon name="search"></ion-icon>
            </label>
            <input type="text" id="search-bar" placeholder='Let Aurora guide you...'/>
        </div>
    )
}