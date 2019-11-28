import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './style.css';

import Plus from '../../assets/plus.svg'

import SwingGroup from '../../Components/SwingGroup'

export default function Swing({ history }) {
    const userId = localStorage.getItem('dwalletToken');

    const [swingStocks, setSwingStocks] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);

    function renderSwingStocks() {
        if (swingStocks.length !== 0){
            const returnedArray =     
                swingStocks.map(stock => {
                    return (
                        <li key={stock._id}>
                            <SwingGroup SwingStock={stock} history={history} name={stock.name}/>
                        </li>)
                })
            
            return (<ul className="SwingList"> {returnedArray} </ul>);
        }else{
            return (<p className='warning'>Você ainda não possui ações do tipo <strong>Swing</strong>! Clique em <strong>+</strong> para compra-las!</p>);
        }
    }

    async function handleAdd() {
        await api.post('/swing/add', { name: name.toUpperCase(), amount: parseInt(amount) }, {
            headers: { authorization: 'Bearer ' + userId }
        });

        setName('');
        setAmount(0);
        setUpdating(!updating);
    }

    function handleBack() {
        history.push('/profile');
    }

    useEffect( () => {
        async function loadStocks() {
            const userId = localStorage.getItem('dwalletToken');

            const response = await api.get('/swing/show', {
                headers: { authorization: 'Bearer ' + userId }
            });

            setSwingStocks(response.data);
        }

        loadStocks();
    }, [updating])

    return (
        <div className="containerSwing">
        <div className='logo'>D-Wallet</div>

            <div className="content">
                <div className="buttonBar">
                    <button onClick={handleBack} className = "backStyle">Voltar</button>
                    <div className='addRegion'>
                        <input type="text" placeholder = "Nome..." onChange = { e => setName(e.target.value)}/>
                        <input type="Number" placeholder = "Quantidade" onChange = { e => setAmount(e.target.value)}/>
                        <button className="addStyle" onClick={handleAdd}>
                            <img src={Plus} alt="+"/>
                        </button>
                    </div>
                </div>
            
                {
                    renderSwingStocks()
                }
            </div>
        </div>
    )
}