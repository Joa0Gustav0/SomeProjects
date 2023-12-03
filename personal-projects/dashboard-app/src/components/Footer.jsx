import styles from './styles/Footer.module.css'
import ChairFooterLogo from './media/chair-footer-logo.png'
import ChairFooterLogoDark from './media/chair-footer-logo-dark.png'

export default function Footer( {darkMode} ) {
    return (
        <footer className={darkMode === true ? styles.dark : ''}>
            <img src={darkMode === true ? ChairFooterLogoDark : ChairFooterLogo} alt="chair-logo" />

            <div className={darkMode === true ? `${styles.rightsText} ${styles.dark}` : styles.rightsText}>
            © 2023 CHAIR. All Rights Reserved.
            </div>
        </footer>
    )
}