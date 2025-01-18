import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Statistics = ({ records }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (records.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      const labels = records.map((record) => record.date); // Assuming records include a `date` field
      const data = records.map((record) => record.amount); // Assuming records include an `amount` field

      new Chart(ctx, {
        type: 'bar', // Use 'line', 'bar', or another chart type
        data: {
          labels,
          datasets: [
            {
              label: 'Financial Data',
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Financial Statistics',
            },
          },
        },
      });
    }
  }, [records]);

  return (
    <div className="statistics-container">
      <h2>Financial Statistics</h2>
      {records.length === 0 ? <p>No data available for statistics.</p> : <canvas ref={chartRef}></canvas>}
    </div>
  );
};

export default Statistics;
