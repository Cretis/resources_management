import React,{Component} from "react";
import {connect} from "react-redux";
import {addResource, loadAll, loadProject,deleteFromTable,deleteResource} from "../Action/ProjectAction";
import AllResources from "./Project/AllResources";
import AddResources from "./Project/AddResources";

class Project extends Component{
    constructor(props) {
        super(props);

        this.state= {
            checkBoxSelectList: [],
            willAddResource: [],
            cancelCheckBoxSelectList: [],
            willDeleteResource: [],
            deleteCheckBoxSelectList: [],
        }
        this.checkBoxClickHandler = this.checkBoxClickHandler.bind(this);
        this.addClickHandler=this.addClickHandler.bind(this);
        this.deleteClickHandler=this.deleteClickHandler.bind(this);
        this.addResourcesTableCheckBoxClickHandler=this.addResourcesTableCheckBoxClickHandler.bind(this);
        this.submitOnClick=this.submitOnClick.bind(this);
        this.deleteCheckBoxClickHandler=this.deleteCheckBoxClickHandler.bind(this);
    }

    componentDidMount() {
        this.props.loadProject(localStorage.getItem("username"));
    }

    addClickHandler=(event)=>{
        this.setState({willAddResource:this.state.checkBoxSelectList});
    }

    deleteClickHandler=(event)=>{
        const willAdd = this.state.willAddResource;
        let deleteList=[];
        for(let key in willAdd){
            this.state.cancelCheckBoxSelectList.forEach(resource=>{
                if(willAdd[key].resourceId===resource.resourceId){
                    deleteList.push(key);
                }
            })
        }
        deleteList.forEach(key=>{
            willAdd.splice(key,1);
        })
        this.setState({willAddResource:willAdd,cancelCheckBoxSelectList:[]});
        console.log("in click handler")
        console.log(this.state.deleteCheckBoxSelectList)
        this.props.deleteFromTable(this.state.deleteCheckBoxSelectList);
        this.setState({willDeleteResource:this.state.deleteCheckBoxSelectList})
    }

    checkBoxClickHandler=(event)=>{
        if(event.target.checked===true){
            this.setState({checkBoxSelectList:[
                ...this.state.checkBoxSelectList,
                    {
                        resourceId:event.target.getAttribute("data-id"),
                        resourceName:event.target.getAttribute("data-name")
                    }
                ]})
            console.log("in check box true")
            console.log(this.state.checkBoxSelectList)
        }else {
            let checkBoxSelect = this.state.checkBoxSelectList;
            for(let key in checkBoxSelect){
                if(checkBoxSelect[key].resourceId===event.target.getAttribute("data-id")){
                    checkBoxSelect.splice(key,1);
                }
            }
            console.log("in checkbox false")
            console.log(checkBoxSelect)
            this.setState({checkBoxSelectList:checkBoxSelect})
        }
    }

    addResourcesTableCheckBoxClickHandler=(event)=>{
        console.log("in add check box click")
        console.log(event)
        if(event.target.checked===true){
            this.setState({cancelCheckBoxSelectList:[
                    ...this.state.cancelCheckBoxSelectList,
                    {
                        resourceId:event.target.getAttribute("data-id"),
                        resourceName:event.target.getAttribute("data-name")
                    }
                ]});
        }else {
            let checkBoxSelect = this.state.cancelCheckBoxSelectList;
            for(let key in checkBoxSelect){
                if(checkBoxSelect[key].resourceId===event.target.getAttribute("data-id")){
                    checkBoxSelect.splice(key,1);
                }
            }
            console.log("in add checkbox false")
            this.setState({cancelCheckBoxSelectList:checkBoxSelect})
        }
    }

    deleteCheckBoxClickHandler=(event)=>{
        if(event.target.checked===true){
            this.setState({deleteCheckBoxSelectList:[
                    ...this.state.deleteCheckBoxSelectList,
                    {
                        resourceId:event.target.getAttribute("data-id"),
                        resourceName:event.target.getAttribute("data-name")
                    }
                ]});
        }else {
            let checkBoxSelect = this.state.deleteCheckBoxSelectList;
            for(let key in checkBoxSelect){
                if(checkBoxSelect[key].resourceId===event.target.getAttribute("data-id")){
                    checkBoxSelect.splice(key,1);
                }
            }
            console.log("in add checkbox false")
            this.setState({deleteCheckBoxSelectList:checkBoxSelect})
        }
    }

    submitOnClick=(event)=>{
        console.log("in submit click")
        console.log(this.state.willDeleteResource)
        this.props.deleteResource(this.state.willDeleteResource,this.props.project.projectId);

        this.props.addResource(this.state.willAddResource,this.props.project.projectId);
        this.setState({willAddResource:[]});
    }

    render() {
        console.log("in render")
        console.log(this.props.allResource)
        return(
            <div>
                <h1>{this.props.project.projectName}</h1>
                <div>
                    <AllResources
                        allResource = {this.props.allResource}
                        checkBoxOnClick={this.checkBoxClickHandler}
                        addOnClick={this.addClickHandler}
                    /><AddResources
                    addedResource={this.props.addedResource}
                    willaddedResource={this.state.willAddResource}
                    onDeleteClick ={this.deleteClickHandler}
                    checkBoxOnClick={this.addResourcesTableCheckBoxClickHandler}
                    deleteCheckBoxClick={this.deleteCheckBoxClickHandler}
                />
                </div>
                <div><button onClick={this.submitOnClick}>submit</button></div>
            </div>
        )
    }

}

const mapStateToProps=state=>{
    return{
        username:state.auth.username,
        project:state.pro.currentProject,
        allResource: state.pro.allResource,
        addedResource:state.pro.addedResource,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        loadProject:(username)=>dispatch(loadProject(username)),
        loadAll:(projectId)=>dispatch(loadAll(projectId)),
        addResource:(resources,projectId)=>dispatch(addResource(resources,projectId)),
        deleteFromTable:(resourceList)=>dispatch(deleteFromTable(resourceList)),
        deleteResource:(resourceList,projectId)=>dispatch(deleteResource(resourceList,projectId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Project)