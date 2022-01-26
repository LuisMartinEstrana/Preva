import { Component, OnInit } from '@angular/core';
import {SecretsharingService} from '../../services/secretsharing.service'
import * as bc from 'bigint-conversion'
import { Shares } from '../../interfaces/secret';

@Component({
  selector: 'app-secretsharingcommunication',
  templateUrl: './secretsharingcommunication.component.html',
  styleUrls: ['./secretsharingcommunication.component.css']
})
export class SecretsharingcommunicationComponent implements OnInit {
  
  share: Shares[] = [];
  
  constructor(private secretsharingService: SecretsharingService) {
    
   }

  ngOnInit() {
    this.secretsharingService.getSecretSharing('http://localhost:4000/secret').subscribe((res:any) => {  
      this.share = res
     });
     
     this.secretsharingService.combSecretSharingServer('http://localhost:4000/secret', this.share[0]).subscribe((re: any) => {
       console.log(re)
     });
  }


async shares() {
  //Devuelve la clave de la parte del cliente al servidor para que se combinen
  
}

}
