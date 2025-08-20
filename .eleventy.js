const { DateTime } = require("luxon")
const fs = require("fs")
const path = require("path")

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("formatDate", (dateString, format) => {
    let dt = DateTime.fromISO(dateString)
    if (!dt.isValid) dt = DateTime.local()
    return dt.setLocale("cs").toFormat(format)
  })
  eleventyConfig.addCollection("events", () => {
    const dir = "src/_data/events"
    return fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".json"))
      .map((file) => {
        const filepath = path.join(dir, file)
        const data = JSON.parse(fs.readFileSync(filepath))
        return { file, ...data }
      })
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
    templateFormats: ["md", "njk", "html", "yml"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  }
}
