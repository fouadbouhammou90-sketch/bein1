const http = require('http');

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    // 1. كلمة السر (Token)
    const secretKey = "2026"; 
    
    // 2. التحقق من كلمة السر والامتداد الوهمي
    if (url.searchParams.get("key") !== secretKey) {
        res.writeHead(403);
        res.end("Unauthorized: Access Denied");
        return;
    }

    // الرابط الأصلي المخفي
    const targetUrl = "http://app.upsdo.me:8080/live/PCCQTZPXVCEG/041212071179/94961.ts";

    http.get(targetUrl, (proxyRes) => {
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
