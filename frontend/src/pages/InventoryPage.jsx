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
import { BACK_END_URL } from "../consts/constants";
import axios from 'axios'

const InventoryPage = () => {
    const {loggedInState, userId} = CurrentUserState.get();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [suggestion, setSuggestion] = useState([]);
    const [selectedIngredient, setIngredient] = useState(undefined);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([
        {
            title: "Image",
            render: (rowData) => (
                <Avatar maxInitials={1} size={40} round={true} src={rowData.imageUrl}/>
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
        })
        setSuggestion(data);
    };

    const onSuggestionChange = async (ingredientPartialName) => {
        const {data} = await axios.post(`${BACK_END_URL}/ingredient-auto-complete`, {ingredientPartialName})
        setSuggestion(data);
    };

    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.post(`${BACK_END_URL}/inventory/list-all`, {userId})
            setData(data);
        }

        fetchData();
    }, [data, userId]); // Or [] if effect doesn't need props or state

    return (
        <div>
            <MaterialTable
                title="What's In My Pantry?"
                columns={columns}
                data={data}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }, 1000);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);

                                resolve();
                            }, 1000);
                        }),
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
                        onChange={(event) => {
                            suggestion !== []
                                ? setIngredient(suggestion[event.target.value])
                                : (setSuggestion([]));
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
