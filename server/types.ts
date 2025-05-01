export interface GroupedFinding {
  id: number;
  groupingType: string;
  groupingKey: string;
  severity: string;
  groupedFindingCreated: string;
  sla: string;
  description: string;
  securityAnalyst: string;
  owner: string;
  workflow: string;
  status: string;
  progress: number;
}

export interface RawFinding {
  id: number;
  groupedFindingId: number;
  sourceSecurityToolName: string;
  sourceSecurityToolId: string;
  sourceCollaborationToolName: string;
  sourceCollaborationToolId: string;
  severity: string;
  findingCreated: string;
  ticketCreated: string;
  description: string;
  asset: string;
  status: string;
  remediationUrl: string;
  remediationText: string;
}
