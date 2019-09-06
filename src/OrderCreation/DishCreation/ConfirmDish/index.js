import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

const ConfirmDish = (props) => {

	let noodleType
	let protein 
	let sauce
	let ingredients

	const extraIngredients = props.ingredients.filter( ingredient => {
		return props.extraIngredients.some( id => id === ingredient._id )
	})

	if (props.currentMenuItem.name !== 'byon') {

		ingredients = props.currentMenuItem.baseIngredients.reduce( (acc, ingredient) => {
				return ingredient.name + ', ' + acc
			},'') + extraIngredients.reduce( (acc, ingredient) => {
				return ingredient.name + ', ' + acc
			},'')

		noodleType = props.currentMenuItem.noodleType.name
		protein = props.currentMenuItem.protein.name
		sauce = props.currentMenuItem.sauce.name

	} else {

		const noodles = extraIngredients.filter( ingredient => ingredient.type === 'noodle')
		const proteins = extraIngredients.filter( ingredient => ingredient.type === 'protein')
		const sauces = extraIngredients.filter( ingredient => ingredient.type === 'sauce')
		const normals = extraIngredients.filter( ingredient => ingredient.type === 'normal')

		noodleType = noodles.reduce( (acc, ingredient) => {
				return ingredient.name + ', ' + acc
			},'')

		protein = proteins.reduce( (acc, ingredient) => {
				return ingredient.name + ', ' + acc
			},'')

		sauce = sauces.reduce( (acc, ingredient) => {
				return ingredient.name + ', ' + acc
			},'')

		ingredients = normals.reduce( (acc, ingredient) => {
				return ingredient.name + ', ' + acc
			},'')
	}

	const total = extraIngredients.reduce( (acc, ingredient) => {
			return ingredient.price + acc
		},0) + props.currentMenuItem.basePrice


	return(

		<Segment className='contentSegment'>
			<h2>{props.currentMenuItem.name}</h2>
			<ul>
				<li>noodles: {noodleType}.</li>
				<li>protein: {protein}.</li>
				<li>sauce: {sauce}.</li>
				<li>ingredients: {ingredients}</li>
				<li>total: {total}</li>
			</ul>
			<textarea value={props.specialInstructions} onChange={props.updateSpecialInstructions} placeholder='special instructions.'/>
			<Button onClick={props.createDish}>add to cart.</Button>
		</Segment>

	)
}

export default ConfirmDish