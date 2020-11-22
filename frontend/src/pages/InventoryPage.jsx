import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import Modal from "@material-ui/core/Modal";
import { Button, TextField, Avatar } from "@material-ui/core";
import MaterialTable from "material-table";
import CurrentUserState from "../lib/CurrentUserState";
import { INVENTORY_GET } from "../consts/constants";

const InventoryPage = () => {
  const { loggedInState, userID } = CurrentUserState.get();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "Image",
      render: (rowData) => (
        <Avatar maxInitials={1} size={40} round={true} src={rowData.image} />
      ),
    },
    { title: "Name", field: "name" },
    { title: "Quantity", field: "quantity", type: "numeric" },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await fetch(INVENTORY_GET + `/${userID}`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
      });
      const results = await response.json();
      setData(results);
    }
    fetchData();
  }, [data, userID]); // Or [] if effect doesn't need props or state

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
      <Modal
        open={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div></div>
      </Modal>
    </div>
  );
};
export default observer(InventoryPage);
