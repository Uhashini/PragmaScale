import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Decode Hidden Power Dynamics in Conversations</h1>
      <p className="text-lg text-gray-400 mb-8">Upload your chat data and analyze linguistic dominance and social hierarchies.</p>
      <div className="flex gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Upload Chat
        </button>
        <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          Try Demo
        </button>
      </div>
    </div>
  );
};

export default Home;
