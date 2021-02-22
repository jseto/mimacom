import { Product } from '../products/product'
import { CartController } from './cart-controller'

describe('Cart Controller', ()=>{
	let cart: CartController
	let product: Product
	let callback = jest.fn()

	beforeEach(()=>{
		product = new Product().fromObject({
			id: "41fd4fd9-95c7-4809-96db-a147d352fdbb",
      image_url: "https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair",
      stock: 8,
      productName: "Unbranded Metal Chair",
      price: 43,
      productDescription: "Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.", //cSpell: disable-line
      favorite: "1"
		} as any)

		cart = new CartController()
		cart.onChange( callback )
	})

	it( 'should add products to the cart', ()=>{
		cart.add( product )

		expect( cart.items[product.id] ).toBeDefined()
		expect( callback ).toHaveBeenCalledWith(expect.objectContaining({ product: expect.objectContaining({ 
			id: '41fd4fd9-95c7-4809-96db-a147d352fdbb'
		})}))
	})

	it( 'should modify amount', ()=>{
		cart.add( product )
		cart.modifyAmount( product, 1 )

		expect( product.stock ).toBe( 6 )
		expect( callback ).toHaveBeenLastCalledWith(expect.objectContaining({ 
			product: expect.objectContaining({ 
				id: '41fd4fd9-95c7-4809-96db-a147d352fdbb'
			}),
			amount: 2
		}))
	})

	it( 'should remove items from cart when amount is 0', ()=>{
		cart.add( product )
		cart.modifyAmount( product, -1 )

		expect( cart.items ).toEqual({})
		expect( callback ).toHaveBeenLastCalledWith(expect.objectContaining({ 
			product: expect.objectContaining({ 
				id: '41fd4fd9-95c7-4809-96db-a147d352fdbb'
			}),
			amount: 0
		}))
	})
})