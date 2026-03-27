'use client';

import { useState } from 'react';
import { TrendingUp, Users, Trophy, ChevronRight, Star, ArrowUpRight, ArrowDownRight, Search, Filter, Clock, DollarSign, TrendingDown, Activity, BarChart3, Wallet, Copy, Check } from 'lucide-react';

const topTraders = [
  { id: 1, name: 'Mike "The Shark" Johnson', roi: 127.5, winRate: 68, followers: 2847, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', streak: 12, totalBets: 234, copiers: 156, monthlyReturn: 18.5, risk: 'Medium' },
  { id: 2, name: 'Sarah Chen', roi: 98.3, winRate: 64, followers: 1923, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', streak: 8, totalBets: 189, copiers: 98, monthlyReturn: 14.2, risk: 'Low' },
  { id: 3, name: 'Alex Rodriguez', roi: 85.7, winRate: 61, followers: 1654, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', streak: 15, totalBets: 312, copiers: 134, monthlyReturn: 12.8, risk: 'Medium' },
  { id: 4, name: 'Emma Williams', roi: 76.2, winRate: 59, followers: 1432, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', streak: 6, totalBets: 156, copiers: 87, monthlyReturn: 10.5, risk: 'Low' },
];

const liveMarkets = [
  { id: 1, sport: 'Soccer', league: 'Premier League', event: 'Arsenal vs Chelsea', market: 'Arsenal to Win', odds: 1.85, volume: 124000, trend: 'up', change: 12, time: '2h 15m', yesPrice: 54, noPrice: 46 },
  { id: 2, sport: 'Basketball', league: 'NBA', event: 'Lakers vs Warriors', market: 'Over 215.5 Points', odds: 1.92, volume: 98000, trend: 'down', change: -8, time: '5h 30m', yesPrice: 52, noPrice: 48 },
  { id: 3, sport: 'Soccer', league: 'La Liga', event: 'Real Madrid vs Barcelona', market: 'Both Teams to Score', odds: 1.75, volume: 156000, trend: 'up', change: 18, time: '1d 3h', yesPrice: 57, noPrice: 43 },
  { id: 4, sport: 'Tennis', league: 'ATP Finals', event: 'Djokovic vs Alcaraz', market: 'Djokovic to Win', odds: 2.10, volume: 67000, trend: 'up', change: 5, time: '12h 45m', yesPrice: 48, noPrice: 52 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedTrader, setSelectedTrader] = useState<number | null>(null);
  const [copyAmount, setCopyAmount] = useState('100');
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState('50');
  const [betSide, setBetSide] = useState<'yes' | 'no'>('yes');
  const [copiedTraders, setCopiedTraders] = useState<number[]>([]);
  const [placedBets, setPlacedBets] = useState<number[]>([]);
  const [portfolio, setPortfolio] = useState({ balance: 1000, invested: 0, returns: 0 });

  const handleCopyTrader = (traderId: number) => {
    const amount = parseFloat(copyAmount);
    if (amount > 0 && amount <= portfolio.balance) {
      setCopiedTraders([...copiedTraders, traderId]);
      setPortfolio({
        ...portfolio,
        balance: portfolio.balance - amount,
        invested: portfolio.invested + amount
      });
      setSelectedTrader(null);
      setCopyAmount('100');
    }
  };

  const handlePlaceBet = (marketId: number) => {
    const amount = parseFloat(betAmount);
    if (amount > 0 && amount <= portfolio.balance) {
      setPlacedBets([...placedBets, marketId]);
      setPortfolio({
        ...portfolio,
        balance: portfolio.balance - amount,
        invested: portfolio.invested + amount
      });
      setSelectedMarket(null);
      setBetAmount('50');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-orange-600">gainr</h1>
              <nav className="hidden md:flex gap-1">
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'discover' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Discover
                </button>
                <button
                  onClick={() => setActiveTab('markets')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'markets' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Markets
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'portfolio' ? 'bg-orange-50 text-orange-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Portfolio
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                <Wallet className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-gray-900">${portfolio.balance.toFixed(2)}</span>
              </div>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
                Deposit
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Traders</h2>
            <p className="text-gray-600">Copy the strategies of our best performing traders</p>
          </div>

          <div className="grid gap-4">
            {topTraders.map((trader) => (
              <div key={trader.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <img src={trader.avatar} alt={trader.name} className="w-16 h-16 rounded-full bg-gray-100" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{trader.name}</h3>
                        {copiedTraders.includes(trader.id) && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded">Copying</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {trader.followers.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Copy className="w-4 h-4" />
                          {trader.copiers} copiers
                        </span>
                        <span className="flex items-center gap-1">
                          <Trophy className="w-4 h-4" />
                          {trader.streak} streak
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">ROI</div>
                      <div className="text-xl font-bold text-green-600">+{trader.roi}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Win Rate</div>
                      <div className="text-xl font-bold text-gray-900">{trader.winRate}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-1">Monthly</div>
                      <div className="text-xl font-bold text-orange-600">+{trader.monthlyReturn}%</div>
                    </div>
                    <button
                      onClick={() => setSelectedTrader(trader.id)}
                      disabled={copiedTraders.includes(trader.id)}
                      className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                        copiedTraders.includes(trader.id)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-orange-600 text-white hover:bg-orange-700'
                      }`}
                    >
                      {copiedTraders.includes(trader.id) ? 'Copying' : 'Copy Trader'}
                    </button>
                  </div>
                </div>

                {selectedTrader === trader.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="max-w-md">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Copy Amount
                      </label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={copyAmount}
                            onChange={(e) => setCopyAmount(e.target.value)}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="100"
                          />
                        </div>
                        <button
                          onClick={() => handleCopyTrader(trader.id)}
                          className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setSelectedTrader(null)}
                          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Your bets will automatically mirror this trader's positions
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Markets Tab */}
      {activeTab === 'markets' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Live Markets</h2>
            <p className="text-gray-600">Bet on sports prediction markets</p>
          </div>

          <div className="grid gap-4">
            {liveMarkets.map((market) => (
              <div key={market.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                        {market.sport}
                      </span>
                      <span className="text-sm text-gray-500">{market.league}</span>
                      <span className="flex items-center gap-1 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {market.time}
                      </span>
                      <span className={`flex items-center gap-1 text-sm font-medium ${market.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {market.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {Math.abs(market.change)}%
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{market.event}</h3>
                    <p className="text-gray-600">{market.market}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Volume</div>
                    <div className="text-lg font-bold text-gray-900">${(market.volume / 1000).toFixed(0)}K</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    onClick={() => {
                      setSelectedMarket(market.id);
                      setBetSide('yes');
                    }}
                    className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all"
                  >
                    <div className="text-sm text-gray-600 mb-1">YES</div>
                    <div className="text-2xl font-bold text-green-600">{market.yesPrice}¢</div>
                    <div className="text-xs text-gray-500 mt-1">Pays ${(100 / market.yesPrice).toFixed(2)}</div>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMarket(market.id);
                      setBetSide('no');
                    }}
                    className="p-4 border-2 border-red-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all"
                  >
                    <div className="text-sm text-gray-600 mb-1">NO</div>
                    <div className="text-2xl font-bold text-red-600">{market.noPrice}¢</div>
                    <div className="text-xs text-gray-500 mt-1">Pays ${(100 / market.noPrice).toFixed(2)}</div>
                  </button>
                </div>

                {selectedMarket === market.id && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Betting {betSide.toUpperCase()}</span>
                        <span className={`text-sm font-semibold ${betSide === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                          {betSide === 'yes' ? market.yesPrice : market.noPrice}¢
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                          <input
                            type="number"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                            className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="50"
                          />
                        </div>
                        <button
                          onClick={() => handlePlaceBet(market.id)}
                          className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                        >
                          Place Bet
                        </button>
                        <button
                          onClick={() => setSelectedMarket(null)}
                          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Potential return: ${((parseFloat(betAmount) || 0) * (betSide === 'yes' ? 100 / market.yesPrice : 100 / market.noPrice)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                )}

                {placedBets.includes(market.id) && !selectedMarket && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-green-600">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-semibold">Bet placed successfully</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Tab */}
      {activeTab === 'portfolio' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Portfolio</h2>
            <p className="text-gray-600">Track your investments and returns</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Available Balance</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">${portfolio.balance.toFixed(2)}</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm text-gray-600">Invested</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">${portfolio.invested.toFixed(2)}</div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Total Returns</span>
              </div>
              <div className="text-3xl font-bold text-green-600">+${portfolio.returns.toFixed(2)}</div>
            </div>
          </div>

          <div className="grid gap-6">
            {copiedTraders.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Copied Traders</h3>
                <div className="space-y-3">
                  {copiedTraders.map((traderId) => {
                    const trader = topTraders.find(t => t.id === traderId);
                    if (!trader) return null;
                    return (
                      <div key={traderId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <img src={trader.avatar} alt={trader.name} className="w-10 h-10 rounded-full" />
                          <div>
                            <div className="font-semibold text-gray-900">{trader.name}</div>
                            <div className="text-sm text-gray-600">ROI: +{trader.roi}%</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${copyAmount}</div>
                          <div className="text-sm text-green-600">Active</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {placedBets.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Active Bets</h3>
                <div className="space-y-3">
                  {placedBets.map((marketId) => {
                    const market = liveMarkets.find(m => m.id === marketId);
                    if (!market) return null;
                    return (
                      <div key={marketId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-900">{market.event}</div>
                          <div className="text-sm text-gray-600">{market.market}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">${betAmount}</div>
                          <div className="text-sm text-orange-600">Pending</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {copiedTraders.length === 0 && placedBets.length === 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No active positions</h3>
                <p className="text-gray-600 mb-6">Start by copying a trader or placing a bet</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    Browse Traders
                  </button>
                  <button
                    onClick={() => setActiveTab('markets')}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    View Markets
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
