const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        console.log('Current working directory:', process.cwd());
        console.log('REPORTS_BASE_PATH:', process.env.REPORTS_BASE_PATH);
        
        // Use REPORTS_BASE_PATH if set, otherwise fallback to process.cwd()
        const basePath = process.env.REPORTS_BASE_PATH || process.cwd();
        console.log('Base path:', basePath);
        
        // The reports should be in the 'public/reports' directory
        const reportsDir = path.join(basePath, 'public', 'reports');
        console.log('Reports Directory:', reportsDir);

        // List contents of the base path
        console.log('Base path contents:', fs.readdirSync(basePath));

        // List contents of the public directory
        const publicDir = path.join(basePath, 'public');
        console.log('Public directory contents:', fs.readdirSync(publicDir));
        
        // Check if the reports directory exists
        if (!fs.existsSync(reportsDir)) {
            console.error('Reports directory does not exist:', reportsDir);
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Reports directory not found' }),
            };
        }

        const files = fs.readdirSync(reportsDir);
        console.log('Files in Reports Directory:', files);
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        
        return {
            statusCode: 200,
            body: JSON.stringify({ files: htmlFiles }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to list files', details: error.message }),
        };
    }
};