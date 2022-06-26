import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/File.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		MongooseModule.forRoot(
			'mongodb://uxupqxxaift5nwsf5qlh:575RAzXNUtnTtHtqsHAS@n1-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017,n2-c2-mongodb-clevercloud-customers.services.clever-cloud.com:27017/bi2sb6bkg4ggpdy?replicaSet=rs0',
		),
		TrackModule,
		FileModule,
	],
})
export class AppModule {}
