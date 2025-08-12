const { DateTime } = require("luxon")

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("formatDate", (dateString, format) => {
    let dt = DateTime.fromISO(dateString)
    if (!dt.isValid) dt = DateTime.local()
    return dt.setLocale("cs").toFormat(format)
  })

  eleventyConfig.addPassthroughCopy("src/assets")
  eleventyConfig.addPassthroughCopy("src/css")
  eleventyConfig.addPassthroughCopy("src/js")
  eleventyConfig.addPassthroughCopy("CNAME")
  eleventyConfig.addPassthroughCopy({
    "src/favicon": "/",
  })

  eleventyConfig.addWatchTarget("src/css/")

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  }
}
