import styles from './styles/DataForm.module.css'

export default function DataForm( {formButtonFunc} ) {

    window.onload = () => {
        const pColor = document.getElementById("caption-input")
        pColor.value = "#1872ff"
    }

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
            <label htmlFor="price-input">
                <h2>Caption color:</h2>
            </label>
            <input type="color" id="caption-input" className={styles.colorInput}/>

            <button onClick={() => {
                const pName = document.getElementById("product-input")
                const pPrice = document.getElementById("price-input")
                const pColor = document.getElementById("caption-input")

                if (pName.value !== "" && pPrice.value !== "" && Number(pPrice.value) >= 0) {
                    formButtonFunc({name: pName.value, price: Number(pPrice.value), ocurrences: [pColor.value]})
                    
                    pName.value = ""
                    pPrice.value = ""
                    pColor.value = "#1872ff"
                }
            }}>
                <h1>Add product</h1>
            </button>
        </div>
    )
}