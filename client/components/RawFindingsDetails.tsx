import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { trpc } from '../trpc';
import type { RawFinding } from '../../server/types.js';

interface RawFindingsDetailsProps {
  groupedFindingId: number;
}

const RawFindingsDetails: React.FC<RawFindingsDetailsProps> = ({ groupedFindingId }) => {
  const { data: rawFindings, isLoading, isError, error } = useQuery(
    trpc.findings.getRawFindingsByGroupId.queryOptions(
    { groupedFindingId },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes stale time
      refetchOnWindowFocus: false,
    }
  ));

  console.log("get Raw Findings Data by ID:", groupedFindingId);

  // Adjust colSpan to match the number of columns in the parent table (GroupedFindingsTable)
  if (isLoading) return <tr><td colSpan={6}>Loading raw findings...</td></tr>;
  if (isError) return <tr><td colSpan={6}>Error loading raw findings: {error?.message}</td></tr>;
  if (!rawFindings || rawFindings.length === 0) return <tr><td colSpan={6}>No raw findings associated with this group.</td></tr>;

  // display raw findings
  return (
    <tr>
      <td colSpan={6} style={{ paddingLeft: '30px', backgroundColor: '#f8f9fa' }}>
        <h4>Raw Findings:</h4>
        <ul>
          {rawFindings.map((finding: RawFinding) => (
            <li key={finding.id}>
              <strong>ID:</strong> {finding.id}, <strong>Tool:</strong> {finding.sourceSecurityToolName}, <strong>Asset:</strong> {finding.asset}, <strong>Severity:</strong> {finding.severity}, <strong>Status:</strong> {finding.status}
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default RawFindingsDetails;
