import React,{Component} from "react";
import {connect} from "react-redux";
import {loadAll, loadProject} from "../Action/ProjectAction";
import AllResources from "./Project/AllResources";
import AddResources from "./Project/AddResources";

class Project extends Component{
    constructor(props) {
        super(props);

        this.state={
            checkBoxSelectList:[],
            willAddResource:[]
        }
        this.checkBoxClickHandler = this.checkBoxClickHandler.bind(this);
        this.addClickHandler=this.addClickHandler.bind(this);
    }

    componentDidMount() {
        this.props.loadProject(this.props.username);
    }

    addClickHandler=(event)=>{
        this.setState({willAddResource:this.state.checkBoxSelectList});
    }

    checkBoxClickHandler=(event)=>{
        if(event.target.value===true){
            this.setState({checkBoxSelectList:[
                ...this.state.checkBoxSelectList,
                    {
                        projectId:event.target.getAttribute("data-id"),
                        projectName:event.target.getAttribute("data-name")
                    }
                ]})
        }else {
            let checkBoxSelect = this.state.checkBoxSelectList;
            for(let key in checkBoxSelect){
                if(checkBoxSelect[key].projectId===event.target.getAttribute("data-id")){
                    checkBoxSelect.splice(key,1);
                }
            }
            this.setState({checkBoxSelectList:checkBoxSelect})
        }
    }

    trashOnClick=(event)=>{

    }

    render() {
        console.log("in render")
        console.log(this.props.allResource)
        return(
            <div>
                <h1>{this.props.project.projectName}</h1>
                <AllResources
                    allResource = {this.props.allResource}
                    checkBoxOnClick={this.checkBoxClickHandler}
                    addOnClick={this.addClickHandler}
                /><AddResources
                    addedResource={this.props.addedResource}
                    willaddedResource={this.state.willAddResource}
                />
            </div>
        )
    }

}

const mapStateToProps=state=>{
    return{
        username:state.auth.username,
        project:state.pro.currentProject,
        allResource: state.pro.allResource,
        addedResource:state.pro.addedResource
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        loadProject:(username)=>dispatch(loadProject(username)),
        loadAll:(projectId)=>dispatch(loadAll(projectId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Project)