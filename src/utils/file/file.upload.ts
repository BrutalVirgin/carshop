import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const editFileName = (req, file, callback, imagesPrefix) => {
  const fileExtName = extname(file.originalname);
  const randomName = uuid();
  callback(null, `${imagesPrefix}${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
    return callback(
      new HttpException('Only image files are allowed', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};
