export interface Profile {
  id: string;
  created_at: string;
  user_id: string;
  profile_name: string;
  birth_date?: string;
}

export interface ProfileMeasures {
  id: string;
  long: number;
  collar: number;
  chest: number;
  waist: number;
  hip: number;
  back: number;
  sleeveWidth: number;
  sleeveLong: number;
  fist: number;
  shoulder: number;
}

export interface ProfileWithMeasures extends Profile {
  profile_measures?: ProfileMeasures;
}
