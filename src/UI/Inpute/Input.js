import React from "react";


const Input = (props)=>{
    let inputElement = null;
    const inputClasses = [];

    if(props.invalid&&props.touched&& props.shouldValidate){
        inputClasses.push("invalid");
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
                onChange={props.changed} />;
    }

    return(
        <div>
            {inputElement}
        </div>
    )
}

export default Input;