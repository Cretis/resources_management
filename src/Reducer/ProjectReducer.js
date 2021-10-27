import * as actionType from "../Action/ActionType"

const initialState={
    allResource:[],
    addedResource:[],
    currentProject:{},
    allProject:[]
}



const load_All_Resources=(state,action)=>{
    console.log("inReducer")
    console.log()
    console.log(action.allResource)
    console.log(action.allResource[0])
    return Object.assign({},state,{allResource: action.allResource,addedResource: action.addedResource})
}

const load_All_Project_Success=(state,action)=>{
    console.log(action.projectList)
    console.log(action.projectList[0])
    return Object.assign({},state,{currentProject: action.projectList[0],allProject: action.projectList})
}

const deleteFromTable=(state,action)=>{
    console.log("in delete reducer")
    const currentList = state.addedResource;
    console.log(currentList)
    console.log(action.resourceList)
    for(let key in currentList){
        console.log("in for loop")
        action.resourceList.forEach(resource=>{
            console.log(currentList[key].id)
            console.log(resource.resourceId)
            if(currentList[key].id==resource.resourceId){
                console.log("in ===")
                currentList.splice(key,1);
            }
        })

    }
    console.log(currentList)
    return Object.assign({},state,{addedResource: currentList})
}

const ProjectReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionType.load_All_Resources_On_Project_Page_Success: return load_All_Resources(state,action);
        case actionType.load_All_Project_Success: return load_All_Project_Success(state,action);
        case actionType.delete_from_table: return deleteFromTable(state,action);
        default:
            return state
    }
}

export default ProjectReducer;