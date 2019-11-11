import React, { useState } from 'react';
import api from '../../services/api'

export default function SignUp({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/sessions/register', {
            name,
            email,
            password
        })

        if (response.data.error) {
            alert(response.data.error);
        }else{
            history.push('/');
        }
    }

    return (
        <div className="containerLogin">
            <div className='logo'>D-Wallet</div>

            <div className="content">
                <p>Cadastre-se <strong>gratuitamente</strong> agora!</p>

                <form onSubmit = {handleSubmit}>
                    <label htmlFor="name">Nome *</label>
                    <input 
                    type="name" 
                    id="name" 
                    placeholder="Seu nome..."
                    onChange = {e => setName(e.target.value)}
                    />

                    <label htmlFor="email">Email *</label>
                    <input 
                    type="email" 
                    id="email" 
                    placeholder="Seu email..."
                    onChange = {e => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Senha *</label>
                    <input 
                    type="password" 
                    id="password" 
                    placeholder="Sua senha..."
                    onChange = {e => setPassword(e.target.value)}
                    />

                    <button className='btn' onSubmit={handleSubmit}>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}