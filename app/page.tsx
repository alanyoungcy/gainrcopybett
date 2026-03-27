'use client';

import { useState } from 'react';
import { TrendingUp, Users, Trophy, Star, ArrowUpRight, ArrowDownRight, Clock, Activity, BarChart3, Wallet, Copy, Check, Zap, Target } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">gainr</h1>
              </div>
              <nav className="hidden md:flex gap-2">
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    activeTab === 'discover'
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Discover
                </button>
                <button
                  onClick={() => setActiveTab('markets')}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    activeTab === 'markets'
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Markets
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    activeTab === 'portfolio'
                      ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/25'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Portfolio
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <Wallet className="w-5 h-5 text-gray-600" />
                <div className="text-right">
                  <div className="text-xs text-gray-500 font-medium">Balance</div>
                  <div className="text-lg font-bold text-gray-900">${portfolio.balance.toFixed(2)}</div>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl text-sm font-bold hover:shadow-xl hover:shadow-orange-600/30 transition-all">
                Deposit
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Discover Tab */}
      {activeTab === 'discover' && (
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-4">
              <Star className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-bold text-orange-900">Top Performers</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Copy Expert Traders</h2>
            <p className="text-lg text-gray-600">Automatically mirror the bets of our highest performing traders</p>
          </div>

          <div className="grid gap-6">
            {topTraders.map((trader, index) => (
              <div key={trader.id} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:border-orange-200 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-6">
                    <div className="relative">
                      <img src={trader.avatar} alt={trader.name} className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 p-1" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        #{index + 1}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{trader.name}</h3>
                        {copiedTraders.includes(trader.id) && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full flex items-center gap-1">
                            <Check className="w-4 h-4" />
                            Copying
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span className="font-semibold">{trader.followers.toLocaleString()}</span> followers
                        </span>
                        <span className="flex items-center gap-2">
                          <Copy className="w-4 h-4" />
                          <span className="font-semibold">{trader.copiers}</span> copiers
                        </span>
                        <span className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-orange-500" />
                          <span className="font-semibold">{trader.streak}</span> win streak
                        </span>
                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-700">
                          {trader.risk} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                    <div className="text-sm text-gray-600 font-medium mb-1">Total ROI</div>
                    <div className="text-3xl font-bold text-green-600">+{trader.roi}%</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                    <div className="text-sm text-gray-600 font-medium mb-1">Win Rate</div>
                    <div className="text-3xl font-bold text-blue-600">{trader.winRate}%</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-100">
                    <div className="text-sm text-gray-600 font-medium mb-1">Monthly Return</div>
                    <div className="text-3xl font-bold text-orange-600">+{trader.monthlyReturn}%</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border border-purple-100">
                    <div className="text-sm text-gray-600 font-medium mb-1">Total Bets</div>
                    <div className="text-3xl font-bold text-purple-600">{trader.totalBets}</div>
                  </div>
                </div>

                {selectedTrader === trader.id ? (
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Set Copy Amount</h4>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">$</span>
                        <input
                          type="number"
                          value={copyAmount}
                          onChange={(e) => setCopyAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg font-semibold"
                          placeholder="100"
                        />
                      </div>
                      <button
                        onClick={() => handleCopyTrader(trader.id)}
                        className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-orange-600/30 transition-all"
                      >
                        Confirm Copy
                      </button>
                      <button
                        onClick={() => setSelectedTrader(null)}
                        className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-4 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Your bets will automatically mirror this trader's positions
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedTrader(trader.id)}
                    disabled={copiedTraders.includes(trader.id)}
                    className={`w-full py-4 rounded-xl font-bold transition-all ${
                      copiedTraders.includes(trader.id)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:shadow-xl hover:shadow-orange-600/30'
                    }`}
                  >
                    {copiedTraders.includes(trader.id) ? 'Already Copying' : 'Copy This Trader'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Markets Tab */}
      {activeTab === 'markets' && (
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4">
              <Activity className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-900">Live Betting</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Sports Prediction Markets</h2>
            <p className="text-lg text-gray-600">Bet on live sports events with real-time odds</p>
          </div>

          <div className="grid gap-6">
            {liveMarkets.map((market) => (
              <div key={market.id} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-4 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-bold">
                        {market.sport}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">{market.league}</span>
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {market.time}
                      </span>
                      <span className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${
                        market.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {market.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {Math.abs(market.change)}%
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{market.event}</h3>
                    <p className="text-lg text-gray-600">{market.market}</p>
                  </div>
                  <div className="text-right bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                    <div className="text-sm text-gray-500 font-medium mb-1">Trading Volume</div>
                    <div className="text-2xl font-bold text-gray-900">${(market.volume / 1000).toFixed(0)}K</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => {
                      setSelectedMarket(market.id);
                      setBetSide('yes');
                    }}
                    className="group relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 hover:border-green-400 hover:shadow-xl transition-all"
                  >
                    <div className="relative z-10">
                      <div className="text-sm text-gray-600 font-bold mb-2">YES</div>
                      <div className="text-4xl font-bold text-green-600 mb-2">{market.yesPrice}¢</div>
                      <div className="text-sm text-gray-600">
                        Pays <span className="font-bold text-green-700">${(100 / market.yesPrice).toFixed(2)}</span>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMarket(market.id);
                      setBetSide('no');
                    }}
                    className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-6 hover:border-red-400 hover:shadow-xl transition-all"
                  >
                    <div className="relative z-10">
                      <div className="text-sm text-gray-600 font-bold mb-2">NO</div>
                      <div className="text-4xl font-bold text-red-600 mb-2">{market.noPrice}¢</div>
                      <div className="text-sm text-gray-600">
                        Pays <span className="font-bold text-red-700">${(100 / market.noPrice).toFixed(2)}</span>
                      </div>
                    </div>
                  </button>
                </div>

                {selectedMarket === market.id && (
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold text-gray-900">
                        Betting <span className={betSide === 'yes' ? 'text-green-600' : 'text-red-600'}>{betSide.toUpperCase()}</span>
                      </span>
                      <span className={`text-2xl font-bold ${betSide === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                        {betSide === 'yes' ? market.yesPrice : market.noPrice}¢
                      </span>
                    </div>
                    <div className="flex gap-4">
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-lg">$</span>
                        <input
                          type="number"
                          value={betAmount}
                          onChange={(e) => setBetAmount(e.target.value)}
                          className="w-full pl-10 pr-4 py-4 border-2 border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg font-semibold"
                          placeholder="50"
                        />
                      </div>
                      <button
                        onClick={() => handlePlaceBet(market.id)}
                        className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-orange-600/30 transition-all"
                      >
                        Place Bet
                      </button>
                      <button
                        onClick={() => setSelectedMarket(null)}
                        className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded-xl border border-orange-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Potential Return:</span>
                        <span className="text-xl font-bold text-orange-600">
                          ${((parseFloat(betAmount) || 0) * (betSide === 'yes' ? 100 / market.yesPrice : 100 / market.noPrice)).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {placedBets.includes(market.id) && !selectedMarket && (
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                    <div className="flex items-center gap-3 text-green-700">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold">Bet Placed Successfully</div>
                        <div className="text-sm text-green-600">Your bet is now active</div>
                      </div>
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
        <div className="max-w-[1400px] mx-auto px-8 py-12">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-900">Your Performance</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Portfolio Overview</h2>
            <p className="text-lg text-gray-600">Track your investments and returns in real-time</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Wallet className="w-6 h-6" />
                </div>
                <span className="text-blue-100 font-medium">Available Balance</span>
              </div>
              <div className="text-5xl font-bold mb-2">${portfolio.balance.toFixed(2)}</div>
              <div className="text-blue-100 text-sm">Ready to invest</div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-orange-100 font-medium">Total Invested</span>
              </div>
              <div className="text-5xl font-bold mb-2">${portfolio.invested.toFixed(2)}</div>
              <div className="text-orange-100 text-sm">Across all positions</div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <span className="text-green-100 font-medium">Total Returns</span>
              </div>
              <div className="text-5xl font-bold mb-2">+${portfolio.returns.toFixed(2)}</div>
              <div className="text-green-100 text-sm">Lifetime earnings</div>
            </div>
          </div>

          <div className="grid gap-8">
            {copiedTraders.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Copy className="w-5 h-5 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Copied Traders</h3>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">
                    {copiedTraders.length} Active
                  </span>
                </div>
                <div className="grid gap-4">
                  {copiedTraders.map((traderId) => {
                    const trader = topTraders.find(t => t.id === traderId);
                    if (!trader) return null;
                    return (
                      <div key={traderId} className="flex items-center justify-between p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <div className="flex items-center gap-4">
                          <img src={trader.avatar} alt={trader.name} className="w-14 h-14 rounded-xl" />
                          <div>
                            <div className="font-bold text-lg text-gray-900">{trader.name}</div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-green-600" />
                                ROI: <span className="font-bold text-green-600">+{trader.roi}%</span>
                              </span>
                              <span className="flex items-center gap-1">
                                Win Rate: <span className="font-bold">{trader.winRate}%</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">${copyAmount}</div>
                          <div className="text-sm text-green-600 font-semibold mt-1 flex items-center gap-1 justify-end">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Active
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {placedBets.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Active Bets</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                    {placedBets.length} Pending
                  </span>
                </div>
                <div className="grid gap-4">
                  {placedBets.map((marketId) => {
                    const market = liveMarkets.find(m => m.id === marketId);
                    if (!market) return null;
                    return (
                      <div key={marketId} className="flex items-center justify-between p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-bold">
                              {market.sport}
                            </span>
                            <span className="text-sm text-gray-600">{market.league}</span>
                          </div>
                          <div className="font-bold text-lg text-gray-900">{market.event}</div>
                          <div className="text-sm text-gray-600 mt-1">{market.market}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">${betAmount}</div>
                          <div className="text-sm text-orange-600 font-semibold mt-1 flex items-center gap-1 justify-end">
                            <Clock className="w-4 h-4" />
                            Pending
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {copiedTraders.length === 0 && placedBets.length === 0 && (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No Active Positions</h3>
                <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                  Start building your portfolio by copying expert traders or placing bets on live markets
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => setActiveTab('discover')}
                    className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-orange-600/30 transition-all"
                  >
                    Browse Traders
                  </button>
                  <button
                    onClick={() => setActiveTab('markets')}
                    className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
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
