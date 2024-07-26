export interface GetCollaboratorsResponseInterface {
    success:       boolean;
    collaborators: Collaborator[];
}

export interface Collaborator {
    _id:            string;
    nombreCompleto: string;
    correo:         string;
    telefono:       string;
    createdAt:      Date;
    updatedAt:      Date;
    __v:            number;
}
