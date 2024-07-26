import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private url = environment.url;
    private apiUrl = `${this.url}/api/products`;

    constructor() { }

    async getAllProducts(): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/all`);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    async getProductById(id: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/get?id=${id}`);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    async getProductByName(name: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/get?id=${name}`);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    async getProductByCode(code: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/get?id=${code}`);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    async addProduct(productData: any): Promise<any> {
        try {
            const response = await axios.post(`${this.apiUrl}/add`, productData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    async updateProduct(id: string, productData: any): Promise<any> {
        try {
            const response = await axios.put(`${this.apiUrl}/update/${id}`, productData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    async deleteProduct(id: string): Promise<any> {
        try {
            const response = await axios.delete(`${this.apiUrl}/delete/${id}`);
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
