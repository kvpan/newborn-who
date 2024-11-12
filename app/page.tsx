"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

const expectedWeightZScore = [
  {
    "Week": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    "SD0": [3.2, 3.3, 3.6, 3.8, 4.1, 4.3, 4.6, 4.8, 5, 5.2, 5.4, 5.5, 5.7, 5.8],
    "SD1": [3.7, 3.9, 4.1, 4.4, 4.7, 5, 5.2, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 6.6],
    "SD2": [4.2, 4.4, 4.7, 5, 5.4, 5.7, 6, 6.2, 6.5, 6.7, 6.9, 7.1, 7.3, 7.5],
    "SD3": [4.8, 5.1, 5.4, 5.7, 6.1, 6.5, 6.8, 7.1, 7.3, 7.6, 7.8, 8.1, 8.3, 8.5],
    "SD-1": [2.8, 2.9, 3.1, 3.3, 3.6, 3.8, 4, 4.2, 4.4, 4.6, 4.7, 4.9, 5, 5.1],
    "SD-2": [2.4, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.8, 4, 4.1, 4.3, 4.4, 4.5],
    "SD-3": [2, 2.1, 2.3, 2.5, 2.7, 2.9, 3, 3.2, 3.3, 3.5, 3.6, 3.8, 3.9, 4],
  },
  {
    "Week": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    "SD0": [3.3, 3.5, 3.8, 4.1, 4.4, 4.7, 4.9, 5.2, 5.4, 5.6, 5.8, 6, 6.2, 6.4],
    "SD1": [3.9, 4, 4.3, 4.7, 5, 5.3, 5.6, 5.9, 6.1, 6.4, 6.6, 6.8, 7, 7.2],
    "SD2": [4.4, 4.6, 4.9, 5.3, 5.7, 6, 6.3, 6.6, 6.9, 7.2, 7.4, 7.6, 7.8, 8],
    "SD3": [5, 5.3, 5.6, 6, 6.4, 6.8, 7.2, 7.5, 7.8, 8, 8.3, 8.5, 8.8, 9],
    "SD-1": [2.9, 3, 3.2, 3.5, 3.8, 4.1, 4.3, 4.6, 4.8, 5, 5.2, 5.3, 5.5, 5.7],
    "SD-2": [2.5, 2.6, 2.8, 3.1, 3.3, 3.5, 3.8, 4, 4.2, 4.4, 4.5, 4.7, 4.9, 5],
    "SD-3": [2.1, 2.2, 2.4, 2.6, 2.9, 3.1, 3.3, 3.5, 3.7, 3.8, 4, 4.2, 4.3, 4.4],
  }
];

const expectedWeightPercentile = [
  {
    "Week": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    "P3": [2.4, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.9, 4.1, 4.2, 4.3, 4.5, 4.6],
    "P10": [2.7, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.2, 4.4, 4.5, 4.7, 4.8, 5],
    "P15": [2.8, 2.9, 3.1, 3.3, 3.5, 3.8, 4, 4.2, 4.4, 4.5, 4.7, 4.8, 5, 5.1],
    "P50": [3.2, 3.3, 3.6, 3.8, 4.1, 4.3, 4.6, 4.8, 5, 5.2, 5.4, 5.5, 5.7, 5.8],
    "P85": [3.7, 3.9, 4.1, 4.4, 4.7, 5, 5.3, 5.5, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7],
    "P90": [3.9, 4, 4.3, 4.6, 4.9, 5.2, 5.4, 5.7, 5.9, 6.1, 6.3, 6.5, 6.7, 6.9],
    "P97": [4.2, 4.4, 4.6, 5, 5.3, 5.6, 6, 6.2, 6.5, 6.6, 6.8, 7, 7.2, 7.4],
  },
  {
    "Week": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    "P3": [2.5, 2.6, 2.8, 3.1, 3.4, 3.6, 3.8, 4.1, 4.3, 4.4, 4.6, 4.8, 4.9, 5.1],
    "P10": [2.8, 2.9, 3.1, 3.4, 3.7, 3.9, 4.2, 4.4, 4.6, 4.8, 5, 5.2, 5.3, 5.5],
    "P15": [2.9, 3, 3.2, 3.5, 3.8, 4.1, 4.3, 4.5, 4.7, 4.9, 5.1, 5.3, 5.5, 5.6],
    "P50": [3.3, 3.5, 3.8, 4.1, 4.4, 4.7, 4.9, 5.2, 5.4, 5.6, 5.8, 6, 6.2, 6.4],
    "P85": [3.9, 4, 4.3, 4.7, 5, 5.3, 5.6, 5.9, 6.2, 6.4, 6.6, 6.8, 7, 7.2],
    "P90": [4, 4.2, 4.5, 4.8, 5.2, 5.5, 5.8, 6.1, 6.3, 6.6, 6.8, 7, 7.2, 7.4],
    "P97": [4.3, 4.5, 4.9, 5.2, 5.6, 5.9, 6.3, 6.5, 6.8, 7.1, 7.3, 7.5, 7.7, 7.9]
  }
]

