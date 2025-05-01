import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { GroupedFinding } from '../../server/types.js';

interface SeverityPieChartProps {
  data: GroupedFinding[];
  isLoading: boolean;
  isError: boolean;
}

// Define colors for severities
const SEVERITY_COLORS: Record<string, string> = {
  critical: '#dc3545', // Red
  high: '#fd7e14',     // Orange
  medium: '#ffc107',   // Yellow
  low: '#198754',      // Green
  informational: '#0dcaf0', // Cyan
};

const SeverityPieChart: React.FC<SeverityPieChartProps> = ({ data, isLoading, isError }) => {
  if (isLoading) return <div>Loading Chart...</div>;
  if (isError) return <div>Error loading chart data.</div>;
  if (!data || data.length === 0) return <div>No findings data available for chart.</div>;

  // Aggregate data by severity
  const severityCounts = data.reduce((acc, finding) => {
    const severity = finding.severity || 'Unknown'; // Handle potential null/undefined severity
    acc[severity] = (acc[severity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(severityCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Ensure consistent color mapping
  const colors = chartData.map(entry => SEVERITY_COLORS[entry.name] || '#cccccc'); // Default grey

  return (
    <div style={{ width: '500px', height: 300 }}>
      <h3 style={{textAlign: 'center'}}>Findings by Severity</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SeverityPieChart;
