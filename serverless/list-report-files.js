const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        console.log('Current directory:', __dirname);
        console.log('Parent directory contents:', fs.readdirSync(path.join(__dirname, '..')));
        console.log('Grandparent directory contents:', fs.readdirSync(path.join(__dirname, '..', '..')));

        // Try different possible paths
        const possiblePaths = [
            path.join(__dirname, '..', '..', 'public', 'reports'),
            path.join(__dirname, '..', 'public', 'reports'),
            path.join(__dirname, 'public', 'reports'),
            '/var/task/public/reports',
            '/opt/build/repo/public/reports'
        ];

        let reportsDir;
        for (const testPath of possiblePaths) {
            console.log('Trying path:', testPath);
            if (fs.existsSync(testPath)) {
                reportsDir = testPath;
                console.log('Found reports directory:', reportsDir);
                break;
            }
        }

        if (!reportsDir) {
            console.error('Reports directory not found in any of the tested paths');
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