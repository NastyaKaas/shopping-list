 import {MdDelete, MdEdit} from "react-icons/md";

 function ListItem({item, editItem, deleteItem}) {
     return (
         <div className="items-list">   
           {item.map(oneItem => (
               <div key={oneItem.id}>
               <div className="button-item-container"> 
               <p>{oneItem.addedItem}</p>
               <div className="button-container">
                   <div className="delete-button" onClick={() => deleteItem(oneItem.id)}><MdDelete/></div>
                   <div className="edit-button"  onClick={() => editItem(oneItem.id)}><MdEdit /></div>
                </div>    
               </div>
               </div>
           ))}
         </div>
     )
 }

 export default ListItem;