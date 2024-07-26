import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WhatsappService {
    private url = environment.url;
    private apiUrl = `${this.url}/api/whatsapp`;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: this.apiUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // Agregar colaborador
    async sendMessage(messageData: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post('/send', messageData);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    // Agregar colaborador
    async sendMessageGuide(messageData: any): Promise<any> {
        try {
            const response = await this.axiosInstance.post('/guide', messageData);
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
