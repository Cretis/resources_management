import React from "react";



const AddResources = (props)=>{
    return(
        <div style={{display:"inline-block"}}>
            <h4 style={{display:"inline-block"}}>added resources</h4><span className={"bi-trash"}/>
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
                            <tr key={resource.id}>
                                <td>{resource.name}</td>
                                <td>{resource.id}</td>
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