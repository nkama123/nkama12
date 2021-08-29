import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className ="container-fluid">
            <nav className="navbar navbar-expand-lg bg-light col-md-12 mt-5 pt-8  ">
                <NavLink to ="/" className ="btn">
                    HOME
                </NavLink>

                <NavLink to ="/add" className ="btn">
                    ADD
                </NavLink>

                <NavLink to ="/about" className ="btn">
                    NEWSFEED
                </NavLink>



            </nav>
            
        </div>
    )
}

export default Header
