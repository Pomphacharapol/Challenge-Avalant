'use client'

import { QuotesTable } from '@/components/QuotesTable';

export default function Dashboard() {
  return (
    <div className='p-10 flex flex-col justify-center gap-5'>
      <h1 className='text-center'>Challenge 3</h1>
      <h2 className='text-center'>Realtime Dashboard</h2>
      <QuotesTable symbols={['AAPL', 'MSFT', 'GOOG', 'TSLA', 'AMZN']} />
    </div>
  );
}
