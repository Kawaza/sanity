// const fs = require('fs');
// const path = require('path');

// exports.handler = async function(event, context) {
//     try {
//         const fileName = event.queryStringParameters.fileName;
//         if (!fileName) {
//             console.log('File name not provided');
//             return {
//                 statusCode: 400,
//                 body: JSON.stringify({ error: 'File name is required' }),
//             };
//         }

//         const reportsDir = '/tmp/reports'; // Directory path
//         const filePath = path.join(reportsDir, decodeURIComponent(fileName));
//         console.log('Attempting to delete file at path:', filePath); // Debug line

//         if (!fs.existsSync(filePath)) {
//             console.log('File not found at path:', filePath); // Debug line
//             return {
//                 statusCode: 404,
//                 body: JSON.stringify({ error: 'File not found' }),
//             };
//         }

//         fs.unlinkSync(filePath);
//         console.log('File successfully deleted at path:', filePath); // Debug line
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ message: 'File deleted successfully' }),
//         };
//     } catch (error) {
//         console.error('Error:', error); // Debug line
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ error: 'Unable to delete file' }),
//         };
//     }
// };
