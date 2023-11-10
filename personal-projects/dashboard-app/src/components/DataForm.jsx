import styles from './styles/DataForm.module.css'

export default function DataForm( {formButtonFunc} ) {

    return (
        <div className={styles.dataFormContainer}>
            <h1>Add New product</h1>
            <label htmlFor="product-input">
                <h2>Product:</h2>
            </label>
            <input type="text" id="product-input" 
            placeholder="Product name" autoComplete='off'/>
            <label htmlFor="price-input">
                <h2>Price:</h2>
            </label>
            <input type="number" id="price-input" 
            placeholder="Product price"/>

            <button onClick={() => {
                const pName = document.getElementById("product-input")
                const pPrice = document.getElementById("price-input")

                if (pName.value !== "" && pPrice.value !== "" && Number(pPrice.value) >= 0) {
                    formButtonFunc({name: pName.value, price: Number(pPrice.value), ocurrences: [[
                        Math.random()*(255 - 1 + 1) + 1,
                        Math.random()*(255 - 1 + 1) + 1,
                        Math.random()*(255 - 1 + 1) + 1
                    ]]})
                    pName.value = ""
                    pPrice.value = ""
                }
            }}>
                <h1>Add product</h1>
            </button>
        </div>
    )
}