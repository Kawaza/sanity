const fs = require('fs');
const path = require('path');

function exploreDirectory(dir, depth = 0) {
    if (depth > 5) return; // Limit depth to avoid excessive recursion
    try {
        console.log(`Exploring ${dir}:`);
        const items = fs.readdirSync(dir);
        items.forEach(item => {
            const fullPath = path.join(dir, item);
            try {
                const stats = fs.statSync(fullPath);
                if (stats.isDirectory()) {
                    console.log(`  DIR: ${item}`);
                    exploreDirectory(fullPath, depth + 1);
                } else {
                    console.log(`  FILE: ${item}`);
                }
            } catch (error) {
                console.log(`  ERROR accessing ${fullPath}: ${error.message}`);
            }
        });
    } catch (error) {
        console.log(`ERROR exploring ${dir}: ${error.message}`);
    }
}

exports.handler = async function(event, context) {
    try {
        console.log('Current directory:', __dirname);
        console.log('Process working directory:', process.cwd());
        
        // Explore from different starting points
        exploreDirectory(__dirname);
        exploreDirectory(process.cwd());
        exploreDirectory('/var/task');

        // Try to find 'reports' directory
        const searchForReports = (startDir) => {
            const queue = [startDir];
            while (queue.length > 0) {
                const currentDir = queue.shift();
                const items = fs.readdirSync(currentDir);
                for (const item of items) {
                    const fullPath = path.join(currentDir, item);
                    const stats = fs.statSync(fullPath);
                    if (stats.isDirectory()) {
                        if (item === 'reports') {
                            return fullPath;
                        }
                        queue.push(fullPath);
                    }
                }
            }
            return null;
        };

        const reportsDir = searchForReports('/var/task');
        
        if (reportsDir) {
            console.log('Found reports directory:', reportsDir);
            const files = fs.readdirSync(reportsDir);
            const htmlFiles = files.filter(file => file.endsWith('.html'));
            return {
                statusCode: 200,
                body: JSON.stringify({ files: htmlFiles }),
            };
        } else {
            console.log('Reports directory not found');
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Reports directory not found. Check logs for file system structure.' }),
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to list files', details: error.message }),
        };
    }
};