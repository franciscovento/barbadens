import { ShirtMeasures } from '../types/shirtMeasures.interface';

interface measureDetail {
  min: number;
  max: number;
  videoKey: string;
  longDisplayName: string;
  shortDisplayName: string;
}

type MeasureInfo = {
  [k in keyof ShirtMeasures]: measureDetail;
};

const measuresInfo: MeasureInfo = {
  collar: {
    min: 38,
    max: 58,
    videoKey: 'yZBU97dRmkA',
    longDisplayName: 'Medida de Cuello',
    shortDisplayName: 'Cuello',
  },
  chest: {
    min: 40,
    max: 70,
    videoKey: 'XV6cPioWIjo',
    longDisplayName: 'Medida de Pecho',
    shortDisplayName: 'Pecho',
  },
  waist: {
    min: 40,
    max: 70,
    videoKey: 'DaVuyLjECLg',
    longDisplayName: 'Medida de Cintura',
    shortDisplayName: 'Cintura',
  },

  long: {
    min: 60,
    max: 90,
    videoKey: 'YCY_uQsDtCg',
    longDisplayName: 'Medida de Largo',
    shortDisplayName: 'Largo',
  },
  back: {
    min: 38,
    max: 55,
    videoKey: 'XhcUzIqLTO4',
    longDisplayName: 'Medida de Espalda',
    shortDisplayName: 'Espalda',
  },
  sleeve_long: {
    min: 55,
    max: 70,
    videoKey: 'KSHY2YobVyw',
    longDisplayName: 'Medida de Largo de Manga',
    shortDisplayName: 'Largo de Manga',
  },
  sleeve_width: {
    min: 15,
    max: 25,
    videoKey: 'bXefiESf-BU',
    longDisplayName: 'Medida de Ancho de Manga',
    shortDisplayName: 'Ancho de Manga',
  },
  shoulder: {
    min: 13,
    max: 19,
    videoKey: '2gxQ_d9MpGM',
    longDisplayName: 'Medida de Hombro',
    shortDisplayName: 'Hombro',
  },
};

export default measuresInfo;
