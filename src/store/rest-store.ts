import { Item } from '../item/item';
import { GenericStore } from './store';

const END_POINT = 'localhost:3000'

export class RestStore extends GenericStore {

	getItems( page: number ): Promise<Item[]> {
		return new Promise<Item[]>( ( resolve, reject ) => {
			
			fetch(`${END_POINT}/grocery?_page=${ page }`)
				.then( async resp => {
					const data: any[] = await resp.json() 
					const items: Item[] = []
					data.forEach( element => {
						items.push( new Item().fromObject( element ) )
					});
					resolve( items )
				})
				.catch( error => reject( error ) )
		})
	}

	updateItem( item: Item ): Promise<Response> {
		return fetch(`${ END_POINT }/grocery/${ item.id }`, {
			method: 'patch',
			body: JSON.stringify( item.toObject() )
		})
	}
}
