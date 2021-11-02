import React from "react";
import "./ResourceTable.css"

const ResourceTable = (props)=>{
    console.log("in ResourceTable")
    console.log(props.resourceList);

    let columns = (
        <tr>
            <th className="ColumnTh">name</th>
        </tr>
    )
    if (props.resourceList){
        columns=(
            <tr key="0">
                <th className="ColumnTh" key="name">name</th>
                {
                    props.resourceList[0].column.map((column)=> {
                        if(column.show){
                            return (
                                <th className="ColumnTh" key={column.columnName}>{column.columnName}</th>
                            )
                        }
                    })
                }
            </tr>
        )
    }

    let body=(
        <tr/>
    )

    const onChangeHandler=(event)=>{
        console.log("event:")
        console.log(event)
        const resourceId = event.target.parentElement.getAttribute('data-resource');
        const columnId = event.target.getAttribute('data-column');
        console.log(resourceId)
        console.log(columnId)
        props.onChange(resourceId,columnId,event.target.textContent)
    }

    if(props.resourceList){
        body=(
            props.resourceList.map(resource=>{
                return(
                    <tr key={resource.resourceId} data-resource={resource.resourceId}>
                        <td className="ColumnTd">{resource.resourceName}</td>
                        {
                            resource.column.map(col=>{
                                if(col.show){
                                    return(
                                        <td className="ColumnTd" key={col.columnId} contentEditable="true" onInput={onChangeHandler} onBlur={props.onBlur} data-column={col.columnId}>{col.columnValue}</td>
                                    )
                                }
                            })
                        }
                    </tr>

                )
            })
        )
    }

    return(
        <div>
            <table className="ColumnTb">
                <thead>
                {columns}
                </thead>
                <tbody>
                {body}
                </tbody>
            </table>
        </div>
    )
}

export default ResourceTable;