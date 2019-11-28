import React, { useState, useEffect } from 'react';
import api from '../../services/api'
import './style.css';

import Garbage from '../../assets/Trash-512.png'

export default function StockGroup({ SwingStock }) {
    const userId = localStorage.getItem('dwalletToken')

    const [marketValue, setMarketValue] = useState(0);
    const [amount, setAmount] = useState(SwingStock.amount);
    const [avarage, setAvarage] = useState(0);
    const [profit, setProfit] = useState(0);
    const [stopLoop, setStopLoop] = useState(false);

    async function handleSave(e) {
        e.preventDefault();

        await api.put('/swing/update', { name: SwingStock.name, amount }, {
            headers: { authorization: 'Bearer ' + userId }
        })
    }

    async function handleDelete() {
        await api.post('/swing/delete', { name: SwingStock.name, user: userId }, {
            headers: { authorization: 'Bearer ' + userId }
        })

        window.location.reload(false);
    }

    useEffect(() => {
        setProfit( Number(amount) * Number(marketValue) - Number(amount) * Number(avarage) );  
    }, [amount]);
    
    useEffect(() => {
        const x = Number(amount) * Number(marketValue) - Number(amount) * Number(avarage);
        setProfit(x);
    }, [marketValue]);
    
    useEffect(() => {
        if (!stopLoop){
            const x = Number(amount) * Number(marketValue) - Number(amount) * Number(avarage) ;
            setProfit(x);
        }
    }, [avarage]);

    //Still Trying to fix it
    // useEffect(() => {
    //     setAvarage(Number(profit)/Number(amount) - Number(marketValue));
    //     setStopLoop(true);
    // }, [profit]);

    return (
        <div className="SwingGroup">
            <div className="SwingName">
                <div>{SwingStock.name}</div>
            </div>

            <div className="swing_market">
                <div>Preço de mercado</div>
                <input type="text" value={marketValue} onChange = {e => { setMarketValue(e.target.value)}}/>
            </div>

            <div className="swing_amount">
                <div>Quantidade</div>
                <input type="text" value={amount} onChange = {e => { setAmount(e.target.value)}}/>
            </div>

            <div className="swing_avarage">
                <div>Preço médio</div>
                <input type="text" value={avarage} onChange = {e => { setAvarage(e.target.value) }}/>
            </div>

            <div className="swing_profit" style={{ backgroundColor: profit >= 0 ? 'rgb(34, 177, 76)' : '#ff6961' }} >
                <div>Lucro</div>
                <input style={{ backgroundColor: profit >= 0 ? 'rgb(34, 177, 76)' : '#ff6961' }} type="text" value={Math.round(profit * 100) / 100} onChange = {e => { setProfit(e.target.value) }}/>
            </div>

            <div className="swing_buttons">
                <button className="swing_save" onClick = {handleSave}>Salvar Quantidade</button>
                <button className="swing_delete" onClick = {handleDelete}> <img src={Garbage} alt="-"/> </button>
            </div>
        </div>
    );
}
