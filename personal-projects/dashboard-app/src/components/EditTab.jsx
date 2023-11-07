import styles from './styles/EditTab.module.css'

export default function EditTab( {editableProduct} ) {
    return (
        <div className={styles.editTabContainer}>
            <h1>Edit Product</h1>
            <p>The product you are editing is: </p>
        </div>
    )
}