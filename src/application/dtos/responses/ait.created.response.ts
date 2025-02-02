export class CreatedAitResponseDTO {
  id: string;
  status: string;
  createdAt: Date;

  constructor(id: string, status: string, createdAt: Date) {
    this.id = id;
    this.status = status;
    this.createdAt = createdAt;
  }
}
