import { FilesService } from '../file/file.service';

export const fileServiceMock = {
  provide: FilesService,
  useValue: {
    getDestinationPath: jest.fn(),
    upload: jest.fn().mockResolvedValue(''),
  },
};
