import AboutHero from '@/components/AboutHero';
import CredentialsGrid from '@/components/CredentialsGrid';
import InfoGrid from '@/components/InfoGrid';
import RichText from '@/components/RichText';

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <div className={'[&>section]:even:bg-secondary-1'}>
        <RichText />
        <InfoGrid />
        <CredentialsGrid />
      </div>
    </div>
  );
}
