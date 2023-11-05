import styles from './styles/Footer.module.css'
import logo from './media/prisma-footer-logo.png'

export default function Footer() {
    return (
        <footer>
            <img src={logo} alt="prisma-logo" />
            <h1>- Contact us -</h1>

            <div className={styles.contactsContainer}>
                <ion-icon name='logo-discord'></ion-icon>
                <ion-icon name='logo-instagram'></ion-icon>
                <ion-icon name='logo-twitter'></ion-icon>
            </div>

            <span className={styles.rightsText}>
            © 2023 PRISMA. All Rights Reserved.
            </span>
        </footer>
    )
}