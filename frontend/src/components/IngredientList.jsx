import React from "react";
import styled from 'styled-components';
import {IngredientCard} from "../pages/IngredientCard";

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
`

export const IngredientList = () => {
    return (
        <StyledGrid>
            <IngredientCard
                count={5}
                imageUrl='https://spoonacular.com/cdn/ingredients_500x500/apple.jpg'
                name='apple'
            />
            <IngredientCard
                count={5}
                imageUrl='https://spoonacular.com/cdn/ingredients_500x500/apple.jpg'
                name='goose'
            />
            <IngredientCard
                count={5}
                imageUrl='https://spoonacular.com/cdn/ingredients_500x500/apple.jpg'
                name='sheep'
            />
            <IngredientCard
                count={5}
                imageUrl='https://spoonacular.com/cdn/ingredients_500x500/apple.jpg'
                name='egg'
            />
            <IngredientCard
                count={2}
                imageUrl='https://spoonacular.com/cdn/ingredients_500x500/apple.jpg'
                name='egg'
            />
            <IngredientCard
                count={5}
                imageUrl='https://spoonacular.com/cdn/ingredients_500x500/apple.jpg'
                name='egg'
            />
            <IngredientCard
                count={1}
                imageUrl='https://spoonacular.com/cdn/ingredients_500x500/apple.jpg'
                name='egg'
            />
            <IngredientCard
                count={5}
                imageUrl='https://spoonacular.com/cdn/ingredients_500x500/apple.jpg'
                name='egg'
            />
        </StyledGrid>
    )
}