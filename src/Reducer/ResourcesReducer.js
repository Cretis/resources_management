import * as actionType from "../Action/ActionType"

const initialState = {
    allResources:[
        {
            id:null,
            name:null,
            columns:[]
        }
    ],
    hideResources:[]
}

const loadSuccess=(state,action)=>{
    console.log("action.resources:")
    console.log(action.resources)
    return Object.assign({},state,{allResources:action.resources})
}

const addColumnValueSuccess=(state,action)=>{
    state.allResources.forEach(resource=>{
        if(resource.id===action.updateResource.resourceId){
            resource.columns.forEach(column=>{
                if(column.columnId===action.updateResource.columnId){
                    column.columnValue=action.updateResource.value
                }
            })
        }
    })
    return state;
}

const search = (state,action)=>{
    const searchValue = action.searchValue;
    let allResources = [...state.allResources];
    let hideResources = [...state.hideResources];
    allResources.forEach(resource=>{
        if(resource.name.search(searchValue)===-1&&searchValue!==""){
            hideResources.push(resource);

        }
    })
    // console.log("hideResources:")
    // console.log(hideResources)

    allResources=allResources.filter(resource =>{
        return resource.name.search(searchValue)!==-1||searchValue==="";
    })


    hideResources.forEach(resource=>{
        if(resource.name.search(searchValue)!==-1||searchValue===""){
            allResources.push(resource);
        }
    })

    hideResources = hideResources.filter(resource=>{
        return resource.name.search(searchValue)===-1&&searchValue!=="";
    })
    // console.log("allResource:")
    // console.log(allResources)
    return Object.assign({},state,{allResources:allResources.sort((a,b)=>{return a.id-b.id}),hideResources:hideResources});
}

const ResourceReducer = (state=initialState,action)=>{
    switch (action.type){
        case actionType.load_Success:return loadSuccess(state,action);
        case actionType.add_Column_Value_Success:return addColumnValueSuccess(state,action);
        case actionType.Search:return search(state,action);
        default:
            return state;
    }
}

export default ResourceReducer;