import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Switch } from 'antd';
import axios from 'axios';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductDetails from './components/ProductDetails';
import Compare from './components/Compare';
import './App.css';

const { Content } = Layout;

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [compareList, setCompareList] = useState([]);

  
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
    };

    fetchProducts();
  }, []);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : 'light-mode'}>
        <Layout style={{ minHeight: '100vh' }}>
          <Navbar darkMode={darkMode} />
          <Layout>
            <Sidebar darkMode={darkMode} />
            <Layout style={{ padding: '2px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px' }}>
                {/* <Switch checked={darkMode} onChange={toggleDarkMode} /> */}
                {/* <span style={{ marginLeft: '10px' }}>{darkMode ? 'Dark Mode' : 'Light Mode'}</span> */}
              </div>
              <Content style={{ padding: '24px', background: 'inherit', minHeight: '360px' }}>
                <Routes>
                  <Route 
                    path="/" 
                    element={<ProductDetails 
                                products={products} 
                                compareList={compareList} 
                                setCompareList={setCompareList} 
                                darkMode={darkMode}
                              />} 
                  />
                  <Route 
                    path="/compare" 
                    element={<Compare 
                                compareList={compareList} 
                                setCompareList={setCompareList} 
                                products={products}
                                darkMode={darkMode} 
                              />} 
                  />
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
