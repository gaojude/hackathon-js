import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import {RecipesStore} from "../lib/RecipesStore";
import AliceCarousel from "react-alice-carousel";
import {CarouselCard} from "../components/CarouselCard";
import 'react-alice-carousel/lib/alice-carousel.css';

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
    const handleDragStart = (e) => e.preventDefault();

    const {recipes} = RecipesStore.get();

    useEffect(() => {
        RecipesStore.get().fetchRecipes()
    }, [recipes])

    if (!recipes) {
        return (
            <h1>RECIPES RECS GENERATING...</h1>
        )
    }

    return (
        <div>
            <h1>Recipe recommendations</h1>
            <AliceCarousel
                mouseTracking
                responsive={{
                    0: {items: 1},
                    568: {items: 2},
                    1024: {items: 3},
                }}
                items={recipes.map((recipe) => {
                    return (
                        <CarouselCard
                            key={recipe.recipeId}
                            onDragStart={handleDragStart}
                            title={recipe.name}
                            missedIngredients={recipe.missedIngredients}
                            imageUrl={recipe.imageUrl}
                            linkUrl={recipe.sourceUrl}
                        />
                    )
                })}/>
        </div>
    );
};

export default observer(RecipesGenerator);