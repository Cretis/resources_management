import React from "react";



const AddResources = (props)=>{
    console.log("in AddResourcse")
    console.log(props.addedResource)
    console.log(props.willaddedResource)
    return(
        <div style={{display:"inline-block"}}>
            <h4 style={{display:"inline-block"}}>added resources</h4><span className={"bi-trash"} style={{cursor:"pointer"}} onClick={props.onDeleteClick}/>
            <table>
                <thead>
                <tr>
                    <th> name</th>
                    <th> id</th>
                </tr>
                </thead>
                <tbody>
                {props.addedResource.map(resource=>{
                        console.log("in added body")
                        return(
                            <tr key={resource.id}>
                                <td> </td>
                                <td>{resource.name}</td>
                                <td>{resource.id}</td>
                            </tr>
                        )
                    })
                }
                {
                    props.willaddedResource.map(resource=>{
                        console.log("in will add part")
                        return(
                            <tr key={resource.resourceId}>
                                <td><input type='checkbox' data-id={resource.resourceId} data-name={resource.resourceName} onClick={props.checkBoxOnClick}/></td>
                                <td>{resource.resourceName}</td>
                                <td>{resource.resourceId}</td>
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