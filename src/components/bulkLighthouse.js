import React, { useState } from 'react';
import axios from 'axios';

export default function Lighthouse() {
    const [urls, setUrls] = useState('');
    const [reportLink, setReportLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/.netlify/functions/generate-reports', { urls: urls.split('\n') });
            setReportLink(response.data.reportLink);
        } catch (error) {
            console.error('Error generating reports:', error);
        }
    };

    return (
        <div className="mx-auto pt-56 bg-gray-900">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
                Batch Report <span className="blue-text leading-snug">Lighthouse</span>
            </h2>
            <form onSubmit={handleSubmit} className="text-center">
                <textarea
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                    placeholder="Enter URLs, one per line"
                    rows="10"
                    className="w-full p-4 mb-4"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Generate Reports
                </button>
            </form>
            {reportLink && (
                <div className="mt-4">
                    <a href={reportLink} download className="text-blue-400 underline">
                        Download Reports
                    </a>
                </div>
            )}
        </div>
    );
}
