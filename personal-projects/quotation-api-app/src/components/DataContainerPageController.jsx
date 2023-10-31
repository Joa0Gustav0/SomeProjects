export default function DataContainerPageController( {setPageEvent} ){

    const buttons = 
    [
        {page: 1, initIndex: 0},
        {page: 2, initIndex: 10},
        {page: 3, initIndex: 20},
        {page: 4, initIndex: 30},
        {page: 5, initIndex: 40},
        {page: 6, initIndex: 50},
        {page: 7, initIndex: 60},
        {page: 8, initIndex: 70},
        {page: 9, initIndex: 80},
        {page: 10, initIndex: 90}
    ]

    return(
        <div>
           {
            buttons.map((elem, i) => (
                <button key={elem.page}
                onClick={() => {
                    setPageEvent(elem.initIndex)
                }}>{elem.page}</button>
            ))
           } 
        </div>
    )
}