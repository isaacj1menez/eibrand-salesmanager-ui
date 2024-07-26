import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    private url = environment.url;
    private apiUrl = `${this.url}/api/uploads`;
    constructor() { }

    async uploadFile(file: File): Promise<any> {
        const formData = new FormData();
        formData.append('imagen', file, file.name);

        try {
            const response = await axios.post(this.apiUrl, formData);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    async deleteFile(secureUrl: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.apiUrl}/delete/${encodeURIComponent(secureUrl)}`);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    private handleError(error: AxiosError): string {
        let errorMessage = 'An unknown error occurred!';
        if (error.response) {
            errorMessage = `Server-side error: ${error.response.status} - ${error.response.data}`;
        } else if (error.request) {
            errorMessage = 'No response received from the server.';
        } else {
            errorMessage = `Client-side error: ${error.message}`;
        }
        return errorMessage;
    }
}