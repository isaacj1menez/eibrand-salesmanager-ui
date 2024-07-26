import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private url = environment.url;
  private apiUrl = `${this.url}/api/collaborators`;
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
  async addCollaborator(collaboratorData: any): Promise<any> {
    try {
      const response = await this.axiosInstance.post('/add', collaboratorData);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Obtener todos los colaboradores
  async getAllCollaborators(): Promise<any> {
    try {
      const response = await this.axiosInstance.get('/all');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Obtener colaborador por ID
  async getCollaboratorById(id: string): Promise<any> {
    try {
      const response = await this.axiosInstance.get(`/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Actualizar colaborador
  async updateCollaborator(id: string, collaboratorData: any): Promise<any> {
    try {
      const response = await this.axiosInstance.put(`/update/${id}`, collaboratorData);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Eliminar colaborador
  async deleteCollaborator(id: string): Promise<any> {
    try {
      const response = await this.axiosInstance.delete(`/delete/${id}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

    // Manejo de errores
    private handleError(error: any): string{
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
