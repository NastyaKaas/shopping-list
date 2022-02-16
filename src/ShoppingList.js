import { useEffect, useState } from "react"; 
import ItemList from "./ItemList";

function ShoppingList () {

    let [item, setItem] = useState([]);
    let [userInput, setUserInput] = useState("");
    let [editing, setEditing] = useState(false);
    let [deleting, setDeleting] = useState(false);
    let [id, setId] = useState(null);
    let [messageForUser, setMessageForUser] = useState(false);

    let addNewItem = (addedItem) => {
        let id = Math.floor(Math.random() * 1000) + 1;

        let newAddedItem = {id, addedItem};

        setItem([newAddedItem, ...item]);
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if(userInput) {
            addNewItem(userInput); 
        }
        if(editing && userInput) {
             setItem(item.map(oneItem => {
                 if(oneItem.id === id) {
                  return {...oneItem, addedItem: userInput}; 
                }
                return oneItem;
              }))
        }
        setUserInput("");
        setEditing(false);
    }

    useEffect(() => {
        let showMessage = setTimeout(() => {
            setMessageForUser(true);
        },100)
        return () => {
            clearTimeout(showMessage)
        }
    },[userInput])

    let deleteItem = (id) => {
      let filteredItems = item.filter(oneItem => { 
        return oneItem.id !== id
    });  
        setItem(filteredItems);
        setDeleting(true);
    }

    let editItem = (id) => {
        item.forEach(oneItem => { 
            if(oneItem.id === id) {
                setUserInput(oneItem.addedItem);
                setId(oneItem.id);
                setEditing(true);
            }
        })
    }

    let clearAll = () => {
        setItem([]);
        setDeleting(true);
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
                {editing ? <button type="submit">Редактировать</button> : <button type="submit">Добавить</button>}
            </form> 
            {item && <ItemList item={item} deleteItem={deleteItem} editItem={editItem}/>}
            {item.length > 0 && <button onClick={clearAll}>Очистить Все</button>}
        </section>
    )
}

export default ShoppingList;