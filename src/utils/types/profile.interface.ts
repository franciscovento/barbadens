export interface Profile {
  id: string;
  created_at: string;
  user_id: string;
  profile_name: string;
  birth_date?: string;
  long: number;
  collar: number;
  chest: number;
  waist: number;
  hip: number;
  back: number;
  sleeve_width: number;
  sleeve_long: number;
  fist: number;
  shoulder: number;
  is_primary: boolean;
}
