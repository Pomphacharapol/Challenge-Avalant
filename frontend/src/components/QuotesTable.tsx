import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Quote {
  symbol: string;
  price: number;
  ts: string;
}

export function QuotesTable({ symbols }: { symbols: string[] }) {
  const [quotes, setQuotes] = useState<Record<string, Quote>>({});
  const socketRef = useRef<Socket | null>(null);
  const snapshotRef = useRef<Record<string, Quote>>({});

  useEffect(() => {
    // connect WS
    const socket = io('http://localhost:3001/ws/quotes');
    socketRef.current = socket;

    socket.emit('subscribe', { symbols });

    socket.on('quotes', (data: Quote[]) => {
      data.forEach(q => (snapshotRef.current[q.symbol] = q));
    });

    const id = requestAnimationFrame(function update() {
      setQuotes({ ...snapshotRef.current });
      requestAnimationFrame(update);
    });

    return () => {
      socket.disconnect();
      cancelAnimationFrame(id);
    };
  }, [symbols]);

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {symbols.map(s => (
          <tr key={s}>
            <td>{s}</td>
            <td>{quotes[s]?.price.toFixed(2)}</td>
            <td>{quotes[s]?.ts}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
