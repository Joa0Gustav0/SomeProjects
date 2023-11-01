import styles from './styles/Hero.module.css'
import heroPicture from './media/hero-picture.gif'

export default function Hero(){
    return (
        <section className={styles.heroSection}>
            <img className={styles.heroPicture} src={heroPicture} alt="hero-pic" />
            <aside>
                <h1>
                    Let <span>Prisma</span><br />
                    help you about<br />
                    <span>Cryptocurrencies</span>
                </h1>
            </aside>
            
            <span className={styles.rightsText}>
            © 2023 PRISMA. All Rights Reserved.
            </span>
        </section>
    )
}