import { Sora } from 'next/font/google';
import localFont from 'next/font/local';

// Sentient - Primary font (variable font)
export const sentient = localFont({
  src: [
    {
      path: '../../public/fonts/Sentient-Variable.ttf',
      style: 'normal'
    },
    {
      path: '../../public/fonts/Sentient-VariableItalic.ttf',
      style: 'italic'
    }
  ],
  variable: '--font-sentient',
  display: 'swap',
  weight: '300 700', // Variable font weight range
  preload: true, // Preload for critical rendering
  fallback: ['Georgia', 'serif']
});

// Sora - Secondary font (Google Font fallback)
export const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['400', '600', '700'], // Regular, SemiBold, Bold based on Figma
  preload: true,
  fallback: ['system-ui', 'sans-serif']
});
