import { Request, Response } from 'express'
import * as rsa from 'my-rsa'
import * as bc from 'bigint-conversion'

var director_Carlos = 0
var director_Antonio = 0
var director_Angel = 0

export const votos = async (req: Request, res: Response) => {
    var director = req.body.message

    if (director == "Carlos") {
        director_Carlos = director_Carlos + 1
        console.log(director_Carlos)
        return res.json({
            message: "OK"
        })
    }
    else if(director == "Antonio") {
        director_Antonio = director_Antonio + 1
        console.log(director_Antonio)
        return res.json({
            message: "OK"
        })
    }
    else if(director == "Angel") {
        director_Angel = director_Angel + 1
        console.log(director_Angel)
        return res.json({
            message: "OK"
        })
    }
    else{
        return res.json({
            message: "ERROR"
        })
    }
}



export const mostrar = async (req: Request, res: Response) => {
    return res.json({
        directorC: director_Carlos,
        directorAnt: director_Antonio,
        directorAng: director_Angel
    })
}


interface PublicKey {
    e: string // hex
    n: string // hex
}
interface RsaRequest {
    message: string // string in hex
    publicK: string
}
interface RsaResponse {
    message: string // hex
}
interface EncryptVerifyRequest extends RsaRequest {
    pubKey: PublicKey
}

//Genera un par de claves publicas y privadas
const keypairPromise = rsa.generateKeys(1024)


//FUNCIONA
export const keysVotos = async (req: Request, res: Response<PublicKey>) => {
    const keypair = await keypairPromise
    
    const publicE = keypair.publicKey.e
    const publicN = keypair.publicKey.n
    //const privateD = (await keypairPromise).privateKey.d
    //const privateN = (await keypairPromise).privateKey.n
    const pubE = bc.bigintToHex(publicE)
    const pubN = bc.bigintToHex(publicN)
    /*const pub: any[] = []
    pub[0] = pubE
    pub[1] = pubN*/
    //const pub = pubE +" "+ pubN
    return res.json({
        e: pubE,
        n: pubN
    })
}

export const decryptVotos = async (req: Request<{}, {}, RsaRequest, {}>, res: Response<RsaResponse>) => {
    const mensaje = bc.hexToBigint(req.body.message)
    //const keypair = await rsa.generateKeys(1024)
    const decypher = (await keypairPromise).privateKey.decrypt(mensaje)
    console.log(bc.bigintToText(decypher))
    var director = bc.bigintToText(decypher)
    if (director == "Carlos") {
        director_Carlos = director_Carlos + 1
        console.log(director_Carlos)
        /*return res.json({
            message: "OK"
        })*/
    }
    else if(director == "Antonio") {
        director_Antonio = director_Antonio + 1
        console.log(director_Antonio)
        /*return res.json({
            message: "OK"
        })*/
    }
    else if(director == "Angel") {
        director_Angel = director_Angel + 1
        console.log(director_Angel)
        /*return res.json({
            message: "OK"
        })*/
    }
    else{
        /*return res.json({
            message: "ERROR"
        })*/
        console.log("Error")
    }
    
}

//FUNCIONA
export const signVotos = async (req: Request<{}, {}, RsaRequest, {}>, res: Response<RsaResponse>)=> {
    const mensaje = bc.textToBigint(req.body.message)
    console.log(mensaje)
    //const keypair = await rsa.generateKeys(1024)
    const signs = (await keypairPromise).privateKey.sign(mensaje)
    console.log(signs)
    return res.json({
        message: bc.bigintToHex(signs) 
    })
}

//CLIENTE
//FUNCIONA
export const encryptVotos = async (req: Request<{}, {}, EncryptVerifyRequest, {}>, res: Response<RsaResponse>) => {
    const mensaje = bc.textToBigint(req.body.message)
    const publicKey = new rsa.PublicKey(bc.hexToBigint(req.body.pubKey.e), bc.hexToBigint(req.body.pubKey.n))
    //console.log(mensaje)
    //const keypair = await rsa.generateKeys(1024)
    //console.log((await keypair).publicKey.e)
    //console.log((await keypair).publicKey.n)
    const cifrado = publicKey.encrypt(mensaje)
    const encryp = bc.bigintToHex(cifrado)
    console.log(encryp)
    return res.json({
        message: encryp
    })
}

//
 export const verifyVotos = async (req: Request<{}, {}, EncryptVerifyRequest, {}>, res: Response<RsaResponse>) => {
     const sign = bc.textToBigint(req.body.message)
     const publicKey = new rsa.PublicKey(bc.hexToBigint(req.body.pubKey.e), bc.hexToBigint(req.body.pubKey.n))
     const verif = publicKey.verify(sign)
     return res.json({
         message: bc.bigintToHex(verif)
     })
}
