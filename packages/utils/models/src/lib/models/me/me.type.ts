import { UserRoleEnum } from './../permission/role';

export interface Me{
  schema_version: string;
  attributes:MeAttributes
}

export interface MeAttributes {
  department_id: string;
  hospital_id: string;
  on_call: boolean;
  staff_name: string;
  role: UserRoleEnum;
}
