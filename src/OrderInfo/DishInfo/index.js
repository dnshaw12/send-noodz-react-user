import React from 'react';
import Collapsible from 'react-collapsible';
import { Segment } from 'semantic-ui-react';

const DishInfo = (props) => {

	let noodles = props.dish.extraIngredients.reduce( (acc, ingredient, idx) => {

		if (ingredient.type === 'noodle') {

			if (idx === 0) {
				return ingredient.name
			}

			return acc + ', ' +ingredient.name
		} else {
			return acc
		}

	},'')

	let proteins = props.dish.extraIngredients.reduce( (acc, ingredient, idx) => {

		if (ingredient.type === 'protein') {

			if (idx === 0) {
				return ingredient.name
			}

			return acc + ', ' +ingredient.name
		} else {
			return acc
		}

	},'')

	let sauces = props.dish.extraIngredients.reduce( (acc, ingredient, idx) => {

		if (ingredient.type === 'sauce') {

			if (idx === 0) {
				return ingredient.name
			}

			return acc + ', ' +ingredient.name
		} else {
			return acc
		}

	},'')

	let normals = props.dish.extraIngredients.reduce( (acc, ingredient, idx) => {

		if (ingredient.type === 'normal') {

			if (idx === 0) {
				return ingredient.name
			}

			return acc + ', ' +ingredient.name
		} else {
			return acc
		}

	},'')

	console.log('here',noodles,'here');


	if (props.dish.menuItemId.name !== 'byon') {
		noodles ? noodles = props.dish.menuItemId.noodleType.name : noodles = props.dish.menuItemId.noodleType.name + ', ' + noodles

		proteins ? proteins = props.dish.menuItemId.protein.name : proteins = props.dish.menuItemId.protein.name + ', ' + proteins

		sauces ? sauces = props.dish.menuItemId.sauce.name : sauces = props.dish.menuItemId.sauce.name + ', ' + sauces

		normals = props.dish.menuItemId.baseIngredients.reduce( (acc, ingredient, idx) => {

			if (ingredient.type === 'normal') {

				if (idx === 0) {
					return ingredient.name
				}

				return acc + ', ' +ingredient.name
			} else {
				return acc
			}

		},'')

	}
	

	return(

		<Segment>

			<Collapsible trigger={props.dish.menuItemId.name}>
				<ul>
					<li>noodz: {noodles}</li>
					<li>protein: {proteins}</li>
					<li>sauce: {sauces}</li>
					<li>ingredients: {normals}</li>
				</ul>

			</Collapsible>

		</Segment>


	)

}


export default DishInfo