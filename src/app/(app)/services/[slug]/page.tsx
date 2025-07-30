import RichText from '@/components/RichText';
import ServiceDetailHero from '@/components/ServiceDetailHero';

export default async function ServiceDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <ServiceDetailHero
        title={slug}
        description={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua quis ullamco.'
        }
      />
      <RichText />
    </div>
  );
}
