import React from 'react';
import { Button, Segment} from 'semantic-ui-react';
import Collapsible from 'react-collapsible';

const MenuItemList = (props) => {

	const menuItemList = props.menuItems.map( item => {

		const baseIngredients = item.baseIngredients.reduce( (acc, ingredient) => {
			return ingredient.name + ' ' + acc
		},'')

		return(

			<Collapsible id={item._id} trigger={item.name}>
				<ul>
					<li>noodle: {item.noodleType.name}</li>
					<li>protein: {item.protein.name}</li>
					<li>sauce: {item.sauce.name}</li>
					<li>ingredients: {baseIngredients}</li>
				</ul>
				<Button id={item._id} onClick={props.selectMenuItem}>select</Button>
			</Collapsible>

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