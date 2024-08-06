import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Lighthouse() {
    const [urls, setUrls] = useState('');
    const [reportFiles, setReportFiles] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Function to fetch the list of report files
    const fetchReportFiles = async () => {
        console.log('fetched');
        try {
            const response = await axios.get('/.netlify/functions/list-report-files');
            setReportFiles(response.data.files);
        } catch (error) {
            console.error('Error fetching report files:', error);
            setError(error.response?.data?.error || 'An error occurred while fetching report files');
        }
    };

    useEffect(() => {
        fetchReportFiles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
    
        const urlArray = urls.split('\n').map(url => url.trim()).filter(url => url);
        
        if (urlArray.length === 0) {
            setError('No URLs provided');
            setIsLoading(false);
            return;
        }
    
        try {
            // Initiate report generation
            await axios.post('/.netlify/functions/generate-reports-background', { urls: urlArray }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            // Poll until reports are ready
            let reportsReady = false;
            while (!reportsReady) {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Poll every 2 seconds
                const response = await axios.get('/.netlify/functions/list-report-files');
                const files = response.data.files;
                if (files.length >= urlArray.length * 2) {
                    reportsReady = true;
                    setReportFiles(files);
                }
            }
        } catch (error) {
            console.error('Error generating reports:', error);
            setError(error.response?.data?.error || 'An error occurred while generating reports');
        } finally {
            setIsLoading(false);
            console.log('LOADING FALSE');
            setUrls(''); // Clear the text area
        }
    };
    


    const handleDownloadFile = async (fileName) => {
        try {
            const encodedFileName = encodeURIComponent(fileName);
    
            console.log('Starting file download...');
            const a = document.createElement('a');
            a.href = `/reports/${encodedFileName}`;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            console.log('File download triggered.');
    
            console.log('Deleting file...');
            const deleteResponse = await axios.delete('/.netlify/functions/delete-file', {
                params: { fileName: encodedFileName }
            });
            console.log('File deleted:', deleteResponse.data);
    
            // Optionally add a delay before fetching the files
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for 500ms
            
            console.log('Fetching updated file list...');
            fetchReportFiles();
        } catch (error) {
            console.error('Error handling file download or deletion:', error);
        }
    };



    return (
        <div className="mx-auto pt-10 bg-gray-900 container">
            <form onSubmit={handleSubmit} className="text-center">
                <textarea
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                    placeholder="Enter URLs, one per line"
                    rows="10"
                    className="w-full p-4 mb-4 rounded-md custom-border resize-none text-white" 
                />
                <button type="submit" className="mx-auto cursor-pointer md:mt-8 align-middle text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-8 rounded-full bg-transparent text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none flex items-center gap-3 h-12 border-white border-2 hover-blue-background duration-300 self-center" disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate Reports'}
                </button>
            </form>
            {error && <div className="mt-4 text-red-500">{error}</div>}
            {reportFiles.length > 0 && (
                <div className="mt-14">
                    <ul className="list-disc list-inside list-none ">
                        {reportFiles.map((fileName) => (
                            <li key={fileName}>
                                <div className='bg-white flex justify-between p-6 mb-4 custom-border'>
                                    <h3 className='text-white'>{fileName}</h3>
                                    <button 
                                        onClick={() => handleDownloadFile(fileName)} 
                                        className="text-blue-400 underline"
                                    >
                                        Download
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
