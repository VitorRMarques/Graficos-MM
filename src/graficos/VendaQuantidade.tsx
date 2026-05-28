import { Cell, Pie, PieChart, Tooltip } from 'recharts'
import Papa from 'papaparse'
import { useEffect, useState } from 'react'

const COLORS = ['#6366F1', '#21693b', '#F59E0B', '#882d2d', '#3B82F6']


type VendaRow = {
  nomeProduto: string
  quantidade: number
}

export default function ProdutoQuantidadeVenda({
  isAnimationActive = true,
}: {
  readonly isAnimationActive?: boolean
}) {
  const [data, setData] = useState<{ name: string; quantidade: number }[]>([])
  const total = data.reduce((sum, item) => sum + item.quantidade, 0)

  useEffect(() => {
    fetch('vendas.csv')
      .then(res => res.text())
      .then(csv => {
        const resultado = Papa.parse<VendaRow>(csv, {
          header: true,
          delimiter: ';',
          dynamicTyping: true,
          skipEmptyLines: true,
        })

        const formatado = resultado.data.map(row => ({
          name: row.nomeProduto,       // era row.name — coluna correta é nomeProduto
          quantidade: row.quantidade,
        }))

        setData(formatado)
      })
  }, [])

  return (
    <div className="barras">
      <PieChart width={400} height={400}>
      <Pie
        data={data}
        dataKey="quantidade"          // era 'uv' — dataKey correto é quantidade
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        isAnimationActive={isAnimationActive}
        label={({ name, value}) => `${name} (${(value / total).toFixed(0)}%)`}
        labelLine={true}
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </div>
  )
}