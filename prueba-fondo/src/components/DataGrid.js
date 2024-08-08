import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function DataGridDemo() {


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'customerId', headerName: 'Customer ID', width: 150 },
    { field: 'fundId', headerName: 'Fund ID', width: 150 },
    { field: 'value', headerName: 'Value', width: 110 },
    { field: 'transactionType', headerName: 'Transaction Type ID', width: 150 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'transactionDate', headerName: 'Transaction Date', width: 200 },
  ]; const [rows, setRows] = React.useState([]);
  
    React.useEffect(() => {
      axios.get('https://localhost:7229/api/Fund/TransactionsByCustomerId?customerId=asdasd') 
        .then(response => {
          console.log(response.data);
          setRows(response.data.objectResponse);
        })
        .catch(error => {
          console.error("There was an error fetching the data!", error);
        });
    }, []);


  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 9,
            },
          },
        }}
        pageSizeOptions={[9]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}