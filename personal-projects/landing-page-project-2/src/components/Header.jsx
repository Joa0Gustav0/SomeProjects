export default function Header ( {lang} ) {

    const content = 
    [
        {
            lang: 'pt-br', 
            links: 
            [
                {href:'#reser', txt: 'Como encomendar'},
                {href:'#about', txt: 'Sobre nós'},
                {href:'#infos', txt: 'Como reservar'},
                {href:'#contact', txt: 'Contato'}
            ]
        },
        {
            lang: 'en', 
            links: 
            [
                {href:'#reser', txt: 'How to order'},
                {href:'#about', txt: 'About'},
                {href:'#infos', txt: 'informations'},
                {href:'#contact', txt: 'Contact'}
            ]
        },
        {
            lang: 'es', 
            links: 
            [
                {href:'reser', txt: 'Como hacer un pedido'},
                {href:'about', txt: 'Sobre nosotros'},
                {href:'infos', txt: 'Información'},
                {href:'#contact', txt: 'Contato'}
            ]
        }
    ]


    return (
        <header>
            <h1>Smooth</h1>
            <ul>
                {
                    content.map((elem) =>
                        elem.lang === lang ?
                        elem.links.map((link) => (
                            <li key={link.href}>
                                <a href={link.href}>{link.txt}</a>
                            </li>
                        )):null
                    )
                }
            </ul>
        </header>
    )
}