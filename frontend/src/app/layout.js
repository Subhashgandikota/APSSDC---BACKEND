import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'ApexGrade Cloud',
  description: 'Enterprise Student Result Management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}