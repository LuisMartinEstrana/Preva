import { Router } from "express";

import { keys ,decrypt ,sign, encrypt, verify } from '../controllers/rsa.controller'

import {getPublicKeyPaillier } from '../controllers/paillier.controller'

import { secretSharingKey, combSecretSharing, sharesServerKey } from '../controllers/secretsharing.controller'

import { keysVotos, decryptVotos, signVotos, encryptVotos, verifyVotos, mostrar } from '../controllers/votaciones.controller'

const router = Router()

//localhost:4000/

//Modulos que estan en librerias

//-----------------------//
//----------RSA----------//
//-----------------------//

//Estabecer conexión
//Envia la clave publica
router.get('/rsa/publickey', keys) //Pasar en hexa bigint-conversion

//Recibir un mensaje y descifrar y lo verificar
router.post('/rsa/decrypt', decrypt)

//Firma del servidor
router.post('/rsa/sign', sign)

//Prueva de cifrado
router.post('/rsa/encrypt', encrypt)

router.post('/rsa/verify', verify)


//----------------------------//
//----------PAILLIER----------//
//----------------------------//

router.get('/paillier/publickey', getPublicKeyPaillier)

//----------------------------------//
//----------SECRET SHARING----------//
//----------------------------------//

//Envia la clave del cliente
router.get('/secret', secretSharingKey)

//Envia la clave del cliente al servidor para combinarlas
router.post('/secret', combSecretSharing)

//Envia la clave del servidor al cliente
router.get('/secretServerKey', sharesServerKey)


//-------------------------//
//----------VOTOS----------//
//-------------------------//

//Mostrar todos los votos de los participantes
//Estabecer conexión
//Envia la clave publica
router.get('/votos/publickey', keysVotos) //Pasar en hexa bigint-conversion

//Recibir un mensaje y descifrar y lo verificar
router.post('/votos/decrypt', decryptVotos)

//Firma del servidor
router.post('/votos/sign', signVotos)

//Prueva de cifrado
router.post('/votos/encrypt', encryptVotos)

router.post('/votos/verify', verifyVotos)

router.get('/votos', mostrar)



export default router
