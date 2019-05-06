const fs = require('fs')

const ENCODING = 'utf8'
const FILE_BUILD_GRADLE = 'android/app/build.gradle'
const FILE_PACKAGE_JSON = 'package.json'

if (process.argv.length < 3) {
  console.error('specify next version')
  return
}

const nextVersionMatch = process.argv[2].match(/^\d+\.\d+\.\d+$/)
if (!nextVersionMatch) {
  console.error('wrong next version format')
  return
}

const nextVersion = nextVersionMatch[0]

const updateVersion = (file, regex, replace) => {
  const data = fs.readFileSync(file, { encoding: ENCODING })
  const nextData = data.replace(regex, replace)
  fs.writeFileSync(file, nextData, { encoding: ENCODING })
}

updateVersion(FILE_PACKAGE_JSON, /"version":\s"\d+\.\d+\.\d+"/, `"version": "${nextVersion}"`)
updateVersion(FILE_BUILD_GRADLE, /versionName\s"\d+\.\d+\.\d+"/, `versionName "${nextVersion}"`)

const incrementVersionCode = () => {
  const data = fs.readFileSync(FILE_BUILD_GRADLE, { encoding: ENCODING })
  const regex = /versionCode\s\d+/
  const match = data.match(regex)
  if (!match) {
    throw 'no version code match'
  }

  split = match[0].split(' ')
  const versionCode = parseInt(split[1])
  const nextData = data.replace(
    regex,
    `versionCode ${versionCode + 1}`
  )
  fs.writeFileSync(FILE_BUILD_GRADLE, nextData, { encoding: ENCODING })
}

incrementVersionCode()
console.log(`updated to v${nextVersion}`)
