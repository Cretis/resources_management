import React from "react";
import {renderToStaticMarkup} from "react-dom/server";

const AddColumn = (props)=>{

    const formula=(
        <td>Formula
            <input type='text'/>
        </td>
    )


    const addRow=()=>{
        props.addClick();
    }

    const onChange=(event)=>{
        console.log(event.target.getAttribute('data-id'))
        if(event.target.value==="formula"){
            props.show(event.target.getAttribute('data-id'))
        }else{
            props.hide(event.target.getAttribute('data-id'))
        }
    }

    const inputChange=(event)=>{
        props.inputChange(document.getElementById(event.target.id).value)
    }

    return(
        <div>
            <table >
                <thead>
                <tr>
                    <th>
                        Quantity Survey Fields
                    </th>
                </tr>
                </thead>
                <tbody id='myBody'>
                {
                    props.times.map(n=>{
                        return(
                            <tr>
                                <td>Field<input type='text' id={n.num+"text"} onBlur={inputChange}/></td>
                                <td>Type
                                    <select id={n.num+'select'} data-id={n.num} onChange={onChange}>
                                        <option value='number'>Number</option>
                                        <option value='text'> Text</option>
                                        <option value='formula'>Formula</option>
                                    </select>
                                </td>
                                {n.show? formula:<td> </td>}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <button onClick={addRow}>add</button>
        </div>
    )
}

export default AddColumn;