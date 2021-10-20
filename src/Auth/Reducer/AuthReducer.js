import * as actionTypes from'../Action/ActionType'


const initialState={
    token:null,
    username:null,
    registerSuccess:null,
    loginSuccess:false,
    err:null
}

const loginSuccess=(state,action)=>{
    return Object.assign({},state,{
        username:action.username,
        token:action.token,
        loginSuccess:true,
        registerSuccess: null})
}

const loginFail=(state,action)=>{
    return Object.assign({},state,{err:action.err,loginSuccess:false})
}

const registerSuccess = (state,action)=>{
    return Object.assign({},state,{registerSuccess:true})
}

const registerFail = (state,action)=>{
    return Object.assign({},state,{registerSuccess:false})
}

const reducer=(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.Login_Success:return loginSuccess(state,action);
        case actionTypes.Login_Fail:return loginFail(state,action);
        case actionTypes.Register_Success:return registerSuccess(state,action);
        case actionTypes.Register_Fail:return registerFail(state,action);
        default:
            return state;
    }

};

export default reducer;