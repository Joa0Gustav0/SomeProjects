import styles from './styles/Header.module.css'
import logo from './media/prisma-logo.png'

export default function Header(){
    return(
        <header id='home'>
            <a href="." className={styles.prismaLogo}>
                <img src={logo} alt="prisma-logo" />
            </a>
            <span className={styles.headerLinks}>
                <a href="#home">Home</a>
                <a href="#currencies">Currencies</a>
                <a href="#services">Services</a>
            </span>
        </header>
    )
}