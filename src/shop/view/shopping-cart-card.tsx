import React, { Component } from 'react';
import { PropChangeEvent, Product, PropChangeCallback } from '../../products/product';
import { ShopController } from '../shop-controller';
import { CartItem } from '../cart-controller';
import './shopping-cart-card.scss'

interface ShoppingCartCardProps {
	item: CartItem
	shopController: ShopController
}

interface ShoppingCartCardState extends Pick<PropChangeEvent<Product>, 'stock'> {}

export class ShoppingCartCard extends Component<ShoppingCartCardProps, ShoppingCartCardState> {
	constructor( props: ShoppingCartCardProps ) {
		super( props ) 

		this.state = {
			stock: props.item.product.stock
		}
	}

	componentDidMount() {
		const { cart } = this.props.shopController
		this.cartOnChangeObserver = cart.onChange( productProp =>{
			this.setState({})
		})
	}

	componentWillUnmount() {
		this.props.shopController.cart.removeOnChange( this.cartOnChangeObserver )
	} 

	render() {
		const { shopController, item } = this.props
		const { image_url, productName, price } = item.product

		return (
			<div className="shopping-cart-card">
				<img src={ image_url }/>
				<h3>{productName}</h3>
				<strong>${ price }</strong>
				<button 
					onClick={ ()=> shopController.cart.modifyAmount( item.product, -1 ) }
				>
					-
				</button>
				{ item.amount }
				<button 
					onClick={ ()=> shopController.cart.modifyAmount( item.product, 1 ) }
				>
					+
				</button>
			</div>
		)
	}

	private cartOnChangeObserver: PropChangeCallback<CartItem>
}