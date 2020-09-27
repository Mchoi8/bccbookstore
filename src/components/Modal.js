import React, { Component } from 'react';
import styled from 'styled-components';
import {ProductConsumer} from '../context';
import {Button} from './Button';
import {Link} from 'react-router-dom';

export default class Modal extends Component {

    render() {

        return (
            <ProductConsumer>
                {(value) => {
                    const {modalOpen, closeModal, addToCart, handleDetail} = value;
                    const {img, title, id, price, inCart} = value.modalProduct;

                    if(!modalOpen ) {
                        return null;
                    } else {
                        return (
                        <ModalContainer>
                            <div className='container'>
                                <div className='row'>
                                    <div id='modal' className='col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-3'>
                                        <a href="#" class="close" onClick={() => closeModal()}></a>
                                        <h5>Item added to the cart</h5>
                                        <img src={img} id='image' className='img-fluid' alt='product' width='200px' height='200px'/>
                                        <h5>{title}</h5>
                                        <h5 className='text-muted'>price: $ {price}</h5>
                                        <Link to='/details'><Button onClick={() => handleDetail(id)} >Details Page</Button></Link>
                                        <Link to='/'><Button cart disabled={inCart ? true : false} onClick={() => addToCart(id)} >
                                            { inCart ? 'In Cart' : 'Add to Cart'}
                                            </Button></Link>
                                    </div>
                                </div>
                            </div>
                        </ModalContainer>
                        )};
                     
                }}
            </ProductConsumer>

        )

    } 


}

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    #modal {
        background: var(--mainWhite);
    }
    #image {
        margin: 15px
    }
    .close {
        position: absolute;
        right: 32px;
        top: 32px;
        width: 32px;
        height: 32px;
        opacity: 0.5;
      }
      .close:hover {
        opacity: 1;
      }
      .close:before, .close:after {
        position: absolute;
        left: 15px;
        top: -10px;
        content: ' ';
        height: 15px;
        width: 1.5px;
        background-color: #333;
      }
      .close:before {
        transform: rotate(45deg);
      }
      .close:after {
        transform: rotate(-45deg);
      }      
`;