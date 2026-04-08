import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowLeft, Play, Pause, FastForward, Flag, AlertTriangle, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockChartData = [
    { msgId: 0, sarah: 30, michael: 20 },
    { msgId: 10, sarah: 35, michael: 25 },
    { msgId: 20, sarah: 50, michael: 25 },
    { msgId: 30, sarah: 75, michael: 15 },
    { msgId: 40, sarah: 80, michael: 18 },
    { msgId: 50, sarah: 65, michael: 35 },
    { msgId: 60, sarah: 70, michael: 30 },
    { msgId: 70, sarah: 82, michael: 18 },
];

const Analysis = () => {
    const navigate = useNavigate();
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="bg-[#050505] min-h-screen text-white flex flex-col overflow-hidden">

            {/* HEADER */}
            <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-['Outfit'] font-bold">Q3 Board Meeting Transcript <span className="text-sm font-normal text-gray-500 ml-2">ID: #802A</span></h1>
                    </div>
                </div>
                <div className="flex gap-4">
                    <button className="px-5 py-2 rounded-full bg-indigo-600/20 text-indigo-400 font-semibold text-sm border border-indigo-500/30">
                        Export Report
                    </button>
                </div>
            </header>

            {/* 3-COLUMN LAYOUT */}
            <div className="flex-1 flex overflow-hidden">

                {/* LEFT: PARTICIPANTS */}
                <aside className="w-80 border-r border-white/10 p-6 overflow-y-auto bg-[#080808]">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Social Hierarchy</h2>

                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/20 blur-2xl rounded-full" />
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-lg">Sarah Jenkins</span>
                                <span className="text-indigo-400 font-bold text-xl">82%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-indigo-500 rounded-full w-[82%]" />
                            </div>
                            <div className="flex justify-between text-xs text-gray-400">
                                <span>Directives: 14</span>
                                <span>Hedges: 2</span>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                            <div className="flex justify-between items-center mb-3">
                                <span className="font-bold text-lg text-gray-300">Michael Ross</span>
                                <span className="text-gray-400 font-bold text-xl">18%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                                <div className="h-full bg-gray-500 rounded-full w-[18%]" />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Directives: 1</span>
                                <span>Hedges: 19</span>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-12 mb-6">Key Insights</h2>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex gap-3 items-start"><AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" /> Sarah exhibits 7x more directives, indicating absolute conversation control.</li>
                        <li className="flex gap-3 items-start"><Info className="w-4 h-4 text-blue-500 mt-0.5" /> Michael’s response latency is 4x slower than baseline, signaling submissiveness.</li>
                    </ul>
                </aside>

                {/* CENTER: TIMELINE / PLAYBACK */}
                <main className="flex-1 flex flex-col p-8 bg-[#050505]">
                    <h2 className="text-2xl font-['Outfit'] font-bold mb-6">Power Shift Timeline</h2>

                    <div className="w-full h-80 bg-white/[0.02] border border-white/5 rounded-3xl p-6 mb-8 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSarah" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorMichael" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.5} />
                                        <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="msgId" stroke="#ffffff50" tick={{ fill: '#ffffff50' }} axisLine={false} tickLine={false} />
                                <YAxis stroke="#ffffff50" tick={{ fill: '#ffffff50' }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="sarah" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorSarah)" />
                                <Area type="monotone" dataKey="michael" stroke="#9ca3af" strokeWidth={2} fillOpacity={1} fill="url(#colorMichael)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex-1 border border-white/5 rounded-3xl bg-[#0a0a0a] flex flex-col overflow-hidden">
                        <div className="h-16 border-b border-white/10 flex items-center px-6 justify-between bg-white/[0.02]">
                            <h3 className="font-semibold flex items-center gap-2"><Play className="w-4 h-4 text-indigo-400" /> Replay Mode</h3>
                            <div className="flex gap-2">
                                <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition">
                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-1" />}
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition">
                                    <FastForward className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto space-y-6 flex flex-col">
                            {/* Dummy chat payload */}
                            <div className="self-end max-w-lg">
                                <div className="bg-indigo-600 rounded-2xl rounded-tr-none px-5 py-3 text-[15px]">
                                    Team, we need to finalize the Q3 report by 5 PM. Submit your sections immediately.
                                </div>
                                <span className="text-xs text-gray-500 mt-2 block text-right">Sarah Jenkins • 10:01 AM</span>
                            </div>

                            <div className="self-start max-w-lg">
                                <div className="bg-gray-800 rounded-2xl rounded-tl-none px-5 py-3 text-[15px]">
                                    I think I might need a bit more time for the financial review, if that's okay?
                                </div>
                                <span className="text-xs text-gray-500 mt-2 block text-left">Michael Ross • 10:45 AM</span>
                            </div>
                        </div>
                    </div>
                </main>

                {/* RIGHT: LINGUISTIC EVIDENCE */}
                <aside className="w-96 border-l border-white/10 bg-[#080808] flex flex-col p-6">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6 font-['Outfit'] flex items-center gap-2"><Flag className="w-4 h-4" /> Evidence Engine</h2>

                    <div className="flex-1 overflow-y-auto space-y-4">
                        <div className="p-5 rounded-2xl bg-red-900/10 border border-red-500/20">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-red-400 uppercase">Strong Directive</span>
                                <span className="text-xs text-gray-500">Msg #4</span>
                            </div>
                            <p className="text-sm leading-relaxed mb-3">"Submit your sections <span className="bg-red-500/30 text-white px-1 rounded">immediately</span>."</p>
                            <div className="text-xs text-gray-400 bg-black/40 p-2 rounded-lg">High confidence absolute command modifier.</div>
                        </div>

                        <div className="p-5 rounded-2xl bg-yellow-900/10 border border-yellow-500/20">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-yellow-400 uppercase">Hedge Phrase</span>
                                <span className="text-xs text-gray-500">Msg #5</span>
                            </div>
                            <p className="text-sm leading-relaxed mb-3">"<span className="bg-yellow-500/30 text-white px-1 rounded">I think I might need</span> a bit more time..."</p>
                            <div className="text-xs text-gray-400 bg-black/40 p-2 rounded-lg">Triple-stacked uncertainty markers. Lowers dominance.</div>
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default Analysis;
