import logo from "../media/logo.png"
import usaIcon from "../media/usa.png"
import brazilIcon from "../media/brazil.png"
import argentinaIcon from "../media/argentina.png"

export default function Header ( {lang, setLang} ) {

    const content = 
    [
        {
            lang: 'pt-br',
            langIcon: brazilIcon,  
            links: 
            [
                {href:'#reservation', txt: 'Como encomendar'},
                {href:'#about', txt: 'Sobre nós'},
                {href:'#informations', txt: 'Informações'},
                {href:'#contact', txt: 'Contato'}
            ]
        },
        {
            lang: 'en', 
            langIcon: usaIcon,
            links: 
            [
                {href:'#reservation', txt: 'How to order'},
                {href:'#about', txt: 'About'},
                {href:'#informations', txt: 'informations'},
                {href:'#contact', txt: 'Contact'}
            ]
        },
        {
            lang: 'es', 
            langIcon: argentinaIcon,
            links: 
            [
                {href:'reservation', txt: 'Como hacer un pedido'},
                {href:'about', txt: 'Sobre nosotros'},
                {href:'informations', txt: 'Información'},
                {href:'#contact', txt: 'Contacto'}
            ]
        }
    ]


    return (
        <header className="w-full shadow-sm">
            <div className="relative flex justify-center lg:justify-between m-auto items-center w-full max-w-7xl px-10 py-4">
                <a href="/" className="flex items-center gap-3">
                    <img src={logo} alt="cherry-log" className="w-14 p-1 rounded-full border-2 border-rose-400"/>
                    <h1 className=" font-poppins uppercase font-semibold text-rose-400 text-xl">Cherry</h1>
                </a>
                <ul className="hidden lg:flex items-center gap-6">
                    {
                        content.map((elem) =>
                            elem.lang === lang ?
                            elem.links.map((link) => (
                                <li key={link.href} className="flex flex-col border-b-2 border-transparent transition-all duration-3 hover:border-rose-400 p-1">
                                    <a href={link.href} className="font-poppins text-blue-950 hover:text-rose-400 vation transition-all duration-5 capitalize">
                                        {link.txt}
                                    </a>
                                </li>
                            )):null
                        )
                    }
                </ul>
                <div className="absolute top-full translate-y-1/2 lg:top-full right-1/2 lg:right-40 lg:-translate-y-1/2 translate-x-1/2 flex gap-4 transition-all duration-500">
                    {
                        content.map((elem) => (
                            <button key={elem.lang + "-language"} 
                                className="w-7 transation-all duration-100 hover:scale-125 rounded-full border-2 border-transparent hover:border-rose-400 active:scale-95"
                                onClick={() => setLang(elem.lang)}>
                                <img src={elem.langIcon} alt={elem.lang + "-language"} className="w-full"/>
                            </button>
                        ))
                    }
                </div>
            </div>
        </header>
    )
}