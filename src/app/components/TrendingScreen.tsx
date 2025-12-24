import { useState } from 'react';
import { MarketCard } from './MarketCard';
import { MarketDetail } from './MarketDetail';
import { markets } from '../data/markets';
import { Market } from '../types';
import { Flame } from 'lucide-react';

export function TrendingScreen() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  
  const trendingMarkets = markets.filter(m => m.isTrending);

  if (selectedMarket) {
    return <MarketDetail market={selectedMarket} onClose={() => setSelectedMarket(null)} />;
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-black via-black to-transparent pb-4">
        <div className="px-4 pt-6">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-6 h-6 text-orange-400" />
            <h1 className="text-white">Trending Markets</h1>
          </div>
          <p className="text-zinc-400 text-sm">Most active prediction markets</p>
        </div>
      </div>

      {/* Trending Stats */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-orange-950/30 to-rose-950/30 border border-orange-800/50 rounded-2xl p-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-xs text-zinc-400 mb-1">Active</div>
              <div className="text-white">{trendingMarkets.length}</div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1">Total Volume</div>
              <div className="text-white">
                ${(trendingMarkets.reduce((acc, m) => acc + m.volume, 0) / 1000000).toFixed(1)}M
              </div>
            </div>
            <div>
              <div className="text-xs text-zinc-400 mb-1">24h Change</div>
              <div className="text-emerald-400">+12.4%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Markets Grid */}
      <div className="px-4 space-y-3">
        {trendingMarkets.map((market) => (
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
