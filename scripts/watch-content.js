const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)
const cacheFilePath = './content/.cache.json'
const refreshFilePath = './app/.refresh.ignore'
let refreshTimeout = undefined
let force = true

;(async function () {
  await main()
})()

async function main() {
  // read from cache
  let cache = {}
  if (fs.existsSync(cacheFilePath)) {
    cache = JSON.parse(fs.readFileSync(cacheFilePath))
  }

  try {
    chokidar.watch('./content').on('all', async (event, path) => {
      console.log(event, path)
      if (event === 'addDir') return
      const filePath = path
      const { match, dir, file } = validContentPath(path)
      if (!match) return

      console.log({ event, path, dir, file })
      const lastModified = Math.floor(fs.statSync(path).mtimeMs)
      if (!force && cache[path] && cache[path].lastModified === lastModified) {
        console.log(`${path} has not changed`)
        return
      }

      // reset existing timer so we don't build multiple times
      if (refreshTimeout) {
        clearTimeout(refreshTimeout)
        refreshTimeout = undefined
      }

      console.error('Compiling', path)
      const results = await doCompile(path)
      console.error('results', results[path])
      if (!results[path]) return

      const { hash } = results[path]
      console.log(results)
      updateCache(cache, filePath, {
        //series,
        lastModified,
        hash,
      })
      refreshTimeout = setTimeout(() => {
        // update refresh file to trigger rebuild/refresh
        fs.writeFileSync(refreshFilePath, String(lastModified), 'utf8')
        refreshTimeout = undefined
      }, 1000)
    })
  } catch (e) {
    console.error(e)
  }
}

function updateCache(cache, path, entry) {
  cache[path] = entry
  fs.writeFileSync(cacheFilePath, JSON.stringify(cache, null, 2))
}

async function doCompile(path) {
  const command = `node scripts/mdx/compile-mdx.mjs --json --file ${path}`
  let out = await exec(command).catch(e => {
    console.error(e)
  })
  return JSON.parse(out.stdout)
}

function validContentPath(contentPath) {
  const match = /\/?(?<dir>content\/(?:.*))\/(?<file>[^.]+\.mdx)$/gm.exec(
    contentPath,
  )
  if (!match) return { match: false }
  const { dir, file } = match.groups
  return { match: true, dir, file }
}
