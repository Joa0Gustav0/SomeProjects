import styles from './styles/DataForm.module.css'

export default function DataForm() {
    return (
        <form>
            <h1>Add New product</h1>
            <label htmlFor="product-input">
                <h2>Product:</h2>
            </label>
            <input type="text" id="product-input" 
            placeholder="Product name"/>
            <label htmlFor="price-input">
                <h2>Price:</h2>
            </label>
            <input type="number" id="price-input" 
            placeholder="Product price"/>
            <label htmlFor="sales-input">
                <h2>Number of sales:</h2>
            </label>
            <input type="number" id="sales-input" 
            placeholder="Product sales"/>

            <button>
                <h1>Add product</h1>
            </button>
        </form>
    )
}