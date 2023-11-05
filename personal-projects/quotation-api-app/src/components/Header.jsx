import SideBar from './SideBar'
import styles from './styles/Header.module.css'
import logo from './media/prisma-logo.png'
import { useState } from 'react'

export default function Header({gtButtonFunction}){
    const [state, setState] = useState('non-activated')

    window.onscroll = () => {
        gtButtonFunction()
        setState('non-activated')
    }
    window.onresize = () => setState('non-activated')

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
            <SideBar state={state} controlStateEvent={(requiredAction) => {
                requiredAction === 'open' ?
                setState('activated') :
                setState('non-activated')
            }}/>
        </header>
    )
}