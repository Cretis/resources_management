import "./AddRow.css"

const AddRow=(props)=>{

    const cancelClickHandler=()=>{
        props.hideAddRow();
        document.getElementById("resourceName").value="";
        // document.getElementById("resourceId").value="";
    }

    const submitClickHandler=(event)=>{
        const value= document.getElementById("resourceName").value;
        // const id = document.getElementById("resourceId").value;
        props.addRow(null,value);
        props.hideAddRow();
        document.getElementById("resourceName").value="";
        // document.getElementById("resourceId").value="";
    }

    return(
        <div className={props.showAddRow}>
            <span className='bi-check-circle-fill' style={{cursor:"pointer",color:"red"}} onClick={submitClickHandler}/><i className="bi-x-circle-fill" style={{cursor:"pointer",color:"red"}} onClick={cancelClickHandler}/><input type='text' id="resourceName"/>
            {/*<input type='text' id="resourceId"/>*/}
        </div>
    )
}

export default AddRow;