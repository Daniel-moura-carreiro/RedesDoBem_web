import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-caixa-dialogo-simples',
  imports: [MatDialogModule],
  templateUrl: './caixa-dialogo-simples.html',
  styleUrl: './caixa-dialogo-simples.scss'
})
export class CaixaDialogoSimples {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any) {}
}
