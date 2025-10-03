import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger
} from '@/components/ui/morphing-dialog';

export function DialogCard() {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        bounce: 0.05,
        duration: 0.25
      }}
    >
      <MorphingDialogTrigger
        style={{
          borderRadius: '12px'
        }}
        className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white'
      >
        <MorphingDialogImage
          src='https://picsum.photos/498/344'
          alt=''
          className='h-48 w-full object-cover'
        />
        <div className='flex grow flex-row items-end justify-between px-3 py-2'>
          <div>
            <MorphingDialogTitle className='text-zinc-950'>
              EB27
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className='text-zinc-700'>
              Edouard Wilfrid Buquet
            </MorphingDialogSubtitle>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{
            borderRadius: '24px'
          }}
          className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white sm:w-[500px]'
        >
          <MorphingDialogImage
            src='https://picsum.photos/498/344'
            alt='A desk lamp designed by Edouard Wilfrid Buquet in 1925. It features a double-arm design and is made from nickel-plated brass, aluminium and varnished wood.'
            className='h-full w-full'
          />
          <div className='p-6'>
            <MorphingDialogTitle className='text-2xl text-zinc-950'>
              EB27
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className='text-zinc-700'>
              Edouard Wilfrid Buquet
            </MorphingDialogSubtitle>
            <MorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 }
              }}
            >
              <p className='mt-2 text-zinc-500'>
                Little is known about the life of Édouard-Wilfrid Buquet. He was
                born in France in 1866, but the time and place of his death is
                unfortunately a mystery.
              </p>
              <p className='text-zinc-500'>
                Research conducted in the 1970s revealed that he’d designed the
                “EB 27” double-arm desk lamp in 1925, handcrafting it from
                nickel-plated brass, aluminium and varnished wood.
              </p>
              <a
                className='mt-2 inline-flex text-zinc-500 underline'
                href='https://www.are.na/block/12759029'
                target='_blank'
                rel='noopener noreferrer'
              >
                Are.na block
              </a>
            </MorphingDialogDescription>
          </div>
          <MorphingDialogClose className='text-zinc-50' />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
