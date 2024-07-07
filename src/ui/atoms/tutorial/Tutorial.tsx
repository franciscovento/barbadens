import { FormMeasuresSchema } from '@/app/(store)/create/[fabric_id]/medidas/formSchema';

import { valuesMeasuresMap } from '@/utils/valuesMeasuresMap';
import { FC } from 'react';
import YouTube from 'react-youtube';

interface Props {
  tutorialId: string;
  title: string;
  description: string;
}

const Tutorial: FC<Props> = ({ description, title, tutorialId }) => {
  return (
    <div className="grid place-content-center">
      <div>
        <h2>{valuesMeasuresMap[title as keyof FormMeasuresSchema]}</h2>
        <p>{description}</p>
      </div>
      <div className="py-4">
        <YouTube videoId={tutorialId} className="w-full" />
      </div>
    </div>
  );
};

export default Tutorial;
