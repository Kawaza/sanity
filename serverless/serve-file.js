// const fs = require('fs');
// const path = require('path');

// exports.handler = async function(event, context) {
//     try {
//         const fileName = event.queryStringParameters.fileName;
//         if (!fileName) {
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: 'File name is required' }),
//             };
//         }

//         const reportsDir = '/tmp/reports'; // Ensure this path is correct
//         const filePath = path.join(reportsDir, decodeURIComponent(fileName));
        
//         console.log('Serving file at path:', filePath); // Debug line

//         if (!fs.existsSync(filePath)) {
//             console.log('File not found at path:', filePath); // Debug line
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify({ error: 'File not found' }),
//             };
//         }

//         const fileContent = fs.readFileSync(filePath);

//         return {
//             statusCode: 200,
//             headers: {
//                 'Content-Type': 'application/octet-stream',
//                 'Content-Disposition': `attachment; filename="${fileName}"`,
//             },
//             body: fileContent.toString('base64'),
//             isBase64Encoded: true,
//         };
//     } catch (error) {
//         console.error('Error:', error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Unable to serve file' }),
//         };
//     }
// };
