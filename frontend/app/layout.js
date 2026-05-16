import './globals.css';
import Navigation from '../components/Navigation';

export const metadata = {
  title: 'Service Request Board',
  description: 'Connect homeowners with skilled tradespeople',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
