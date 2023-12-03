import styles from './styles/Footer.module.css'
import ChairFooterLogo from './media/chair-footer-logo.png'

export default function Footer() {
    return (
        <footer>
            <img src={ChairFooterLogo} alt="chair-logo" />

            <div className={styles.rightsText}>
            © 2023 CHAIR. All Rights Reserved.
            </div>
        </footer>
    )
}