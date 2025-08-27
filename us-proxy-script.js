import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing url');

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': '*/*' }
    });
    res.set('Content-Type', response.headers.get('content-type'));
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Proxy running');
});
