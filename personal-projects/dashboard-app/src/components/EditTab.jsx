import styles from './styles/EditTab.module.css'

export default function EditTab( {editableProduct} ) {
    return (
        <>
            <div className={editableProduct !== null ? `${styles.safeLayer} ${styles.active}` : styles.safeLayer}></div>
            <div className={editableProduct !== null ? `${styles.editTabContainer} ${styles.active}` : styles.editTabContainer}>
                <h1>Edit Product</h1>
                <p>The product you are editing is: </p>
                <label htmlFor="product-input-edit">Product:</label>
                <input type="text" id="product-input-edit" placeholder='Product Name'/>
                <label htmlFor="price-input-edit">Price:</label>
                <input type="number" id="price-input-edit" placeholder='Product price'/>
                <button>Save Changes</button>
            </div>
        </>
    )
}