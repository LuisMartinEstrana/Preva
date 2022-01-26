import { Component, OnInit } from '@angular/core';
import { VotosService } from '../../services/votos.service'

import * as bc from 'bigint-conversion'

@Component({
  selector: 'app-votos',
  templateUrl: './votos.component.html',
  styleUrls: ['./votos.component.css']
})
export class VotosComponent implements OnInit {

  constructor(private votosService: VotosService) {
    
   }

  //Hacer variables para guardar los valores de la PublicKey
  //Recibir los valores de la PublicKey (HECHO)
  //Utilizarlos para crear la funcion de encrypt y verify

  async ngOnInit(): Promise<void> {
  }

  //Crear la funcion de encryptar con los valores de la clave publica (HECHO)
  async encrypt(mensaje: HTMLTextAreaElement) {
    const mensajeBigint = bc.textToBigint(mensaje.value)
    const cifrado = this.votosService.serverPublicKey.encrypt(mensajeBigint)
    console.log(bc.bigintToHex(cifrado));
    const plaintextHex = ((await this.votosService.decrypt(bc.bigintToHex(cifrado))) as RsaResponse).message

    console.log(bc.bufToText(bc.hexToBuf(plaintextHex)))
  }

  async sign(mensaje: HTMLTextAreaElement) {
    const mensajeBigint = bc.textToBigint(mensaje.value)
    const signed = this.votosService.privateKey.sign(mensajeBigint);
    (await this.votosService.verify(bc.bigintToHex(signed), this.votosService.publicKey)).subscribe((res: any) => {
      console.log(res)
    })
  }
  
}
