import { DataStore } from '../data-store/data-store';
import { Product } from '../products/product';
import { CartController } from './cart-controller';

interface ProductBuffer {
	[ page: number ]: Promise<Product[]>
}

export class ShopController {

	init() {
		this._currentPage = 1
		this._productBuffer[ this._currentPage ] = DataStore.instance.getItems( this._currentPage )
		this._productBuffer[ this._currentPage + 1 ] = DataStore.instance.getItems( this._currentPage + 1 )
	}

	loadPrevPage() {
		return this.refreshBuffer( -1 )
	}

	loadNextPage() {
		return this.refreshBuffer( 1 )
	}

	private refreshBuffer( direction: number ) {
		if ( this._currentPage + direction > 0 ) {
			this._currentPage += direction
			if ( !this._productBuffer[ this._currentPage ] )
				this._productBuffer[ this._currentPage ] = DataStore.instance.getItems( this._currentPage )

			if ( !this._productBuffer[ this._currentPage -1 ] )
				this._productBuffer[ this._currentPage - 1 ] = DataStore.instance.getItems( this._currentPage - 1 )
		}

		return this._productBuffer[ this._currentPage ]
	}

	get productsCurrentPage() {
		return this._productBuffer[ this._currentPage ]
	}

	get currentPageIndex() {
		return this._currentPage
	}

	readonly cart: CartController = new CartController()
	private _productBuffer: ProductBuffer = {}
	private _currentPage: number = 1
}