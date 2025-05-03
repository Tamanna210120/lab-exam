import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">Tamanna</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link to="/item-1">
                                <a>Item 1</a>
                            </Link>
                        </li>
                        <li><Link to="/item-2">
                                <a>Item 2</a>
                            </Link></li>
                        <li><Link to="/item-3">
                                <a>Item 3</a>
                            </Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <a className="btn">Button</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;