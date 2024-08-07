const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        // Use an environment variable for the base path, with a fallback
        const basePath = process.env.REPORTS_BASE_PATH || process.cwd();
        const reportsDir = path.resolve(basePath, 'public', 'reports');
        
        console.log('Reports Directory:', reportsDir); // Debug line
        
        // Check if the directory exists
        if (!fs.existsSync(reportsDir)) {
            console.error('Reports directory does not exist:', reportsDir);
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Reports directory not found' }),
            };
        }

        const files = fs.readdirSync(reportsDir);
        console.log('Files in Directory:', files); // Debug line
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        return {
            statusCode: 200,
            body: JSON.stringify({ files: htmlFiles }),
        };
    } catch (error) {
        console.error('Error:', error); // Debug line
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to list files', details: error.message }),
        };
    }
};