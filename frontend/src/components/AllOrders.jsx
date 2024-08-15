import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  const fetchOrders = async () => {
    try {
      const res = await axios.get('/orders/all');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Column definitions for AG Grid
  const [columnDefs] = useState([
    {
      headerName: 'Order ID',
      field: '_id',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'User Name',
      field: 'userId.name',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Items',
      field: 'items',
      cellRenderer: (params) => {
        return params.value.map((item, index) => (
          <div key={index}>
            {item.title} (x{item.quantity}) - ${item.price}
          </div>
        ));
      },
      autoHeight: true,
      filter: true,
    },
    {
      headerName: 'Total Cost',
      field: 'totalCost',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Delivery Address',
      field: 'deliveryAddress',
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Created At',
      field: 'createdAt',
      sortable: true,
      filter: true,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.length ? (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
          <AgGridReact
            rowData={orders}
            columnDefs={columnDefs}
            defaultColDef={{
              flex: 1,
              minWidth: 150,
              resizable: true,
            }}
          />
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AllOrders;

