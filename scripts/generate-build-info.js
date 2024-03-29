const path = require('path')
const fs = require('fs')
// this is installed by remix...
// eslint-disable-next-line import/no-extraneous-dependencies
const fetch = require('node-fetch')

const commit = process.env.COMMIT_SHA

async function getCommit() {
  if (!commit) return { sha: '' }
  try {
    const res = await fetch(
      `https://api.github.com/repos/kiliman/kiliman-dev/commits/${commit}`,
    )
    const data = await res.json()
    return {
      isDeployCommit: commit === 'HEAD' ? 'Unknown' : true,
      sha: data.sha,
      author: data.commit.author.name,
      date: data.commit.author.date,
      message: data.commit.message,
      link: data.html_url,
    }
  } catch (error) {
    return `Unable to get git commit info: ${error.message}`
  }
}

async function go() {
  const buildInfo = {
    buildTime: Date.now(),
    commit: await getCommit(),
  }
  const buildPath = path.join(__dirname, '../public/build')
  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath, { recursive: true })
  }

  fs.writeFileSync(
    path.join(buildPath, 'info.json'),
    JSON.stringify(buildInfo, null, 2),
  )
  console.log('build info generated', buildInfo)
}
go()

/*
eslint
  consistent-return: "off",
*/
