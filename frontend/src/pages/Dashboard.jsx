import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, Database, Activity, Clock, ArrowRight, Briefcase, Building2, HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);
    const [mode, setMode] = useState('hr');
    const [focusAreas, setFocusAreas] = useState([]);

    const availableFocusAreas = {
        hr: ['Linguistic Bullying', 'Silent Employees', 'Leadership Identification', 'Micromanagement', 'Conflict Detection', 'Employee Confidence', 'Bias Detection', 'Work Pressure'],
        sales: ['Frame Control', 'Objection Handling', 'Closing Aggression'],
        clinical: ['Partnership Parity', 'Avoidance Markers', 'Aggression Detection']
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        setFocusAreas([]);
    };

    const toggleFocus = (area) => {
        setFocusAreas(prev => prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]);
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                setIsUploading(true);
                const parsedData = JSON.parse(event.target.result);

                // POST to Node.js backend
                const response = await fetch('http://localhost:5000/api/analysis/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...parsedData, mode, focus_areas: focusAreas })
                });

                const jsonResponse = await response.json();

                if (response.ok) {
                    navigate(`/analysis/${jsonResponse.data._id}`, { state: { resultData: jsonResponse.data.results, rawMessages: parsedData.messages } });
                } else {
                    console.error("Backend Error:", jsonResponse);
                    alert("API Error: Make sure your Python and Node servers are running.");
                }
            } catch (err) {
                console.error("Parse or Fetch Error:", err);
                alert("Failed to read JSON. Check console.");
            } finally {
                setIsUploading(false);
            }
        };
        reader.readAsText(file);
    };

    const recentAnalyses = [
        { id: 1, title: 'Q3 Board Meeting', date: 'Oct 12, 2026', participants: 4, dominance: 'Sarah J. (62%)' }
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
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8 md:p-12 overflow-y-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-['Outfit'] font-bold mb-2">Workspace</h1>
                </header>

                {/* INTELLIGENCE MODES */}
                <div className="mb-8">
                    <h2 className="text-xl font-['Outfit'] font-bold mb-4 text-gray-300">Select Intelligence Engine Mode</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { id: 'hr', icon: Building2, title: 'HR & Org Culture', desc: 'Detect micromanagement, bias, and silent employees.' },
                            { id: 'sales', icon: Briefcase, title: 'Sales Leadership', desc: 'Analyze frame control and client negotiation balance.' },
                            { id: 'clinical', icon: HeartHandshake, title: 'Clinical Therapy', desc: 'Map subtle power shifts in couples or group therapy.' }
                        ].map((m) => (
                            <div
                                key={m.id}
                                onClick={() => handleModeChange(m.id)}
                                className={`p-5 rounded-3xl cursor-pointer border-2 transition-all ${mode === m.id ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.15)]' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${mode === m.id ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-400'}`}>
                                    <m.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">{m.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SUB-FOCUS AREAS */}
                <AnimatePresence>
                    {availableFocusAreas[mode] && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mb-10 overflow-hidden"
                        >
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">Target Specific Analysis Reports (Optional)</h2>
                            <div className="flex flex-wrap gap-3">
                                {availableFocusAreas[mode].map(area => (
                                    <button
                                        key={area}
                                        onClick={() => toggleFocus(area)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${focusAreas.includes(area)
                                                ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {area}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* UPLOAD ZONE */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative group cursor-pointer"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="relative border-2 border-dashed border-white/20 hover:border-indigo-500/50 rounded-3xl p-16 flex flex-col items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-xl transition-colors">

                        <input type="file" id="chatUpload" className="hidden" accept=".json" onChange={handleFileUpload} />

                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                            <FileUp className="w-8 h-8" />
                        </div>

                        <h3 className="text-2xl font-['Outfit'] font-bold mb-2">
                            {isUploading ? 'Extracting NLP Features...' : `Upload Transcript to ${mode.toUpperCase()} Engine`}
                        </h3>

                        <p className="text-gray-400 text-center max-w-sm mb-6">
                            Drop your JSON chat log here to begin extracting psychological power dynamics.
                        </p>

                        <button
                            onClick={() => document.getElementById('chatUpload').click()}
                            disabled={isUploading}
                            className={`px-8 py-3 font-semibold rounded-full transition-colors ${isUploading ? 'bg-indigo-600 text-white cursor-wait animate-pulse' : 'bg-white text-black hover:bg-gray-200'
                                }`}
                        >
                            Browse JSON File
                        </button>
                    </div>
                </motion.div>

            </main>
        </div>
    );
};

export default Dashboard;
