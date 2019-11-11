import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './style.css'

import reload from '../../assets/refresh-button.svg';
import StockGroup from '../../Components/StockGroup';

export default function Dashboard({ history }) {
    const [stocks, setStocks] = useState([]);
    const [updating, setUpdating] = useState(true);

    function renderThis() {
        if (stocks.length !== 0){
            const returnedArray =     
                stocks.map(stock => {
                    return (
                        <li key={stock._id}>
                            <StockGroup stock={stock} history={history}/>
                        </li>)
                })
            
            return (<ul className="stock-list"> {returnedArray} </ul>);
        }else{
            return (<p className='warning'>Você ainda não possui ações! Clique em <strong>Buy</strong> para compra-las!</p>);
        }
    }

    async function handleUpdate() {
        const userId = localStorage.getItem('dwalletToken');

        await api.put('/profile/update', {  } ,{
            headers: { authorization: 'Bearer ' + userId }
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
            const userId = localStorage.getItem('dwalletToken');

            const response = await api.get('/profile/show', {
                headers: { authorization: 'Bearer ' + userId }
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

                {
                    renderThis()
                }

            </div>
        </div>
    )
}

/*


*/