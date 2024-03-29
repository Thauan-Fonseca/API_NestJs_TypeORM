import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import { Path } from 'mongoose';
import { join } from 'path';

@Injectable()
export class FilesService {
  getDestinationPath() {
    return join(__dirname, '..', '..', 'storage', 'photos');
  }

  async upload(file: Express.Multer.File, filename: string) {
    const path: Path = join(this.getDestinationPath(), filename);
    await writeFile(path, file.buffer, (err) => {
      if (err) {
        console.error('Erro ao escrever no arquivo:', err);
      } else {
        console.log(`Conteúdo foi escrito com sucesso `);
        return path;
      }
    });
  }
}
