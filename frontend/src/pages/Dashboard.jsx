import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-8 text-white bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Your Workspace</h1>

            <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center mb-8">
                <p className="text-gray-400">Drag & drop JSON/CSV chat logs here</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded">
                    Browse Files
                </button>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Previous Analyses</h2>
            <ul className="space-y-2 text-gray-300">
                <li className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700">Team_Sync_March_12.json</li>
                <li className="bg-gray-800 p-4 rounded cursor-pointer hover:bg-gray-700">Customer_Support_Q1.csv</li>
            </ul>
        </div>
    );
};

export default Dashboard;
