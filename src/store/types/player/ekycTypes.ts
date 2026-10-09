export interface EKYCTypes {
  capturedImage: string;
  setCapturedImage: (value: string) => void;
  frontImage?: string;
  backImage?: string;
  setFrontImage: (image: string) => void;
  setBackImage: (image: string) => void;
  ekycId?: string;
  setEkycId: (image: string) => void;
  documentType: string;
  setDocumentType: (value: string) => void;
  ekycStatus: string;
  setEkycStatus: (value: string) => void;
}
