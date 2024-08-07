// const fs = require('fs');
// const path = require('path');

// exports.handler = async function(event, context) {
//     try {
//         const reportsDir = '/tmp/reports'; // Use /tmp for Netlify functions

//         // Ensure the reports directory exists
//         if (!fs.existsSync(reportsDir)) {
//             console.log('Reports directory does not exist, creating now...');
//             fs.mkdirSync(reportsDir, { recursive: true });
//         }

//         console.log('Reports Directory:', reportsDir); // Debug line

//         const files = fs.readdirSync(reportsDir);
//         console.log('Files in Directory:', files); // Debug line

//         const htmlFiles = files.filter(file => file.endsWith('.html'));
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ files: htmlFiles }),
//         };
//     } catch (error) {
//         console.error('Error listing report files:', error); // Detailed error logging
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Unable to list files', details: error.message }),
//         };
//     }
// };
