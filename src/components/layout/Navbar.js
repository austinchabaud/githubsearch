import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.min.css';

export class Navbar extends Component {
    render() {
        return (
            <nav className="navbar bg-primary">
                <h1>
                <i class="fa fa-github"></i> Navbar
       </h1>
            </nav>
        )
    }
}

export default Navbar
