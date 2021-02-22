import React, { Component } from 'react';
import { Heart } from '../../components.tsx/heart';
import { ShopController } from '../../shop/shop-controller';
import { Product, PropChangeCallback, PropChangeEvent } from '../product';
import './product-card.scss'

interface ProductCardProps {
	product: Product
	shopController: ShopController
}

interface ProductCardState extends Pick<PropChangeEvent<Product>,'favorite' | 'stock'> {}

export class ProductCard extends Component<ProductCardProps, ProductCardState> {
	constructor( props: ProductCardProps ) {
		super( props ) 

		this.state = {
			favorite: props.product.favorite,
			stock: props.product.stock
		}
	}

	componentDidMount() {
		this.propOnChangeObserver = this.props.product.onChange( productProp =>{
			this.setState( productProp )
		})
	}

	componentWillUnmount() {
		this.props.product.removeOnChange( this.propOnChangeObserver )
	} 

	render() {
		const { shopController, product } = this.props
		const { image_url, stock,	productName, price, productDescription, favorite } = product

		return (
			<div className="product-card">
				<Heart selected={ favorite } 
					onClick={ selected => this.props.product.favorite = selected }
				/>
				<img src={ image_url }/>

				<h3>{productName}</h3>
				<strong>${ price }</strong>
				<p className="description">{ productDescription }</p>
				<p>{ stock? `${ stock } left` : 'Out of stock' }</p>
				<button onClick={ ()=>shopController.cart.add( product ) }>
					+ Add
				</button>
			</div>
		)
	}

	private propOnChangeObserver: PropChangeCallback<Product>
}