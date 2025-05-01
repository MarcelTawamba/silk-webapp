import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../trpc';
import GroupedFindingsTable from './GroupedFindingsTable';
import SeverityPieChart from './SeverityPieChart';

const Dashboard: React.FC = () => {
  const { data: groupedFindings, isLoading, isError, error } = useQuery(
    trpc.findings.getGroupedFindings.queryOptions( // Pass queryOptions
    undefined,
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true, // Optional: refetch when user returns
    }
  ));

  // Basic layout styling
  const dashboardStyle: React.CSSProperties = { 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px', 
    padding: '20px' 
  };

  const chartContainerStyle: React.CSSProperties = { 
    margin: '0 auto' 
  };

  if (error) {
      console.error("Error fetching grouped findings:", error);
  }

  return (
    <div style={dashboardStyle}>
      <h1 style={{ textAlign: 'center', marginTop: '-250px' }}>Findings Dashboard</h1>

      <div style={chartContainerStyle}>
        <SeverityPieChart
          data={groupedFindings ?? []}
          isLoading={isLoading}
          isError={isError}
        />
      </div>

      <div>
        <GroupedFindingsTable
          data={groupedFindings ?? []}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default Dashboard;
