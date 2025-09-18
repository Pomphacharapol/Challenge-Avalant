import { QuotesTable } from '@/components/QuotesTable';

export default function Dashboard() {
  return (
    <div>
      <h1>Realtime Dashboard</h1>
      <QuotesTable symbols={['AAPL', 'MSFT', 'GOOG', 'TSLA', 'AMZN']} />
    </div>
  );
}
