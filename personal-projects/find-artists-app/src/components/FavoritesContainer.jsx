import whiteLogo from '../media/aurora-logo-white.png'
import styles from './styles/FavoritesContainer.module.css'
import { useState } from 'react'

export default function FavoritesContainer({favoritesArray, favTabState, closeEvent}){

    /* const [accessToken, setAccessToken] = useState("")

    const clientId = "edabadfdfd3a4e8199dafba3817765dd"
    const clientSecret = "4bbec2959922402b87117cc49141a768"

    const getToken = async () => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + clientId + '&client_secret=' + clientSecret
        })
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    }

    const getArtistData = async (currentID) => {
        await getToken()

        const response = await fetch('https://api.spotify.com/v1/artists/' + currentID, {
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Authorization' : 'Bearer ' + accessToken
                }
            })
            .then(resp =>  resp.json())
            .then((data) => {
                console.log(data)

                return (
                    <div>
                        <h1>{data.name}</h1>
                    </div>
                )
            })
            
    } */

    return (
        <div className={`${styles.favcontainer} ${favTabState}`}>
            <h1 className={styles.favTitle}><ion-icon name="heart"></ion-icon>Favorites:</h1>
            <div className={`favoritesList ${styles.favList}`}>
                {favoritesArray.length === 0 ? <>
                        <img className={styles.nofavImage} src={whiteLogo} alt="aurora-logo"/>
                        <h1 className={styles.nofavText}>It seens you do not have any favorites...</h1>
                    </> : favoritesArray.map((elem) => (
                        <div key={elem}>
                            <h1>{elem}</h1>
                        </div>
                    ))}
            </div>
            <ion-icon name="close" onClick={closeEvent}></ion-icon>
        </div>
    )
}