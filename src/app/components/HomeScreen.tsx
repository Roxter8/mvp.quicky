import { useState } from 'react';
import { MarketCard } from './MarketCard';
import { MarketDetail } from './MarketDetail';
import { markets } from '../data/markets';
import { Market } from '../types';

export function HomeScreen() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  if (selectedMarket) {
    return <MarketDetail market={selectedMarket} onClose={() => setSelectedMarket(null)} />;
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-black via-black to-transparent pb-4">
        <div className="px-4 pt-6">
          <h1 className="text-white mb-1">All Markets</h1>
          <p className="text-zinc-400 text-sm">Predict outcomes, earn rewards</p>
        </div>
      </div>

      {/* Markets Grid */}
      <div className="px-4 space-y-3">
        {markets.map((market) => (
          <MarketCard
            key={market.id}
            market={market}
            onClick={() => setSelectedMarket(market)}
          />
        ))}
      </div>
    </div>
  );
}
