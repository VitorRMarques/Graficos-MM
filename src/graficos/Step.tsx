import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import {
  CartesianGrid, Legend, Line, LineChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

export default function ProdutosVendidos() {
  const [data, setData] = useState<{ name: string; price: number }[]>([])

  useEffect(() => {
    fetch('/despesa.csv').then(res => res.text()).then(csv => {
      const resultado = Papa.parse(csv, {
        header: true,
        delimiter: ';',
        dynamicTyping: true,
        skipEmptyLines: true,
      })
      const formatado = resultado.data.map((row: any) => ({
        name: row.Descricao,
        price: row.Valor,
      }))
      setData(formatado)
    })
  }, [])

  return (
    <div className='graficos'>
      {/* ✅ ResponsiveContainer cuida do tamanho */}
      <ResponsiveContainer width="100%" aspect={1.618} maxHeight={600}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid stroke="#424141" strokeDasharray="5 5" />
          <XAxis dataKey="name" height={50} />
          <YAxis label={{ value: 'Preço', position: 'insideLeft', angle: -90 }} />
          {/* ✅ dataKey corrigido de "uv" para "price" */}
          <Line type="monotone" dataKey="price" stroke="purple" strokeWidth={2} name="Preço unitário" />
          <Legend align="right" />
          <Tooltip />
          <RechartsDevtools />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}