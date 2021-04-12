module.exports = {
  globDirectory: ".",
  globPatterns: [
    "*.{html,css,js,json}",
    "web_modules/*.js",
    "data/*.json",
    "data/folklore/*.html",
    "components/*.{html,css,js}",
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
