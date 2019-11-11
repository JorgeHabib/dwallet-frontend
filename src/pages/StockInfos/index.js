import React, { useEffect, useState } from 'react';
import './style.css'
import api from '../../services/api';

import StockTable from '../../Components/StockTable';

export default function StockDetail({ match }) {
    const [buys, setBuys] = useState([]);
    const [sells, setSells] = useState([]);
    const [name] = useState(match.params.name.toUpperCase());
    
    useEffect(() => {
        async function loadBuys() {
            const userId = localStorage.getItem('dwalletToken');

            const _buys = await api.get(`/stocks?stock_name=${name}`, {
                headers: {
                    authorization: 'Bearer ' + userId
                }
            })

            const _sells = await api.get(`/sell?stock_name=${name}`, {
                headers: {
                    authorization: 'Bearer ' + userId
                }
            })

            setBuys(_buys.data);
            setSells(_sells.data);
        }

        loadBuys();
    }, [name])
    
    return (
        <div className="containerDetails">
        <div className='logo'>D-Wallet</div>
        
        <div className="content">
            <div className="stock-lists">
                <div className="buyTable">
                    <div>Compras</div>
                    <StockTable stocks={buys}/>
                </div>
                <div className="sellTable">
                    <div>Vendas</div>
                    <StockTable stocks={sells}/>
                </div>
            </div>
        </div>
    </div>
  ); 
}
