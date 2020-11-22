import {makeAutoObservable} from "mobx";
import singletonGetter from "./singletonGetter";
import axios from 'axios';
import {BACK_END_URL} from "../consts/constants";
import CurrentUserState from "./CurrentUserState";
import _ from 'lodash';

export class RecipesStore {
    static get = singletonGetter(RecipesStore);
    constructor() {
        makeAutoObservable(this)
        this.fetchRecipes();
    }
    recipes = null
    fetchRecipes = async () => {
        const {userId} = CurrentUserState.get()
        const { data } = await axios.post(`${BACK_END_URL}/recipe-recs`, { userId })
        this.recipes = _.sortBy(data, 'matchDistance');
    }
}