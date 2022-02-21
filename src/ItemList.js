import { MdDelete, MdEdit } from "react-icons/md";
import {
  GrCheckbox,
  GrCheckboxSelected,
  GrFormPrevious,
  GrFormNext,
} from "react-icons/gr";

function ListItem({
  item,
  editItem,
  deleteItem,
  checkItem,
  uncheckItem,
  increaseItemNumber,
  decreaseItemNumber,
}) {
  return (
    <div className="items-list">
      {item.map((oneItem, index) => (
        <div key={oneItem.id}>
          <div className="button-item-container">
            {oneItem.selected ? (
              <div className="checked" onClick={() => uncheckItem(index)}>
                <GrCheckboxSelected />
              </div>
            ) : (
              <div className="unchecked" onClick={() => checkItem(index)}>
                <GrCheckbox />
              </div>
            )}
            <p>{oneItem.addedItem}</p>

            <div onClick={() => decreaseItemNumber(index)}>
              <GrFormPrevious />
            </div>
            {oneItem.quantity}
            <div onClick={() => increaseItemNumber(index)}>
              <GrFormNext />
            </div>

            <div className="button-container">
              <div
                className="delete-button"
                onClick={() => deleteItem(oneItem.id)}
              >
                <MdDelete />
              </div>
              <div className="edit-button" onClick={() => editItem(oneItem.id)}>
                <MdEdit />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListItem;
