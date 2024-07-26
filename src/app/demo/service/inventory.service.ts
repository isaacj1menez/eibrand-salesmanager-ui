import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private url = environment.url;
  private apiUrl = `${this.url}/api/inventory`;

  constructor() { 
    console.log(this.apiUrl);
  }

  async getAllInventories(): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getInventoryById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async addInventory(inventoryData: any): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/add`, inventoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateInventory(id: string, inventoryData: any): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/${id}`, inventoryData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteInventory(id: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/${id}`);
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
