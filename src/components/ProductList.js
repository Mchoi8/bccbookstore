import React, { Component } from 'react';
import Product from './Product';
import Title from './Title';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default class ProductList extends Component {

    state = {
        filterState: ''
    }


    highestPrice = () => {
        this.setState( () => {
            return {filterState: 'highestPrice'}
        })
    }

    lowestPrice = () => {
        this.setState( () => {
            return {filterState: 'lowestPrice'}
        })
    }

    coreBooks = () => {
        this.setState( () => {
            return {filterState: 'coreBooks'}
        })
    }


    render() {
        
        return (
            <React.Fragment>
                <div className='py-5'>
                    <div className='container'>
                        <Title name='Berean' title='Book Store'/>


                        <div className='filtering'>
                        
                        <DropdownButton id='dropitdown' className='filter-btn' title="Filter By">
                            <Dropdown.Item  href='/sortbyhighestprice' >Price: Highest to Lowest</Dropdown.Item>
                            <Dropdown.Item href='/sortbylowestprice'>Price: Lowest to Highest</Dropdown.Item>
                            <Dropdown.Item onClick={ () => this.coreBooks() }>Core Books</Dropdown.Item>
                        </DropdownButton>

                        </div>


                        <div className='row'>
                            <ProductConsumer>
                                
                                {value => {

                                        return value.products.map( product => {
                                            return <Product key={product.id} 
                                            product={product} />
                                        })
                                    }
                                }
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )

    } 


}