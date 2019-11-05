import React, { useState } from 'react';
import api from '../../services/api'

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    
    async function handleSubmit(e) {
      e.preventDefault();
  
      const response = await api.post('/sessions', {
        name,
        email
      })
  
      const { _id } = response.data;
  
      localStorage.setItem('user', _id);

      history.push('/profile')
    }

    return (
        <div className="containerLogin">
        <div className='logo'>D-Wallet</div>

            <div className="content">
                <p>Visualize e armazene <strong>ações</strong> da sua carteira de maneira <strong>fácil</strong> e <strong>rápida</strong>!</p>

                <form onSubmit = {handleSubmit}>
                <label htmlFor="name">Nome *</label>
                <input 
                    type="text" 
                    id="name" 
                    placeholder="Seu nome..."
                    onChange = {e => setName(e.target.value)}
                />

                <label htmlFor="email">E-mail *</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Seu e-mail..."
                    onChange = {e => setEmail(e.target.value)}
                />

                <button className="btn" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    )
}