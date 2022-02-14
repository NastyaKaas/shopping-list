 function ListItem({item}) {
     return (
         <div>   
             {console.log(item)} 
           {item.map(oneItem => (
               <div key={oneItem.id}>
               <p>{oneItem.addedItem}</p>
               </div>
           ))}
         </div>
     )
 }

 export default ListItem;