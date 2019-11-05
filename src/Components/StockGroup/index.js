import React from 'react';
import './style.css';

export default function StockGroup({ stock, history }) {
    function handleClick(e) {
        e.preventDefault();

        history.push(`/stocks/${stock.name.toLowerCase()}`)
    }

    function getRightValue(x) {
        if (x) {
            return x.toFixed(2);
        }else {
            return 0;
        }
    }

  return (
      <div className="stockGroup">
          <div className="nameSpace">
              <div>{stock.name}</div>
          </div>
          
          <div style={{ backgroundColor: stock.profit>0 ? 'rgb(34, 177, 76)' : '#ff6961' }}className="profitSpace">
              <div>R${getRightValue(stock.profit)}</div>
          </div>

          <div className="amountSpace">
              <label>Número de papeis</label>
              <div>{stock.amount}</div>
          </div>

          <div className="marketValuesSpace">
            <label className="titleMVSpace">Valores de mercado</label>
              
            <label className="min">min</label>
            <div className='MVSpace-price1'>R${getRightValue(stock.minMarketValue)}</div>
            
            <label className="max">máx</label>
            <div className='MVSpace-price2'>R${getRightValue(stock.maxMarketValue)}</div>
          </div>

          <div className="maxBoughtSpace">
              <label>Valor de compra</label>
              <label className="max">máx</label>
              <div>R${getRightValue(stock.maxValue)}</div>
          </div>

          <div className="moneySpace">
              <label>Montante</label>
              <div>R${getRightValue(stock.amount * stock.marketValue)}</div>
          </div>

          <div className="avaragePriceSpace">
              <label>Preço médio</label>
              <div>R${getRightValue(stock.avaragePrice)}</div>
          </div>

          <div className="lastLineSpace">
              <div>
                  <label>Valor de mercado atual</label>
                  <div>R${getRightValue(stock.marketValue)}</div>
              </div>

              <button onClick={handleClick}>Saiba mais</button>
          </div>
      </div>
  );
}
