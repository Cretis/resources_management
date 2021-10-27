import React from "react";
import './Input.css'


const Input = (props)=>{
    let inputElement = null;
    const inputClasses = ['InputElement'];
    const inputSpan=['hides'];

    if(!props.valid&&props.touched){
        inputClasses.pop();
        inputClasses.push('invalid');
        inputSpan.pop();
        inputSpan.push('shows')
        console.log(inputClasses.join(''))
    }

    switch (props.elementType){
        case("input"):
            inputElement=<div>
                <input
                    className={inputClasses.join('')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.change}/><span className={inputSpan.join('')}>{props.hint}</span>
            </div>

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