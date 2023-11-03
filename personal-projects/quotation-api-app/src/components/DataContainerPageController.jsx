import styles from './styles/DataContainerPageController.module.css'

export default function DataContainerPageController( {setPageEvent} ){

    const buttons = 
    [
        {page: 1, initIndex: 0},
        {page: 2, initIndex: 10},
        {page: 3, initIndex: 20},
        {page: 4, initIndex: 30},
        {page: 5, initIndex: 40}
    ]

    return(
        <div className={styles.pagesControllerContainer}>
           {
            buttons.map((elem, i) => (
                <button key={elem.page}
                onClick={() => {
                    setPageEvent(elem.initIndex)
                }}><h1>{elem.page}</h1></button>
            ))
           } 
        </div>
    )
}