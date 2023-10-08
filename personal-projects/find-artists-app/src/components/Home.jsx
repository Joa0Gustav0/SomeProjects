import styles from './styles/Home.module.css'
import logo from '../media/aurora-logo.png'

export default function Home(){
    return (
        <section>
            <a href="" className={styles.headerLogo}><img src={logo} alt="aurora-logo" /></a>
            <div className={`${styles.lights} ${styles.greenLight}`} ></div>
            <div className={`${styles.lights} ${styles.blueLight}`} ></div>
            <h1 className={styles.headline}>Discover the <span>Beyond</span>.<br />Discover with <span>AURORA</span>.</h1>
            <img className={styles.heroLogo} src={logo} alt="aurora-logo" />
            <input className={styles.cabutton} type="button" value="Start now!" /> 
        </section>
    )
}