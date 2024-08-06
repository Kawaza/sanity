const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    try {
        // Parse the query parameters
        const fileName = event.queryStringParameters.fileName;
        if (!fileName) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'File name is required' }),
            };
        }

        // Define the path to the reports directory
        const reportsDir = path.join(__dirname, '../../../../public/reports');
        console.log('Reports Directory:', reportsDir); // Debug line

        // Define the path to the file to be deleted
        const filePath = path.join(reportsDir, decodeURIComponent(fileName));
        console.log('File Path:', filePath); // Debug line

        // Check if the file exists before attempting to delete
        if (!fs.existsSync(filePath)) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'File not found' }),
            };
        }

        // Delete the file
        fs.unlinkSync(filePath);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'File deleted successfully' }),
        };
    } catch (error) {
        console.error('Error:', error); // Debug line
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to delete file' }),
        };
    }
};
