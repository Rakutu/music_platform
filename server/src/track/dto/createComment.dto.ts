import { ObjectId } from 'mongoose';

export class CreateCommentDto {
	readonly username: string;
	readonly text: string;
	readonly track_id: ObjectId;
	readonly likes: number;
	readonly dislikes: number;
}
