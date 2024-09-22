// src/interfaces/requestBody.ts

export interface RequestBody {
  name: string;
  password: string;
  email: string;
  confirm_password: string | null;
  confirm_code: string;
  id: string;
  role: string;
}

