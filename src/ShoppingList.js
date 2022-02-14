import { useState } from "react"; 
import ItemList from "./ItemList";

function ShoppingList () {

    let [item, setItem] = useState([]);

    let [userInput, setUserInput] = useState("");

    let addNewItem = (addedItem) => {
        let id = Math.floor(Math.random() * 1000) + 1;

        let newAddedItem = {id, addedItem};

        setItem([newAddedItem, ...item]);
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        addNewItem(userInput);
    }

    return (
        <section className="list-container">
            <h1>Список Покупок</h1>
            <form className="list-input"
            onSubmit={handleSubmit}>
                <input type="text"
                placeholder="Введите название продукта"
                value={userInput}
                onChange={(e) => {setUserInput(e.target.value)}}/>
                <button type="submit">Добавить</button>
            </form> 
            {item && <ItemList item={item}/>} 
        </section>
    )
}

export default ShoppingList;