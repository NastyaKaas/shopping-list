import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import MessageForUser from "./MessageForUser";
import Total from "./Total";

let getLocalSorage = () => {
  let item = localStorage.getItem("item");
  if (item) {
    return JSON.parse(localStorage.getItem("item"));
  } else {
    return [];
  }
};

function ShoppingList() {
  let [item, setItem] = useState(getLocalSorage());
  let [userInput, setUserInput] = useState("");
  let [editing, setEditing] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [id, setId] = useState(null);
  let [messageForUser, setMsgForUser] = useState({ show: false, message: "" });
  let [totalItems, setTotalItems] = useState(0)

  let addNewItem = (addedItem) => {
    let id = Math.floor(Math.random() * 1000) + 1;

    let newAddedItem = { id, addedItem, quantity: 0, selected: false};

    console.log(newAddedItem)

    setItem([newAddedItem, ...item]);
  };

  let controlMessageForUser = (display, mesForUser) => {
    setMsgForUser(display, mesForUser);
  };

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(item));
    let hideMessage = setTimeout(() => {
      controlMessageForUser();
    }, 1800);
    return () => clearTimeout(hideMessage);
  }, [item]);

  let handleSubmit = (e) => {
    e.preventDefault();

    if (item.length === 0) {
      controlMessageForUser({
        show: true,
        message: "Пожалуйста, введите продукт",
      });
    }

    if (userInput) {
      addNewItem(userInput);
      controlMessageForUser({ show: true, message: "Новый продукт добавлен!" });
      // countTotal([...item]);
    }

    if (editing && userInput) {
      setItem(
        item.map((oneItem) => {
          // everything before the first return is TO MAKE the COUNTTOTAL FUNCTION WORK
          // filter out the object that was clicked
          // and pass an array without it along with a newly created one
          if (oneItem.id === id) { 
              let filtered = item.filter(oneItemToFilter => {
              return oneItemToFilter.id !== id 
            })
            countTotal([...filtered, {id: oneItem.id, addedItem: userInput, quantity: 0, selected: false}]);
            return {id: oneItem.id, addedItem: userInput, quantity: 0, selected: false};
          }
          return oneItem;
        })
      );
      controlMessageForUser({ show: true, message: "Изменения внесены!" });
    }
    setUserInput("");
    setEditing(false);
  };

  let deleteItem = (id) => {
    let filteredItems = item.filter((oneItem) => {
      return oneItem.id !== id;
    });
    setItem(filteredItems);
    setDeleting(true);
    controlMessageForUser({ show: true, message: "Продукт удален!" });
    countTotal(filteredItems)
  };

  let editItem = (id) => {
    item.forEach((oneItem) => {
      if (oneItem.id === id) {
        console.log(oneItem)
        setUserInput(oneItem.addedItem);
        setId(oneItem.id);
        setEditing(true);
      }
    });
  };

  let clearAll = () => {
    setItem([]);
    setDeleting(true);
    controlMessageForUser({ show: true, message: "Все продукты удалены!" });
    setTotalItems(0);
  };

  let increaseItemNumber = (index) => {
        item[index].quantity +=1;
        let newItems = [...item];
        setItem(newItems);
        countTotal(newItems);
    }

    let decreaseItemNumber = (index) => {
      if(item[index].quantity > 0) {
          item[index].quantity -=1;
      let newItems = [...item];
      setItem(newItems);
      countTotal(newItems);
      }
    }

  let uncheckItem = (index) => {
    item[index].selected = false;
    let newItems = [...item];
    setItem(newItems);
  };

  let checkItem = (index) => {
    item[index].selected = true;
    let newItems = [...item];
    setItem(newItems);
  };

  let countTotal = (allItems) => {
    console.log(allItems)
    totalItems = allItems.reduce((total, item) => {
      return total + item.quantity
    }, 0)
    setTotalItems(totalItems)
  }

  return (
    <section className="list-container">
      <MessageForUser {...messageForUser} />
      <h1>Список Покупок</h1>
      <form className="list-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите название продукта"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        {editing ? (
          <button type="submit">Редактировать</button>
        ) : (
          <button type="submit">Добавить</button>
        )}
      </form>
      {item && (
        <ItemList
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
          checkItem={checkItem}
          uncheckItem={uncheckItem}
          increaseItemNumber={increaseItemNumber}
          decreaseItemNumber={decreaseItemNumber}
        />
      )}
      {item && <Total totalItems={totalItems}/>}
      {item.length > 0 && <button onClick={clearAll}>Очистить Все</button>}
    </section>
  );
}

export default ShoppingList;
