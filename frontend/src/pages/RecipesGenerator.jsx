import React from 'react';
import {observer} from "mobx-react";
import {RecipesStore} from "../lib/RecipesStore";

const renderMissedIngredients = (missedIngredients) => {
    const matchDistance = missedIngredients.length;
    if (matchDistance === 0) {
        return <strong>This is a perfect match! Yay!</strong>
    }
    return (
        <div>
            <h2>You have {matchDistance} missing Ingredients!</h2>
            <ul>
                {
                    // turns out quantity is a better display name than `name`
                    missedIngredients.map(({quantity: displayName, image}, index) => {
                        return (
                            <div key={index}>
                                <img src={image} alt={displayName}/>
                                <li>{displayName}</li>
                            </div>
                        )
                    })}
            </ul>
        </div>
    )

}


const renderSingleRecipe = ({title, imageUrl, sourceUrl, missedIngredients}) => {
    return (
        <div>
            <h1>{title}</h1>
            <img src={imageUrl} alt={title}/>
            <br/>
            <a href={sourceUrl}>Goto Recipe Website</a>
            <br/>
            {renderMissedIngredients(missedIngredients)}
            <hr/>
        </div>
    )
}

const RecipesGenerator = () => {
    const {recipes} = RecipesStore.get();
    if (!recipes) {
        return (
            <h1>RECIPES RECS GENERATING...</h1>
        )
    }
    return (
        <div>
            <h1>Recipe recommendations</h1>
            <ol>
                {
                    recipes.map((recipe, index) => {
                        return (
                            <div key={index}>
                                {renderSingleRecipe(recipe)}
                            </div>
                        )
                    })
                }
            </ol>
        </div>
    );
};

export default observer(RecipesGenerator);