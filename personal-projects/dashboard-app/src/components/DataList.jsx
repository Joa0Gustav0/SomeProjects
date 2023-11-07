import styles from './styles/DataList.module.css'

export default function DataList( {productsArr} ) {
    return (
        <aside className={styles.dataListContainer}>
            <h1>Products</h1>
            <div className={styles.dataList__List} style={productsArr?.length > 0 ? {justifyContent: "flex-start"} : {justifyContent: "center"}}>

                {
                    productsArr?.length > 0 ?
                    productsArr.map((elem, i) => (
                        <div key={elem.name + i} className={styles.productContainer}>
                            <h1>{elem.name}</h1>
                            <h2>{elem.price}</h2>
                            <button>Add ocurrences</button>
                        </div> 
                    ))
                    :
                    <p>No products were added... </p>
                }

            </div>
        </aside>
    )
}