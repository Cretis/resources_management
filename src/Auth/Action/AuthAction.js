import axios from "axios";
import * as actionTypes from'./ActionType'


export const loginSuccess=(jwtToken,username)=>{
    return {
        type:actionTypes.Login_Success,
        token:jwtToken,
        username:username
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
            const jwt = response.data
            dispatch(loginSuccess(jwt,username))
        }).catch(err=>{
            dispatch(loginError(err))
        })
        // return axios({
        //     url:url,
        //     method:'post',
        //     params:loginData
        // }).then(response=>{
        //     console.log(response);
        //     const jwt = response.data
        //     dispatch(loginSuccess(jwt,username))
        //
        // }).catch(err=>{
        //     dispatch(loginError(err))
        // })
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
