import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './file.service';
import { getPhoto } from '../testing/get-photo.mock';

describe('FileService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  test('Validar a definição', () => {
    expect(service).toBeDefined();
  });

  describe('Teste do File Service', () => {
    test('Upload method', async () => {
      const photo = await getPhoto();
      const fileName = 'photo-test.png';
      service.upload(photo, fileName);
    });
  });
});
