import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './style.css'

import reload from '../../assets/refresh-button.svg';
import StockGroup from '../../Components/StockGroup';

export default function Dashboard({ history }) {
    const [stocks, setStocks] = useState([]);
    const [updating, setUpdating] = useState(true);

    async function handleUpdate() {
        const user_id = localStorage.getItem('user');

        await api.put('/profile/update', {  } ,{
            headers: { user_id }
        });

        setUpdating(!updating);
    }

    function handleBuy(e) {
        history.push('/stocks/buy')
    }

    function handleSell(e) {
        history.push('/stocks/sell')
    }

    useEffect(() => {
        async function loadStocks() {
            const user_id = localStorage.getItem('user');

            const response = await api.get('/profile/show', {
                headers: { user_id }
            });

            setStocks(response.data);
        }

        loadStocks();
    }, [updating]);

    return (
        <div className = "containerProfile">
        <div className='logo'>D-Wallet</div>

            <div className="content">

                <div className='buttons'>
                    <div className='updateButton'>
                        <button onClick={handleUpdate} className="updateStyle">
                            <img src={reload} alt="reload"/> Update</button>
                    </div>
                    
                    <div className='operationButtons'>
                        <button onClick={handleBuy} className="buyStyle">Buy</button>
                        <button onClick={handleSell} className="sellStyle">Sell</button>
                    </div>
                </div>

                <ul className="stock-list">
                    { stocks.map(stock => {
                        return (
                        <li key={stock._id}>
                            <StockGroup stock={stock} history={history}/>
                        </li>)
                    })}
                </ul>
            </div>
        </div>
    )
}

/*


*/