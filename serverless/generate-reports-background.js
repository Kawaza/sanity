const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

exports.handler = async (event) => {
    let urls;
    try {
        if (!event.body) {
            throw new Error('Request body is missing');
        }

        console.log('Received body:', event.body);

        let body;
        try {
            body = JSON.parse(event.body);
        } catch (parseError) {
            throw new Error(`Failed to parse request body: ${parseError.message}`);
        }

        console.log('Parsed body:', body);

        if (!body.urls) {
            throw new Error('urls property is missing in the request body');
        }

        urls = body.urls;

        if (!Array.isArray(urls)) {
            throw new Error('Invalid input: urls must be an array');
        }

        console.log('Received URLs:', urls);

        if (urls.length === 0) {
            throw new Error('No URLs provided');
        }

        const publicDir = path.join(__dirname, '../../../../public/reports'); // Adjust path as needed

        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        console.log('Running Lighthouse...');
        
        // Dynamically import chrome-launcher and lighthouse
        const chromeLauncher = await import('chrome-launcher');
        const { default: lighthouse } = await import('lighthouse');

        console.log('Launching Chrome...');
        const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
        console.log('Chrome launched on port:', chrome.port);

        const options = {
            logLevel: 'info',
            output: 'html',
            onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
            port: chrome.port,
        };

        const deviceConfigs = [
            { name: 'desktop', config: { ...options, emulatedFormFactor: 'desktop' } },
            { name: 'mobile', config: { ...options, emulatedFormFactor: 'mobile' } },
        ];

        for (const url of urls) {
            const { hostname } = new URL(url); // Extract domain from URL
            let parts = hostname.split('.');
            if (parts[0] === 'www') {
                parts.shift(); // Remove 'www' if it exists
            }
            const domainName = parts.slice(0, -1).join('_').toLowerCase(); // Remove TLD and sanitize domain name

            for (const { name, config } of deviceConfigs) {
                console.log(`Running Lighthouse for ${name} ${url}`);
                const runnerResult = await lighthouse(url, config);
                const reportHtml = runnerResult.report; // Directly get the HTML report
                
                fs.writeFileSync(
                    path.join(publicDir, `${domainName}_${name}.html`), 
                    reportHtml
                );
            }
        }

        await chrome.kill();

        console.log('HTML files created successfully');

        return {
            statusCode: 200,
            body: JSON.stringify({ reportLink: `/reports/` }),
        };
    } catch (error) {
        console.error('Error generating Lighthouse reports:', error);
        return {
            statusCode: 400,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
