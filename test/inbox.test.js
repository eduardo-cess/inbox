const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const {interface, bytecode} = require('../compile')

// class Car {
//     park(){
//         return 'stopped'
//     }

//     drive(){
//         return 'vroom'
//     }
// }

// let car
// beforeEach(()=>{
//     car = new Car()
// })

// describe('Car', () => {
//     it('can park', ()=> {
//         assert.equal(car.park(), 'stopped')
//     })

//     it('can drive', ()=> {
//         assert.equal(car.drive(), 'vroom')
//     })
// })

let accounts
let inbox
const INITIAL_MESSAGE = 'Olá Mundo!'
const CHANGE_MESSAGE = 'Fui modificado!'
beforeEach(async () => {
    // lista de todas as contas
    accounts = await web3.eth.getAccounts()
    // console.log(accounts)

    // deploy de contrato
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: [INITIAL_MESSAGE]})
        .send({from: accounts[0], gas: '1000000'})

    inbox.setProvider(provider)
    // console.log(inbox.methods.message)
})

describe('Inbox', ()=>{
    it('deploys a contract', ()=>{
        assert.ok(inbox.options.address)
    })
    it('has initial message', async ()=>{
        const message = await inbox.methods.message().call()
        assert.equal(message, INITIAL_MESSAGE)
    })
    it('can change message', async ()=>{
        await inbox.methods.setMessage(CHANGE_MESSAGE).send({ from: accounts[0] })
        const message = await inbox.methods.message().call()
        assert.equal(message, CHANGE_MESSAGE)
    })
})