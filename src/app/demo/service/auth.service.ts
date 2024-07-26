import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = environment.url;
    private apiUrl = `${this.url}/api/auth`;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Método para verificar si el usuario está autenticado
    isLoggedIn(): boolean {
        const token = localStorage.getItem('token');
        if (!token) {
            return false;
        }

        try {
            const decodedToken: any = jwtDecode(token);
            const expirationDate = decodedToken.exp * 1000; // Convertir a milisegundos
            if (Date.now() >= expirationDate) {
                // El token ha expirado
                this.logout(); // Opcionalmente puedes eliminar el token si ha expirado
                return false;
            }
            return true;
        } catch (error) {
            // Si ocurre algún error al decodificar el token
            return false;
        }
    }

    // Método para cerrar sesión
    logout(): void {
        localStorage.removeItem('token');
    }

    // Registrar usuario
    async register(userData: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post('/register', userData);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Iniciar sesión
    async login(username: string, password: string): Promise<any> {
        try {
            const response = await this.axiosInstance.post('/login', {
                username,
                password
            });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Verificar token
    async verifyToken(token: string): Promise<any> {
        try {
            const response = await this.axiosInstance.post('/verify-token', { token });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Manejo de errores
    private handleError(error: any): string {
        let errorMessage = 'An unknown error occurred!';
        if (error.response) {
            // Error del lado del servidor
            errorMessage = `Server-side error: ${error.response.status} - ${error.response.data.message || error.response.data}`;
        } else if (error.request) {
            // Error del lado del cliente
            errorMessage = 'No response received from the server.';
        } else {
            // Otros errores
            errorMessage = `Error: ${error.message}`;
        }
        return errorMessage;
    }
}
