import React from "react";
import { useState } from "react";
import uuid from "uuid";

const TodoList = ({ list, onChange,id,isChecked, onClick, remove}) => {
    const newuuid=uuid.v4();
    // const styles = {textDecorationLine: isChecked ? "line-through" : "none"};

    // const [checkedList, setCheckedList] = useState([]);
    //const [isChecked,setIsChecked] = useState(false);
    
    // const handleCheck = (event) => {
    //     var updatedList = [...checked];
    //     if (event.target.checked) {
    //       updatedList = [...checked, event.target.value];
    //     } else {
    //       updatedList.splice(checked.indexOf(event.target.value), 1);
    //     }
    //     setChecked(updatedList);
    //   };
    

    // return (
    //   <>
    //     {list?.length > 0 ? (
    //       <ul className="todo-list">
    //         {list.map((item, index) => (
    //           <div className="todo">
    //             <li
    //                 key={index}
    //                 type="checkbox"   
    //                 onChange={()=>handleChange()}
                    
    //                 id={index}           
    //             >
                               
    //             <Checkbox />
    //             {item}
    //               <button
    //                className="delete-button"
    //                onClick={() => {
    //                 remove(item);
    //               }}
    //               >
    //               Delete
    //               </button>
    //              </li> 
    //           </div>
    //         ))}
    //       </ul>
    //     ) : (
    //       <div className="empty">
    //         <p>No task found</p>
    //       </div>
    //     )}
    //   </>
    // );
    // eslint-disable-next-line no-lone-blocks
    return(
        <div className="todo-list">
            {list.map((item,index,isChecked) =>{
                return (
                    <div className="todo">
                        <input 
                            className="checkbox"
                            type="checkbox"
                            id={newuuid}
                            key={index}
                            value={item}
                            isChecked={isChecked}
                            onChange={onChange}
                            onClick = {onClick}
                            
                        />
                       {/* {<span className={check(item)}>{item}</span>}  */}
                       <span className ={`todo ${(item.isChecked === true) ? 'todo-checked' : 'underline'}`}>{item}</span> 
                    <button
                     className="delete-button"
                     onClick={() => {
                        remove(item);
                        }}
                    >
                    Delete
                    </button>
                </div>
                );
            })}
        </div>  
    );


  };
  
  export default TodoList;