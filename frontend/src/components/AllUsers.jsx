

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get('/auth/users');
      setUsers(res.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.put('/auth/update-role', { userId, newRole });
      if (res.status === 200) {
        setUsers(users.map(user => (user._id === userId ? { ...user, role: newRole } : user)));
        // alert('Role updated successfully');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  // Column definitions for AG Grid
  const [columnDefs] = useState([
    { headerName: 'Name', field: 'name', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
    {
      headerName: 'Role',
      field: 'role',
      cellRenderer: (params) => (
        <select
          value={params.value}
          onChange={(e) => handleRoleChange(params.data._id, e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      ),
      sortable: true,
      filter: true,
    },
  ]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {users.length ? (
        <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
          <AgGridReact
            rowData={users} // Row data for the grid
            columnDefs={columnDefs} // Column definitions for the grid
            defaultColDef={{
              flex: 1, // Flex layout
              minWidth: 150,
              resizable: true, // Make columns resizable
            }}
          />
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default AllUsers;

