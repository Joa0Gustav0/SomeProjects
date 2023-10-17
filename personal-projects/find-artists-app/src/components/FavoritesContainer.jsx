import whiteLogo from '../media/aurora-logo-white.png'
import styles from './styles/FavoritesContainer.module.css'
import noArtistPicture from '../media/no-artist-img.png'

export default function FavoritesContainer({favoritesArray, favTabState, closeEvent}){

    return (
        <div className={`${styles.favcontainer} ${favTabState}`}>
            <h1 className={styles.favTitle}><ion-icon name="heart"></ion-icon>Favorites:</h1>
            <div className={`favoritesList ${styles.favList}`} style={favoritesArray.length === 0 ? {justifyContent: 'center'} : {justifyContent: 'flex-start'}}>
                {favoritesArray.length === 0 ? <>
                        <img className={styles.nofavImage} src={whiteLogo} alt="aurora-logo"/>
                        <h1 className={styles.nofavText}>It seens you do not have any favorites...</h1>
                    </> : favoritesArray.map((elem) => (
                        <div className={styles.favArtistContainer} key={elem.id}>
                            <img className={styles.favArtistPicture} src={elem.img} alt="artist-pic" />
                            <div className={styles.favArtistInfos}>
                                <h1 className={styles.favArtistName}>{elem.name}</h1>
                                <h1 className={styles.favArtistCategorie}>Artist</h1>
                            </div>
                        </div>
                    ))}
            </div>
            <ion-icon name="close" onClick={closeEvent}></ion-icon>
        </div>
    )
}