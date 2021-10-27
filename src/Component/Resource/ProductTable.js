import React from "react";
import "./ProducTable.css"


const ProductTable = (props)=>{
    console.log("resources in ProductTable:");
    console.log(props.resources);

    const columnNameClickHandler = (event)=>{
        console.log("event:")
        console.log(event)
        if(event.target.parentElement.children[1].className==="showt"){
            event.target.parentElement.children[1].className="hidet";
        }else{
            event.target.parentElement.children[1].className="showt";
        }
    }

    const editColumnClickHandler=(event)=>{
        const newValue = prompt("new column name:")
        const columnId = event.target.getAttribute('data-id');
        console.log(columnId);
        console.log(event);
        props.updateColumnName(columnId,newValue);
        event.target.parentElement.parentElement.className="hidet";
    }

    const deleteColumnClickHandler=(event)=>{
        const columnId = event.target.getAttribute('data-id');
        props.deleteColumn(columnId);
        event.target.parentElement.parentElement.className="hidet";
    }

    let column = (
        <tr>
            <th>name</th>
            <th>id</th>
        </tr>
    )
    if (props.resources[0]){
        column=(
            <tr>
                <th key="name">name</th>
                <th key="id">id</th>
                {
                    props.resources[0].columns.map((column)=> {
                        return (
                            <th key={column.columnName}>{column.columnName}<span className={"bi-caret-down-fill"} style={{cursor: "pointer",fontSize:"10px"}} onClick={columnNameClickHandler}/>
                                <div className="hidet">
                                    <dl>
                                        <dt onClick={editColumnClickHandler} data-id={column.columnId} style={{cursor:"pointer"}}>edit column</dt>
                                        <dt onClick={deleteColumnClickHandler} data-id={column.columnId} style={{cursor:"pointer"}}>delete column</dt>
                                    </dl>
                                </div>
                            </th>
                        )
                    })
                }
            </tr>
        )
    }


    const onBlurHandler = (event)=>{
        console.log("event:")
        console.log(event)
        // const resourceId = event.target.getAttribute("data-column")
        // const columnId = event.target.parentElement.getAttribute('data-resource')
        // props.onChange(resourceId,columnId,event.target.value);
        props.onBlur()
    }

    const onChangeHandler=(event)=>{
        // console.log("event:")
        // console.log(event)
        const resourceId = event.target.parentElement.getAttribute("data-resource")
        const columnId = event.target.getAttribute('data-column')
        // console.log("value:")
        // console.log(event.target.textContent)
        props.onChange(resourceId,columnId,event.target.textContent);
    }

    return(
        <div>
            <table>
                <thead>
                    {column}
                </thead>
                <tbody>
                {props.resources.map((resource)=>{
                    return(
                            <tr key={resource.id} data-resource={resource.id}>
                                <td>{resource.name}</td>
                                <td>{resource.id}</td>
                                {
                                    resource.columns.map((column)=>{
                                        return(
                                            <td id={column.columnId} contentEditable='true' onInput={onChangeHandler} onBlur={onBlurHandler} data-column={column.columnId}>{column.columnValue}</td>
                                        )
                                    })
                                }
                            </tr>
                        )

                })}

                </tbody>
            </table>
        </div>
    )
}
// class ProductTable extends Component{
//
//     render() {
//         {rsources} = this.props
//
//         return(
//             <div>
//                 <table border='2'>
//                     <thead>
//                     <tr>
//
//                     </tr>
//                     </thead>
//
//                 </table>
//             </div>
//         )
//     }
// }

export default ProductTable;