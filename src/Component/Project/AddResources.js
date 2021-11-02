import React from "react";
import "./resourceTable.css"



const AddResources = (props)=>{
    return(
        <div className='addDiv'>
            <div style={{textAlign:"center",background:"gray"}}>
                <h4 style={{display:"inline"}}>added resources</h4><span className={"bi-trash"} style={{cursor:"pointer",display:"inline",float:"right"}} onClick={props.onDeleteClick}/>
            </div>
            <table className='ProjectTb'>
                <thead>
                <tr style={{background:"lightgrey"}}>
                    <th className="ProjectTh"> name</th>
                    <th className="ProjectTh"> id</th>
                </tr>
                </thead>
                <tbody>
                {props.addedResource.map(resource=>{
                        console.log("in added body")
                        return(
                            <tr className='ProjectTr' key={resource.id}>
                                <td className="ProjectTd"><input type='checkbox' data-id={resource.id} data-name={resource.name} onClick={props.deleteCheckBoxClick}/>{resource.name}</td>
                                <td className="ProjectTd">{resource.id}</td>
                            </tr>
                        )
                    })
                }
                {
                    props.willaddedResource.map(resource=>{
                        console.log("in will add part")
                        return(
                            <tr className='ProjectTr' key={resource.resourceId}>
                                <td className="ProjectTd"><input type='checkbox' data-id={resource.resourceId} data-name={resource.resourceName} onClick={props.checkBoxOnClick}/>{resource.resourceName}</td>
                                <td className="ProjectTd">{resource.resourceId}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default AddResources