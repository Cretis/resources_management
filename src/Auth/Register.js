import React,{Component} from "react";
import Input from "../UI/Inpute/Input";
import {connect} from "react-redux";
import {register} from "./Action/AuthAction";


class Register extends Component{
    state={
        registerForm:{
            username:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Password'
                },
                value:'',
                validation:{
                    required: true
                },
                valid:false,
                touched:false
            },
            title:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Title'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false,
                hint:"email must follow the email format"
            },
            phone:{
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:'Your Phone number'
                },
                value:'',
                validation:{
                    required:true,
                    isNumeric:true,
                    maxLength:10,
                    minLength:10
                },
                valid:false,
                touched:false,
                hint:"Phone number must be 10 digits"
            }
        },
        formIsValid:false
    }

    onSubmitHandler=(event)=>{
        event.preventDefault();
        const registerInfo = {
            username:this.state.registerForm.username.value,
            password:this.state.registerForm.password.value,
            title:this.state.registerForm.title.value,
            email:this.state.registerForm.email.value,
            phone:this.state.registerForm.phone.value
        }

        this.props.register(registerInfo);
    }

    checkValidation(value,validation){
        let isValid = true;
        if(!validation){
            return true;
        }

        if(validation.required){
            isValid=value.trim()!==''&&isValid;
        }
        if(validation.maxLength){
            isValid=value.length<=validation.maxLength && isValid;
        }

        if(validation.minLength){
            isValid=value.length>=validation.minLength && isValid;
        }

        if(validation.isEmail){
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangeHandler=(event,id)=> {
        let registerForms = {...this.state.registerForm};
        let registerForm = {...registerForms[id]};
        registerForm.value = event.target.value;
        registerForm.valid = this.checkValidation(registerForm.value,registerForm.validation);
        registerForm.touched = true;
        registerForms[id]=registerForm;
        console.log("in input change")
        console.log(registerForm)
        let formValid = true;
        for(let key in registerForms){
            formValid= registerForms[key].valid && formValid;
        }
        this.setState({registerForm:{...registerForms},formIsValid:formValid})
    }


    render(){
        const formElementsArray=[];

        for(let key in this.state.registerForm){
            formElementsArray.push({
                id:key,
                config:this.state.registerForm[key]
            })
        }

        let form = (
            <form onSubmit={this.onSubmitHandler}>
                {
                    formElementsArray.map((element)=>(
                        <Input
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            validation={element.config.validation}
                            valid={element.config.valid}
                            touched={element.config.touched}
                            change={(event)=> this.inputChangeHandler(event,element.id)}
                            hint={element.config.hint}
                        />
                    ))
                }
                <button disabled={!this.state.formIsValid} type='submit'>Submit</button>
            </form>
        )
        return(
            <div>
                <h2>Enter your Information</h2>
                {form}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register:(registerData)=>dispatch(register(registerData))
    };
};

const mapStateToProps = state=>{
    return{
        registerSuccess:state.registerSuccess
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)