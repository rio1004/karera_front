export type AuditResponse = {
  audits: Audit[];
  limit: number;
  offset: number;
  totalRows: number;
};

export type Audit = {
  id: number;
  userId: number;
  meta: AuditMeta;
  createdAt: string;
  fullName: string;
};

export type AuditMeta = {
  User: string;
  Module: string;
  Target: string;
  Timestamp: string;
  ActionType: string;
};

export type AuditPayload = {
  userId: number;
  meta: {
    Timestamp: string; 
    User: string; 
    ActionType: string;
    Module: string; 
    Target: string;
  };
};
