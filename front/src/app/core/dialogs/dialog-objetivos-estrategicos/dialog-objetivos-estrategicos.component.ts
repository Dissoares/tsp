import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-objetivos-estrategicos',
  standalone: true,
  templateUrl: './dialog-objetivos-estrategicos.component.html',
  styleUrls: ['./dialog-objetivos-estrategicos.component.scss'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
  ],
})
export class DialogObjetivosEstrategicosComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogObjetivosEstrategicosComponent>,
    @Inject(MAT_DIALOG_DATA) public objetivos: any,
  ) {}

  public ngOnInit(): void {}

  public buscarObjetivos(): void {}
}
