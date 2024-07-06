import * as yup from 'yup';

export interface FormMeasuresSchema {
  id?: string;
  profile_name: string;
  back: number;
  chest: number;
  waist: number;
  hip: number;
  long: number;
  shoulder: number;
  sleeve_long: number;
  sleeve_width: number;
  fist: number;
  collar: number;
}

export const formMeasuresSchema: yup.ObjectSchema<FormMeasuresSchema> = yup
  .object({
    id: yup.string().optional(),
    profile_name: yup.string().required('Nombre es requerido'),
    back: yup.number().required('Espalda es requerido'),
    chest: yup.number().required('Pecho es requerido'),
    waist: yup.number().required('Cintura es requerido'),
    hip: yup.number().required('Cadera es requerido'),
    long: yup.number().required('Largo es requerido'),
    shoulder: yup.number().required('Hombro es requerido'),
    sleeve_long: yup.number().required('Manga Larga es requerido'),
    sleeve_width: yup.number().required('Ancho de Manga es requerido'),
    fist: yup.number().required('Puño es requerido'),
    collar: yup.number().required('Cuello es requerido'),
  })
  .required();
