const { readFileSync, writeFile } = require('fs')
const { createConnection, createServer, Socket } = require('net')
const config = require('./config.json')

class Main {
    constructor(totalBytes) {
        this.totalBytes = totalBytes
    }

    /*
      Handles the TCP connection and writes the amount of bytes of the data transferred to an external file.
    */
    
    handleReceivedData() {
        return new Promise((resolve, reject) => {
            createServer(sock => {
                sock.setEncoding('utf8')
    
                sock.on('data', received => {
                    const bytes = parseInt(Buffer.byteLength(received.toString(), 'utf8'))
                    this.totalBytes += bytes
                    console.log(`Received the following data: ${received.toString()} with an amount of bytes of: ${bytes}`)
                    
                    writeFile('./totalBytes.txt', this.totalBytes, err => {
                        !err ? console.log('Successfully wrote to file') : console.log(err)
                    })
                })
            }).listen(config.settings.port, () => {
                const client = new Socket()

                console.log(`Server is currently listening on port: ${config.settings.port}`)

                client.connect(config.settings.port, config.settings.host, () => {
                    console.log('Successfully connected to socket.')

                    config.settings.messages.forEach((element, index) => {
                        setTimeout(() => {
                            this.sendData(client, element)
                        }, index * 10000)
                    })
                })

                setTimeout(() => resolve(), 1000)
            })
        })
    }
    /*
      Sends the passed data over the socket.
      
      @param ${object} client
      @param ${string} data
    */

    sendData(client, data) {
        const bytes = Buffer.byteLength(data.toString(), 'utf8')

        config.settings.maxBytes <= bytes ? console.log('Limit has been reached. No longer capable of sending data.') : client.write(data)
        this.totalBytes += parseInt(bytes)

        writeFile('./totalBytes.txt', this.totalBytes, err => {
            !err ? console.log('Successfully wrote to file') : console.log(err)
        })

        console.log(`Sent ${bytes} bytes of data.`)
    }
}

const bytes = readFileSync('./totalBytes.txt', 'utf8')
const obj = new Main(parseInt(bytes))

obj.handleReceivedData().then(() => console.log('Done.'))
