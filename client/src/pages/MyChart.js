import React from 'react';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically registers Chart.js components


function MyChart() {
    // Sample data for the Line Chart
    const lineData = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
      datasets: [
        {
          label: 'Visitors',
          data: [120, 100, 140, 170, 130],
          fill: false,
          backgroundColor: 'rgba(75, 192, 192, 1)',
          borderColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    };
  
    // Sample data for the Bar Chart
    const barData = {
      labels: ['Finance', 'Engineering', 'HR', 'Sales', 'Marketing'],
      datasets: [
        {
          label: 'Department Visitors',
          data: [50, 75, 100, 60, 90],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
      ],
    };
  
    // Sample data for the Pie Chart
    const pieData = {
      labels: ['Direct', 'Referral', 'Social', 'Email'],
      datasets: [
        {
          label: 'Traffic Sources',
          data: [300, 50, 100, 75],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 205, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
          ],
        },
      ],
    };
  
    // Sample data for the Doughnut Chart
    const doughnutData = {
      labels: ['Online', 'Offline'],
      datasets: [
        {
          label: 'Sales Distribution',
          data: [70, 30],
          backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 206, 86, 0.6)'],
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Various Charts',
        },
      },
    };
  
    return (
      <div className="container">
        <h3 className="text-center">احصائيات اليوم</h3>
  
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Line Chart</h3>
              </div>
              <div className="card-body">
                <Line data={lineData} options={options} />
              </div>
            </div>
          </div>
  
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Bar Chart</h3>
              </div>
              <div className="card-body">
                <Bar data={barData} options={options} />
              </div>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Pie Chart</h3>
              </div>
              <div className="card-body">
                <Pie data={pieData} options={options} />
              </div>
            </div>
          </div>
  
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Doughnut Chart</h3>
              </div>
              <div className="card-body">
                <Doughnut data={doughnutData} options={options} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default MyChart;
  