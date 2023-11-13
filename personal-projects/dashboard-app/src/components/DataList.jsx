import styles from './styles/DataList.module.css'
import { useState } from 'react'

export default function DataList( {productsArr, editFunction, ocurrencesFunction} ) {

    return (
        <aside className={styles.dataListContainer}>
            <h1>Products <span>({productsArr.length} items)</span></h1>
            <div className={styles.dataList__List} style={productsArr?.length > 0 ? {justifyContent: "flex-start"} : {justifyContent: "center"}}>

                {
                    productsArr?.length > 0 ?
                    productsArr.map((elem, i) => (
                        <div key={elem.name + i} id={elem.id} className={`${elem.linedName} ${styles.productContainer}`} onClick={() => {
                            const allProducts = document.getElementsByClassName(styles.productContainer)

                            for (var index = 0; index < allProducts.length; index++) {
                                if (index === i){
                                    allProducts[index].className = `${elem.linedName} ${styles.productContainer} ${styles.selected}`
                                }else {
                                    allProducts[index].className = `${elem.linedName} ${styles.productContainer}`
                                }
                            }
                        }}>
                            <abbr title={elem.name}>
                                <h1>{elem.name}</h1>
                            </abbr>
                            <h2>${elem.price.toFixed(2)}</h2>
                            <button onClick={() => ocurrencesFunction(i)}>Add ocurrences</button>

                            <div className={styles.pColorCaption} 
                                style={{backgroundColor: elem.color}
                                }></div>
                            <ion-icon name="brush"
                                onClick={() => {
                                    editFunction(i)
                                }}></ion-icon>
                        </div> 
                    ))
                    :
                    <p>No products were added... </p>
                }

            </div>
        </aside>
    )
}