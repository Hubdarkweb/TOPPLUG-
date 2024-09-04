const { spawnSync } = require('child_process')
const { existsSync, writeFileSync } = require('fs')

const SESSION_ID = 'levanter_45b80eec68b1342eb88bf463df799a914' // Edit this line only, don't remove ' <- this symbol

if (!existsSync('Cyberpunk')) {
  console.log('Cloning the repository...')
  const cloneResult = spawnSync(
    'git',
    ['clone', 'https://github.com/Hubdarkweb/Cyberpunk.git', 'Cyberpunk'],
    {
      stdio: 'inherit',
    }
  )

  if (cloneResult.error) {
    throw new Error(`Failed to clone the repository: ${cloneResult.error.message}`)
  }

  const configPath = 'Cyberpunk/config.env'
  try {
    console.log('Writing to config.env...')
    writeFileSync(configPath, `VPS=true\nSESSION_ID=${SESSION_ID}`)
  } catch (err) {
    throw new Error(`Failed to write to config.env: ${err.message}`)
  }

  console.log('Installing dependencies...')
  const installResult = spawnSync('yarn', ['install', '--network-concurrency', '3'], {
    cwd: 'Cyberpunk',
    stdio: 'inherit',
  })

  if (installResult.error) {
    throw new Error(`Failed to install dependencies: ${installResult.error.message}`)
  }
}

spawnSync('yarn', ['start'], { cwd: 'levanter', stdio: 'inherit' })
