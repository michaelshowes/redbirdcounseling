import Image from 'next/image';

import SectionHeader from './shared/SectionHeader';

export default function RichText() {
  return (
    <div className={'section-spacing'}>
      <article className={'mx-auto max-w-[1440px]'}>
        <SectionHeader
          title={'My Story'}
          headline={'I started as a family therapist back in 2008'}
        />

        <section className={'mx-auto w-full max-w-[1000px]'}>
          <p className={'lg:columns-2'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            unde officia pariatur, officiis saepe autem corrupti facilis iusto
            adipisci. Aspernatur provident ut veniam consequuntur? Ratione quo
            illo nemo quam reprehenderit molestiae cupiditate quae ea omnis!
            Sequi aperiam dolor eius repellendus cumque aut molestiae sunt quasi
            earum soluta ea deserunt consequatur quaerat recusandae, cupiditate
            officiis at labore nisi rem, dolorem repellat optio impedit.
            Temporibus, officia molestias quas totam dicta officiis ipsum!
            Accusamus voluptatibus veniam quia recusandae assumenda similique,
            cupiditate totam consequuntur libero quam ut dolorem labore iusto,
            laudantium tempora culpa quod officia atque voluptate saepe
            repellendus eligendi! Est repellat sint provident?
          </p>

          <div className={'my-10 flex justify-center'}>
            <Image
              src={'/images/card4.png'}
              alt={'alt'}
              width={800}
              height={800}
            />
          </div>

          <p className={'lg:columns-2'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            unde officia pariatur, officiis saepe autem corrupti facilis iusto
            adipisci. Aspernatur provident ut veniam consequuntur? Ratione quo
            illo nemo quam reprehenderit molestiae cupiditate quae ea omnis!
            Sequi aperiam dolor eius repellendus cumque aut molestiae sunt quasi
            earum soluta ea deserunt consequatur quaerat recusandae, cupiditate
            officiis at labore nisi rem, dolorem repellat optio impedit.
            Temporibus, officia molestias quas totam dicta officiis ipsum!
            Accusamus voluptatibus veniam quia recusandae assumenda similique,
            cupiditate totam consequuntur libero quam ut dolorem labore iusto,
            laudantium tempora culpa quod officia atque voluptate saepe
            repellendus eligendi! Est repellat sint provident?
          </p>
        </section>
      </article>
    </div>
  );
}
