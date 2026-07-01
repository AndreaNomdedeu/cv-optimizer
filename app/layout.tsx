// build 1782328269207
import JobMatchPanel from "../components/JobMatchPanel";
import './globals.css';

export const metadata = {
  title: 'CV Optimizer, Translate your CV between the institutional and corporate worlds',
  description:
    'Leaving the UN, an NGO, or government, or moving the other way? We translate your CV between the institutional and corporate worlds, so your experience is clear to any recruiter.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}<JobMatchPanel /></body>
    </html>
  );
}

// rebuild-css 1782325464785
