import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BotaoMenu } from '../../core/interfaces';
import { AuthService } from '../../core/services';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuLateralComponent implements OnInit {
  public perfilUsuario!: number;
  public botoesMenu: Array<BotaoMenu> = [];

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.iniciarItensDoMenu();
    this.perfilUsuario = this.authService.getNivelAcessoId();
  }

  public iniciarItensDoMenu(): void {
    if (this.authService.isAdmin()) {
      this.botoesMenu = [
        {
          rota: 'administracao/dashboard',
          titulo: 'Dashboard',
          icone: 'bar_chart_4_bars',
        },
      ];
    }
  }
}
