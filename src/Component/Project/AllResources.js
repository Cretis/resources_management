import "./resourceTable.css"
import React from "react";


const AllResources = (props)=>{
    return(
        <div className='allDiv'>
            <div>
                <h4 style={{display:"inline"}}>Resource Catalog</h4><i className={"bi-arrow-right-circle"} style={{cursor:"pointer",display:"inline"}} onClick={props.addOnClick}/>
            </div>
            <table className='ProjectTb'>
                <thead>
                <tr>
                    <th> </th>
                    <th>name</th>
                    <th>id</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.allResource.map((resource)=>{
                        return(
                                <tr key={resource.id}>
                                    <td><input id={resource.id} type="checkbox" data-id={resource.id} data-name={resource.name} onClick={props.checkBoxOnClick}/></td>
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

export default AllResources;
