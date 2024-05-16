import React, { Component } from 'react'
import { string, file, any } from 'prop-types';
import { Form, Button, Header, Badge } from 'tabler-react'




// Assuming you have the public key provided by the recipient
 const recipientPublicKey = `-----BEGIN PUBLIC KEY-----
                            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0HySxRrSY5+jt7XJ71oj
                            hCkqOq59e0rf6jXYWvLOFfOxIeQsH6cIac4wujhfdMzJtlmH6v6w3R0h/AVI0Ehs
                            wPoPLsBT3K6VrLrCyM8HpZ0BK+FTDzQHFCtNo/VEu6bU+AzlKqu8ABHdP+vPEtAl
                            P4hzQ7nsnxuXCF8xayuWnI9VgXZ/GsCD8l++vP5vyeAaR5TpLxuqEa0j9OL7VYCb
                            8jNSqzt5Q3hzpNCTTnQ16VnudN6thA8fY4ZpI36V0CwveAepv91+7ONoiD8Oz5ZO
                            fDzyY1qyftrY5JUDIBn4inSzIkQGYgHjTBabRTUtHXWUjWhQVOslnvhhWvMV/J+B
                            AQIDAQAB
                            -----END PUBLIC KEY-----`;
const NodeRSAA ="node-rsa";

class Encode extends Component {
    constructor(props) {
        super(props)
        this.state = {
            button: "Upload",
            navActive: 1,
            message: string,
            picture: file,
            showImage: false,
            callCount: 0,
            binaryMessage: string,
            messageImg: any,
            originalImg: any
        }
    }

    getMain = () => {
        const { showImage, binaryMessage, callCount, button } = this.state
        var download = function () {
            var link = document.createElement("a");
            link.download = 'filename.png';
            link.href = document.getElementById('canvas').toDataURL()
            link.click();
        }
        return (
            <div>
                <Form>
                    <Form.Input name='message' label='Data' placeholder='Enter Student Data' onChange={this.handleChange} />
                    <Form.FileInput name='picture' label='Picture - Only BMP and PNG' accept="jpg, png" onChange={this.handleChange} />
                </Form>
                {callCount > 1 ?
                    <div className="binary">
                        <Header.H5 >Binary Message</Header.H5>
                        <Badge style={{ width: "600px" }} color="success">{callCount > 2 ? binaryMessage : "Will calculate..."}</Badge>
                    </div>
                    :
                    <div style={{ width: "600px" }} ></div>
                }
                <Button color="primary" value='Submit' onClick={this.showPicture} disabled={callCount > 3}>{button}</Button>
                {/* <Button color="primary" value='Submit' onClick={this.encodeMessage}>Encode</Button> */}

                {
                    showImage ? <div>
                        <div>
                            <Header.H3 >Original</Header.H3>
                            <canvas style={{ width: "50%", height: "30%" }} ref="originalC"></canvas>
                        </div>
                        <div>
                            <Header.H3>Encoded</Header.H3>
                            <canvas style={{ width: "50%", height: "30%" }} id="canvas" ref="messageC"></canvas>
                            <Button color="primary" value='Submit' onClick={download} > Download </Button>
                        </div>
                    </div> :
                        <div>

                        </div>
                }
            </div>
        )
    }

    handleChange = e => {
        if (e.target.files)
            this.setState({ [e.target.name]: URL.createObjectURL(e.target.files[0]) })
        else
            this.setState({ [e.target.name]: e.target.value })
    }
    showPicture = () => {
        const { callCount } = this.state
        this.setState({ showImage: true }, this.drawOriginalPicture())
        switch (callCount) {
            case 0:
                this.setState({ button: "Show Image" })
                break
            case 1:
                this.setState({ button: "Encode" })
                break
            default:
                this.setState({ button: "Encode" })
        }
    }
    drawOriginalPicture = () => {
        const { picture, callCount } = this.state
        const img = new Image();
        this.setState({ callCount: callCount + 1 })
        const canvas = this.refs.originalC
        img.src = picture
        if (callCount === 1) {
            const context = canvas.getContext('2d')
            canvas.width = img.width
            canvas.height = img.height
            img.onload = () => {
                context.drawImage(img, 0, 0);
                if (canvas.width > 0) {
                    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                    this.setState({ originalImg: imageData })
                }
            }
            this.callEncode()
        }
        if (callCount > 1)
            this.callEncode()
    }
    callEncode = canvas => {
        this.encodeMessage()
    }
  
    
    // Function to encrypt using RSA
    encryptWithRSA = (plaintext, publicKey) => {
        const key = NodeRSAA.createKey();
        key.importKey(publicKey, 'pkcs8-public'); // Import public key
        const encrypted = key.encrypt(plaintext, 'base64'); // Encrypt plaintext
        return encrypted;
    };
    

    encodeMessage = () => {
        const { messageC } = this.refs
        const { message, originalImg } = this.state
        const messageContext = messageC.getContext("2d");

        const width = originalImg.width
        const height = originalImg.height
        console.log(originalImg)

        messageC.width = width
        messageC.height = height
        let pixel = originalImg.data;
        if (originalImg.width > 0) {
            for (let i = 0, n = pixel.length; i < n; i += 4) {
                for (let offset = 0; offset < 3; offset++) {
                    if (pixel[i + offset] % 2 !== 0) {
                        pixel[i + offset]--;
                    }
                }
            }
            console.log(originalImg)
        }
        let binaryMessage = "";


        console.log(message)
        for (let i = 0; i < message.length; i++) {
            let binaryChar = message[i].charCodeAt(0).toString(2);
            console.log(binaryChar)
            while (binaryChar.length < 8) {
                binaryChar = "0" + binaryChar;
            }

            binaryMessage += binaryChar;


        }
        this.setState({ binaryMessage: binaryMessage })
        if (originalImg.width > 0) {
            const messageImg = originalImg
            pixel = messageImg.data;
            let counter = 0;
            for (var i = 0, n = pixel.length; i < n; i += 4) {
                for (var offset = 0; offset < 3; offset++) {
                    if (counter < binaryMessage.length) {
                        pixel[i + offset] += parseInt(binaryMessage[counter]);
                        counter++;
                    }
                    else {
                        break;
                    }
                }
            }
            this.setState({ messageImg: messageImg })
            messageContext.putImageData(messageImg, 0, 0)
        }
    }

    render() {
        return (this.getMain())
    }
}
export default Encode