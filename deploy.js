const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const {interface, bytecode} = require('./compile')

const provider = new HDWalletProvider(
    'false urban pear used consider decline brush expect menu swear unaware helmet',
    'https://rinkeby.infura.io/A7d6gXzH5EWwC3WBjID9',
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('Tentando fazer deploy de conta', accounts[0])
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Olá Mundo!'] })
        .send({ gas: '1000000', from: accounts[0] })
    console.log('Contrato deployado para', result.options.address)
}
deploy()