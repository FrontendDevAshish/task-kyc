import React, { useState } from 'react';
import { Button, Modal, Table } from 'antd';

const Compare = ({ compareList, setCompareList, products }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleRemoveProduct = (product) => {
    setCompareList(compareList.filter(p => p.id !== product.id));
  };

  const handleAddProduct = (product) => {
    if (compareList.length < 4 && !compareList.some(p => p.id === product.id)) {
      setCompareList([...compareList, product]);
    }
  };

  const modalColumns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    {
      title: 'Add to Compare',
      key: 'add',
      render: (text, product) => (
        <Button
          disabled={compareList.some(p => p.id === product.id)}
          onClick={() => handleAddProduct(product)}
        >
          Add
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
        padding: '24px',
        borderRadius: '8px',
      }}
    >
      <h2>Compare Products</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {compareList.map(product => (
          <div 
            key={product.id} 
            style={{
              border: '1px solid #ddd', 
              padding: '16px',
              background: '#fff', 
            }}
          >
            <h3>{product.title}</h3>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <Button onClick={() => handleRemoveProduct(product)}>Remove</Button>
          </div>
        ))}
      </div>

      <Button onClick={() => setModalVisible(true)} style={{ marginTop: '20px' }}>Add More</Button>

      <Modal
        title="Add More Products"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Table
          dataSource={products}
          columns={modalColumns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          style={{ background: '#f9f9f9' }}  
        />
      </Modal>
    </div>
  );
};

export default Compare;
