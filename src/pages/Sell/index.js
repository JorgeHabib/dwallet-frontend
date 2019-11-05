import React, { useState } from 'react';
import api from '../../services/api';

export default function Buy({ history }) {
    const user_id = localStorage.getItem('user');

    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const [dntReload, setDntReload] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/sell', {
            name: name.toUpperCase(), amount: parseInt(amount), price: Number(price)
        }, { headers: { user_id } })

        if (response.data.error) {
            alert(response.data.error);
        }

        if (!dntReload) {
            history.push('/profile')
        }
    }

    return (
        <div className="containerBuy">
        <div className='logo'>D-Wallet</div>

            <div className="content">
                <p>Insira as informações acerca de sua <strong>venda</strong></p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nome da ação:</label>
                    <input 
                        type="text"
                        id="name"
                        placeholder="Insira o nome da ação..."
                        onChange= {e => setName(e.target.value)}
                    />

                <div className="stockInfo">
                    <div className="indStock">
                        <label htmlFor="amount">Número de papeis:</label>
                        <input 
                            type="number"
                            id="amount"
                            placeholder="Número de papeis..."
                            onChange= {e => setAmount(e.target.value)}
                        />
                    </div>

                    <div className="indStock">
                        <label htmlFor="price">Preço da unidade (R$):</label>
                        <input 
                            type="number"
                            id="price"
                            step="0.001"
                            placeholder="Preço da unidade..."
                            onChange= {e => setPrice(e.target.value)}
                        />
                    </div>
                </div>

                <div className="dntReload">
                    <label>
                        <input 
                            type="checkbox"
                            name="dntReload"
                            id="dntReload"
                            onChange={e => {setDntReload(!dntReload)}}
                        />
                        <div>Marque caso serão vendidos vários tipos de ações</div>
                    </label>
                </div>

                <p><strong>Obs:</strong> Lembre-se de separar os centavos com <strong>ponto</strong></p>
                <button className="btn" type="submit">Cadastrar Venda</button>
                </form>
            </div>
        </div>
    )
}