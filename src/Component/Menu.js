import React,{Component} from "react";
import {NavLink} from "react-router-dom";
import "./Menu.css"

class Menu extends Component{
    constructor(props) {
        super(props);

        this.state={
            enter:false
        }
        this.mouseEnter= this.mouseEnter.bind(this)
        this.mouseLeave=this.mouseLeave.bind(this)
    }

    mouseEnter=()=>{
        this.setState({enter:true})
    }

    mouseLeave=()=>{
        this.setState({enter:false})
    }

    render() {
        return (
            <div onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                <div className={this.state.enter? 'menuShow':'menuHide'} >
                    <NavLink className={this.state.enter? 'linkShow':'linkHide'} to="/resource">Resources</NavLink>
                    <NavLink className={this.state.enter? 'linkShow':'linkHide'} to="/project">Project</NavLink>
                    <NavLink className={this.state.enter? 'linkShow':'linkHide'} to="/column">Column</NavLink>
                </div>
                <button style={{display:"inline"}}>></button>
            </div>

        );
    }
}

export default Menu;