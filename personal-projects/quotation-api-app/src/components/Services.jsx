import styles from './styles/Services.module.css'
import digitalWalletIcon from './media/digital-wallet.gif'
import onlineSupportIcon from './media/tech-support.gif'
import experienceIcon from './media/satisfaction.gif'
import securityIcon from './media/security.gif'
import certificateIcon from './media/certificate.gif'

export default function Services() {

    const services = 
    [
        {
            title: "Digital Wallet",
            paragraph: 
            <p>
                <span>Prisma</span> offers you a <span>digital wallet</span> for managing your <span>cryptocurrencies</span>, partnering with a <span>digital bank of your choice</span>.
            </p>,
            icon: digitalWalletIcon
        },
        {
            title: "24H Online Support",
            paragraph: 
            <p>
                Prisma's <span>great 24hrs online support</span> will <span>help you</span> about any of your <span>necessities</span>.
            </p>,
            icon: onlineSupportIcon
        },
        {
            title: "Security",
            paragraph: 
            <p>
                You are <span>safe</span> with <span>Prisma</span>. Prisma's <span>end to end security system</span> assures our <span>users's security</span> and their cryptocurrencies.
            </p>,
            icon: securityIcon
        },
        {
            title: "Experience",
            paragraph: 
            <p>
                Recent researches showed a <span>99.8% users's satisfaction percentage</span> about <span>Prisma's services</span>.
            </p>,
            icon: experienceIcon
        },
        {
            title: "Certificate",
            paragraph: 
            <p>
                <span>Prisma</span> contains a <span>digital quality seal and assurance</span>. You can count on prisma.
            </p>,
            icon: certificateIcon
        }
    ]

    return (
        <section id='services' className={styles.servicesSection}>
            <h1 className={styles.servicesTitle}>
                Services
            </h1>
            <div className={styles.servicesList}>
            {
                services.map((elem) => (
                    <div key={elem.title.toLowerCase()} className={styles.serviceContainer}>
                        <img src={elem.icon} alt={elem.title.toLowerCase() + "-icon"} />
                        <h1>{elem.title}</h1>
                        {elem.paragraph}
                    </div>
                ))
            }
            </div>
        </section>
    )
}