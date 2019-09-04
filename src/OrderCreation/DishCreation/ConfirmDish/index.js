import React from 'react';
import { Segment } from 'semantic-ui-react';

const ConfirmDish = (props) => {

	console.log(props);


	// if (props.currentMenuItem.name !== 'byon') {

		const extraIngredients = props.ingredients.filter( ingredient => {
			return props.extraIngredients.some( id => id === ingredient._id )
		})

		const ingredients = props.currentMenuItem.baseIngredients.reduce( (acc, ingredient) => {
				return ingredient.name + ' ' + acc
			},'') + extraIngredients.reduce( (acc, ingredient) => {
				return ingredient.name + ' ' + acc
			},'')

		const total = extraIngredients.reduce( (acc, ingredient) => {
			return ingredient.price + acc
		},0) + props.currentMenuItem.basePrice

		const noodleType = props.currentMenuItem.noodleType.name
		const protein = props.currentMenuItem.protein.name
		const sauce = props.currentMenuItem.sauce.name

	// }


	return(

		<Segment>
			<h2>{props.currentMenuItem.name}</h2>
			<ul>
				<li>noodles: {noodleType}.</li>
				<li>protein: {protein}.</li>
				<li>sauce: {sauce}.</li>
				<li>ingredients: {ingredients}</li>
				<li>total: {total}</li>
			</ul>
		</Segment>

	)
}

export default ConfirmDish