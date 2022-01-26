import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RSAcommunicationComponent} from './components/rsacommunication/rsacommunication.component'
import {SecretsharingcommunicationComponent} from './components/secretsharingcommunication/secretsharingcommunication.component'
import {VotosComponent} from './components/votos/votos.component'

const routes: Routes = [
  {
    path: 'rsa',
    component: RSAcommunicationComponent
  },
  {
    path: 'secretsharing',
    component: SecretsharingcommunicationComponent
  },
  {
    path: 'votos',
    component: VotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
