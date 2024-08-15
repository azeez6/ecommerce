import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react'; // Import AG Grid
import 'ag-grid-community/styles/ag-grid.css'; // Import AG Grid CSS
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Import AG Grid Theme CSS

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products/');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  // Custom Cell Renderer for Image
  const imageCellRenderer = (params) => {
    return (
      <img
        src={params.value}
        alt="Product"
        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
      />
    );
  };

  const [columnDefs] = useState([
      {
        headerName: 'Image',
        field: 'imageUrl',
        cellRenderer: imageCellRenderer, // Use the custom cell renderer
      },
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
    { headerName: 'Description', field: 'description', sortable: true, filter: true },
    { headerName: 'Cost', field: 'cost', sortable: true, filter: true },
    { headerName: 'Seller', field: 'seller', sortable: true, filter: true },
  ]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      {products.length ? (
        <div
          className="ag-theme-alpine"
          style={{ height: 400, width: '100%' }}
        >
          <AgGridReact
            rowData={products} // Row data for the grid
            columnDefs={columnDefs} // Column definitions for the grid
            defaultColDef={{
              flex: 1, // Flex layout
              minWidth: 150,
              resizable: true, // Make columns resizable
            }}
          />
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default AllProducts;
