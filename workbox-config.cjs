module.exports = {
  globDirectory: ".",
  globPatterns: [
    "*.{html,css,js,json}",
    "dist/",
    "data/*.json",
    "data/folklore/*.html",
    "img/*.{png,svg,ico}"
  ],
  swDest: "sw.js",
  runtimeCaching: [
    {
      urlPattern: /api\.lantmateriet\.se$/,
      handler: 'CacheFirst'
    }
  ]
};
