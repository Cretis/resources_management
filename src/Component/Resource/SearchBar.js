import './SearchBar.css'


const SearchBar = (props)=>{

    const onChangeHandler=(event)=>{
        const value = document.getElementById('search').value;
        console.log(value);
        props.onChange(value);
    }

    const buttonClickHandler=(event)=>{
        props.buttonClick();
    }

    const addColumnHandler = (event) => {
        props.buttonClick();
        const columnName = prompt("please input column name")
        if (columnName!=null && columnName!==""){
            props.addColumnName(columnName)
        }
        props.buttonClick();
    }

    const addRowHandler = (event)=>{
        props.showAddRow();
        props.buttonClick();
    }

    const showOrHide=(value)=>{
        if(value){
            return "show";
        }else{
            return "hide";
        }
    }

    return(
        <div className='dropPosition'>
            <input type='text' id='search' onChange={onChangeHandler}/><button onClick={buttonClickHandler}>+</button>
             <div className={showOrHide(props.classN)}>
                 {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                 <a onClick={addColumnHandler}>add Column</a>
                 {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                 <a onClick={addRowHandler}>add Row</a>
             </div>
        </div>
    )
}

export default SearchBar;