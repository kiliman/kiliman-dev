// try to keep this dep-free so we don't have to install deps
const fs = require('fs')
const fsp = require('fs/promises')
const { promisify } = require('util')
const exists = promisify(fs.exists)
const path = require('path')

const { getChangedFiles, fetchJson } = require('./get-changed-files')
const [currentCommitSha] = process.argv.slice(2)
async function go() {
  const buildInfo = await fetchJson('https://kiliman.dev/api/get-content-sha')
  const compareCommitSha = buildInfo.commit.sha
  let changedFiles = []
  if (compareCommitSha) {
    changedFiles =
      (await getChangedFiles(currentCommitSha, compareCommitSha)) ?? []
    console.error('Determining whether the changed files are content', {
      currentCommitSha,
      compareCommitSha,
      changedFiles,
    })
  } else {
    // get initial content list
    const files = await fsp.readdir(path.join(process.cwd(), './content/blog/'))
    changedFiles = files.map(filename => ({
      changeType: 'added',
      filename: `content/blog/${filename}`,
    }))
  }

  // get list of files that are content
  const contentFiles = changedFiles
    .filter(({ filename }) => filename.startsWith('content/blog/'))
    .map(({ filename }) =>
      filename.split('/').length > 3
        ? filename.split('/').slice(0, 3).join('/')
        : filename,
    )
  console.log(Array.from(new Set(contentFiles)).join(' '))
}

go().catch(e => {
  console.error(e)
  console.log('')
})
