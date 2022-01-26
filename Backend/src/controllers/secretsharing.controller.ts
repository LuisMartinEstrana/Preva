import { Request, Response } from "express";
import * as bc from 'bigint-conversion'

var secrets = require('secret-sharing.js')

var sharingKey: string
var sharesServer: string

export const secretSharingKey = async (req: Request, res: Response) => {
    //Generar una clave con 512bits
    sharingKey = secrets.random(512)

    //Dividimos en 2 la clave
    var shares = secrets.share(sharingKey,2,2)
    
    //Guardamos la primera parte de clave en el servidor
    sharesServer = shares[0]

    //Enviamos la segunda parte de la clave al cliente
    var sharesClient = shares[1]
    console.log(sharesClient)
    return res.json({
        sharesClient
    })

}

export const combSecretSharing = async(req: Request, res: Response) => {
    //Recogemos la clave del cliente

    var sharesClient = req.body.message

    //Combinamos las claves para comprobar si es la verdadera
    var shares = [sharesServer, sharesClient]
    var comb = secrets.combine(shares)
    if(comb === sharingKey){
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

export const sharesServerKey = async(req: Request, res: Response) => {
    return res.json({
        sharesServer
    })
}