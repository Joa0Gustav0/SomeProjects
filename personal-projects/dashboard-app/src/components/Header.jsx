import styles from './styles/Header.module.css'
import chairLogo from './media/chair-logo.png'

export default function Header () {
    return (
        <header>
            <a href="">
                <img src={chairLogo} alt="chair-logo" />
                <h1>Chair</h1>
            </a>
        </header>
    )
}