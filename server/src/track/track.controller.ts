import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UploadedFiles,
	UseInterceptors,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/createTrack.dto';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/createComment.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
	constructor(private trackService: TrackService) {}

	@Post()
	@UseInterceptors(
		FileFieldsInterceptor([
			{ name: 'picture', maxCount: 1 },
			{ name: 'audio', maxCount: 1 },
		]),
	)
	create(@Body() dto: CreateTrackDto, @UploadedFiles() files) {
		const { picture, audio } = files;
		return this.trackService.create(dto, picture[0], audio[0]);
	}

	@Get()
	getAll(@Query('limit') limit: number, @Query('offset') offset: number) {
		return this.trackService.getAll(limit, offset);
	}

	@Get('/search')
	search(@Query('search') search: string) {
		return this.trackService.search(search);
	}

	@Get(':id')
	getOne(@Param('id') id: ObjectId) {
		return this.trackService.getOne(id);
	}

	@Delete(':id')
	delete(@Param('id') id: ObjectId) {
		return this.trackService.delete(id);
	}

	@Post('/comment')
	addComment(@Body() dto: CreateCommentDto) {
		return this.trackService.addComment(dto);
	}

	@Post('/listen/:id')
	listen(@Param('id') id: ObjectId) {
		return this.trackService.listen(id);
	}
}
