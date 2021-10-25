import * as actionType from "../Action/ActionType"

const initialState={
    allResource:[],
    addedResource:[],
    currentProject:{},
    allProject:[]
}



const load_All_Resources=(state,action)=>{
    return Object.assign({},state,{allResource: action.allResource,addedResource: action.addedResource})
}

const load_All_Project_Success=(state,action)=>{
    console.log(action.projectList)
    console.log(action.projectList[0])
    return Object.assign({},state,{currentProject: action.projectList[0],allProject: action.projectList})
}

const ProjectReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionType.load_All_Resources_On_Project_Page_Success: return load_All_Resources(state,action);
        case actionType.load_All_Project_Success: return load_All_Project_Success(state,action);
        default:
            return state
    }
}

export default ProjectReducer;