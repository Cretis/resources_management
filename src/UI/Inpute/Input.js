import React from "react";
import classes from'./Input.css'


const Input = (props)=>{
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid&&props.touched){
        inputClasses.push(classes.invalid);
    }

    switch (props.elementType){
        case("input"):
            inputElement=<input
                className={inputClasses.join('')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}/>;
            break;
        case('select'):
            inputElement = (
                <select
                    className={inputClasses.join('')}
                    value={props.value}
                    onChange={props.change}
                >
                    {props.elementConfig.options.map(option=>(
                        <option key={option.value} value={option.value}>
                            {option.display}
                        </option>
                        ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change} />;
    }

    return(
        <div>
            {inputElement}
        </div>
    )
}

export default Input;