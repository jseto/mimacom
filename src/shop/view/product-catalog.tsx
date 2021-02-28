import React, { Component } from 'react';
import { InfiniteScroll } from '../../components/infinite-scroll';
import { Product } from '../../products/product';
import { ProductCard } from '../../products/view/product-card';
import { ShopController } from '../../shop/shop-controller';
import './product-catalog.scss'

interface ProductCatalogState {
	productList: Product[]
}

interface ProductCatalogProps {
	shopController: ShopController
}

export class ProductCatalog extends Component<ProductCatalogProps, ProductCatalogState> {
	constructor( props ) {
		super( props )
		this.state = { 
			productList: []
		}
	}

	async componentDidMount() {
		this.props.shopController.init()

		this.setState({
			productList: await this.props.shopController.productsCurrentPage
		})
	}

	async nextPage() {
		const {shopController} = this.props
		const newData = await shopController.loadNextPage()

		this.setState( prevState =>({
			productList: [ ...prevState.productList, ...newData ]
		}))
	}

	render() {
		const { productList } = this.state
		const { shopController } = this.props

		return (
			<div className="product-catalog">
				<InfiniteScroll 
					onBottomReached={ ()=>this.nextPage() } 
				>
					<div className="products">
						{
							productList?.map( item => (
								<ProductCard key={ item.id} 
									product={ item } 
									shopController={ shopController }
								/>
							))
						}
					</div>
				</InfiniteScroll>
			</div>
		)
	}
}
