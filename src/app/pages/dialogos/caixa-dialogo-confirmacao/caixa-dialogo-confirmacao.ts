import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-caixa-dialogo-confirmacao',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './caixa-dialogo-confirmacao.html',
  styleUrls: ['./caixa-dialogo-confirmacao.scss']
})
export class CaixaDialogoConfirmacao {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<CaixaDialogoConfirmacao>,
    private dialog: MatDialog) {}

    cancelar(): void {
      this.dialogRef.close(false); // Retorna false ao cancelar
    }
    confirmar(): void {
      this.dialogRef.close(true); // Retorna true ao confirmar
    }
}
