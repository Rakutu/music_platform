import { Module } from '@nestjs/common';
import { FileService } from './File.service';

@Module({
	providers: [FileService],
})
export class FileModule {}
