import styles from './styles/Header.module.css'
import chairLogo from './media/chair-logo.png'
import { useState } from 'react'

export default function Header ({darkMode, setDarkMode}) {

    return (
        <header style={darkMode === true ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}}>
            <a href="">
                <img src={chairLogo} alt="chair-logo" />
                <h1>Chair</h1>
            </a>

            <ion-icon name={darkMode === true ? 'sunny' : 'moon'} style={darkMode === true ? {color: 'white'} : {color: 'black'}} onClick={() => setDarkMode()}></ion-icon>
        </header>
    )
}