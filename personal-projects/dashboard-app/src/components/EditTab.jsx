import styles from './styles/EditTab.module.css'

export default function EditTab( {productsArr, editProductI, closeNClear} ) {
    return (
        <>
            <div className={editProductI !== null ? `${styles.safeLayer} ${styles.active}` : styles.safeLayer}></div>
            <div className={editProductI !== null ? `${styles.editTabContainer} ${styles.active}` : styles.editTabContainer}>
                <h1>Edit Product</h1>
                <p>The product you are editing is: <span>{productsArr[editProductI]?.name}</span></p>
                <label htmlFor="product-input-edit">Product:</label>
                <input type="text" id="product-input-edit" placeholder={productsArr[editProductI]?.name}/>
                <label htmlFor="price-input-edit">Price:</label>
                <input type="number" id="price-input-edit" placeholder={productsArr[editProductI]?.price}/>
                <button>Save Changes</button>
                <ion-icon name="close" onClick={() => {
                    closeNClear()
                }}></ion-icon>
            </div>
        </>
    )
}