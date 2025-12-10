import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-caixa-dialogo-simples',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './caixa-dialogo-simples.html',
  styleUrls: ['./caixa-dialogo-simples.scss']
})
export class CaixaDialogoSimples {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any) {}
}
