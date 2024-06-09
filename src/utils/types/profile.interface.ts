export interface Profile {
  id: string;
  created_at: string;
  user_id: string;
  profile_name: string;
  birth_date?: string | null;
  long?: number | null;
  collar?: number | null;
  chest?: number | null;
  waist?: number | null;
  hip?: number | null;
  back?: number | null;
  sleeveWidth?: number | null;
  sleeveLong?: number | null;
  fist?: number | null;
  shoulder?: number | null;
}
