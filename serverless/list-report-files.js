const fs = require('fs');
const path = require('path');

function exploreDirectory(dir, depth = 0) {
    if (depth > 3) return; // Limit depth to avoid infinite recursion
    console.log(`Exploring ${dir}:`);
    const items = fs.readdirSync(dir);
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            console.log(`  DIR: ${item}`);
            exploreDirectory(fullPath, depth + 1);
        } else {
            console.log(`  FILE: ${item}`);
        }
    });
}

exports.handler = async function(event, context) {
    try {
        console.log('Current directory:', __dirname);
        console.log('Process working directory:', process.cwd());
        
        // Explore from different starting points
        exploreDirectory(__dirname);
        exploreDirectory(process.cwd());
        exploreDirectory('/opt/build');
        exploreDirectory('/var/task');

        return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Reports directory not found. Check logs for file system structure.' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to list files', details: error.message }),
        };
    }
};