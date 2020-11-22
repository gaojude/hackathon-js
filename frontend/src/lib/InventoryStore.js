import {makeAutoObservable} from "mobx";
import singletonGetter from "./singletonGetter";
import axios from "axios";
import {BACK_END_URL} from "../consts/constants";
import CurrentUserState from "./CurrentUserState";

export class InventoryStore {
    static get = singletonGetter(InventoryStore);

    items

    constructor() {
        makeAutoObservable(this)
        this.fetchInventory()
    }

    fetchInventory = async () => {
        const {userId} = CurrentUserState.get()
        const {data} = await axios.post(`${BACK_END_URL}/inventory/list-all`, {userId});
        this.items = data
        return data;
    }

    setItems = data => this.items = data
}