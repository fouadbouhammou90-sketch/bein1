const http = require('http');

const server = http.createServer((req, res) => {
    // الرابط الأصلي
    const targetUrl = "http://app.upsdo.me:8080/live/PCCQTZPXVCEG/041212071179/93914.ts";

    const options = {
        headers: { 'User-Agent': 'VLC/3.0.18', 'Accept': '*/*' }
    };

    http.get(targetUrl, options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, {
            'Content-Type': 'video/mp2t',
            'Access-Control-Allow-Origin': '*',
            'Connection': 'keep-alive'
        });
        proxyRes.pipe(res);
    }).on('error', (e) => {
        res.end(e.message);
    });
});

server.listen(process.env.PORT || 3000);
