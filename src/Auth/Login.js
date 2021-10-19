import React,{Component} from "react";
import {connect} from "react-redux";

class Login extends Component{
    constructor(props) {
        super(props);

        this.state={
            username:'',
            password:'',
            touched:{
                username:false,
                password:false
            },
            disabled:true
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onSubmitHandler= this.onSubmitHandler.bind(this);
    }

    validate = (username,password)=>{
        return{
            username:username.length===0,
            password:password.length===0
        }
    }

    onChangeHandler(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    onBlurHandler=(field)=>(event)=>{
        this.setState({
            touched:{...this.state.touched,[field]:true}
        });
    }

    onSubmitHandler(event){
        event.preventDefault();

        const {username,password} = this.state;
        this.props.login(username,password);
    }

    render() {
        const {username,password} = this.state;
        const hasError = this.validate(username,password);

        const showError = (field)=>{
            const error = hasError[field];
            const shouldShow = this.state.touched[field];
            return error? shouldShow:false;
        }

        return(
            <div>
            <form onSubmit={this.onSubmitHandler}>
                <div>
                <input
                    type="text"
                    className={"input_form"+(showError('username')? "error":"")}
                    id="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeHandler}
                    onBlur={this.onBlurHandler('username')}
                />
                </div>
                <div>
                    <input
                        type="text"
                        className={"input_form"+(showError('password'?"error":""))}
                        id="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        onBlur={this.onBlurHandler('password')}
                    />
                </div>
                <button disabled={!hasError['username']&&!hasError['password']} type="submit">Login</button>
            </form>
            </div>
        )
    }
}

const mapDispatchToProps= dispatch =>{
    return{
        login:(username,password)=>dispatch(login(username,password))
    }
}

export default connect(null,mapDispatchToProps)(Login);