import { Button } from '../ui/button';

type Props = {
  link: {
    url: string;
    label: string;
  };
};

export default function FooterCTAButton({ link }: Props) {
  return (
    <Button
      size='lg'
      link
      href={link.url}
    >
      {link.label}
    </Button>
  );
}
