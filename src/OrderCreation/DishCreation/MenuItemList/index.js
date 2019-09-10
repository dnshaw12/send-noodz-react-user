import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import MenuItem from './MenuItem'

const MenuItemList = (props) => {

	const menuItemList = props.menuItems.map( item => {

		const baseIngredients = item.baseIngredients.reduce( (acc, ingredient) => {
			return ingredient.name + ' ' + acc
		},'')

		return(

			<MenuItem item={item} baseIngredients={baseIngredients} selectMenuItem={props.selectMenuItem} />

			)

	})

	return(

		<Segment className='listSegment'>
			<h1>pre-set dishes.</h1>
			{menuItemList}
		</Segment>

	)
}

export default MenuItemList