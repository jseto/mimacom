import { Item } from '../item/item';

export abstract class GenericStore {
	abstract getItems( page: number ): Promise<Item[]>
	abstract updateItem( item: Item ): Promise<Response>
}

type StoreFactory = ()=> GenericStore

/**
 * Store is a singleton providing a façade to decouple access to concrete 
 * implementations of a Store. The concrete store should be registered before using
 * this class
 */
export class Store extends GenericStore {

	private constructor( storeFactory: StoreFactory ) {
		super()
		this._concreteStore = storeFactory()
	}

	/**
	 * Registers a factory function providing an instace of the concrete Store	
	 * 
	 * @param storeFactory a function returning an instance of a concrete implementation
	 *  										of a Store.
	 */
	static registerStoreFactory( storeFactory: StoreFactory ) {
		this._storeFactory = storeFactory
	}

	static get instance() {
		return this._instance || ( this._instance = new Store( this._storeFactory ) )
	}

	getItems( page: number ): Promise<Item[]> {
		return this._concreteStore.getItems( page )
	}

	updateItem( item: Item ): Promise<Response> {
		return this._concreteStore.updateItem( item )
	}

	private static _instance: Store
	private static _storeFactory: StoreFactory
	private _concreteStore: GenericStore
}