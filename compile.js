// import solc from 'solc' // pq não funciona assim?
const solc = require('solc')
const path = require('path')
const fs = require('fs')

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf-8')

module.exports = solc.compile(source, 1).contracts[':Inbox']