export default function Home() {
  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Crescimento esperado para recém nascidos: 0 a 6 meses
        </h1>
        Fonte: <a href="https://www.who.int/tools/child-growth-standards/standards/" className="underline">WHO Child Growth Standards</a>
      </div>
      <WeightChart />
    </div>
  );
}

function WeightChart() {
  const [sex, setSex] = useState(0);
  const [weights, setWeights] = useState<number[]>(Array(14).fill(0));

  const handleWeightChange = (index: number, value: string) => {
    const newWeights = [...weights];
    newWeights[index] = parseFloat(value) || 0;
    setWeights(newWeights);
  };

  const handleSexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSex(parseInt(event.target.value));
  };

  return (
    <div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Sexo
      </h2>
      <div>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input type="radio" name="sex" value="0" checked={sex === 0} onChange={handleSexChange} className="mr-2" />
            Menina
          </label>
          <label className="flex items-center">
            <input type="radio" name="sex" value="1" checked={sex === 1} onChange={handleSexChange} className="mr-2" />
            Menino
          </label>
        </div>
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Peso a cada semana (em kg)
      </h2>
      <div>
        {weights.map((_, i) => (
          <input
            type="number"
            id={`week-${i}`}
            key={`week-${i}`}
            className="rounded border p-2 w-20"
            placeholder={i.toString()}
            step="0.01"
            onChange={(e) => handleWeightChange(i, e.target.value)}
          />
        ))}
      </div>
      <Plot layout={{ title: "Médias" }}
        data={[
          { x: expectedWeightZScore[sex]["Week"], y: weights.map((w) => w === 0 ? null : w), type: "scatter", mode: "markers", name: "Peso" },
          { x: expectedWeightZScore[sex]["Week"], y: expectedWeightZScore[sex]["SD3"], type: "scatter", mode: "lines", name: "+3" },
          { x: expectedWeightZScore[sex]["Week"], y: expectedWeightZScore[sex]["SD2"], type: "scatter", mode: "lines", name: "+2" },
          { x: expectedWeightZScore[sex]["Week"], y: expectedWeightZScore[sex]["SD1"], type: "scatter", mode: "lines", name: "+1" },
          { x: expectedWeightZScore[sex]["Week"], y: expectedWeightZScore[sex]["SD0"], type: "scatter", mode: "lines", name: "Média" },
          { x: expectedWeightZScore[sex]["Week"], y: expectedWeightZScore[sex]["SD-1"], type: "scatter", mode: "lines", name: "-1" },
          { x: expectedWeightZScore[sex]["Week"], y: expectedWeightZScore[sex]["SD-2"], type: "scatter", mode: "lines", name: "-2" },
          { x: expectedWeightZScore[sex]["Week"], y: expectedWeightZScore[sex]["SD-3"], type: "scatter", mode: "lines", name: "-3" },
        ]} />
      <Plot layout={{ title: "Percentis" }}
        data={[
          { x: expectedWeightPercentile[sex]["Week"], y: weights.map((w) => w === 0 ? null : w), type: "scatter", mode: "markers", name: "Peso" },
          { x: expectedWeightPercentile[sex]["Week"], y: expectedWeightPercentile[sex]["P97"], type: "scatter", mode: "lines", name: "97" },
          { x: expectedWeightPercentile[sex]["Week"], y: expectedWeightPercentile[sex]["P90"], type: "scatter", mode: "lines", name: "90" },
          { x: expectedWeightPercentile[sex]["Week"], y: expectedWeightPercentile[sex]["P85"], type: "scatter", mode: "lines", name: "85" },
          { x: expectedWeightPercentile[sex]["Week"], y: expectedWeightPercentile[sex]["P50"], type: "scatter", mode: "lines", name: "50" },
          { x: expectedWeightPercentile[sex]["Week"], y: expectedWeightPercentile[sex]["P15"], type: "scatter", mode: "lines", name: "15" },
          { x: expectedWeightPercentile[sex]["Week"], y: expectedWeightPercentile[sex]["P10"], type: "scatter", mode: "lines", name: "10" },
          { x: expectedWeightPercentile[sex]["Week"], y: expectedWeightPercentile[sex]["P3"], type: "scatter", mode: "lines", name: "3" },
        ]} />
    </div>
  );
}
