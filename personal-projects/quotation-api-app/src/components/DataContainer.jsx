import { useState } from "react"
import styles from './styles/DataContainer.module.css'

export default function DataContainer(){

    const [data, setData] = useState(undefined)

    window.onload = async () => {

        await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&")
        .then(data => data.json())
        .then(data => {
        console.log(data)
        setData(data)

    })}

    return (
        <table className={styles.dataContainer}>
            <thead>
                <tr>
                    <td><h1>Coin</h1></td>
                    <td className={styles.numTd}><h1>Price</h1></td>
                    <td className={styles.numTd}><h1>24h</h1></td>
                    <td className={styles.numTd}><h1>Market Cap</h1></td>
                </tr>
            </thead>
            <tbody>    
                {
                    data?.map((elem, i) => (
                        i <= 9 ?
                        <tr key={elem.name + i} className={styles.coinContainer}>
                            <td key={elem.name + "-name"} className={styles.coinTd}>
                                <img className={styles.coinImage} src={elem.image} alt={elem.name} />
                                <h1>{elem.name}</h1>
                            </td>
                            <td key={elem.name + "-price"} className={styles.numTd}>
                                <h1>${Number(elem.current_price).toFixed(2)}</h1>
                            </td>
                            <td key={elem.name + "24hchange"} className={`${styles.numTd} ${elem.price_change_percentage_24h >= 0 ? styles.posValue : styles.negValue}`}>
                                <h1>{elem.price_change_percentage_24h > 0 ? "+" : ""}{elem.price_change_percentage_24h.toFixed(2)}%</h1>
                            </td>
                            <td key={elem.name + "market-cap"} className={styles.numTd}>
                                <h1>${elem.market_cap}</h1>
                            </td>
                        </tr>
                        :
                        null
                    ))
                }
            </tbody>
        </table>
    )
}