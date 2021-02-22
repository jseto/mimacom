import { DataStore } from '../data-store/data-store';
import { Product } from '../products/product';
import { CartController } from './cart-controller';


export class ShopController {
	async init() {
		this._currentPage = 1
		this._productBuffer = await DataStore.instance.getItems( this._currentPage )
	}

	async loadPrevPage() {
		if ( this._currentPage > 1) {
			--this._currentPage
			const newPage = await DataStore.instance.getItems( this._currentPage )

			this._productBuffer = newPage
		}

		return this._productBuffer
	}

	async loadNextPage() {
		const newPage = await DataStore.instance.getItems( this._currentPage + 1 )

		++this._currentPage
		this._productBuffer = newPage

		return this._productBuffer
	}

	get products() {
		return this._productBuffer
	}

	get currentPage() {
		return this._currentPage
	}

	readonly cart: CartController = new CartController()
	private _productBuffer: Product[] = []
	private _currentPage: number = 1
}