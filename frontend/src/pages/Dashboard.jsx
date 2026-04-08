import React from 'react';
import { motion } from 'framer-motion';
import { FileUp, Database, Activity, Clock, MoreVertical, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const recentAnalyses = [
        { id: 1, title: 'Q3 Board Meeting Transcript', date: 'Oct 12, 2026', participants: 4, dominance: 'Sarah J. (62%)' },
        { id: 2, title: 'Customer Support Escalation #802', date: 'Oct 10, 2026', participants: 2, dominance: 'Agent (88%)' },
        { id: 3, title: 'Engineering Sync - Microservices', date: 'Oct 08, 2026', participants: 6, dominance: 'Michael R. (41%)' },
    ];

    return (
        <div className="bg-[#050505] min-h-screen text-white flex select-none">

            {/* SIDEBAR */}
            <aside className="w-64 border-r border-white/10 bg-[#0a0a0a] flex flex-col p-6 hidden md:flex">
                <div className="flex items-center gap-2 mb-12">
                    <Activity className="w-6 h-6 text-indigo-400" />
                    <span className="font-['Outfit'] font-bold text-xl">PDA Workspace</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <button className="w-full flex items-center justify-start gap-4 px-4 py-3 rounded-xl bg-white/10 text-white font-medium">
                        <Database className="w-5 h-5" /> All Analyses
                    </button>
                    <button className="w-full flex items-center justify-start gap-4 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <Clock className="w-5 h-5" /> Recent
                    </button>
                </nav>

                <div className="pt-6 border-t border-white/5 mt-auto flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">Alex Mitchell</span>
                        <span className="text-xs text-gray-500">Pro Plan</span>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="mb-12 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-['Outfit'] font-bold mb-2">Dashboard</h1>
                        <p className="text-gray-400">Upload a new conversation or review your active workspace.</p>
                    </div>
                </header>

                {/* UPLOAD ZONE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative group cursor-pointer"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative border-2 border-dashed border-white/20 hover:border-indigo-500/50 rounded-3xl p-16 flex flex-col items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-xl transition-colors">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                            <FileUp className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-['Outfit'] font-bold mb-2">Upload Chat Data</h3>
                        <p className="text-gray-400 text-center max-w-sm mb-6">Drop your JSON, CSV, or raw transcript files here to begin extraction and NLP analysis.</p>
                        <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors">
                            Browse Files
                        </button>
                    </div>
                </motion.div>

                {/* RECENT ANALYSES */}
                <div className="mt-16">
                    <h2 className="text-2xl font-['Outfit'] border-b border-white/10 pb-4 mb-6">Recent Analyses</h2>
                    <div className="grid gap-4">
                        {recentAnalyses.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                onClick={() => navigate('/analysis/' + item.id)}
                                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-6 mb-4 sm:mb-0">
                                    <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                                        <Database className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.date} • {item.participants} Participants</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full sm:w-auto sm:gap-12">
                                    <div className="flex flex-col text-left sm:text-right">
                                        <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Peak Dominance</span>
                                        <span className="text-indigo-400 font-medium">{item.dominance}</span>
                                    </div>
                                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-indigo-500 text-white transition-colors">
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

        </div>
    );
};

export default Dashboard;
