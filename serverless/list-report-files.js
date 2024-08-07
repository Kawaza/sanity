const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        // The reports are in the public/reports directory
        const reportsDir = path.join(__dirname, '..', '..', 'public', 'reports');
        
        console.log('Attempting to access reports directory:', reportsDir);

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