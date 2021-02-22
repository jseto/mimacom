import fetchMock from 'fetch-mock'
import { RestStore } from './rest-store'
import { Store } from './store'
import mockData from '../test/mock-data.json'

describe('Rest Store', ()=>{
	beforeEach(()=>{
		Store.registerStoreFactory( ()=> new RestStore() )
		fetchMock.mock('3000/grocery?_page=1', ()=> mockData.grocery ) 
		fetchMock.mock( '3000/grocery/41fd4fd9-95c7-4809-96db-a147d352fdbb', 100 )
	})

	afterEach(()=>fetchMock.restore())

	it( 'should retrieve data', async ()=>{
		const items = await Store.instance.getItems(1)

		expect( items[0].id ).toEqual( "41fd4fd9-95c7-4809-96db-a147d352fdbb" )
    expect( items[0].image_url ).toEqual( "https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair" )
    expect( items[0].stock ).toBe( 8 )
    expect( items[0].productName ).toEqual( "Unbranded Metal Chair" )
    expect( items[0].price ).toBe( 43 )
    expect( items[0].productDescription ).toEqual( "Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo." )  // cSpell: disable-line
    expect( items[0].favorite ).toBe( true )
	})

	it( 'should update data', async ()=>{
		const item = ( await Store.instance.getItems(1))[0]
		item.favorite = false
		item.stock = 0

		await Store.instance.updateItem( item )
		const body = JSON.parse( fetchMock.lastCall()[1].body as string )

		expect( body.stock ).toEqual(0)
		expect( body.favorite ).toEqual( "0" )
	})
})