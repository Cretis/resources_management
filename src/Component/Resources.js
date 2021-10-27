import React, {Component} from "react";
import {connect} from "react-redux";
import ProductTable from "./Resource/ProductTable"
import {
    loadAllResources,
    addColumnValue,
    search,
    addColumnName,
    updateColumnName,
    deleteColumn,
    addRow
} from "../Action/ResourcesAction";
import SearchBar from "./Resource/SearchBar";
import AddRow from "./Resource/AddRow";


class Resources extends Component {
    constructor(props) {
        super(props);

        this.state = {
            updateResource: {
                resourceId: null,
                columnId: null,
                columnValue: null
            },
            columnName: null,
            searchContent: '',
            show: false,
            showAddRow:false
        }
        this.onBlurHandler = this.onBlurHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.searchBarChangeHandler = this.searchBarChangeHandler.bind(this)
        this.buttonClickHandler = this.buttonClickHandler.bind(this)
        this.showAddRowHandler=this.showAddRowHandler.bind(this)
    }

    componentDidMount() {
        this.props.loadResources();
        // console.log("resources after mount:")
        // console.log(this.props.resources);
    }

    onChangeHandler(resourceId, columnId, columnValue) {
        // console.log("onchangeHandler:");
        // console.log(resourceId);
        this.setState({
            updateResource: {
                resourceId: resourceId,
                columnId: columnId,
                columnValue: columnValue
            }
        });
        console.log(this.state)
    }

    onBlurHandler() {
        // console.log("onBlurHandler:")
        // console.log(this.state.updateResource)
        this.props.addCValue(this.state.updateResource.resourceId, this.state.updateResource.columnId, this.state.updateResource.columnValue);
    }

    searchBarChangeHandler(searchValue) {
        this.props.searchBar(searchValue);
    }

    buttonClickHandler = () => {
        this.setState({
            show: !this.state.show
        })
    }

    showAddRowHandler(){
        this.setState({
            showAddRow: !this.state.showAddRow
        })
    }


    render() {
        console.log("renderParents")
        console.log(this.state.show)
        console.log(this.props.resources[0])
        return (
            <div>
                <SearchBar
                    onChange={this.searchBarChangeHandler}
                    classN={this.state.show}
                    buttonClick={this.buttonClickHandler}
                    addColumnName={this.props.addCName}
                    showAddRow = {this.showAddRowHandler}
                />
                <ProductTable
                    resources={this.props.resources}
                    onChange={this.onChangeHandler}
                    onBlur={this.onBlurHandler}
                    updateColumnName={this.props.updateCName}
                    deleteColumn={this.props.deleteC}
                />
                <AddRow
                    showAddRow = {this.state.showAddRow? "showr":"hider"}
                    hideAddRow = {this.showAddRowHandler}
                    addRow = {this.props.addRow}
                />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        resources: state.res.allResources
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadResources: () => dispatch(loadAllResources()),
        addCValue: (resourceId, columnId, value) => dispatch(addColumnValue(resourceId, columnId, value)),
        searchBar: (searchValue) => dispatch(search(searchValue)),
        addCName: (columnName) => dispatch(addColumnName(columnName)),
        updateCName: (columnId, columnName) => dispatch(updateColumnName(columnId, columnName)),
        deleteC: (columnId) => dispatch(deleteColumn(columnId)),
        addRow:(resourceId,resourceName)=>dispatch(addRow(resourceId,resourceName))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Resources);