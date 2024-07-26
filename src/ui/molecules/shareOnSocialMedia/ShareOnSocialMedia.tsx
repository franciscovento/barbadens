'use client';
import { usePathname } from 'next/navigation';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

const ShareOnSocialMedia = () => {
  const pathName = usePathname();
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}${pathName}`;
  // const url = `https://app.barbadens.com/${pathName}`;

  return (
    <div className="flex items-center gap-2 flex-wrap py-4">
      <FacebookShareButton url={url}>
        <FacebookIcon size={40} />
      </FacebookShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon size={40} />
      </WhatsappShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon size={40} />
      </LinkedinShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon size={40} />
      </TwitterShareButton>
      <TelegramShareButton url={url}>
        <TelegramIcon size={40} />
      </TelegramShareButton>
    </div>
  );
};

export default ShareOnSocialMedia;
