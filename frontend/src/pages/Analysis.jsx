import React from 'react';

const Analysis = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Left Sidebar */}
            <div className="w-64 border-r border-gray-700 p-4">
                <h2 className="text-xl font-bold mb-4">Participants</h2>
                <ul>
                    <li className="mb-2">User A - <span className="text-red-400">78% Dominance</span></li>
                    <li className="mb-2">User B - <span className="text-blue-400">22% Dominance</span></li>
                </ul>
            </div>

            {/* Center Panel */}
            <div className="flex-1 p-8 flex flex-col">
                <h2 className="text-2xl font-bold mb-4">Power Shift Timeline</h2>
                <div className="flex-1 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-gray-500">[ Timeline Line Graph Placeholder ]</span>
                </div>

                <h2 className="text-xl font-bold mb-4">Conversation Replay</h2>
                <div className="h-48 bg-gray-800 rounded-lg flex items-center justify-center p-4">
                    <span className="text-gray-500">[ Playback Controls & Messages Placeholder ]</span>
                </div>
            </div>

            {/* Right Sidebar */}
            <div className="w-80 border-l border-gray-700 p-4">
                <h2 className="text-xl font-bold mb-4">Linguistic Evidence</h2>
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="font-semibold text-red-400">Top Directives</h3>
                    <p className="text-sm text-gray-300">"Send the report now" (User A)</p>
                </div>
                <div className="bg-gray-800 p-4 rounded mb-4">
                    <h3 className="font-semibold text-blue-400">Hedge Phrases</h3>
                    <p className="text-sm text-gray-300">"I think maybe we should" (User B)</p>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
