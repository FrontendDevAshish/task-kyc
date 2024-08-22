import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const ProductDetails = ({ products, compareList, setCompareList }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const storedSelectedRow = localStorage.getItem('selectedRow');
    console.log('Stored selected row:', storedSelectedRow); 
    if (storedSelectedRow) {
      setSelectedRow(storedSelectedRow);
    }
  }, []);

  useEffect(() => {
    if (selectedRow !== null) {
      localStorage.setItem('selectedRow', selectedRow);
      
    }
  }, [selectedRow]);

  const handleCompare = (product) => {
    if (compareList.length < 4 && !compareList.some(p => p.id === product.id)) {
      setCompareList([...compareList, product]);
      localStorage.setItem('selectedRow', product.id); 
       
      navigate('/compare'); 
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', sorter: (a, b) => a.title.localeCompare(b.title), },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price', sorter: (a, b) => a.price - b.price, },
    { title: 'Brand', dataIndex: 'brand', key: 'brand' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Discount',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text, record) => <img src={record.thumbnail} alt={record.title} style={{ width: 50 }} />,
    },
    {
      title: 'Compare Products',
      key: 'compare',
      render: (text, product) => (
        <Button 
          disabled={compareList.some(p => p.id === product.id)} 
          onClick={() => handleCompare(product)}
        >
          Compare
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        background: '#fff',
        color: '#000',
        minHeight: '100vh',
        padding: '4px',
        borderRadius: '8px',
      }}
    >
      <Table 
        dataSource={products} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }} 
        rowClassName={(record) => {
          const isSelected = record.id === selectedRow;
          
          return isSelected ? 'selected-row' : '';
        }}
      />
      <style>
        {`
          .selected-row {
            background-color: #e6f7ff !important;  /* Highlight color */
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetails;
