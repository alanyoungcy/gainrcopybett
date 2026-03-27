'use client';

import { useState } from 'react';
import { TrendingUp, Users, Trophy, ChevronRight, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const topTraders = [
  { id: 1, name: 'SportsBetKing', roi: 127.5, winRate: 68, followers: 2847, avatar: '👑', streak: 12, totalBets: 234 },
  { id: 2, name: 'PredictorPro', roi: 98.3, winRate: 64, followers: 1923, avatar: '🎯', streak: 8, totalBets: 189 },
  { id: 3, name: 'OddsWizard', roi: 85.7, winRate: 61, followers: 1654, avatar: '🧙', streak: 15, totalBets: 312 },
  { id: 4, name: 'BetMaster', roi: 76.2, winRate: 59, followers: 1432, avatar: '⚡', streak: 6, totalBets: 156 },
];

const liveMarkets = [
  { id: 1, sport: 'Soccer', event: 'Premier League: Arsenal vs Chelsea', market: 'Arsenal to Win', odds: 1.85, volume: '$124K', trend: 'up', change: 12 },
  { id: 2, sport: 'Basketball', event: 'NBA: Lakers vs Warriors', market: 'Over 215.5 Points', odds: 1.92, volume: '$98K', trend: 'down', change: -8 },
  { id: 3, sport: 'Soccer', event: 'La Liga: Real Madrid vs Barcelona', market: 'Both Teams to Score', odds: 1.75, volume: '$156K', trend: 'up', change: 18 },
  { id: 4, sport: 'Tennis', event: 'ATP Finals: Djokovic vs Alcaraz', market: 'Djokovic to Win', odds: 2.10, volume: '$67K', trend: 'up', change: 5 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('traders');

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                gainr
              </h1>
              <nav className="hidden md:flex gap-8">
                <a href="#" className="text-sm font-medium text-gray-900 hover:text-orange-600 transition-colors">Markets</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">Traders</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">Portfolio</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors">Learn</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-all hover:shadow-lg hover:shadow-orange-600/30">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50/30 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.08),transparent_50%)]"></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
              <Star className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-semibold text-orange-900">Copy the Best Sports Bettors</span>
            </div>

            <h2 className="text-6xl font-bold mb-6 leading-tight">
              Follow Expert<br />
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Sports Traders
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Copy trades from verified sports prediction market experts. Start with as little as $10 and automatically mirror the bets of top performers.
            </p>

            <div className="flex gap-4">
              <button className="px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all hover:shadow-xl hover:shadow-orange-600/30 flex items-center gap-2">
                Start Copying
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white border-2 border-gray-200 rounded-xl font-semibold hover:border-orange-600 transition-all">
                Explore Markets
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-orange-600">$2.4M</div>
              <div className="text-sm text-gray-600 mt-1">Total Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">12,847</div>
              <div className="text-sm text-gray-600 mt-1">Active Copiers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">89%</div>
              <div className="text-sm text-gray-600 mt-1">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600">247</div>
              <div className="text-sm text-gray-600 mt-1">Expert Traders</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('traders')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'traders'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Top Traders
          </button>
          <button
            onClick={() => setActiveTab('markets')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'markets'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Live Markets
          </button>
        </div>

        {activeTab === 'traders' && (
          <div className="grid gap-4">
            {topTraders.map((trader, index) => (
              <div
                key={trader.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center text-3xl">
                        {trader.avatar}
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{trader.name}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-gray-600">
                          <Users className="w-3 h-3 inline mr-1" />
                          {trader.followers.toLocaleString()} followers
                        </span>
                        <span className="text-sm text-gray-600">
                          <Trophy className="w-3 h-3 inline mr-1" />
                          {trader.streak} win streak
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">ROI</div>
                      <div className="text-2xl font-bold text-green-600">+{trader.roi}%</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Win Rate</div>
                      <div className="text-2xl font-bold text-gray-900">{trader.winRate}%</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Total Bets</div>
                      <div className="text-2xl font-bold text-gray-900">{trader.totalBets}</div>
                    </div>

                    <button className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all group-hover:shadow-lg group-hover:shadow-orange-600/30">
                      Copy Trader
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'markets' && (
          <div className="grid gap-4">
            {liveMarkets.map((market) => (
              <div
                key={market.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                        {market.sport}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium">
                        {market.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span className={market.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {Math.abs(market.change)}%
                        </span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1">{market.event}</h3>
                    <p className="text-gray-600">{market.market}</p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Odds</div>
                      <div className="text-3xl font-bold text-orange-600">{market.odds}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-gray-600 mb-1">Volume</div>
                      <div className="text-xl font-bold text-gray-900">{market.volume}</div>
                    </div>

                    <button className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-all group-hover:shadow-lg group-hover:shadow-orange-600/30">
                      Place Bet
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
