import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Play, Pause, FastForward, Flag, AlertTriangle, Info, Users, ShieldAlert } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

const Analysis = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Catch data from router state
    const nlpData = location.state?.resultData || null;

    if (!nlpData) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center">
                    <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Analysis Data Missing</h2>
                    <button onClick={() => navigate('/dashboard')} className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">Return to Dashboard</button>
                </div>
            </div>
        );
    }

    const { users, timeline, evidence } = nlpData;

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans select-none">

            {/* HEADER */}
            <header className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-lg font-bold font-['Outfit'] flex items-center gap-3">
                        Multi-Agent Transcript Analysis <span className="text-[10px] px-2 py-1 bg-green-500/20 text-green-400 rounded-full font-mono">● Real-time Model</span>
                    </h1>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* LEFT: HIERARCHY */}
                <aside className="w-80 border-r border-white/10 bg-[#0a0a0a] flex flex-col p-6">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6 font-['Outfit'] flex items-center gap-2"><Users className="w-4 h-4" /> Social Hierarchy</h2>

                    <div className="flex-1 space-y-3">
                        {users.map((user, idx) => (
                            <div key={user.name} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="font-bold">{user.name}</span>
                                    <span className="text-lg font-bold font-['Outfit']" style={{ color: COLORS[idx % COLORS.length] }}>{user.dominance}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${user.dominance}%`, backgroundColor: COLORS[idx % COLORS.length] }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* NEW CULTURE HEALTH SCORE */}
                    {evidence.health_score !== undefined && (
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2"><ShieldAlert className="w-3 h-3" /> Team Culture Health</h2>
                            <div className="flex items-end gap-3 mb-2">
                                <span className={`text-6xl font-['Outfit'] font-extrabold ${
                                    evidence.health_score >= 80 ? 'text-green-400' :
                                    evidence.health_score >= 60 ? 'text-yellow-400' : 'text-red-400'
                                }`}>{evidence.health_score}</span>
                                <span className="text-xl text-gray-500 font-bold mb-1">/ 100</span>
                            </div>
                            <p className="text-xs text-gray-400 italic">Indexed against Edmondson Psychological Safety benchmarks.</p>
                        </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">LIVE AI INTERPRETATIONS</h3>
                        <ul className="space-y-4 text-xs text-gray-400">
                            <li className="flex items-start gap-2">
                                <span className="text-indigo-500">◇</span>
                                Linguistic Pragmatic Extraction is dynamically zero-summed across all {users.length} participants.
                            </li>
                        </ul>
                    </div>
                </aside>

                {/* MIDDLE: TIMELINE GRAPH */}
                <main className="flex-1 flex flex-col relative overflow-y-auto">
                    <div className="p-8 pb-4">
                        <h2 className="text-2xl font-bold font-['Outfit'] mb-6">Power Shift Timeline</h2>

                        <div className="w-full h-80 bg-white/[0.02] border border-white/5 rounded-3xl p-6 mb-8 relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={timeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis dataKey="msgId" stroke="#ffffff50" tick={{ fill: '#ffffff50' }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#ffffff50" tick={{ fill: '#ffffff50' }} axisLine={false} tickLine={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#ffffff20', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    {users.map((user, idx) => (
                                        <Line
                                            key={user.name}
                                            type="monotone"
                                            dataKey={user.name}
                                            stroke={COLORS[idx % COLORS.length]}
                                            strokeWidth={3}
                                            dot={false}
                                            activeDot={{ r: 6, fill: COLORS[idx % COLORS.length], stroke: '#000', strokeWidth: 2 }}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </main>

                {/* RIGHT: LINGUISTIC EVIDENCE */}
                <aside className="w-[450px] border-l border-white/10 bg-[#080808] flex flex-col p-6 overflow-hidden">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6 font-['Outfit'] flex items-center gap-2"><Flag className="w-4 h-4" /> Evidence Engine</h2>

                    <div className="flex-1 overflow-y-auto space-y-6 pb-6 pr-2">
                        {evidence.insights && evidence.insights.map((insight, i) => (
                            <div key={'insight'+i} className={`p-6 rounded-2xl border bg-[#0a0a0a] ${
                                insight.type === 'critical' ? 'border-red-500/40 shadow-[0_0_25px_rgba(239,68,68,0.08)]' :
                                insight.type === 'warning' ? 'border-yellow-500/40' :
                                insight.type === 'success' ? 'border-green-500/40' : 'border-blue-500/40'
                            }`}>
                                <div className="flex flex-col gap-3 mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                                            insight.priority && insight.priority.includes('HIGH') ? 'bg-red-500/20 text-red-300' :
                                            insight.priority && insight.priority.includes('MEDIUM') ? 'bg-yellow-500/20 text-yellow-300' :
                                            'bg-green-500/20 text-green-300'
                                        }`}>
                                            PRIORITY: {insight.priority}
                                        </span>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-white/5 rounded-md text-gray-300">
                                            {insight.confidence}% CONFIDENCE
                                        </span>
                                        <span className="text-[10px] font-bold px-2 py-1 bg-indigo-500/20 rounded-md text-indigo-300 mt-1 sm:mt-0">
                                            TARGET: {insight.target}
                                        </span>
                                    </div>
                                    <h3 className={`text-[14px] leading-snug font-bold uppercase tracking-widest mt-2 ${
                                        insight.type === 'critical' ? 'text-red-400' :
                                        insight.type === 'warning' ? 'text-yellow-400' :
                                        insight.type === 'success' ? 'text-green-400' : 'text-blue-400'
                                    }`}>
                                        <span className="text-white/50 text-[10px] block mb-1">[{insight.nlp_metric}]</span>
                                        {insight.title}
                                    </h3>
                                </div>
                                
                                <div className="mb-5">
                                    <h4 className="text-[10px] uppercase font-bold text-gray-500 mb-2 flex items-center gap-1">📊 Core Metric</h4>
                                    <p className="text-[12px] text-gray-300 bg-[#111] p-3 rounded-xl font-mono border border-white/5">{insight.metric_data}</p>
                                </div>

                                <div className="mb-5">
                                    <h4 className="text-[10px] uppercase font-bold text-gray-500 mb-2">📌 Linguistic Evidence</h4>
                                    <div className="space-y-1">
                                        {Array.isArray(insight.evidence) && insight.evidence.map((ev, eIdx) => (
                                            <p key={eIdx} className="text-[13px] italic text-gray-400 border-l-2 border-white/10 pl-3 py-1">"{ev}"</p>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <h4 className="text-[10px] uppercase font-bold text-gray-500 mb-2">⚠️ Organizational Impact</h4>
                                    <p className="text-[13px] leading-relaxed text-gray-300">{insight.impact}</p>
                                </div>

                                <div className="mt-6 pt-5 border-t border-white/5">
                                    <h4 className="text-[10px] uppercase font-bold text-gray-500 mb-2">🎯 Immediate Product Action</h4>
                                    <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l-xl"></div>
                                        <p className="text-[13px] text-indigo-200 font-medium leading-relaxed pl-1">{insight.nudge}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default Analysis;
