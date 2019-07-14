module.exports = [
  {
    name: "javascript",
    gzip: false,
    webpack: false,
    running: false,
    path: "dist/*.js.gz",
    limit: "100 KB"
  },
  {
    name: "css",
    gzip: false,
    webpack: false,
    running: false,
    path: "dist/*.css.gz",
    limit: "22 KB"
  }
]