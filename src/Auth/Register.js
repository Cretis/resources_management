import React,{Component} from "react";
import Input from "../UI/Inpute/Input";


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
            }
        }
    }

    render(){
        const formElementsArray=[];

        let form = (
            <form>
                {
                    formElementsArray.map((element)=>(
                        <Input
                            key={element.id}
                            elementType={element.config.elementType}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            validation={element.config.validation}
                            valid={element.config.touched}
                            touched={element.config.touched}
                        />
                    ))
                }
            </form>
        )
        return(

        )
    }
}