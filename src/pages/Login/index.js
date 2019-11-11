import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit(e) {
      e.preventDefault();
  
      const response = await api.post('/sessions/authenticate', {
        password,
        email
      })
      
      if (response.data.error) {
        alert(response.data.error);
      }else{
        const { token } = response.data;

        localStorage.setItem('dwalletToken', token);
  
        history.push('/profile')
      }
    }

    return (
        <div className="containerLogin">
        <div className='logo'>D-Wallet</div>

            <div className="content">
                <p>Visualize e armazene <strong>ações</strong> da sua carteira de maneira <strong>fácil</strong> e <strong>rápida</strong>!</p>

                <form onSubmit = {handleSubmit}>
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

                <button className="btn" type="submit">Entrar</button>
                </form>
                <button className='btn2' onClick = {() => history.push('/register') }>Cadastrar</button>
            </div>
        </div>
    )
}