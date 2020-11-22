import React, { useState } from "react";
import { observer } from "mobx-react";
import Modal from "@material-ui/core/Modal";
import { Button, TextField } from "@material-ui/core";
import MaterialTable from "material-table";
import CurrentUserState from "../lib/CurrentUserState";

const InventoryPage = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [columns, setColumns] = useState([
    { title: "Name", field: "name" },
    {
      title: "Surname",
      field: "surname",
      initialEditValue: "initial edit value",
    },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    {
      title: "Birth Place",
      field: "birthCity",
      lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    },
  ]);

  const [data, setData] = useState([
    { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 },
  ]);

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
