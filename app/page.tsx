'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  TrendingUp, Users, Trophy, Star, ArrowUpRight, ArrowDownRight,
  Clock, Activity, BarChart3, Wallet, Copy, Check, Zap, Target,
  Search, ChevronRight, Eye, Flame, Shield, CircleDollarSign,
  Percent, CalendarCheck, Crosshair, UserCircle, Settings,
  Bell, LogOut, CreditCard, HelpCircle, ChevronDown, X,
  Compass, LayoutGrid, PieChart as PieChartIcon, User,
  Sparkles, Award, Globe,
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

/* ═══════════════════════════════════════════════════════════
   MOCK DATA — Analyst Profiles (PRD MVP Fields)
   ═══════════════════════════════════════════════════════════ */

const analysts = [
  {
    id: 1,
    name: 'The Shark Syndicate',
    leader: 'Mike Johnson',
    bio: 'NFL & NBA specialist. Contrarian value plays on spreads and totals. 8 years professional sports analytics. Former quant at DraftKings.',
    roiVsBank: 34.2,
    marginVsTurnover: 8.7,
    winningMonths: { won: 9, total: 10 },
    winRate: 62,
    followers: 2847,
    copiers: 156,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    risk: 'Medium',
    equityCurve: [
      { m: 'Jul', v: 0 }, { m: 'Aug', v: 12 }, { m: 'Sep', v: 8 },
      { m: 'Oct', v: 22 }, { m: 'Nov', v: 18 }, { m: 'Dec', v: 31 },
      { m: 'Jan', v: 26 }, { m: 'Feb', v: 38 }, { m: 'Mar', v: 29 },
      { m: 'Apr', v: 34.2 },
    ],
    sports: [
      { name: 'NFL', value: 45, color: '#f97316' },
      { name: 'NBA', value: 35, color: '#3b82f6' },
      { name: 'MLB', value: 20, color: '#10b981' },
    ],
  },
  {
    id: 2,
    name: 'Chen Capital',
    leader: 'Sarah Chen',
    bio: 'Soccer-first strategy. High volume, low variance. Focused on Premier League and La Liga moneylines. Ex-Pinnacle sharp.',
    roiVsBank: 21.5,
    marginVsTurnover: 4.3,
    winningMonths: { won: 8, total: 10 },
    winRate: 71,
    followers: 1923,
    copiers: 98,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    risk: 'Low',
    equityCurve: [
      { m: 'Jul', v: 0 }, { m: 'Aug', v: 4 }, { m: 'Sep', v: 7 },
      { m: 'Oct', v: 6 }, { m: 'Nov', v: 11 }, { m: 'Dec', v: 14 },
      { m: 'Jan', v: 12 }, { m: 'Feb', v: 17 }, { m: 'Mar', v: 19 },
      { m: 'Apr', v: 21.5 },
    ],
    sports: [
      { name: 'Soccer', value: 70, color: '#f97316' },
      { name: 'Tennis', value: 20, color: '#3b82f6' },
      { name: 'MMA', value: 10, color: '#10b981' },
    ],
  },
  {
    id: 3,
    name: 'Longshot Labs',
    leader: 'Alex Rodriguez',
    bio: 'High-odds specialist. Targets +200 to +500 underdogs across all major sports. Feast or famine — the curve tells the story.',
    roiVsBank: 47.8,
    marginVsTurnover: 14.1,
    winningMonths: { won: 6, total: 10 },
    winRate: 38,
    followers: 1654,
    copiers: 134,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    risk: 'High',
    equityCurve: [
      { m: 'Jul', v: 0 }, { m: 'Aug', v: -8 }, { m: 'Sep', v: 15 },
      { m: 'Oct', v: 5 }, { m: 'Nov', v: 32 }, { m: 'Dec', v: 20 },
      { m: 'Jan', v: 44 }, { m: 'Feb', v: 30 }, { m: 'Mar', v: 52 },
      { m: 'Apr', v: 47.8 },
    ],
    sports: [
      { name: 'NBA', value: 35, color: '#f97316' },
      { name: 'NFL', value: 30, color: '#3b82f6' },
      { name: 'Soccer', value: 35, color: '#10b981' },
    ],
  },
  {
    id: 4,
    name: 'Steady Edge',
    leader: 'Emma Williams',
    bio: 'Conservative bankroll management. Targets -110 to +120 lines only. Never risks more than 2% per play. Built for compounding.',
    roiVsBank: 15.6,
    marginVsTurnover: 3.1,
    winningMonths: { won: 10, total: 10 },
    winRate: 58,
    followers: 1432,
    copiers: 87,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    risk: 'Low',
    equityCurve: [
      { m: 'Jul', v: 0 }, { m: 'Aug', v: 2 }, { m: 'Sep', v: 4 },
      { m: 'Oct', v: 5 }, { m: 'Nov', v: 7 }, { m: 'Dec', v: 9 },
      { m: 'Jan', v: 10 }, { m: 'Feb', v: 12 }, { m: 'Mar', v: 14 },
      { m: 'Apr', v: 15.6 },
    ],
    sports: [
      { name: 'NFL', value: 50, color: '#f97316' },
      { name: 'NBA', value: 30, color: '#3b82f6' },
      { name: 'NHL', value: 20, color: '#10b981' },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   MOCK DATA — Live Markets
   ═══════════════════════════════════════════════════════════ */

const liveMarkets = [
  {
    id: 1, sport: 'Soccer', league: 'Premier League',
    event: 'Arsenal vs Chelsea', market: 'Arsenal to Win',
    volume: 124000, trend: 'up' as const, change: 12, time: '2h 15m',
    yesPrice: 54, noPrice: 46,
    history: [
      { t: '6h', y: 48, n: 52 }, { t: '5h', y: 50, n: 50 }, { t: '4h', y: 46, n: 54 },
      { t: '3h', y: 52, n: 48 }, { t: '2h', y: 49, n: 51 }, { t: 'Now', y: 54, n: 46 },
    ],
  },
  {
    id: 2, sport: 'NBA', league: 'Playoffs',
    event: 'Lakers vs Warriors', market: 'Over 215.5 Points',
    volume: 98000, trend: 'down' as const, change: -8, time: '5h 30m',
    yesPrice: 52, noPrice: 48,
    history: [
      { t: '6h', y: 58, n: 42 }, { t: '5h', y: 55, n: 45 }, { t: '4h', y: 57, n: 43 },
      { t: '3h', y: 50, n: 50 }, { t: '2h', y: 53, n: 47 }, { t: 'Now', y: 52, n: 48 },
    ],
  },
  {
    id: 3, sport: 'Soccer', league: 'La Liga',
    event: 'Real Madrid vs Barcelona', market: 'Both Teams to Score',
    volume: 156000, trend: 'up' as const, change: 18, time: '1d 3h',
    yesPrice: 57, noPrice: 43,
    history: [
      { t: '6h', y: 50, n: 50 }, { t: '5h', y: 53, n: 47 }, { t: '4h', y: 48, n: 52 },
      { t: '3h', y: 55, n: 45 }, { t: '2h', y: 52, n: 48 }, { t: 'Now', y: 57, n: 43 },
    ],
  },
  {
    id: 4, sport: 'NFL', league: 'Super Bowl',
    event: 'Chiefs vs 49ers', market: 'Chiefs -1.5',
    volume: 210000, trend: 'up' as const, change: 5, time: '3d 12h',
    yesPrice: 51, noPrice: 49,
    history: [
      { t: '6h', y: 47, n: 53 }, { t: '5h', y: 50, n: 50 }, { t: '4h', y: 48, n: 52 },
      { t: '3h', y: 52, n: 48 }, { t: '2h', y: 49, n: 51 }, { t: 'Now', y: 51, n: 49 },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   STYLE TOKENS — Dark Theme with Orange Accent
   ═══════════════════════════════════════════════════════════ */

const CARD = 'bg-[#141922] rounded-[24px] border border-white/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.2)]';
const CARD_INNER = 'bg-[#1a2030] rounded-[16px] border border-white/[0.06]';

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */

export default function Home() {
  const [tab, setTab] = useState<'discover' | 'markets' | 'portfolio' | 'profile'>('discover');
  const [selectedAnalyst, setSelectedAnalyst] = useState<number | null>(null);
  const [copyAmount, setCopyAmount] = useState('100');
  const [selectedMarket, setSelectedMarket] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState('50');
  const [betSide, setBetSide] = useState<'yes' | 'no'>('yes');
  const [copiedAnalysts, setCopiedAnalysts] = useState<number[]>([]);
  const [placedBets, setPlacedBets] = useState<number[]>([]);
  const [portfolio, setPortfolio] = useState({ balance: 1000, invested: 0, returns: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
  }, []);

  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => setToast({ message: '', visible: false }), 3000);
    return () => clearTimeout(timer);
  }, [toast.visible]);

  const handleCopy = (id: number) => {
    const amt = parseFloat(copyAmount);
    if (amt > 0 && amt <= portfolio.balance) {
      setCopiedAnalysts([...copiedAnalysts, id]);
      setPortfolio({ ...portfolio, balance: portfolio.balance - amt, invested: portfolio.invested + amt });
      const analyst = analysts.find((a) => a.id === id);
      showToast(`Successfully copying ${analyst?.name}`);
      setSelectedAnalyst(null);
      setCopyAmount('100');
    }
  };

  const handleBet = (id: number) => {
    const amt = parseFloat(betAmount);
    if (amt > 0 && amt <= portfolio.balance) {
      setPlacedBets([...placedBets, id]);
      setPortfolio({ ...portfolio, balance: portfolio.balance - amt, invested: portfolio.invested + amt });
      const mkt = liveMarkets.find((m) => m.id === id);
      showToast(`Bet placed on ${mkt?.event}`);
      setSelectedMarket(null);
      setBetAmount('50');
    }
  };

  const riskColor = (r: string) =>
    r === 'Low' ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    : r === 'Medium' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    : 'text-red-400 bg-red-500/10 border-red-500/20';

  const winRateLabel = (rate: number) =>
    rate >= 65 ? 'Favorites' : rate >= 50 ? 'Mixed' : 'Longshots';

  const presetAmounts = [25, 50, 100, 250];

  const copyModalAnalyst = analysts.find((a) => a.id === selectedAnalyst);

  /* ─── Tab: Discover ─── */
  const renderDiscover = () => (
    <div className="px-5 md:px-8 lg:px-10 pt-3 pb-36 md:pb-12">
      {/* Search */}
      <div className={`${CARD} flex items-center gap-3 px-5 py-3.5 mb-6 md:max-w-md`}>
        <Search className="w-5 h-5 text-white/30 shrink-0" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search analysts, syndicates..."
          className="flex-1 text-[15px] text-white placeholder:text-white/30 outline-none bg-transparent"
        />
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-[12px] bg-orange-500/15 flex items-center justify-center">
          <Flame className="w-[18px] h-[18px] text-orange-400" />
        </div>
        <div>
          <h2 className="text-[20px] md:text-[24px] font-bold text-white tracking-tight leading-none">Top Analysts</h2>
          <p className="text-[13px] text-white/40 mt-0.5">Copy expert strategies</p>
        </div>
      </div>

      {/* Analyst Cards */}
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
        {analysts
          .filter((a) => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.leader.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((analyst) => (
          <div key={analyst.id} className={`${CARD} overflow-hidden transition-all duration-300 hover:border-orange-500/20`}>
            {/* Header */}
            <div className="p-6 pb-0">
              <div className="flex items-start gap-3.5 mb-4">
                <img
                  src={analyst.avatar}
                  alt={analyst.name}
                  className="w-[52px] h-[52px] rounded-[14px] bg-white/5 shrink-0 ring-2 ring-white/10"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-[17px] font-bold text-white truncate">{analyst.name}</h3>
                    {copiedAnalysts.includes(analyst.id) && (
                      <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                        <Check className="w-3 h-3" /> Copying
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] text-white/40">Led by {analyst.leader}</p>
                </div>
                <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-bold border ${riskColor(analyst.risk)}`}>
                  {analyst.risk}
                </span>
              </div>

              {/* Bio */}
              <p className="text-[13px] leading-[1.6] text-white/50 mb-5">{analyst.bio}</p>

              {/* Key Metrics Grid — 2x2 per PRD */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                {[
                  { label: 'ROI vs Bank', value: `${analyst.roiVsBank > 0 ? '+' : ''}${analyst.roiVsBank}%`, color: 'text-orange-400' },
                  { label: 'Margin/TO', value: `${analyst.marginVsTurnover}%`, color: 'text-white' },
                  { label: 'Win Months', value: `${analyst.winningMonths.won}/${analyst.winningMonths.total}`, color: 'text-white', sub: `${Math.round((analyst.winningMonths.won / analyst.winningMonths.total) * 100)}%` },
                  { label: 'Win Rate', value: `${analyst.winRate}%`, color: 'text-white', sub: winRateLabel(analyst.winRate) },
                ].map((m, i) => (
                  <div key={i} className={`${CARD_INNER} p-3 text-center`}>
                    <p className="text-[9px] font-semibold text-white/30 uppercase tracking-wider mb-1.5">{m.label}</p>
                    <p className={`text-[20px] font-extrabold tracking-tighter leading-none ${m.color}`}>{m.value}</p>
                    {m.sub && <p className="text-[10px] font-semibold text-emerald-400 mt-1">{m.sub}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Equity Curve */}
            <div className="px-6 mb-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-white/25 uppercase tracking-wider">Equity Curve (ROI vs Bank)</p>
                <div className="flex items-center gap-3 text-[11px] text-white/30">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {analyst.followers.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Copy className="w-3 h-3" /> {analyst.copiers}
                  </span>
                </div>
              </div>
              <div className={`${CARD_INNER} p-3`}>
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={analyst.equityCurve}>
                    <defs>
                      <linearGradient id={`grad-${analyst.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f97316" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="m" tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.2)' }}
                      axisLine={false} tickLine={false}
                      interval={2}
                    />
                    <YAxis hide />
                    <Tooltip
                      contentStyle={{
                        background: '#1a2030', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.4)', fontSize: 12, color: '#fff',
                      }}
                      itemStyle={{ color: '#f97316' }}
                      formatter={(value) => [`${value}%`, 'ROI vs Bank']}
                    />
                    <Area
                      type="monotone" dataKey="v" stroke="#f97316" strokeWidth={2}
                      fill={`url(#grad-${analyst.id})`} dot={false}
                      activeDot={{ r: 4, fill: '#f97316', stroke: '#0d1117', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Copy Action Button */}
            <div className="px-6 pb-6">
              <button
                onClick={() => { if (!copiedAnalysts.includes(analyst.id)) { setSelectedAnalyst(analyst.id); setCopyAmount('100'); } }}
                disabled={copiedAnalysts.includes(analyst.id)}
                className={`w-full py-3.5 rounded-[14px] font-bold text-[15px] transition-all ${
                  copiedAnalysts.includes(analyst.id)
                    ? 'bg-emerald-500/15 text-emerald-400 cursor-default border border-emerald-500/20'
                    : 'bg-orange-500 text-white hover:bg-orange-400 active:scale-[0.98] shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                }`}
              >
                {copiedAnalysts.includes(analyst.id) ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Check className="w-4 h-4" /> Copying
                  </span>
                ) : 'Copy Analyst'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── Tab: Markets ─── */
  const renderMarkets = () => (
    <div className="px-5 md:px-8 lg:px-10 pt-3 pb-36 md:pb-12">
      {/* Section Header — z-10 to prevent overlap (M-01 fix) */}
      <div className="flex items-center gap-3 mb-5 relative z-10 pt-2">
        <div className="w-9 h-9 rounded-[12px] bg-blue-500/15 flex items-center justify-center">
          <Activity className="w-[18px] h-[18px] text-blue-400" />
        </div>
        <div>
          <h2 className="text-[20px] md:text-[24px] font-bold text-white tracking-tight leading-none">Live Markets</h2>
          <p className="text-[13px] text-white/40 mt-0.5">Sports prediction markets</p>
        </div>
      </div>

      <div className="space-y-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:space-y-0">
        {liveMarkets.map((mkt) => (
          <div key={mkt.id} className={`${CARD} overflow-hidden transition-all duration-300 hover:border-blue-500/20`}>
            <div className="p-6">
              {/* Meta row */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="px-2.5 py-1 rounded-[8px] bg-orange-500/15 text-orange-400 text-[11px] font-bold border border-orange-500/20">{mkt.sport}</span>
                <span className="text-[12px] text-white/30 font-medium">{mkt.league}</span>
                <span className="flex items-center gap-1 text-[12px] text-white/30">
                  <Clock className="w-3 h-3" /> {mkt.time}
                </span>
                <span className={`ml-auto flex items-center gap-0.5 text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                  mkt.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {mkt.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(mkt.change)}%
                </span>
              </div>

              {/* Event Title */}
              <h3 className="text-[18px] font-bold text-white mb-1">{mkt.event}</h3>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-[14px] text-white/40">{mkt.market}</p>
                <p className="text-[12px] text-white/25">
                  Vol <span className="font-semibold text-white/40">${(mkt.volume / 1000).toFixed(0)}K</span>
                </p>
              </div>

              {/* Mini Stacked Area Chart — Yes/No */}
              <div className={`${CARD_INNER} p-3 mb-4`}>
                <ResponsiveContainer width="100%" height={70}>
                  <AreaChart data={mkt.history}>
                    <defs>
                      <linearGradient id={`yes-grad-${mkt.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id={`no-grad-${mkt.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.12} />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="t" tick={{ fontSize: 9, fill: 'rgba(255,255,255,0.15)' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        background: '#1a2030', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.4)', fontSize: 12, color: '#fff',
                      }}
                    />
                    <Area type="monotone" dataKey="y" stroke="#10b981" strokeWidth={2} fill={`url(#yes-grad-${mkt.id})`} dot={false} name="Yes" />
                    <Area type="monotone" dataKey="n" stroke="#ef4444" strokeWidth={1.5} fill={`url(#no-grad-${mkt.id})`} dot={false} name="No" strokeDasharray="4 2" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Yes / No Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => { setSelectedMarket(mkt.id); setBetSide('yes'); }}
                  className="rounded-[14px] border border-emerald-500/20 bg-emerald-500/[0.06] p-4 text-center hover:bg-emerald-500/[0.12] hover:border-emerald-500/30 transition-all active:scale-[0.97]"
                >
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">Yes</p>
                  <p className="text-[32px] font-extrabold tracking-tighter text-emerald-400 leading-none">{mkt.yesPrice}<span className="text-[16px]">c</span></p>
                  <p className="text-[11px] text-white/30 mt-1.5">
                    Pays <span className="font-bold text-emerald-400">${(100 / mkt.yesPrice).toFixed(2)}</span>
                  </p>
                </button>
                <button
                  onClick={() => { setSelectedMarket(mkt.id); setBetSide('no'); }}
                  className="rounded-[14px] border border-red-500/20 bg-red-500/[0.06] p-4 text-center hover:bg-red-500/[0.12] hover:border-red-500/30 transition-all active:scale-[0.97]"
                >
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">No</p>
                  <p className="text-[32px] font-extrabold tracking-tighter text-red-400 leading-none">{mkt.noPrice}<span className="text-[16px]">c</span></p>
                  <p className="text-[11px] text-white/30 mt-1.5">
                    Pays <span className="font-bold text-red-400">${(100 / mkt.noPrice).toFixed(2)}</span>
                  </p>
                </button>
              </div>

              {/* Bet Slip — Inline */}
              {selectedMarket === mkt.id && (
                <div className={`${CARD_INNER} p-5`}>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[14px] font-semibold text-white/70">
                      Betting <span className={betSide === 'yes' ? 'text-emerald-400' : 'text-red-400'}>{betSide.toUpperCase()}</span>
                    </p>
                    <p className={`text-[22px] font-extrabold tracking-tighter ${betSide === 'yes' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {betSide === 'yes' ? mkt.yesPrice : mkt.noPrice}c
                    </p>
                  </div>
                  {/* Preset Stake Buttons */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {presetAmounts.map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setBetAmount(String(amt))}
                        className={`py-2 rounded-[10px] text-sm font-bold transition-all ${
                          betAmount === String(amt)
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/[0.06]'
                        }`}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                  {/* Custom Amount */}
                  <div className="relative mb-4">
                    <CircleDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                    <input
                      type="number" value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-[12px] bg-white/5 border border-white/[0.06] text-white text-base font-semibold focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 outline-none"
                      placeholder="Custom amount"
                    />
                  </div>
                  {/* Returns */}
                  <div className="space-y-2 mb-4 px-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-white/40">Potential return</span>
                      <span className="text-[18px] font-extrabold tracking-tight text-orange-400">
                        ${((parseFloat(betAmount) || 0) * (100 / (betSide === 'yes' ? mkt.yesPrice : mkt.noPrice))).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-white/40">Net after fees</span>
                      <span className="text-[15px] font-bold text-white/50">
                        ${((parseFloat(betAmount) || 0) * (100 / (betSide === 'yes' ? mkt.yesPrice : mkt.noPrice)) * 0.992).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {/* Action Buttons — Stacked on mobile (M-02 fix) */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button onClick={() => handleBet(mkt.id)}
                      className="flex-1 py-3.5 bg-orange-500 text-white rounded-[12px] font-bold text-[15px] hover:bg-orange-400 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                      Place Bet
                    </button>
                    <button onClick={() => setSelectedMarket(null)}
                      className="py-3 sm:px-5 rounded-[12px] bg-white/5 border border-white/[0.06] text-white/40 text-[14px] font-semibold hover:text-white/60 hover:bg-white/10 transition-all">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Placed Confirmation */}
              {placedBets.includes(mkt.id) && selectedMarket !== mkt.id && (
                <div className="flex items-center gap-3 bg-emerald-500/10 rounded-[14px] p-4 border border-emerald-500/20">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-emerald-400">Bet Placed</p>
                    <p className="text-[12px] text-emerald-400/60">Position active</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── Tab: Portfolio ─── */
  const renderPortfolio = () => (
    <div className="px-5 md:px-8 lg:px-10 pt-3 pb-36 md:pb-12">
      {/* Balance Cards (P-01 fix: px-5 padding) */}
      <div className="grid grid-cols-3 gap-2.5 md:gap-4 mb-7">
        {[
          { icon: <Wallet className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />, label: 'Balance', value: `$${portfolio.balance.toFixed(0)}`, color: 'text-white', bg: 'bg-blue-500/10' },
          { icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />, label: 'Invested', value: `$${portfolio.invested.toFixed(0)}`, color: 'text-white', bg: 'bg-orange-500/10' },
          { icon: <BarChart3 className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />, label: 'Returns', value: `+$${portfolio.returns.toFixed(0)}`, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        ].map((c, i) => (
          <div key={i} className={`${CARD} p-4 md:p-6`}>
            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-[10px] ${c.bg} flex items-center justify-center mb-3`}>
              {c.icon}
            </div>
            <p className="text-[9px] md:text-[11px] font-semibold text-white/25 uppercase tracking-wider mb-1">{c.label}</p>
            <p className={`text-[22px] md:text-[28px] lg:text-[32px] font-extrabold tracking-tighter leading-none ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      {/* Copied Analysts */}
      {copiedAnalysts.length > 0 && (
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-4">
            <Copy className="w-4 h-4 text-orange-400" />
            <h3 className="text-[15px] font-bold text-white">Copied Analysts</h3>
            <span className="px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 text-[11px] font-bold border border-orange-500/20">
              {copiedAnalysts.length}
            </span>
          </div>
          <div className="space-y-2.5 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {copiedAnalysts.map((id) => {
              const a = analysts.find((x) => x.id === id);
              if (!a) return null;
              return (
                <div key={id} className={`${CARD} p-5 flex items-center gap-4`}>
                  <img src={a.avatar} alt={a.name} className="w-11 h-11 rounded-[12px] shrink-0 ring-2 ring-white/10" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-[15px] truncate">{a.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-white/30">ROI vs Bank</span>
                      <span className="text-[13px] font-extrabold text-orange-400">+{a.roiVsBank}%</span>
                      <span className="text-[11px] text-white/15">|</span>
                      <span className="text-[11px] text-white/30">Win</span>
                      <span className="text-[13px] font-bold text-white/60">{a.winRate}%</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[18px] font-extrabold text-white tracking-tight">$100</p>
                    <div className="flex items-center gap-1 justify-end mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-semibold text-emerald-400">Active</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Bets */}
      {placedBets.length > 0 && (
        <div className="mb-7">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-blue-400" />
            <h3 className="text-[15px] font-bold text-white">Active Bets</h3>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[11px] font-bold border border-blue-500/20">
              {placedBets.length}
            </span>
          </div>
          <div className="space-y-2.5 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
            {placedBets.map((id) => {
              const m = liveMarkets.find((x) => x.id === id);
              if (!m) return null;
              return (
                <div key={id} className={`${CARD} p-5`}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="px-2 py-0.5 rounded-[6px] bg-orange-500/15 text-orange-400 text-[10px] font-bold border border-orange-500/20">{m.sport}</span>
                    <span className="text-[11px] text-white/25">{m.league}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white text-[15px]">{m.event}</p>
                      <p className="text-[13px] text-white/35 mt-0.5">{m.market}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[18px] font-extrabold text-white tracking-tight">$50</p>
                      <div className="flex items-center gap-1 justify-end mt-0.5">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span className="text-[11px] font-semibold text-amber-400">Pending</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {copiedAnalysts.length === 0 && placedBets.length === 0 && (
        <div className={`${CARD} p-12 text-center`}>
          <div className="w-16 h-16 rounded-[18px] bg-orange-500/10 flex items-center justify-center mx-auto mb-5">
            <Compass className="w-8 h-8 text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Active Positions</h3>
          <p className="text-[14px] text-white/40 mb-6 max-w-[280px] mx-auto">
            Copy an analyst or place a bet to start building your portfolio.
          </p>
          <div className="flex gap-2.5 justify-center">
            <button onClick={() => setTab('discover')}
              className="px-5 py-3 bg-orange-500 text-white rounded-[14px] text-[14px] font-bold hover:bg-orange-400 transition-colors shadow-[0_0_20px_rgba(249,115,22,0.15)]">
              Browse Analysts
            </button>
            <button onClick={() => setTab('markets')}
              className="px-5 py-3 bg-white/5 border border-white/[0.06] text-white/50 rounded-[14px] text-[14px] font-bold hover:bg-white/10 transition-colors">
              View Markets
            </button>
          </div>
        </div>
      )}
    </div>
  );

  /* ─── Tab: Profile ─── */
  const renderProfile = () => (
    <div className="px-5 md:px-8 lg:px-10 pt-3 pb-36 md:pb-12 md:max-w-xl md:mx-auto">
      {/* User Card (PR-01 fix: px-5 padding) */}
      <div className={`${CARD} p-6 mb-4`}>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-[60px] h-[60px] rounded-[18px] bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Guest User</h3>
            <p className="text-[13px] text-white/35">Joined March 2026</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { value: copiedAnalysts.length, label: 'Copying', color: 'text-white' },
            { value: placedBets.length, label: 'Bets', color: 'text-white' },
            { value: `+$${portfolio.returns.toFixed(0)}`, label: 'Returns', color: 'text-emerald-400' },
          ].map((s, i) => (
            <div key={i} className={`${CARD_INNER} text-center p-3.5`}>
              <p className={`text-[22px] font-extrabold tracking-tighter leading-none ${s.color}`}>{s.value}</p>
              <p className="text-[9px] font-semibold text-white/25 uppercase tracking-wider mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Group 1 */}
      <div className={`${CARD} overflow-hidden mb-4`}>
        {[
          { icon: <Wallet className="w-5 h-5 text-blue-400" />, label: 'Deposit / Withdraw', sub: 'Manage funds' },
          { icon: <CreditCard className="w-5 h-5 text-purple-400" />, label: 'Payment Methods', sub: 'Cards & crypto' },
          { icon: <Bell className="w-5 h-5 text-orange-400" />, label: 'Notifications', sub: 'Alerts & updates' },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors border-b border-white/[0.04] last:border-0">
            <div className="w-10 h-10 rounded-[12px] bg-white/[0.04] flex items-center justify-center shrink-0">{item.icon}</div>
            <div className="text-left flex-1">
              <p className="text-[15px] font-semibold text-white">{item.label}</p>
              <p className="text-[12px] text-white/30">{item.sub}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-white/15" />
          </button>
        ))}
      </div>

      {/* Menu Group 2 */}
      <div className={`${CARD} overflow-hidden`}>
        {[
          { icon: <Settings className="w-5 h-5 text-white/40" />, label: 'Settings', sub: 'Preferences', danger: false },
          { icon: <HelpCircle className="w-5 h-5 text-white/40" />, label: 'Help & Support', sub: 'FAQs & contact', danger: false },
          { icon: <LogOut className="w-5 h-5 text-red-400" />, label: 'Sign Out', sub: '', danger: true },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/[0.03] transition-colors border-b border-white/[0.04] last:border-0">
            <div className="w-10 h-10 rounded-[12px] bg-white/[0.04] flex items-center justify-center shrink-0">{item.icon}</div>
            <div className="text-left flex-1">
              <p className={`text-[15px] font-semibold ${item.danger ? 'text-red-400' : 'text-white'}`}>{item.label}</p>
              {item.sub && <p className="text-[12px] text-white/30">{item.sub}</p>}
            </div>
            <ChevronRight className="w-5 h-5 text-white/15" />
          </button>
        ))}
      </div>
    </div>
  );

  /* ─── Tab Config ─── */
  const tabs = [
    { key: 'discover' as const, label: 'Discover', icon: Compass },
    { key: 'markets' as const, label: 'Markets', icon: Activity },
    { key: 'portfolio' as const, label: 'Portfolio', icon: PieChartIcon },
    { key: 'profile' as const, label: 'Profile', icon: UserCircle },
  ];

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* ─── Top Header ─── */}
      <header className="sticky top-0 z-50 bg-[#0d1117]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 lg:px-10 h-14 md:h-16">
          <div className="flex items-center gap-3 md:gap-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-orange-500 rounded-[10px] flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">gainr</span>
            </div>
            {/* Desktop Nav Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {tabs.map(({ key, label, icon: Icon }) => {
                const active = tab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-[12px] text-[14px] font-semibold transition-all ${
                      active
                        ? 'bg-orange-500/15 text-orange-400'
                        : 'text-white/40 hover:text-white/60 hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] rounded-full border border-white/[0.06]">
              <Wallet className="w-3.5 h-3.5 text-white/40" />
              <span className="text-[14px] font-bold text-white">${portfolio.balance.toFixed(0)}</span>
            </div>
            <button className="px-3.5 py-1.5 bg-orange-500 text-white rounded-full text-[13px] font-bold hover:bg-orange-400 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.2)]">
              Deposit
            </button>
          </div>
        </div>
      </header>

      {/* ─── Content ─── */}
      <main className="max-w-lg md:max-w-3xl lg:max-w-6xl xl:max-w-7xl mx-auto pt-4">
        {tab === 'discover' && renderDiscover()}
        {tab === 'markets' && renderMarkets()}
        {tab === 'portfolio' && renderPortfolio()}
        {tab === 'profile' && renderProfile()}
      </main>

      {/* ─── Bottom Tab Bar — Mobile Only (frosted glass) ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="max-w-lg mx-auto px-5 pb-3">
          <div className="bg-[#141922]/90 backdrop-blur-xl rounded-[20px] border border-white/[0.06] shadow-[0_-4px_30px_rgba(0,0,0,0.3)] px-2 py-1.5 flex items-center justify-around">
            {tabs.map(({ key, label, icon: Icon }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex flex-col items-center gap-0.5 py-2.5 px-5 rounded-[14px] transition-all ${
                    active ? 'bg-orange-500/10' : ''
                  }`}
                >
                  <Icon className={`w-[22px] h-[22px] transition-colors ${active ? 'text-orange-400' : 'text-white/25'}`} />
                  <span className={`text-[10px] font-semibold transition-colors ${active ? 'text-orange-400' : 'text-white/25'}`}>
                    {label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ─── Copy Analyst Modal Overlay ─── */}
      {selectedAnalyst !== null && copyModalAnalyst && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-5">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAnalyst(null)} />
          {/* Modal */}
          <div className="relative bg-[#141922] rounded-[24px] border border-white/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.5)] w-full max-w-md overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[18px] font-bold text-white">Copy Analyst</h3>
                <button onClick={() => setSelectedAnalyst(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <X className="w-4 h-4 text-white/40" />
                </button>
              </div>

              {/* Analyst Summary */}
              <div className="flex items-center gap-3.5 mb-5 p-4 bg-[#1a2030] rounded-[16px] border border-white/[0.06]">
                <img src={copyModalAnalyst.avatar} alt={copyModalAnalyst.name} className="w-12 h-12 rounded-[14px] ring-2 ring-white/10" />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-white truncate">{copyModalAnalyst.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[12px] text-white/40">ROI <span className="font-bold text-orange-400">+{copyModalAnalyst.roiVsBank}%</span></span>
                    <span className="text-[12px] text-white/40">Win <span className="font-bold text-white">{copyModalAnalyst.winRate}%</span></span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${riskColor(copyModalAnalyst.risk)}`}>{copyModalAnalyst.risk}</span>
                  </div>
                </div>
              </div>

              {/* Amount Input */}
              <p className="text-[13px] font-semibold text-white/40 mb-3">Set Copy Amount</p>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setCopyAmount(String(amt))}
                    className={`py-2.5 rounded-[10px] text-sm font-bold transition-all ${
                      copyAmount === String(amt)
                        ? 'bg-orange-500 text-white'
                        : 'bg-white/5 text-white/50 hover:bg-white/10 border border-white/[0.06]'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
              <div className="relative mb-5">
                <CircleDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input
                  type="number" value={copyAmount}
                  onChange={(e) => setCopyAmount(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-[12px] bg-white/5 border border-white/[0.06] text-white text-base font-semibold focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 outline-none"
                  placeholder="Custom amount"
                />
              </div>

              <p className="text-[11px] text-white/30 mb-5 flex items-center gap-1.5">
                <Target className="w-3 h-3" /> Bets will mirror this analyst proportionally
              </p>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => handleCopy(copyModalAnalyst.id)}
                  className="flex-1 py-3.5 bg-orange-500 text-white rounded-[14px] font-bold text-[15px] hover:bg-orange-400 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                  Confirm Copy
                </button>
                <button onClick={() => setSelectedAnalyst(null)}
                  className="px-5 py-3.5 rounded-[14px] bg-white/5 border border-white/[0.06] text-white/40 font-semibold hover:text-white/60 hover:bg-white/10 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Toast Notification ─── */}
      {toast.visible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[70] animate-[slideDown_0.3s_ease-out]">
          <div className="flex items-center gap-2.5 px-5 py-3 bg-emerald-600 text-white rounded-[14px] shadow-[0_8px_30px_rgba(16,185,129,0.25)] text-[14px] font-semibold">
            <Check className="w-4 h-4" />
            {toast.message}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translate(-50%, -12px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}
