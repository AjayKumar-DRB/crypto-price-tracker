import React, { useState, useEffect } from 'react';
import './Intro.css';

function CryptoTracker() {
    const [cryptoList, setCryptoList] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState('default');
    const [cryptoData, setCryptoData] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [logoutError, setLogoutError] = useState('');

    useEffect(() => {
        fetchCryptoList()
            .then(data => setCryptoList(data))
            .catch(error => console.error('Error fetching cryptocurrency list:', error));
        
        fetchTableData();
    }, []);

    const fetchCryptoList = () => {
        return fetch('https://api.coincap.io/v2/assets')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(data => data.data);
    };

    const fetchTableData = () => {
        fetch('https://api.coincap.io/v2/assets?limit=10')
            .then(response => response.json())
            .then(data => setTableData(data.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const fetchCryptoData = () => {
        if (selectedCrypto !== 'default') {
            fetch(`https://api.coincap.io/v2/assets/${selectedCrypto}`)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                    return response.json();
                })
                .then(data => setCryptoData(data.data))
                .catch(error => console.error('Error fetching cryptocurrency data:', error));
        } else {
            setCryptoData(null);
        }
    };

    const handleLogout = async () => {
        try {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch('https://goldratecalculator-backend.onrender.com/logout', options);
            if (response.status === 200) {
                localStorage.removeItem('token');
                // Redirect to login page after successful logout
                window.location.href = '/';
            } else {
                // Handle error if logout fails
                const data = await response.json();
                if (data.error) {
                    setLogoutError(data.error);
                } else {
                    setLogoutError('An error occurred during logout.');
                }
            }
        } catch (err) {
            setLogoutError('An error occurred during logout.');
        }
    };

    return (
        <div>
            <div className="navHeading">
                <div className='container d-flex justify-content-between my-4'>
                    <h1>Cryptocurrency Price Tracker</h1>
                    <div>
                        <button className="btn btn-primary mb-3" onClick={handleLogout}>Logout</button>
                        {logoutError && <p className="text-danger">{logoutError}</p>}
                    </div>
                </div>
                
            </div>
            

            <div className="container d-flex justify-content-center py-5 searchBar">
                <label className="d-flex justify-content-center align-items-center" htmlFor="cryptoInput">Select Cryptocurrency:</label>
                <div className="d-flex">
                    <select
                        className="form-control mx-2"
                        id="cryptoInput"
                        value={selectedCrypto}
                        onChange={e => setSelectedCrypto(e.target.value)}
                        onBlur={fetchCryptoData}
                    >
                        <option value="default">Select a cryptocurrency</option>
                        {cryptoList.map(crypto => (
                            <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="container">
                <div className="row d-flex justify-content-center" id="crypto-cards">
                    {cryptoData && (
                        <div className="col-md-4 mb-5">
                            <div className="card crdClr">
                                <div className="card-header">
                                    {cryptoData.name} ({cryptoData.symbol})
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Price (USD): ${parseFloat(cryptoData.priceUsd).toFixed(2)}</p>
                                    <p className="card-text">Change (24h): {parseFloat(cryptoData.changePercent24Hr).toFixed(2)}%</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <table className="container crypto-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price (USD)</th>
                        <th>Market Cap (USD)</th>
                        <th>Change (24h)</th>
                    </tr>
                </thead>
                <tbody id="crypto-table-body">
                    {tableData.map(crypto => (
                        <tr key={crypto.id}>
                            <td>{crypto.name}</td>
                            <td>{crypto.symbol}</td>
                            <td>${parseFloat(crypto.priceUsd).toFixed(2)}</td>
                            <td>${parseFloat(crypto.marketCapUsd).toFixed(2)}</td>
                            <td>{parseFloat(crypto.changePercent24Hr).toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CryptoTracker;
