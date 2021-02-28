import React, { useEffect, useRef, useState } from "react"
import { ShopController } from '../shop/shop-controller';
import { CartPanel } from '../shop/view/cart-panel';
import { ProductCatalog } from '../shop/view/product-catalog';
import './main-panel.scss'

export const MainPanel = ({ shopController }) => {
	const [ showCart, setShowCart ] = useState( false )
	const [ showShop, setShowShop ] = useState( true )
	const [ showFavorites, setShowFavorites ] = useState( false )
	const [ movile, setMovile ] = useState( false )
	const menuPanel = useRef(null)

	const onResize = ()=>{
		setMovile( menuPanel.current?.clientWidth )
	}

	useEffect(()=>{
		setMovile( menuPanel.current?.clientWidth )
		window.addEventListener( 'resize', onResize )
		return ()=>window.removeEventListener('resize', onResize )
	})

	const showCartClick = () => {
		setShowCart(true)
		setShowFavorites( false )
		setShowShop( false )
	}

	const showShopClick = () => {
		setShowCart( false )
		setShowFavorites( false )
		setShowShop( true )
	}

	const showFavoritesClick = () => {
		setShowCart( false )
		setShowFavorites( true )
		setShowShop( false )
	}

	return (
		<div className="main-panel">
			<h1>Mimacom</h1>
			<div className="menu" ref={menuPanel}>
				<button onClick={()=>showCartClick()}>Cart</button>
				<button onClick={()=>showShopClick()}>Shop more</button>
				<button onClick={()=>showFavoritesClick()}>Favorites</button>
			</div>
			<div className="content">
				{ (!movile || showShop) &&
					<ProductCatalog shopController={shopController}/>
				}
				{ (!movile || showCart) &&
					<CartPanel shopController={ shopController }/>
				}
				{ (!movile || showFavorites ) &&
					<strong>Feature not implemented yet</strong>
				}
			</div>
		</div>
	)
}
