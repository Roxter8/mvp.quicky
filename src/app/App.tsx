import { useState } from 'react';
import { House, TrendingUp, Wallet, Gift } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { TrendingScreen } from './components/TrendingScreen';
import { PortfolioScreen } from './components/PortfolioScreen';
import { AirdropScreen } from './components/AirdropScreen';

type TabType = 'home' | 'trending' | 'portfolio' | 'airdrop';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'trending':
        return <TrendingScreen />;
      case 'portfolio':
        return <PortfolioScreen />;
      case 'airdrop':
        return <AirdropScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="dark min-h-screen bg-black">
      {/* Main Content */}
      <div className="relative">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-4 h-16">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === 'home' ? 'text-white' : 'text-zinc-500'
              }`}
            >
              <House className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === 'trending' ? 'text-white' : 'text-zinc-500'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Trending</span>
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                activeTab === 'portfolio' ? 'text-white' : 'text-zinc-500'
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span className="text-xs">Portfolio</span>
            </button>
            <button
              onClick={() => setActiveTab('airdrop')}
              className={`flex flex-col items-center justify-center gap-1 transition-colors relative ${
                activeTab === 'airdrop' ? 'text-white' : 'text-zinc-500'
              }`}
            >
              <Gift className="w-5 h-5" />
              <span className="text-xs">Airdrop</span>
              {/* Notification Badge */}
              <div className="absolute top-2 right-8 w-2 h-2 bg-purple-500 rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
