// try to keep this dep-free so we don't have to install deps
const { getChangedFiles, fetchJson } = require('./get-changed-files')
const [currentCommitSha] = process.argv.slice(2)
async function go() {
  const buildInfo = await fetchJson('https://kiliman.dev/build/info.json')
  const compareCommitSha = buildInfo.commit.sha
  const changedFiles =
    (await getChangedFiles(currentCommitSha, compareCommitSha)) ?? []
  console.error('Determining whether the changed files are content', {
    currentCommitSha,
    compareCommitSha,
    changedFiles,
  })
  // get list of files that are content
  const contentFiles = changedFiles
    .filter(({ filename }) => filename.startsWith('content'))
    .map(({ filename }) =>
      filname.split('/').length > 3
        ? filename.split('/').slice(0, 3).join('/')
        : filename,
    )

  console.log(new Set(contentFiles).join(' '))
}

go().catch(e => {
  console.error(e)
  console.log('')
})
