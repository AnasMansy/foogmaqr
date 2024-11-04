// src/pages/ReportsPage.js

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import './ReportsPage.css';

// Sample visitor data
const dummyVisitors = [
  { id: 1, name: 'علي', date: '2024-10-21', building: 'الجناح الايسر', office: '101', purpose: 'استعلام', newVisitor: true },
  { id: 2, name: 'فاطمة', date: '2024-10-20', building: 'الجناح الايمن', office: '202', purpose: 'زيارة', newVisitor: false },
  { id: 3, name: 'مايكل', date: '2024-10-22', building: 'الهندسية', office: '303', purpose: 'استعلام', newVisitor: true },
  { id: 4, name: 'ليندا', date: '2024-10-23', building: 'المالية', office: '404', purpose: 'زيارة', newVisitor: false },
  { id: 5, name: 'هند', date: '2024-10-22', building: 'الجناح الايسر', office: '101', purpose: 'استعلام', newVisitor: true },
  { id: 6, name: 'جورج', date: '2024-10-15', building: 'الهندسية', office: '303', purpose: 'اجتماع', newVisitor: false },
  { id: 7, name: 'سارة', date: '2024-10-10', building: 'الجناح الايمن', office: '202', purpose: 'زيارة', newVisitor: true },
  { id: 8, name: 'علياء', date: '2024-09-30', building: 'الهندسية', office: '303', purpose: 'استعلام', newVisitor: false },
  { id: 9, name: 'كريم', date: '2024-08-25', building: 'المالية', office: '404', purpose: 'اجتماع', newVisitor: true },
  { id: 10, name: 'جمال', date: '2024-07-15', building: 'الجناح الايسر', office: '101', purpose: 'زيارة', newVisitor: false },
];

const ReportsPage = () => {
  const [reportType, setReportType] = useState('daily');
  const [visitorStats, setVisitorStats] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);

  const generateReport = () => {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    // Determine the date range based on the selected report type
    switch (reportType) {
        case 'daily':
            startDate.setHours(0, 0, 0, 0); // Set to start of the day
            endDate.setHours(23, 59, 59, 999); // Set to end of the day
            break;
        case 'weekly':
            const firstDayOfWeek = today.getDate() - today.getDay() - 7; // Last week's start (Sunday)
            startDate.setDate(firstDayOfWeek);
            endDate.setDate(firstDayOfWeek + 6); // Last week's end
            break;
        case 'monthly':
            startDate.setMonth(today.getMonth() - 1); // Last month
            startDate.setDate(1); // Start of last month
            endDate.setMonth(today.getMonth()); // This month
            endDate.setDate(0); // Last day of last month
            break;
        case 'quarterly':
            const currentQuarter = Math.floor(today.getMonth() / 3); // Current quarter
            startDate.setMonth(currentQuarter * 3 - 3); // Start of last quarter
            startDate.setDate(1);
            endDate.setMonth(currentQuarter * 3); // End of last quarter
            endDate.setDate(0); // Last day of last quarter
            break;
        case 'yearly':
            startDate.setFullYear(today.getFullYear() - 1); // Last year
            startDate.setDate(1); // Start of last year
            endDate.setFullYear(today.getFullYear()); // This year
            endDate.setDate(0); // Last day of last year
            break;
        default:
            break;
    }

    // Filter visitors based on the calculated date range
    const filtered = dummyVisitors.filter(visitor => {
        const visitorDate = new Date(visitor.date);
        return visitorDate >= startDate && visitorDate <= endDate;
    });

    setFilteredVisitors(filtered);
    generateStatistics(filtered); // Generate statistics after filtering
};


  const generateStatistics = (visitors) => {
    const buildingStats = {};
    const officeStats = {};
    const purposeStats = {};
    const dailyVisitorCount = {};

    let newVisitorCount = 0;
    let totalVisitors = visitors.length;

    visitors.forEach(visitor => {
      // Count visits for each building
      buildingStats[visitor.building] = (buildingStats[visitor.building] || 0) + 1;
      // Count visits for each office
      officeStats[visitor.office] = (officeStats[visitor.office] || 0) + 1;
      // Count purpose of visit
      purposeStats[visitor.purpose] = (purposeStats[visitor.purpose] || 0) + 1;
      // Count new vs returning visitors
      if (visitor.newVisitor) newVisitorCount++;

      // Count visitors over time for daily statistics
      const visitorDate = visitor.date;
      dailyVisitorCount[visitorDate] = (dailyVisitorCount[visitorDate] || 0) + 1;
    });

    // Format statistics for charts
    const buildingData = Object.entries(buildingStats).map(([building, count]) => ({ building, count }));
    const officeData = Object.entries(officeStats).map(([office, count]) => ({ office, count }));
    const purposeData = Object.entries(purposeStats).map(([purpose, count]) => ({ purpose, count }));
    const dailyData = Object.entries(dailyVisitorCount).map(([date, count]) => ({ date, count }));

    setVisitorStats({
      buildingData,
      officeData,
      purposeData,
      dailyData,
      totalVisitors,
      newVisitorCount
    });
  };

  return (
    <div className="reports-container">

      <div className="report-type-selection">
        <h2>توليد التقارير والإحصائيات</h2>
        <div className="type">
          <label>
            <input
              type="radio"
              value="daily"
              checked={reportType === 'daily'}
              onChange={(e) => setReportType(e.target.value)}
            />
            يومي
          </label>
          <label>
            <input
              type="radio"
              value="weekly"
              checked={reportType === 'weekly'}
              onChange={(e) => setReportType(e.target.value)}
            />
            أسبوعي
          </label>
          <label>
            <input
              type="radio"
              value="monthly"
              checked={reportType === 'monthly'}
              onChange={(e) => setReportType(e.target.value)}
            />
            شهري
          </label>
          <label>
            <input
              type="radio"
              value="quarterly"
              checked={reportType === 'quarterly'}
              onChange={(e) => setReportType(e.target.value)}
            />
            ربع سنوي
          </label>
          <label>
            <input
              type="radio"
              value="yearly"
              checked={reportType === 'yearly'}
              onChange={(e) => setReportType(e.target.value)}
            />
            سنوي
          </label>
        </div>

        <button onClick={generateReport} className="generate-button">توليد التقرير</button>
        <div className="report-results">
          <h5>إجمالي الزوار: {visitorStats.totalVisitors}</h5>
          <h5>عدد الزوار الجدد: {visitorStats.newVisitorCount}</h5>
        </div>
      </div>



      <div className="charts-container">
        {/* Building Statistics Chart */}
        <div className="chart-section">
          <h5>إحصائيات الزوار حسب المباني:</h5>
          <BarChart width={400}height={300} data={visitorStats.buildingData}>
            <XAxis dataKey="building" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Office Statistics Chart */}
        <div className="chart-section">
          <h5>إحصائيات الزوار حسب المكاتب:</h5>
          <BarChart  width={400}height={300} data={visitorStats.officeData}>
            <XAxis dataKey="office" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Purpose of Visit Chart */}
        <div className="chart-section">
          <h5>أغراض الزيارة:</h5>
          <BarChart width={400}height={300} data={visitorStats.purposeData}>
            <XAxis dataKey="purpose" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#ffc658" />
          </BarChart>
        </div>

        {/* Daily Visitors Line Chart */}
        <div className="chart-section">
          <h5>عدد الزوار يومياً:</h5>
          <LineChart width={400}height={300} data={visitorStats.dailyData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
