import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

export enum FileType {
	AUDIO = 'audio',
	PICTURE = 'picture',
}

@Injectable()
export class FileService {
	createFile(type: FileType, file) {
		try {
			const fileExtension = file.originalname.split('.').pop();
			const fileName = `${uuid.v4()}.${fileExtension}`;
			const filePath = path.resolve(__dirname, '..', 'static', type);

			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}
			fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

			return type + '/' + fileName;
		} catch (error) {
			throw new HttpException(
				error.message,
				HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	removeFile() {}
}
