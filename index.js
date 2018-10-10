const puppeteer = require('puppeteer');
const http = require('http');
const querystring = require('querystring');
const url = require('url');

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
const server = http.createServer().listen(port);


server.on('request', async function (req, res) {
    console.log(req.url);
    const contents = url.parse(req.url);
    if (!contents.search) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{}');
        return;
    }
    const search = querystring.parse(contents.search.slice(1));
    console.log(search.q);

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto("file://" +__dirname + "/index.html");

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate((q) => {
        jtab.render(document.getElementById('jtab'), q);
        return document.getElementById('builder_0').innerHTML;
    }, search.q);


    await browser.close();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        query: search.q,
        svg: dimensions
    }));
});
