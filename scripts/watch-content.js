const chokidar = require('chokidar')
const fs = require('fs')
const path = require('path')
const exec = require('util').promisify(require('child_process').exec)
const cacheFilePath = './content/.cache.json'
const refreshFilePath = './app/.refresh.ignore'
let refreshTimeout = undefined
let force = false

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
    chokidar.watch('./content').on('all', async (event, filePath) => {
      if (event === 'addDir') return
      const { match, dir, file } = validContentPath(filePath)
      if (!match) return

      console.log(event, filePath)

      let lastModified = Math.floor(fs.statSync(filePath).mtimeMs)
      if (!file.endsWith('.mdx')) {
        // component file so save in cache
        cache[filePath] = { lastModified }
        // so recompile index.mdx
        filePath = path.join(path.dirname(filePath), 'index.mdx')
        const indexModified = Math.floor(fs.statSync(filePath).mtimeMs)
        if (indexModified > lastModified) {
          lastModified = indexModified
          console.error('updating index.mdx for component')
        }
      }
      if (
        !force &&
        cache[filePath] &&
        cache[filePath].lastModified === lastModified
      ) {
        return
      }

      // reset existing timer so we don't build multiple times
      if (refreshTimeout) {
        clearTimeout(refreshTimeout)
        refreshTimeout = undefined
      }
      const results = await doCompile(filePath)
      if (!results[filePath]) return

      const { hash } = results[filePath]
      updateCache(cache, filePath, {
        //series,
        lastModified,
        hash,
      })
      refreshTimeout = setTimeout(() => {
        // update refresh file to trigger rebuild/refresh
        console.log('Refreshing...')
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
  const command = `scripts/mdx/compile-mdx.sh ${path}`
  let out = await exec(command).catch(e => {
    console.error(e)
  })
  return JSON.parse(out.stdout)
}

function validContentPath(contentPath) {
  const match = /\/?(?<dir>content\/(?:.*))\/(?<file>[\S]+)$/gm.exec(
    contentPath,
  )
  if (!match) return { match: false }
  const { dir, file } = match.groups
  return { match: true, dir, file }
}
