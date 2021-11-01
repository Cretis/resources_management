import * as actionType from"../Action/ActionType"



const initialState={
    columnList:null,
    onlyColumnList:[],
    change:false
}

const loadColumnSuccessful=(state,action)=>{
    console.log("in column reducer")
    console.log(action.projectColumnList)
    let newList = action.projectColumnList
    if(state.columnList===null){
        return Object.assign({},state,{columnList:[...newList]})
    }
    return Object.assign({},state);
}

const changeShowColumn=(state,action)=>{
    console.log("in change show reducer")
    let columns=[...state.columnList];
    let onlyColumn=[...state.onlyColumnList];
    columns.forEach(resource=>{
        resource.column.forEach(col=>{
            if(col.columnId==action.columnId){
                console.log("in change ")
                col.show=!col.show;
            }
        })
    })

    onlyColumn.forEach(column=>{
        if(column.columnId==action.columnId){
            console.log("in change")
            column.show=!column.show;
        }
    })
    console.log(columns);
    console.log(onlyColumn);
    return Object.assign({},state, {columnList: columns,onlyColumnList:onlyColumn})
}

const loadOnlyColumn = (state,action)=>{
    console.log("columnList:")
    console.log(action.columnList);
    let newList=[...action.columnList]
    newList=newList.map(list=>{
        return{
            ...list,
            show:true
        }
    })
    return Object.assign({},state,{onlyColumnList: newList})
}

const addSuccess=(state,action)=>{
    let newList = [...state.columnList];
    newList.forEach(c=>{
        action.returnList.forEach(newc=>{
            c.column.push({
                ...newc,
                show:true
            })
        })
    })
    console.log(newList);
    return Object.assign({},state,{columnList:newList})
}

const ColumnReducer=(state=initialState,action)=>{
    switch (action.type){
        case actionType.load_Column_Successful: return loadColumnSuccessful(state,action);
        case actionType.load_Only_Column_Successful: return loadOnlyColumn(state,action);
        case actionType.change_show_column:return changeShowColumn(state,action);
        case actionType.add_successful: return addSuccess(state,action);
        default:
            return state;
    }
}



export default ColumnReducer;