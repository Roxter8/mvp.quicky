import { Gift, Trophy, Zap, Copy, Check, ChevronRight, Users } from 'lucide-react';
import { Button } from './ui/button';
import { quests, leaderboard } from '../data/markets';
import { useState } from 'react';

export function AirdropScreen() {
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [activeTab, setActiveTab] = useState<'quests' | 'leaderboard'>('quests');

  const totalPoints = quests.reduce((acc, q) => q.status === 'completed' ? acc + q.points : acc, 0);
  const userRank = 47;
  const nftMultiplier = 0;
  const referralCount = 12;
  const referralMultiplier = referralCount * 0.1;
  const totalMultiplier = nftMultiplier + referralMultiplier;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText('https://t.me/PredictMarketBot?ref=0xAB12EF34');
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-black via-black to-transparent pb-4">
        <div className="px-4 pt-6">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-6 h-6 text-purple-400" />
            <h1 className="text-white">Airdrop & Rewards</h1>
          </div>
          <p className="text-zinc-400 text-sm">Earn points, climb the ranks</p>
        </div>
      </div>

      {/* TGE Notice */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-purple-950/30 to-blue-950/30 border border-purple-800/50 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-white text-sm mb-1">Token Generation Event</div>
              <p className="text-zinc-400 text-xs">
                Token coming soon — all points will convert to rewards at TGE
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Points Summary */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-3">
            <Trophy className="w-4 h-4" />
            <span>Your Stats</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl text-white mb-1">{totalPoints.toLocaleString()}</div>
              <div className="text-xs text-zinc-500">Total Points</div>
            </div>
            <div>
              <div className="text-2xl text-emerald-400 mb-1">#{userRank}</div>
              <div className="text-xs text-zinc-500">Rank</div>
            </div>
            <div>
              <div className="text-2xl text-purple-400 mb-1">{totalMultiplier.toFixed(1)}x</div>
              <div className="text-xs text-zinc-500">Multiplier</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4 mb-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-1 flex gap-1">
          <button
            onClick={() => setActiveTab('quests')}
            className={`flex-1 py-2.5 rounded-xl text-sm transition-colors ${
              activeTab === 'quests'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Quests
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-2.5 rounded-xl text-sm transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {/* Quests Tab */}
      {activeTab === 'quests' && (
        <div className="px-4 space-y-6">
          {/* Quest List */}
          <div>
            <h3 className="text-white mb-3">Available Quests</h3>
            <div className="space-y-3">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className={`border rounded-2xl p-4 ${
                    quest.status === 'completed'
                      ? 'bg-emerald-950/20 border-emerald-800/50'
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-white text-sm mb-1">{quest.title}</div>
                      <p className="text-zinc-400 text-xs">{quest.description}</p>
                    </div>
                    {quest.status === 'completed' && (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-purple-400 text-sm">+{quest.points} points</div>
                    {quest.status === 'available' && (
                      <Button className="h-8 px-4 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded-lg">
                        Complete
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="px-4">
          <h3 className="text-white mb-3">Top Traders</h3>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`border rounded-2xl p-4 ${
                  entry.rank <= 3
                    ? 'bg-gradient-to-br from-yellow-950/20 to-orange-950/20 border-yellow-800/50'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      entry.rank === 1 ? 'bg-yellow-500 text-black' :
                      entry.rank === 2 ? 'bg-zinc-400 text-black' :
                      entry.rank === 3 ? 'bg-orange-600 text-white' :
                      'bg-zinc-800 text-zinc-400'
                    }`}>
                      {entry.rank}
                    </div>
                    <div>
                      <div className="text-white text-sm">{entry.wallet}</div>
                      <div className="text-zinc-500 text-xs">{entry.points.toLocaleString()} pts</div>
                    </div>
                  </div>
                  <div className="bg-purple-950/50 border border-purple-800/50 px-3 py-1 rounded-lg">
                    <span className="text-purple-400 text-sm">{entry.multiplier}x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weekly Rewards */}
      <div className="px-4 mt-6">
        <h3 className="text-white mb-3">Weekly Rewards</h3>
        <div className="bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border border-emerald-800/50 rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <Trophy className="w-6 h-6 text-emerald-400 flex-shrink-0" />
            <div>
              <div className="text-white mb-1">50,000 USDC Prize Pool</div>
              <p className="text-zinc-400 text-xs">
                Split among Top 100 traders based on trading performance
              </p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">🥇 Top 10</span>
              <span className="text-emerald-400">$20,000</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">🥈 Top 11-50</span>
              <span className="text-emerald-400">$20,000</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">🥉 Top 51-100</span>
              <span className="text-emerald-400">$10,000</span>
            </div>
          </div>
          <button className="w-full py-2.5 bg-emerald-950/50 border border-emerald-800/50 rounded-xl text-emerald-400 text-sm hover:bg-emerald-950 transition-colors flex items-center justify-center gap-2">
            View Rules
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* NFT Multiplier */}
      <div className="px-4 mt-6">
        <h3 className="text-white mb-3">NFT Multiplier</h3>
        <div className="bg-gradient-to-br from-purple-950/30 to-pink-950/30 border border-purple-800/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-purple-400" />
            <span className="text-white">Coming Soon</span>
          </div>
          <p className="text-zinc-400 text-sm mb-4">
            Hold NFTs to boost your points multiplier
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">1 NFT</span>
              <span className="text-purple-400">1.0x multiplier</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">5 NFTs</span>
              <span className="text-purple-400">5.0x multiplier</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">10 NFTs</span>
              <span className="text-purple-400">10.0x multiplier</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center"
              >
                <span className="text-zinc-600 text-xs">Coming Soon</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Referrals */}
      <div className="px-4 mt-6 mb-8">
        <h3 className="text-white mb-3">Referrals</h3>
        <div className="bg-gradient-to-br from-blue-950/30 to-cyan-950/30 border border-blue-800/50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-400" />
            <span className="text-white">Invite Friends, Earn More</span>
          </div>

          {/* Referral Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3">
              <div className="text-2xl text-white mb-1">{referralCount}</div>
              <div className="text-xs text-zinc-500">Referrals</div>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3">
              <div className="text-2xl text-blue-400 mb-1">+{referralMultiplier.toFixed(1)}x</div>
              <div className="text-xs text-zinc-500">Multiplier</div>
            </div>
          </div>

          {/* Referral Link */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-3 mb-4">
            <div className="text-xs text-zinc-400 mb-2">Your Referral Link</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 text-white text-sm truncate">
                t.me/PredictMarketBot?ref=0xAB12EF34
              </div>
              <button
                onClick={handleCopyReferral}
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
              >
                {copiedReferral ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-400" />
                )}
              </button>
            </div>
          </div>

          {/* Referral Rules */}
          <div className="space-y-2">
            <div className="text-sm text-zinc-400 mb-2">How it works:</div>
            <div className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
              <span className="text-zinc-400">Each referral = +0.1x multiplier</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
              <span className="text-zinc-400">20 referrals = +2.0x multiplier</span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0"></div>
              <span className="text-zinc-400">Unlimited potential!</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-950/30 border border-blue-800/50 rounded-xl">
            <p className="text-xs text-blue-400">
              Total Multiplier = NFT Multiplier + Referral Multiplier
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
