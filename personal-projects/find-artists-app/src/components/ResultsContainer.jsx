import styles from './styles/ResultsContainer.module.css'
import SearchBar from './SearchBar'

export default function ResultsContainer(){
    return(
        <div className={styles.resultsContainer}>
            <SearchBar />
        </div>
    )
}