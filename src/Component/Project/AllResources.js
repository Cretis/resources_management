import "./resourceTable.css"
import React from "react";


const AllResources = (props)=>{
    return(
        <div className='allDiv'>
            <div style={{textAlign:"center",background:"gray"}}>
                <h4 style={{display:"inline"}}>Resource Catalog</h4><i className={"bi-arrow-right-circle"} style={{cursor:"pointer",display:"inline",float:"right"}} onClick={props.addOnClick}/>
            </div>
            <table className='ProjectTb'>
                <thead>
                <tr style={{background:"lightgrey"}}>
                    <th className="ProjectTh">name</th>
                    <th className="ProjectTh">id</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.allResource.map((resource)=>{
                        return(
                                <tr className='ProjectTr' key={resource.id}>
                                    <td className="ProjectTd"><input id={resource.id} type="checkbox" data-id={resource.id} data-name={resource.name} onClick={props.checkBoxOnClick}/>{resource.name}</td>
                                    <td className="ProjectTd">{resource.id}</td>
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
