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
      <div className="py-4">
        <YouTube
          videoId={tutorialId}
          className="w-full"
          opts={{
            height: '520',
            width: '300',
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      </div>
    </div>
  );
};

export default Tutorial;
