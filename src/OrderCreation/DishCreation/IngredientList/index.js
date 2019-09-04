import React from 'react';
import { Card, Segment} from 'semantic-ui-react';
import Ingredient from './Ingredient'

const IngredientList = (props) => {

	const ingredientsNotIncluded = props.ingredients.filter( ingredient => {
		return !props.currentMenuItemIngredients.some( ingredient2 => ingredient2._id === ingredient._id)
	})

	const ingredientList = ingredientsNotIncluded.map( ingredient => {

		return(

			<Ingredient 
				ingredient={ingredient} 
				handleIngredientSelection={props.handleIngredientSelection}
				extraIngredients={props.extraIngredients}
			/>

			)

	})

	return(

		<Segment>
			{ingredientList}
		</Segment>

	)

}

export default IngredientList