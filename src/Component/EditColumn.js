import React,{Component} from "react";
import {connect} from "react-redux";
import {loadProjectColumn, changeShowStatus, addColumns} from "../Action/ColumnAction";
import AddColumn from "./EditColumn/AddColumn"
import {Link, NavLink, Redirect} from "react-router-dom";
import "./EditColumn.css"


class EditColumn extends Component{
    constructor(props) {
        super(props);

        this.state={
            key:0,
            keys:[],
            submitList:[]
        }
        this.checkBoxOnClickHandler=this.checkBoxOnClickHandler.bind(this);
        this.addClickHandler=this.addClickHandler.bind(this);
        this.selectShowChangeHandler=this.selectShowChangeHandler.bind(this);
        this.selectHideChangeHandler=this.selectHideChangeHandler.bind(this);
        this.submitClickHandler=this.submitClickHandler.bind(this);
        this.inputChangeHandler=this.inputChangeHandler.bind(this);
    }

    componentDidMount() {
        if(this.props.columnList.length===0){
            this.props.loadColumn(this.props.currentProject);
        }
    }

    checkBoxOnClickHandler=(event)=>{
        console.log(event.target.getAttribute('data-id'))
        this.props.changeShow(event.target.getAttribute('data-id'));
    }

    addClickHandler =()=>{
        let newKeys = [
            ...this.state.keys
        ]
        newKeys.push({num:this.state.key+1,show:false});
        this.setState({keys:newKeys,key:this.state.key+1})
    }

    selectShowChangeHandler=(id)=>{
        let list = [...this.state.keys]
        console.log(list)
        list.forEach(n=>{
            if(n.num==id){
                console.log("in ===")
                n.show=true;
            }
        })
        console.log(list)
        this.setState({keys:list});
    }

    selectHideChangeHandler=(id)=>{
        let list = [...this.state.keys]
        list.forEach(n=>{
            if(n.num==id){
                n.show=false;
            }
        })
        this.setState({keys:list});
    }

    inputChangeHandler=(columnName)=>{
        console.log(columnName)
        let list = [...this.state.submitList]
        list.push(columnName)
        this.setState({submitList:list})
        console.log(this.state.submitList)
    }

    submitClickHandler=()=>{
        this.props.addColumn(this.state.submitList,this.props.currentProject)
        this.setState({submitList:[]})

    }

    render() {
        return (
            <div style={{marginLeft:"20%",marginRight:"20%"}}>
                <div style={{marginTop:"10%"}}>
                    <table className="EditTb">
                        <thead>
                        <tr>
                            <th colSpan="2">Project Scope Fields</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.columnList.map(resource=>{
                                return(
                                    <tr>
                                        <td>
                                            {resource.columnName}
                                        </td>
                                        <td><input type="checkbox" defaultChecked={resource.show} onClick={this.checkBoxOnClickHandler} data-id={resource.columnId}/></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                        <AddColumn
                            addClick={this.addClickHandler}
                            times={this.state.keys}
                            show={this.selectShowChangeHandler}
                            hide={this.selectHideChangeHandler}
                            inputChange={this.inputChangeHandler}
                        />
                </div>
                <div style={{marginTop:"10px"}}>
                    <button style={{float:"right",marginTop:"10px"}} onClick={this.submitClickHandler}><NavLink to="/column">SAVE</NavLink></button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return{
        resourceList:state.col.columnList,
        currentProject: state.pro.currentProject,
        columnList:state.col.onlyColumnList
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        changeShow:(columnId)=>dispatch(changeShowStatus(columnId)),
        loadColumn:(project)=>dispatch(loadProjectColumn(project)),
        addColumn:(resourceList,projectId)=>dispatch(addColumns(resourceList,projectId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditColumn)