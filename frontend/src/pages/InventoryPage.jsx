import React, {useEffect, useState} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {observer} from "mobx-react";
import {
    Dialog,
    TextField,
    Avatar,
    Paper,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@material-ui/core";
import MaterialTable from "material-table";
import CurrentUserState from "../lib/CurrentUserState";
import {BACK_END_URL} from "../consts/constants";
import axios from "axios";
import {InventoryStore} from "../lib/InventoryStore";

const InventoryPage = () => {
    const {loggedInState, userId} = CurrentUserState.get();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [suggestion, setSuggestion] = useState([]);
    const [selectedIngredient, setIngredient] = useState(undefined);
    const [data, setData] = useState(undefined);
    const [columns, setColumns] = useState([
        {
            title: "Image",
            render: (rowData) => (
                <Avatar maxInitials={1} size={40} round={true} src={rowData.image}/>
            ),
        },
        {title: "Name", field: "name"},
        {title: "Quantity", field: "quantity", type: "numeric"},
    ]);

    const addIngredient = async () => {
        const {data} = await axios.post(`${BACK_END_URL}/inventory`, {
            name: selectedIngredient.name,
            userId,
            image: selectedIngredient.imageUrl,
            quantity: 1,
        });
        //console.log(data);s
        setIngredient(undefined);
        await fetchData(data);
    };

    const onSuggestionChange = async (ingredientPartialName) => {
        const {data} = await axios.post(
            `${BACK_END_URL}/ingredient-auto-complete`,
            {
                ingredientPartialName,
            }
        );
        setSuggestion(data);
    };

    async function fetchData() {
        const data = await InventoryStore.get().fetchInventory()
        setData(data);
    }

    useEffect(() => {
        if (!data) fetchData();
    }, [userId]); // Or [] if effect doesn't need props or state

    return (
        <div>
            <MaterialTable
                title="What's In My Pantry?"
                columns={columns}
                data={data}
                editable={{
                    onRowUpdate: async (newData, oldData) => {
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        const {_id, userId, quantity} = newData;
                        if (quantity === 0) {
                            await axios.delete(`${BACK_END_URL}/inventory`, {data: {userId, id: _id}});
                            dataUpdate.splice(index, 1);
                            InventoryStore.get().setItems([...dataUpdate])
                            setData([...dataUpdate]);
                        }
                        else {
                            await axios.patch(`${BACK_END_URL}/inventory`, {userId, id: _id, quantity})
                            InventoryStore.get().setItems([...dataUpdate])
                            setData([...dataUpdate]);
                        }
                    },
                    onRowDelete: async (oldData) => {
                        const dataDelete = [...data];
                        const index = oldData.tableData.id;
                        dataDelete.splice(index, 1);
                        const {_id, userId} = oldData;
                        await axios.delete(`${BACK_END_URL}/inventory`, {data: {userId, id: _id}})
                        InventoryStore.get().setItems([...dataDelete])
                        setData([...dataDelete]);
                    }
                }}
                actions={[
                    {
                        icon: "add",
                        tooltip: "Add Row",
                        // This makes add button to appear in table toolbar instead for each row
                        isFreeAction: true,
                        onClick: (event, rowData) => {
                            setIsModelOpen(true);
                        },
                    },
                ]}
            />
            <Dialog
                open={isModelOpen}
                onClose={() => setIsModelOpen(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add An Ingredient</DialogTitle>
                <DialogContent>
                    {selectedIngredient !== undefined ? (
                        <Avatar
                            style={{textAlign: "center"}}
                            maxInitials={1}
                            size={40}
                            round={true}
                            src={selectedIngredient.imageUrl}
                        />
                    ) : (
                        <></>
                    )}
                    <Autocomplete
                        id="combo-box-demo"
                        options={suggestion}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, value) => {
                            suggestion !== []
                                ? setIngredient({...value})
                                : setSuggestion([]);
                        }}
                        style={{width: 300}}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search For Ingredients"
                                onChange={(event, values) =>
                                    onSuggestionChange(event.target.value)
                                }
                                variant="outlined"
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModelOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            addIngredient();
                            setIsModelOpen(false);
                        }}
                        color="primary"
                    >
                        Add Ingredient!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default observer(InventoryPage);
