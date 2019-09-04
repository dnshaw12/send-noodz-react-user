import React from 'react';
import { Card, Segment} from 'semantic-ui-react';

const IngredientList = (props) => {

	const ingredientsNotIncluded = props.ingredients.filter( ingredient => {
		return !props.currentMenuItemIngredients.some( ingredient2 => ingredient2._id === ingredient._id)
	})

	const ingredientList = ingredientsNotIncluded.map( ingredient => {

		return(

			<Card>
				{ingredient.name}
				{ ingredient.price ? ingredient.price : null}
			</Card>

			)

	})

	return(

		<Segment>
			{ingredientList}
		</Segment>

	)

}

export default IngredientList