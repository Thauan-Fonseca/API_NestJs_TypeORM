import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';

@Injectable()
export class FilesService {
  async upload(file: Express.Multer.File, path: string) {
    return writeFile(path, file.buffer, (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo:', err);
      } else {
        console.log(`Conteúdo foi escrito com sucesso `);
      }
    });
  }
}
