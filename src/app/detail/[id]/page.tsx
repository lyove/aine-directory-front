import { ThemeProvider } from '@/components/ThemeProvider';
import DetailContent from './components/DetailContent';

export default function DetailPage() {
  return (
    <ThemeProvider>
      <DetailContent />
    </ThemeProvider>
  );
}