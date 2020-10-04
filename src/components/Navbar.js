import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {Button} from './Button';

export default class Navbar extends Component {

    render() {

        return (
            <NavWrapper className='navbar navbar-expand-sm navbar-dark px-sm-5'>
                <ul className='navbar-nav align-items-center'>
                    <li className='nav-itm ml-5'></li>
                    <Link to='/' className='nav-link'>products</Link>
                </ul>
                <Link to='/cart' className='ml-auto'>
                    <Button id='cartbutton'>
                        <span className='mr-2'>
                            <i className='fas fa-cart-plus'/>
                        </span>
                        My Cart
                    </Button>
                </Link>
            </NavWrapper>

        );

    } 

}
//this is a part of styled components that u wrap around ur returned divs and is basically a stylesheet
const NavWrapper = styled.nav`
    background: var(--navBlue);
    .nav-link{
        color:var(--mainWhite)!important;
        font-size:1.3rem;
        text-transform: capitalize;
    }
    #cartbutton {
        color: white;
        border: 1px solid white;
    }
    #cartbutton:hover {
        background-color: transparent;
        border: 1px solid black;
    }
`