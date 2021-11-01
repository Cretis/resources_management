import axios from "axios";
import * as actionTypes from'./ActionType'


export const loginSuccess=(jwtToken,username,timeCreated)=>{
    return {
        type:actionTypes.Login_Success,
        token:jwtToken,
        username:username,
        timeCreated:timeCreated
    };
};

export const loginError = (err)=>{
    return{
        type:actionTypes.Login_Fail,
        err:err
    };
};

export const login = (username,password)=>{
    return dispatch=>{
        const loginData ={
            username:username,
            password:password
        }
        const url='http://localhost:8080/user/login'
        axios.post(url,loginData).then(response=>{
            console.log(response);
            const jwt = response.data.jwt;
            localStorage.removeItem("token");
            localStorage.setItem("token",jwt);
            localStorage.setItem("username",username);
            const timeCreated = response.data.time
            dispatch(loginSuccess(jwt,username,timeCreated));
        }).catch(err=>{
            dispatch(loginError(err))
        })
    };
};

export const registerSuccess = ()=>{
    return{
        type:actionTypes.Register_Success
    };
};

export const registerFail=()=>{
    return{
        type:actionTypes.Register_Fail
    };
};

export const register = (userData)=>{
    return dispatch=>{
        const url='http://localhost:8080/user/create'
        axios.put(url,userData).then(response=>{
            console.log(response);
            dispatch(registerSuccess());
        }).catch(err=>{
            console.log(err);
            dispatch(registerFail());
        })
    }
}

export const signOut = ()=>{
    return{
        type:actionTypes.sign_out
    }
}
