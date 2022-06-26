import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, TrackDocument } from './schema/track.schema';
import { Comment, CommentDocument } from './schema/comment.schema';
import { CreateTrackDto } from './dto/createTrack.dto';
import { CreateCommentDto } from './dto/createComment.dto';
import { FileService, FileType } from '../file/File.service';
import { filterUniqueItems } from '../utils/filterUniqueItems';

@Injectable()
export class TrackService {
	constructor(
		@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
		@InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
		private fileService: FileService,
	) {}

	async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
		const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
		const picturePath = this.fileService.createFile(
			FileType.PICTURE,
			picture,
		);
		return await this.trackModel.create({
			...dto,
			audio: audioPath,
			picture: picturePath,
			listens: 0,
			likes: 0,
			dislikes: 0,
		});
	}

	async getOne(id: ObjectId): Promise<Track> {
		return await this.trackModel.findById(id).populate('comments');
	}

	async getAll(limit: number, offset: number): Promise<Track[]> {
		return await this.trackModel.find().skip(offset).limit(limit);
	}

	async delete(id: ObjectId): Promise<ObjectId> {
		const track = await this.trackModel.findByIdAndDelete(id);
		return track._id;
	}

	async addComment(dto: CreateCommentDto): Promise<Comment> {
		const track = await this.trackModel.findById(dto.track_id);
		const comment = await this.commentModel.create({
			...dto,
			likes: 0,
			dislikes: 0,
		});
		track.comments.push(comment._id);
		track.save();
		return comment;
	}

	async listen(id: ObjectId) {
		const track = await this.trackModel.findById(id);
		track.listens += 1;
		track.save();
	}

	async search(search: string): Promise<Track[]> {
		const query = new RegExp(search, 'i');
		const tracks = await this.trackModel.find({ name: query });
		const artists = await this.trackModel.find({ artist: query });
		return filterUniqueItems<Track>([...tracks, ...artists]);
	}
}
