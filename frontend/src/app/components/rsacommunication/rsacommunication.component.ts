import { Component, OnInit } from '@angular/core';
import { RsaService } from '../../services/rsa.service'
import * as bc from 'bigint-conversion'
import * as bcu from 'bigint-crypto-utils'
import * as rsa from 'my-rsa'


@Component({
  selector: 'app-rsacommunication',
  templateUrl: './rsacommunication.component.html',
  styleUrls: ['./rsacommunication.component.css']
})

export class RSAcommunicationComponent implements OnInit {

  constructor(private rsaService: RsaService) {
  }
  
  //Hacer variables para guardar los valores de la PublicKey
  //Recibir los valores de la PublicKey (HECHO)
  //Utilizarlos para crear la funcion de encrypt y verify

  async ngOnInit(): Promise<void> {
  }

  //Crear la funcion de encryptar con los valores de la clave publica (HECHO)
  async encrypt(mensaje: HTMLTextAreaElement) {
    const mensajeBigint = bc.textToBigint(mensaje.value)
    const cifrado = this.rsaService.serverPublicKey.encrypt(mensajeBigint)
    console.log(bc.bigintToHex(cifrado));
    const plaintextHex = ((await this.rsaService.decrypt(bc.bigintToHex(cifrado))) as RsaResponse).message

    console.log(bc.bufToText(bc.hexToBuf(plaintextHex)))
  }

  async sign(mensaje: HTMLTextAreaElement) {
    const mensajeBigint = bc.textToBigint(mensaje.value)
    const signed = this.rsaService.privateKey.sign(mensajeBigint);
    (await this.rsaService.verify(bc.bigintToHex(signed), this.rsaService.publicKey)).subscribe((res: any) => {
      console.log(res)
    })
  }


  //Firma ciega
  async firmaCiega(mensaje: HTMLTextAreaElement) {
    //Cegamos el mensaje
    var n = this.rsaService.publicKey.n
    var rPrin = bcu.randBetween(n)
    var r = this.rsaService.publicKey.encrypt(rPrin);
    //console.log(n)
    //console.log(r)

    var msg = this.rsaService.publicKey.encrypt(bc.textToBigint(mensaje.value));
    console.log("Mensaje cifrado: " +msg)
    var firmaC = msg * (r);
    var Ciega = firmaC % (this.rsaService.publicKey.n);
    console.log("Mensaje cegado: " +bc.bigintToHex(Ciega));

    (await this.rsaService.verify(bc.bigintToHex(Ciega), this.rsaService.publicKey)).subscribe((res: any) => {
      //Descegamos el mensaje
      console.log(res)
      var str = JSON.stringify(res)
      //console.log(str)
      var spli = str.split('"')
      //console.log(spli[3])
      var hex = bc.textToBigint(spli[3])
      var descegado = bc.bigintToHex(hex * bcu.modInv(r, this.rsaService.publicKey.n) % this.rsaService.publicKey.n)
      console.log("Mensaje desceagdo: " +descegado)
    })
  }
}