import fs from 'fs'
import path from 'path'
import uuidv4 from 'uuid/v4'

const data = {
  token: uuidv4(),
}

const dirs = ['../../server-auth', '../../server-gateway']

dirs.forEach(dir => {
  fs.writeFileSync(path.join(__dirname, dir, 'src/token.json'), JSON.stringify(data))
})
