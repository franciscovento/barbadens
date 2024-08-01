import { FC } from 'react';
import YouTube from 'react-youtube';

interface Props {
  videoKey: string;
}

const Tutorial: FC<Props> = ({ videoKey }) => {
  return (
    <div className="grid place-content-center">
      <div className="py-4">
        <YouTube
          videoId={videoKey}
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
