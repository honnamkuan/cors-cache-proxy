# cors-cache-proxy

A Node.js CORS proxy server with caching support.

## Get started
1. `npm install`
1. `node server.js`


### Test it out
- Without proxy, HTTP response does not have CORS headers
```
curl --head https://sampleserver1.arcgisonline.com/ArcGIS/rest/info?f=json&pretty=true

HTTP/1.1 200 OK
Content-Length: 248
Content-Type: text/plain;charset=utf-8
```

- With proxy, HTTP response contains CORS access headers, allowing Cross Domain browser request
```
curl --head http://localhost:8080/https://sampleserver1.arcgisonline.com/ArcGIS/rest/info\?f\=json\&pretty\=true

HTTP/1.1 200 OK
content-length: 248
content-type: text/plain;charset=utf-8
x-request-url: https://sampleserver1.arcgisonline.com/ArcGIS/rest/info?f=json&pretty=true
x-final-url: https://sampleserver1.arcgisonline.com/ArcGIS/rest/info?f=json&pretty=true
access-control-allow-origin: *
access-control-expose-headers: content-length,content-type,date,etag,server,x-powered-by,connection,x-final-url,access-control-allow-origin
cache-control: max-age=60
```