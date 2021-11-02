import React,{Component} from "react";
import {connect} from "react-redux";
import {loadALlColumns} from "../Action/ColumnAction";
import ResourceTable from "./Column/ResourceTable";
import {addColumnValue} from "../Action/ResourcesAction";
import {NavLink} from "react-router-dom";


class Column extends Component{
    constructor(props) {
        super(props);

        this.state={
            resourceList:null,
            changedValue:{}
        }
        this.onBlurHandler=this.onBlurHandler.bind(this);
        this.onChangeHandler=this.onChangeHandler.bind(this);
    }

    componentDidMount() {
        console.log("in component did mount")
        console.log(localStorage.getItem('project'))
        this.props.loadColumn(this.props.currentProject);

        // this.props.loadColumn(this.props.currentProject);
        // console.log("after load")
        // console.log(this.props.columnResourceList)
    }

    onBlurHandler=(event)=>{
        console.log(this.state.changedValue)
        this.props.addColumnValue(this.state.changedValue.resourceId,this.state.changedValue.columnId,this.state.changedValue.columnValue);
    }

    onChangeHandler=(resourceId,columnId,columnValue)=>{
        this.setState({
            changedValue: {
                resourceId: resourceId,
                columnId: columnId,
                columnValue: columnValue
            }
        });
    }

    render() {
        return(
            <div style={{float:"left",width:"80%"}}>
                <ResourceTable
                    resourceList={this.props.columnResource}
                    onBlur={this.onBlurHandler}
                    onChange={this.onChangeHandler}
                />
                <NavLink to="/EditColumn">Edit Quantity Survey Template</NavLink>
            </div>

        )
    }
}

const mapStateToProps = state=>{
    return{
        currentProject: state.pro.currentProject,
        columnResource:state.col.columnList,
        change:state.change
    }
}

const mapDispatchToProps= dispatch=>{
    return{
        loadColumn:(project)=>dispatch(loadALlColumns(project)),
        addColumnValue:(resourceId, columnId, value) => dispatch(addColumnValue(resourceId, columnId, value)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Column)