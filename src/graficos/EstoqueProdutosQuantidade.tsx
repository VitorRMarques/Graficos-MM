import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { RechartsDevtools } from '@recharts/devtools'

const margin = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 25,
}

const formatAxisTick = (value: any): string => {
  return `*${value}`
}

const renderCustomBarLabel = ({ x, y, width, value }: any) => {
  return (
    <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
      {value}
    </text>
  )
}

export default function GraficoEstoqueQuantidade() {
  // ✅ Hooks DENTRO do componente
  const [data, setData] = useState<{ name: string; quantidade: number }[]>([])

  useEffect(() => {
    fetch('/estoque.csv')
      .then(res => res.text())
      .then(csv => {
        const resultado = Papa.parse(csv, {
          header: true,
          delimiter: ';',
          dynamicTyping: true,
          skipEmptyLines: true,
        })
        const formatado = resultado.data.map((row: any) => ({
          name: row.nome,
          quantidade: row.quantidade,
        }))
        setData(formatado)
      })
  }, [])

  return (
    <div className='barras'>
      {/* ✅ BarChart como container, não Bar */}
      <BarChart width={600} height={300} data={data} margin={margin}>
        <XAxis
          dataKey="name"
          tickFormatter={formatAxisTick}
          label={{ position: 'insideBottomRight', value: 'Produto', offset: -10 }}
        />
        <YAxis
          label={{ position: 'insideTopLeft', value: 'Quantidade', angle: -90, dy: 60 }}
        />
        <Bar dataKey="quantidade" fill="#8884d8" label={renderCustomBarLabel} />
        <RechartsDevtools />
      </BarChart>
    </div>
  )
}