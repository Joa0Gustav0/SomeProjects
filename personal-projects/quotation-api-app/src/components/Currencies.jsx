import DataContainer from "./DataContainer";
import styles from "./styles/Currencies.module.css"
import { useState } from "react";

export default function Currencies() {
    return (
        <section id="currencies" className={styles.currenciesSection}>
            <h1 className={styles.sectionTitle}>Currencies</h1>

            <DataContainer/>
        </section>
    )
}