// App.tsx
import React from 'react';
import ScatterPlot from './components/ScatterPlot';

const App: React.FC = () => {
  const data = [
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 50, y: 60 },
    { x: 60, y: 10 },
    { x: 70, y: 30 },
    { x: 80, y: 30 },
    { x: 90, y: 30 },

    // Add more data points as needed
  ];

  return (
    <div className="App">
      <h1 >Scatter Plot </h1>
      <ScatterPlot data={data} width={1000} height={500} />
    </div>
  );
}

export default App;
