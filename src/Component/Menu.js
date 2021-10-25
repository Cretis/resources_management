import React,{Component} from "react";
import {NavLink} from "react-router-dom";

class Menu extends Component{
    render() {
        return (
            <div className='menu'>
                <NavLink to="/resource">Resources</NavLink>
                <NavLink to="/project">Project</NavLink>
            </div>
        );
    }
}

export default Menu;