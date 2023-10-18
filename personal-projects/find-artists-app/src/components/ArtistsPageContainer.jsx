import styles from './styles/ArtistsPageContainer.module.css'
import no_image from '../media/no-artist-img.png'
import { useState } from "react"

export default function ArtistsPageContainer({artistInfos, containerState, closeContainerEvent}){

    const [accessToken, setAccessToken] = useState("")

    const clientId = "edabadfdfd3a4e8199dafba3817765dd"
    const clientSecret = "4bbec2959922402b87117cc49141a768"

    const getToken = async () => {
        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
        })
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    }

    const apiFunctions = (searchGiven) => {

        const search = async () => {

            await getToken()

            await fetch('https://api.spotify.com/v1/artists/' + artistInfos.id +'/albums?include_groups=single&limit=10', {
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }
            })
            .then(resp =>  resp.json())
            .then(data => {
                data.error === undefined ? console.log(data) : search()
            })

        }
        search()
    }

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
                    
                </div>
                <h2 className={styles.albumsInstructions}>Slide horizontally for more albums...</h2>
            </div>
            <ion-icon onClick={() => {
                closeContainerEvent()
            }} name="close"></ion-icon>
        </div>
    )
}