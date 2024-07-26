import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent {

    username: string = '';
    password: string = '';

    loading: boolean = false;

    constructor(private authService: AuthService, private router: Router) { }

    async login() {
        try {
            this.loading = false;
            const response = await this.authService.login(this.username, this.password);
            if (response.success) {
                localStorage.setItem('token', response.token); // Guarda el token en localStorage o sessionStorage
                this.loading = true;
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
