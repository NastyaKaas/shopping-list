function ShoppingList () {
    return (
        <section className="list-container">
            <h1>Список Покупок</h1>
            <form className="list-input">
                <input type="text"
                placeholder="Введите название продукта"/>
                <button>Добавить</button>
            </form> 
        </section>
    )
}

export default ShoppingList;