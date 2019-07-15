module.exports = [
  {
    name: "javascript",
    gzip: false,
    webpack: false,
    running: false,
    path: "dist/*.js",
    limit: "220 KB"
  },
  {
    name: "entire bundle zipped",
    gzip: false,
    webpack: false,
    running: false,
    path: "dist/*.gz",
    limit: "100 KB"
  }
]