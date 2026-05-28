import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Step from './graficos/Step';
import Main from './main';

import Header from './header';
import reportWebVitals from './reportWebVitals';
import GraficoEstoqueQuantidade from './graficos/EstoqueProdutosQuantidade';
import GraficoEstoquePreco from './graficos/EstoqueProdutosPreco';
import ProdutoQuantidadeVenda from './graficos/VendaQuantidade';
import VendasBarChart from './graficos/VendaClienteQuantidadePreco';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header></Header>
    <h1>Despesas de contas</h1>
    <Step></Step>
    <Main></Main>
    <div className="inteiro1">
      <div className="grafico">
        <h1>Produto por quantidade no Estoque</h1>
        <h2>produto x quantidade</h2>
        <GraficoEstoqueQuantidade></GraficoEstoqueQuantidade>
      </div>
      <div className="grafico">
        <h1>Preco por Produto</h1>
        <h2>produto x preco</h2>
        <GraficoEstoquePreco></GraficoEstoquePreco>
      </div>
    </div>

    <div className="inteiro2">
      <div className="grafico">
        <h1>Quantidade de vendas</h1>
        <h2>Produto x Quantidade</h2>
        <ProdutoQuantidadeVenda></ProdutoQuantidadeVenda>
      </div>
      <div className="grafico">
        <h1>Venda por Cliente</h1>
        <h2>Cliente, Quantidade x Preco Unitario de Itens</h2>
        <VendasBarChart></VendasBarChart>
      </div>

    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
