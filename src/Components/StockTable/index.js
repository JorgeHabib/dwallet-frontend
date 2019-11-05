import React from 'react';
import './style.css'


export default function StockTable({ stocks }){
    
    function getRightValue(x) {
        if (x) {
            return x.toFixed(2);
        }else {
            return 0;
        }
    }

    return (
        <table className="tabelaCV">
            <thead className="tabelaCabecalho">
                <tr>
                    <th>Data</th>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody className="tabelaCorpo">
                {stocks.map(stock => (
                    <tr className="tabelaLinha" key={stock._id}>
                        <td>{(stock.date)}</td>
                        <td>{stock.name}</td>
                        <td style={ {textAlign: 'center'} }>{stock.amount}</td>
                        <td>R${getRightValue(stock.price)}</td>
                        <td>R${getRightValue(stock.amount*stock.price)}</td>
                    </tr>
                ))}
            </tbody>
        </table> 
  );
}
