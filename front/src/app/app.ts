import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { LoadingService } from './core/services';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private loadingService = inject(LoadingService);
  private cdr = inject(ChangeDetectorRef);

  public carregando$ = this.loadingService.carregando$;

  public ngAfterViewInit() {
    this.cdr.detectChanges();
  }
}
