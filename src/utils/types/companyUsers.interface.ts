export interface CompanyUsers {
  id: string;
  name: string;
  last_name: string;
  rol: CompanyRol;
  created_at: Date;
}

export type CompanyRol = 'normal' | 'admin' | 'super_user';
