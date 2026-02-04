const http = require('http');

const server = http.createServer((req, res) => {
    // الرابط الأصلي
    const targetUrl = "http://app.upsdo.me:8080/live/PCCQTZPXVCEG/041212071179/94962.ts";

    // إعدادات لفك الحماية
    const options = {
        headers: { 
            'User-Agent': 'VLC/3.0.18', 
            'Accept': '*/*',
            'Connection': 'keep-alive'
        },
        timeout: 10000 // مهلة 10 ثواني
    };

    const proxyReq = http.get(targetUrl, options, (proxyRes) => {
        // تمرير كود الحالة (مثلاً 200)
        res.writeHead(proxyRes.statusCode, {
            'Content-Type': 'video/mp2t',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache'
        });
        proxyRes.pipe(res);
    });

    proxyReq.on('error', (e) => {
        if (!res.headersSent) {
            res.writeHead(500);
            res.end("خطأ في الاتصال بالسيرفر الأصلي: " + e.message);
        }
    });
});

// المنفذ الذي يطلبه Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log("السيرفر يعمل الآن على المنفذ: " + PORT);
});
