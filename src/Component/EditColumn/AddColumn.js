import React from "react";
import "./AddColumn.css"

const AddColumn = (props)=>{

    const formula=(
        <td className="AddTd">Formula
            <input size="18" type='text'/>
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
        <div className="AddDiv">
            <table className="AddTb">
                <thead>
                <tr>
                    <th colSpan="3">
                        Quantity Survey Fields
                    </th>
                </tr>
                </thead>
                <tbody id='myBody'>
                {
                    props.times.map(n=>{
                        return(
                            <tr style={{background:"orangered"}}>
                                <td className="AddTd">Field<input type='text' id={n.num+"text"} size="18" onBlur={inputChange}/></td>
                                <td className="AddTd"><div> Type</div>
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
                <tr><td colSpan="3"><button style={{float:"right"}} onClick={addRow}>add</button></td></tr>
                </tbody>
            </table>
        </div>
    )
}

export default AddColumn;