import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-12">
            <h1 className="text-4xl font-bold mb-8 text-center">About Our Methodology</h1>

            <div className="max-w-3xl mx-auto space-y-8">
                <section>
                    <h2 className="text-2xl font-semibold mb-2">The "Invisible Hierarchy" Problem</h2>
                    <p className="text-gray-300">
                        In digital communication, physical cues are lost. This tool detects subtle power dynamics
                        by analyzing linguistic patterns, turn-taking latency, and sentiment asymmetry.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">Feature Extraction</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li><strong>Directives:</strong> Identifying imperative verbs (e.g., "Do this").</li>
                        <li><strong>Hedges & Boosters:</strong> Detecting weak vs. high-confidence language.</li>
                        <li><strong>Turn-Taking Latency:</strong> Analyzing response delay between participants.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-2">ML Model & Approach</h2>
                    <p className="text-gray-300">
                        We utilize a custom NLP pipeline combining spaCy for dependency parsing and
                        HuggingFace Transformers for intent classification, culminating in our proprietary
                        Linguistic Dominance Score.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
