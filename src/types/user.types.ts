export interface UpdateProfileFormData {
  userId: string;
  nickname: string;
  firstName: string;
  lastName: string;
  birthdate: string;
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  mobile: string;
  type: "player" | string;
  birthDate: string;
  birthPlace: string;
  createdAt: string;
  updatedAt: string;
  status: string;
};
