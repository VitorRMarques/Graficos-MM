import { Bar, BarChart, Rectangle, Tooltip, XAxis, YAxis, usePlotArea } from 'recharts';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';

type VendaRow = {
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
  clienteNome: string;
};

type DataPoint = {
  label: string;
  quantidade: number;
  preco: number;
};

const AnimatedShape = (props: any) => {
  return (
    <>
      <Rectangle {...props} fill="transparent" />
      <Rectangle
        {...props}
        fill="#6366F1"
        style={{
          transform: props.isActive ? undefined : `scaleX(20%)`,
          transformOrigin: `${props.x}px center`,
          transition: 'all 0.2s ease-out',
          pointerEvents: 'none',
        }}
      />
    </>
  );
};

const BottomTooltip = () => {
  const plotArea = usePlotArea();
  if (plotArea == null) return null;
  return (
    <Tooltip
      cursor={false}
      position={{ y: plotArea.y + plotArea.height - 100 }}
      formatter={(value, name) => [
        value,
        name === 'quantidade' ? 'Quantidade' : 'Preço Unitário (R$)',
      ]}
    />
  );
};

// agrupa por: 'cliente — produto'
function agrupar(rows: VendaRow[]): DataPoint[] {
  return rows.map(row => ({
    label: `${row.clienteNome} — ${row.nomeProduto}`,
    quantidade: row.quantidade,
    preco: row.precoUnitario,
  }));
}

export default function VendasBarChart({
  isAnimationActive = true,
}: {
  readonly isAnimationActive?: boolean;
}) {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch('vendas.csv')
      .then(res => res.text())
      .then(csv => {
        const limpo = csv.replace(/^\uFEFF/, '');
        const resultado = Papa.parse<VendaRow>(limpo, {
          header: true,
          delimiter: ';',
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        setData(agrupar(resultado.data));
      });
  }, []);

  return (
    <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      barCategoryGap={4}
    >
      <XAxis
        dataKey="label"
        mirror
        padding={{ right: 30 }}
        interval={0}
        tick={{ fontSize: 10, angle: -20, textAnchor: 'end' }}
      />
      <YAxis
        mirror
        orientation="right"
        tickLine={false}
        tick={{ angle: 90, textAnchor: 'start' }}
        padding={{ bottom: 30 }}
      />

      {/* Barra de quantidade */}
      <Bar
        dataKey="quantidade"
        isAnimationActive={isAnimationActive}
        activeBar={AnimatedShape}
        shape={AnimatedShape}
        label={{ fill: 'white', position: 'insideTopRight', angle: 90, textAnchor: 'start' }}
      />

      {/* Barra de preço — cor diferente */}
      <Bar
        dataKey="preco"
        isAnimationActive={isAnimationActive}
        activeBar={(props: any) => (
          <>
            <Rectangle {...props} fill="transparent" />
            <Rectangle
              {...props}
              fill="#F59E0B"
              style={{
                transform: props.isActive ? undefined : `scaleX(20%)`,
                transformOrigin: `${props.x}px center`,
                transition: 'all 0.2s ease-out',
                pointerEvents: 'none',
              }}
            />
          </>
        )}
        shape={(props: any) => (
          <Rectangle {...props} fill="#F59E0B" />
        )}
        label={{ fill: 'white', position: 'insideTopRight', angle: 90, textAnchor: 'start' }}
      />
      <BottomTooltip />
    </BarChart>
  );
}