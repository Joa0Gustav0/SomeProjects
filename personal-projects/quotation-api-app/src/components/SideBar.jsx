import styles from './styles/SideBar.module.css'
import { useState } from 'react'

export default function SideBar() {

    const [state, setState] = useState('non-activated') 

    window.onresize = () => setState('non-activated')

    return (
        <>
            <button className={styles.sideBarButton}
                onClick={() => setState('activated')}>
                <div className={`${styles.line} ${styles.l1}`}></div>
                <div className={`${styles.line} ${styles.l2}`}></div>
                <div className={`${styles.line} ${styles.l3}`}></div>
            </button>
            <div className={state === "activated" ? `${styles.sideBar} ${styles.activated}` : styles.sideBar}>
                <a href="#home" onClick={() => setState('non-activated')}>
                    <ion-icon name='home-sharp'></ion-icon> Home
                </a>
                <a href="#currencies" onClick={() => setState('non-activated')}>
                    <ion-icon name='bar-chart-sharp'></ion-icon> Currencies
                </a>
                <a href="#services" onClick={() => setState('non-activated')}>
                    <ion-icon name='briefcase-sharp'></ion-icon>Services
                </a>

                <ion-icon name="close" onClick={() => setState('non-activated')}></ion-icon>
            </div>
        </>


    )
}