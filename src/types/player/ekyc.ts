export type EkycResponse = {
  success: boolean;
  message: string;
  result: EkycResult;
};

export type EkycPayload = {
  userId: string;
  status: string;
  birthPlace: string;
  birthDate: string;
  age: string;
};

export type EkycResult = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  mobile: string;
  type: string;
  status: string;
  birthPlace: string;
  birthDate: string;
  age: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type EkycId = {
  documentFront: File;
  documentBack: File;
};
export type EkycIdResponse = {
  success: boolean;
  message: string;
  result: {
    id: string;
    ekycId: string;
    frontPath: string;
    backPath: string;
    status: "pending" | "approved" | "rejected" | string;
    createdAt: string;
    updatedAt: string;
  };
};
export interface EkycGetResponseType {
  ekycId: string;
  userId: string;
  status: string;
  meta: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  idId: string;
  frontPath: string;
  backPath: string;
  idStatus: string;
  type: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthPlace: string;
  birthDate: string;
  nationality: string;
  natureOfWork: string;
  selfieId: string;
  filePath: string;
  selfieMeta: string;
  selfieCreatedAt: string;
  selfieUpdatedAt: string;
}
