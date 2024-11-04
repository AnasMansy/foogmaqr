import React, { useState, useEffect } from 'react';
import './home.css';
import MyChart from './MyChart';
import visitorsDataJson from './visitorsData.json';

function VisitorsTable() {
  const [visitorsData, setVisitorsData] = useState([]);
  const [currentVisitors, setCurrentVisitors] = useState(0); // State for current visitors
  const [lastVisitorTime, setLastVisitorTime] = useState(''); // State for last visitor time

  useEffect(() => {
    try {
      setVisitorsData(visitorsDataJson);
      updateCurrentVisitors(); // Initial calculation on mount
    } catch (error) {
      console.error("Error loading visitors data:", error);
    }
  }, []);

  // Update current visitors and last visitor entry time
  const updateCurrentVisitors = () => {
    const latestData = visitorsData[visitorsData.length - 1]; // Get the latest day's data
    if (latestData) {
      const totalToday = calculateDailyTotal(latestData);
      setCurrentVisitors(totalToday);
      setLastVisitorTime(latestData.lastVisitorTime); // Assuming you have lastVisitorTime in your data
    }
  };

  const calculateDailyTotal = (data) => {
    return (
      data.rightWing +
      data.leftWing +
      data.middleWing +
      data.financeBuilding +
      data.engineeringBuilding
    );
  };

  const calculateBuildingTotal = (building) => {
    return visitorsData.reduce((acc, data) => acc + data[building], 0);
  };

  const totalVisitors = calculateBuildingTotal('totalVisitors'); // Ensure you have totalVisitors in your data

  return (
    <div className="container">
      <h1 className="text-center">إحصائيات الزائرين حسب المباني والمكاتب</h1>
      <div className="card">
        <div className="card-body">
          {/* Display Current Visitors and Last Visitor Entry Time */}
          <div className="statistics">
            <div className="info-box">
              <span className="info-box-icon"><i className="fas fa-users"></i></span>
              <div className="info-box-content">
                <span className="info-box-text">عدد المتواجدين حاليا</span>
                <span className="info-box-number">{currentVisitors}</span>
              </div>
            </div>
            <div className="info-box">
              <span className="info-box-icon"><i className="fas fa-clock"></i></span>
              <div className="info-box-content">
                <span className="info-box-text">موعد آخر زائر دخل</span>
                <span className="info-box-number">{lastVisitorTime || 'غير متوفر'}</span>
              </div>
            </div>
            <div className="info-box">
              <span className="info-box-icon"><i className="fas fa-building"></i></span>
              <div className="info-box-content">
                <span className="info-box-text">عدد المباني</span>
                <span className="info-box-number">{visitorsData.length}</span>
              </div>
            </div>
            <div className="info-box">
              <span className="info-box-icon"><i className="fas fa-calendar-alt"></i></span>
              <div className="info-box-content">
                <span className="info-box-text">المتوسط اليومي</span>
                <span className="info-box-number">{(totalVisitors / visitorsData.length).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Chart Component */}
          <MyChart data={visitorsData} />

          {/* Display Visitors Data Table */}
          <table className="table">
            <thead>
              <tr>
                <th>اليوم</th>
                <th>الجناح الأيمن</th>
                <th>الجناح الأيسر</th>
                <th>الجناح الأوسط</th>
                <th>مبنى المالية</th>
                <th>المبنى الهندسي</th>
                <th>إجمالي الزوار</th>
              </tr>
            </thead>
            <tbody>
              {visitorsData.map((data, index) => (
                <tr key={index}>
                  <td>{data.day}</td>
                  <td>{data.rightWing}</td>
                  <td>{data.leftWing}</td>
                  <td>{data.middleWing}</td>
                  <td>{data.financeBuilding}</td>
                  <td>{data.engineeringBuilding}</td>
                  <td>{calculateDailyTotal(data)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6">الإجمالي الكلي</td>
                <td>{totalVisitors}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VisitorsTable;
