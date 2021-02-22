import { Product } from '../products/product';
import { GenericDataStore } from './data-store';

const END_POINT = 'http://localhost:3000'

export class RestStore extends GenericDataStore {

	getItems( page: number ): Promise<Product[]> {
		return new Promise<Product[]>( ( resolve, reject ) => {
			
			fetch(`${END_POINT}/grocery?_page=${ page }`)
				.then( async resp => {
					const data: any[] = await resp.json() 
					const items: Product[] = []
					data.forEach( element => {
						items.push( new Product().fromObject( element ) )
					});
					resolve( items )
				})
				.catch( error => reject( error ) )
		})
	}

	updateItem( item: Product ): Promise<Response> {
		return fetch(`${ END_POINT }/grocery/${ item.id }`, {
			method: 'patch',
			body: JSON.stringify( item.toObject() )
		})
	}
}
