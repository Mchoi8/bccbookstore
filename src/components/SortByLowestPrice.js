import React, { Component } from 'react';
import {ProductConsumer} from '../context';
import Product from './Product';
import {Link} from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Title from './Title';


export default class SortByLowestPrice extends Component {

    render() {
        
        return (
            <React.Fragment>
                <div className='py-5'>
                    <div className='container'>
                        <Title name='Berean' title='Book Store'/>


                        <div className='filtering'>
                        
                        <DropdownButton id='dropitdown' className='filter-btn' title="Filter By">
                            <Dropdown.Item><Link className='filterlinks' to='/sortbyhighestprice'>Price: Highest to Lowest</Link> </Dropdown.Item> 
                            <Dropdown.Item><Link className='filterlinks' to='/sortbylowestprice'>Price: Lowest to Highest </Link></Dropdown.Item> 
                            <Dropdown.Item><Link className='filterlinks' to='/sortbycorebooks'>Core Books </Link></Dropdown.Item> 
                        </DropdownButton>

                        </div>


                        <div className='row'>
                            <ProductConsumer>
                                
                                {value => {

                                        return value.productsByLowest.map( product => {
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