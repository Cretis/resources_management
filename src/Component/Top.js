import React,{Component} from "react";
import {connect} from "react-redux";
import {signOut} from "../Auth/Action/AuthAction";
import "./Top.css"

class Top extends Component{
    constructor(props) {
        super(props);

        this.state={
            show:false,
        }
        this.onClickHandler=this.onClickHandler.bind(this);
        this.ButtonOnClickHandler=this.ButtonOnClickHandler.bind(this)
    }

    onClickHandler=()=>{
        this.setState({show:!this.state.show})
    }

    ButtonOnClickHandler=()=>{
        this.onClickHandler();
        this.props.signOut();
    }

    render() {
        return(
            <div className='back' >
                <i className={"bi-file-person"} onClick={this.onClickHandler} style={{cursor:"pointer",float:"right"}}/>
                <div className={this.state.show? "show":"hide"}>
                    <div style={{background:'black',}}>
                        <div style={{color: 'white'}}>Member start at:</div>
                        <div style={{color: 'white'}}>{this.props.time}</div>
                    </div>
                    <button className="butt" onClick={this.ButtonOnClickHandler} >sign out</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps=state=>{
   return{
        time:state.auth.createdTime,
   }
}

const mapDispatchToProps=dispatch=>{
   return{
        signOut:()=>dispatch(signOut())
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Top)