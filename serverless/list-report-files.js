const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        const reportsDir = '/tmp/reports'; // Updated path
        console.log('Reports Directory:', reportsDir);
        const files = fs.readdirSync(reportsDir);
        console.log('Files in Directory:', files);
        const htmlFiles = files.filter(file => file.endsWith('.html'));
        return {
            statusCode: 200,
            body: JSON.stringify({ files: htmlFiles }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to list files' }),
        };
    }
};
