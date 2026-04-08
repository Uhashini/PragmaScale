import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Play, Pause, FastForward, Flag, AlertTriangle, Info, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const COLORS = ["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6", "#06b6d4", "#ef4444"];

const Analysis = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isPlaying, setIsPlaying] = useState(false);

    const nlpData = location.state?.resultData || null;
    const rawMessages = location.state?.rawMessages || [];

    if (!nlpData) {
        return (
            <div className="bg-[#050505] min-h-screen text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl mb-4 font-bold">No Analysis Data Found</h1>
                <p className="text-gray-400 mb-8">Please upload a file via the Dashboard to generate live pipeline data.</p>
                <button onClick={() => navigate('/dashboard')} className="px-6 py-2 bg-indigo-600 rounded-full hover:bg-indigo-500">Go to Dashboard</button>
            </div>
        );
    }

    const { users, timeline, evidence } = nlpData;
    const maxDominanceUser = users.reduce((prev, current) => (prev.dominance > current.dominance) ? prev : current, users[0]);

    return (
        <div className="bg-[#050505] min-h-screen text-white flex flex-col overflow-hidden">

            {/* HEADER */}
            <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/dashboard')} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-['Outfit'] font-bold">Multi-Agent Transcript Analysis <span className="text-sm font-normal text-green-500 ml-2">● Real-time Model</span></h1>
                    </div>
                </div>
            </header>

            {/* 3-COLUMN LAYOUT */}
            <div className="flex-1 flex overflow-hidden">

                {/* LEFT: PARTICIPANTS */}
                <aside className="w-80 border-r border-white/10 p-6 overflow-y-auto bg-[#080808]">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Users className="w-4 h-4" /> Social Hierarchy
                    </h2>

                    <div className="space-y-4">
                        {users.map((user, idx) => (
                            <div key={user.name} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 relative overflow-hidden">
                                <div
                                    className="absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full opacity-20"
                                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                                />
                                <div className="flex justify-between items-center mb-3 relative z-10">
                                    <span className={`font-bold text-lg ${user.name === maxDominanceUser.name ? 'text-white' : 'text-gray-300'}`}>
                                        {user.name}
                                    </span>
                                    <span className="font-bold text-xl" style={{ color: COLORS[idx % COLORS.length] }}>
                                        {user.dominance}%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden mb-1 relative z-10">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{ width: `${user.dominance}%`, backgroundColor: COLORS[idx % COLORS.length] }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-12 mb-6">Live AI Interpretations</h2>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex gap-3 items-start"><Info className="w-4 h-4 text-blue-500 mt-0.5 min-w-4" /> Linguistic Pragmatic extraction is dynamically zero-summed across all {users.length} participants.</li>
                        <li className="flex gap-3 items-start"><AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 min-w-4" /> High concentration of structural power identified in {maxDominanceUser.name}.</li>
                    </ul>
                </aside>

                {/* CENTER: TIMELINE / PLAYBACK */}
                <main className="flex-1 flex flex-col p-8 bg-[#050505]">
                    <h2 className="text-2xl font-['Outfit'] font-bold mb-6">Power Shift Timeline</h2>

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

                    {/* REPLAY MODE (Raw Uploaded Chat Rendered) */}
                    <div className="flex-1 border border-white/5 rounded-3xl bg-[#0a0a0a] flex flex-col overflow-hidden">
                        <div className="h-16 border-b border-white/10 flex items-center px-6 justify-between bg-white/[0.02]">
                            <h3 className="font-semibold flex items-center gap-2"><Play className="w-4 h-4 text-indigo-400" /> Uploaded Transcript</h3>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto space-y-6 flex flex-col">
                            {rawMessages.map((msg, i) => {
                                const userIndex = users.findIndex(u => u.name === msg.sender);
                                const color = COLORS[userIndex % COLORS.length] || "#6366f1";
                                const isMax = msg.sender === maxDominanceUser.name;

                                return (
                                    <div key={i} className={`max-w-xl ${isMax ? 'self-end' : 'self-start'}`}>
                                        <div
                                            className={`rounded-2xl px-5 py-3 text-[15px] ${isMax ? 'rounded-tr-none text-white' : 'bg-gray-800 rounded-tl-none text-gray-200'}`}
                                            style={isMax ? { backgroundColor: color } : { borderLeft: `4px solid ${color}` }}
                                        >
                                            {msg.text}
                                        </div>
                                        <span className={`text-xs text-gray-500 mt-2 block ${isMax ? 'text-right' : 'text-left'}`}>
                                            {msg.sender} • {msg.timestamp}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>

                {/* RIGHT: LINGUISTIC EVIDENCE */}
                <aside className="w-96 border-l border-white/10 bg-[#080808] flex flex-col p-6">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6 font-['Outfit'] flex items-center gap-2"><Flag className="w-4 h-4" /> Evidence Engine</h2>

                    <div className="flex-1 overflow-y-auto space-y-4">
                        {evidence.top_directives.map((text, i) => (
                            <div key={'dir' + i} className="p-5 rounded-2xl bg-red-900/10 border border-red-500/20">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-red-500 uppercase">Strong Directive</span>
                                </div>
                                <p className="text-sm leading-relaxed mb-3">"{text}"</p>
                                <div className="text-xs text-gray-400 bg-black/40 p-2 rounded-lg break-words">Power play instruction matched.</div>
                            </div>
                        ))}

                        {evidence.top_hedges.map((text, i) => (
                            <div key={'hedge' + i} className="p-5 rounded-2xl bg-yellow-900/10 border border-yellow-500/20">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-yellow-500 uppercase">Hedge Phrase</span>
                                </div>
                                <p className="text-sm leading-relaxed mb-3">"{text}"</p>
                                <div className="text-xs text-gray-400 bg-black/40 p-2 rounded-lg break-words">Algorithmic match for uncertainty/submissiveness.</div>
                            </div>
                        ))}
                    </div>
                </aside>

            </div>
        </div>
    );
};

export default Analysis;
