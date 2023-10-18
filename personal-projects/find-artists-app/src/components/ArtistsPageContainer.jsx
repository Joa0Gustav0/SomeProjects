import styles from './styles/ArtistsPageContainer.module.css'
import no_image from '../media/no-artist-img.png'
import loading from '../media/aurora-loading.gif'
import { useState } from "react"

export default function ArtistsPageContainer({artistInfos, containerState, closeContainerEvent, albums}){

    return (
        <div className={`${styles.artistsPage} ${containerState === "activated" ? styles.activated : ""}`}>
            <header className={styles.artistHeader}>
                <img className={styles.artistPic} src={artistInfos !== undefined ? artistInfos.images.length > 0 ? artistInfos.images[0].url : no_image : no_image} alt="..." />
                <div className={styles.artistInformations}>
                    <h1 className={styles.artistName}>{artistInfos?.name || "Name"}</h1>
                    <div className={styles.artistAltInfo}>
                        <h1 className={styles.artistCategorie}>Artist</h1>
                        <h1 className={styles.artistFollowers}>{artistInfos?.followers?.total || "..."} <span>followers</span></h1>
                    </div>
                </div>
                <ion-icon name="heart"></ion-icon>
            </header>
            <div className={styles.artistAlbumsSec}>
                <h1 className={styles.artistAlbumsSecTitle}>Albums</h1>
                <div className={styles.albumsList}>
                    {
                        albums === undefined ?
                        <img className={styles.albumsLoading} src={loading} alt='...'/> :
                        albums?.error !== undefined ?
                        <img className={styles.albumsLoading} src={loading} alt='...'/> :
                        albums?.items?.length > 0 ?
                        albums?.items?.map((elem, i) => (
                            <img key={elem.id} className={styles.albums} src={elem.images[0].url} alt={elem.name} />
                        )) :
                        <h1>There are no Albums...</h1>
                    }
                </div>
                {
                    albums?.items?.length > 0 && (
                        <h2 className={styles.albumsInstructions}>Try sliding horizontally for more albums...</h2>
                    )
                }
            </div>
            <ion-icon onClick={() => {
                closeContainerEvent()
            }} name="close"></ion-icon>
        </div>
    )
}