import { Settings, ArrowUp, ArrowDown, Wallet } from 'lucide-react';
import { Button } from './ui/button';
import { mockPositions } from '../data/markets';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

const mockChartData = [
  { value: 1000 },
  { value: 1050 },
  { value: 1020 },
  { value: 1100 },
  { value: 1080 },
  { value: 1150 },
  { value: 1130 },
  { value: 1200 },
  { value: 1180 },
  { value: 1250 },
  { value: 1230 },
  { value: 1298 },
];

export function PortfolioScreen() {
  const activePositions = mockPositions.filter(p => p.status === 'active');
  const settledPositions = mockPositions.filter(p => p.status === 'settled');
  
  const totalPnL = mockPositions.reduce((acc, p) => acc + (p.pnl || 0), 0);
  const totalValue = activePositions.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="px-4 py-4 flex items-center justify-between">
          <h2 className="text-white">Portfolio</h2>
          <button className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors">
            <Settings className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
      </div>

      {/* Wallet Balance */}
      <div className="px-4 py-6">
        <div className="bg-gradient-to-br from-blue-950/30 to-purple-950/30 border border-blue-800/50 rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-2">
            <Wallet className="w-4 h-4" />
            <span>0xAB12...EF34</span>
          </div>
          <div className="text-3xl text-white mb-1">$1,298.45</div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 text-sm ${totalPnL >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {totalPnL >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              <span>${Math.abs(totalPnL).toFixed(2)} ({((totalPnL / 1000) * 100).toFixed(2)}%)</span>
            </div>
            <span className="text-zinc-500 text-sm">All time</span>
          </div>
        </div>

        {/* PnL Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">
          <div className="text-sm text-zinc-400 mb-3">Portfolio Value</div>
          <ResponsiveContainer width="100%" height={120}>
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button className="h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-2xl">
            Deposit
          </Button>
          <Button className="h-12 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-2xl">
            Withdraw
          </Button>
        </div>
      </div>

      {/* Active Positions */}
      <div className="px-4 mb-6">
        <h3 className="text-white mb-3">Active Predictions</h3>
        <div className="space-y-3">
          {activePositions.map((position) => (
            <div
              key={position.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-white text-sm mb-1">{position.marketTitle}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-lg ${
                      position.side === 'YES'
                        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50'
                        : 'bg-rose-950/50 text-rose-400 border border-rose-800/50'
                    }`}>
                      {position.side}
                    </span>
                    <span className="text-xs text-zinc-400">@{position.entryPrice}¢</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`${position.pnl && position.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {position.pnl && position.pnl >= 0 ? '+' : ''}${position.pnl?.toFixed(2)}
                  </div>
                  <div className="text-xs text-zinc-500">${position.amount}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Current Price</span>
                <span className="text-zinc-300">{position.currentPrice}¢</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settled Positions */}
      <div className="px-4 mb-6">
        <h3 className="text-white mb-3">History</h3>
        <div className="space-y-3">
          {settledPositions.map((position) => (
            <div
              key={position.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-white text-sm mb-1">{position.marketTitle}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-lg ${
                      position.side === 'YES'
                        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50'
                        : 'bg-rose-950/50 text-rose-400 border border-rose-800/50'
                    }`}>
                      {position.side}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-lg ${
                      position.outcome === 'won'
                        ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-800/50'
                        : 'bg-rose-950/50 text-rose-400 border border-rose-800/50'
                    }`}>
                      {position.outcome?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`${position.pnl && position.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {position.pnl && position.pnl >= 0 ? '+' : ''}${position.pnl?.toFixed(2)}
                  </div>
                  <div className="text-xs text-zinc-500">{position.settledDate}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
