import { useState } from "react";

const Checkbox = ({}) => {
    const[isChecked, setIsChecked] = useState(false);
    return (
        <div className="checkbox-wrapper">
            <input type="checkbox" checked = {isChecked}
            onChange = {() => setIsChecked((prev)=>!prev)}/>  
        <p>{isChecked ? "checked-item" : "Unchecked"}</p>
        </div>
    );
};

export default Checkbox;


