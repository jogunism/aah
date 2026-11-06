// 배포 후 라이브 sitemap의 URL을 IndexNow(Bing 등)에 제출하는 스크립트. 사용법: node scripts/indexnow.mjs
const HOST = 'aah.education';
const KEY = '86df57804e14e64258679c89a8255439'; // public/<KEY>.txt 와 같아야 한다

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) throw new Error('sitemap has no URLs');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow ${res.status} (${urlList.length} URLs)`);
if (!res.ok && res.status !== 202) process.exit(1);
