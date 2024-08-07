const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        console.log("dirname is "+ __dirname);
        const reportsDir = path.resolve(__dirname, '../../../../public/reports');
        console.log('Reports Directory:', reportsDir); // Debug line
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
            body: JSON.stringify({ error: 'Unable to list files' }),
        };
    }
};
