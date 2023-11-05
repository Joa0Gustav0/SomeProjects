import styles from './styles/SideBar.module.css'

export default function SideBar( {state, controlStateEvent} ) {
    return (
        <>
            <button className={styles.sideBarButton}
                onClick={() => controlStateEvent('open')}>
                <div className={`${styles.line} ${styles.l1}`}></div>
                <div className={`${styles.line} ${styles.l2}`}></div>
                <div className={`${styles.line} ${styles.l3}`}></div>
            </button>
            <div className={state === "activated" ? `${styles.sideBar} ${styles.activated}` : styles.sideBar}>
                <h1>Prisma</h1>
                <a href="#home" onClick={() => controlStateEvent('close')}>
                    <ion-icon name='home-sharp'></ion-icon> Home
                </a>
                <a href="#currencies" onClick={() => controlStateEvent('close')}>
                    <ion-icon name='bar-chart-sharp'></ion-icon> Currencies
                </a>
                <a href="#services" onClick={() => controlStateEvent('close')}>
                    <ion-icon name='briefcase-sharp'></ion-icon>Services
                </a>

                <ion-icon name="close" onClick={() => controlStateEvent('close')}></ion-icon>
            </div>
        </>


    )
}