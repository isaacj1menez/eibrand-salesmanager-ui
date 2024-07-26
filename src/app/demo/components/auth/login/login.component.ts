import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        };
        .custom-yellow-button {
            background-color: #fbbf24;
            border-color: #fbbf24;
            color: white;
        };
    `]
})
export class LoginComponent {

    username: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    async login() {
        try {
            const response = await this.authService.login(this.username, this.password);
            if (response.success) {
                localStorage.setItem('token', response.token); // Guarda el token en localStorage o sessionStorage
                this.router.navigate(['/management']); // Redirige a la página principal
            } else {
                // Maneja el error de autenticación
                alert(response.message || 'Error al inciar sesión');
            }
        } catch (error) {
            alert('An error occurred');
        }
    }
}
