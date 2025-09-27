// frontend/src/components/ConnectionTest.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionTest = () => {
    const [status, setStatus] = useState('Testing...');
    const [backendHealth, setBackendHealth] = useState(null);

    useEffect(() => {
        testConnection();
    }, []);

    const testConnection = async () => {
        try {
            console.log('🧪 Testing backend connection...');
            
            // Test 1: Basic server health
            const healthResponse = await axios.get('/');
            console.log('✅ Server health check:', healthResponse.data);
            setBackendHealth('✅ Backend server is running');

            // Test 2: API endpoint test
            const carsResponse = await axios.get('/api/user/cars');
            console.log('✅ Cars API response:', carsResponse.data);
            
            setStatus('✅ Frontend and Backend are connected successfully!');
            
        } catch (error) {
            console.error('❌ Connection test failed:', error);
            
            if (error.code === 'ECONNREFUSED') {
                setStatus('❌ Backend server is not running');
                setBackendHealth('❌ Cannot connect to http://localhost:3000');
            } else if (error.response?.status === 404) {
                setStatus('❌ API endpoint not found');
                setBackendHealth('✅ Backend running, but API routes missing');
            } else {
                setStatus(`❌ Connection error: ${error.message}`);
                setBackendHealth('❌ Unknown connection issue');
            }
        }
    };

    return (
        <div className="p-4 border rounded-lg m-4">
            <h3 className="text-lg font-bold mb-2">🔗 Connection Status</h3>
            <p className="mb-2">{backendHealth}</p>
            <p className="mb-2">{status}</p>
            <button 
                onClick={testConnection}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Test Again
            </button>
        </div>
    );
};

export default ConnectionTest;