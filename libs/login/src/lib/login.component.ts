import { AuthService } from './auth.service';
import { AuthLogin } from './auth.interface';
import { LoginService } from './login.service';
import { AlertService } from './alert.service';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sigma-nx-login',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [AlertService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public get authLogin(): AuthLogin {
    return this.loginService.authLogin;
  }

  public hidePassword = true;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService
  ) { }

  logar() {
    if (!this.authLogin.login || !this.authLogin.password)
      return this.alertService.error('Preencha os dados.');

    this.authService.authenticate(this.authLogin).subscribe({
      next: () => {
        this.router.navigate(['dashboard']).then(() => {
          this.alertService.success('Login feito.');
        });
      },
      error: (err) => {
        this.alertService.error(err.error);
      },
    });
  }
}
