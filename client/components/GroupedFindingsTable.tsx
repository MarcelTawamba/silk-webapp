import React, { useState } from 'react';
import type { GroupedFinding } from '../../server/types.js'; // Adjust path if needed
import RawFindingsDetails from './RawFindingsDetails'; // Adjust path if needed

interface GroupedFindingsTableProps {
  data: GroupedFinding[];
  isLoading: boolean;
  isError: boolean;
}

const GroupedFindingsTable: React.FC<GroupedFindingsTableProps> = ({ data, isLoading, isError }) => {
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const handleRowClick = (id: number) => {
    setExpandedRowId(prevId => (prevId === id ? null : id)); // Toggle expansion
  };

  if (isLoading) return <div>Loading Table...</div>;
  if (isError) return <div>Error loading table data.</div>;
  if (!data || data.length === 0) return <div>No grouped findings data available.</div>;

  // Basic table styling (consider using a CSS framework or styled-components)
  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
  const thStyle: React.CSSProperties = { border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2' };
  const tdStyle: React.CSSProperties = { border: '1px solid #ddd', padding: '8px' };
  const clickableRowStyle: React.CSSProperties = { cursor: 'pointer' };

  return (
    <div>
      <h3>Grouped Findings</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Severity</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Owner</th>
            <th style={thStyle}>SLA</th>
          </tr>
        </thead>
        <tbody>
          {data.map((finding) => (
            <React.Fragment key={finding.id}>
              <tr
                onClick={() => handleRowClick(finding.id)}
                style={{ ...clickableRowStyle, ...(expandedRowId === finding.id ? { backgroundColor: '#e9ecef' } : {}) }}
                title="Click to expand/collapse raw findings"
              >
                <td style={tdStyle}>{finding.id}</td>
                <td style={tdStyle}>{finding.severity}</td>
                <td style={tdStyle}>{finding.description}</td>
                <td style={tdStyle}>{finding.status}</td>
                <td style={tdStyle}>{finding.owner}</td>
                <td style={tdStyle}>{finding.sla}</td>
                {/* Add more cells corresponding to headers */}
              </tr>
              {expandedRowId === finding.id && (
                <RawFindingsDetails groupedFindingId={finding.id} />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GroupedFindingsTable;
