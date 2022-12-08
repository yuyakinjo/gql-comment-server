import { Module } from '@nestjs/common';
import { CommentModule } from 'src/comment/comment.module';
import { PostResolver } from './post.resolver';

@Module({
  providers: [PostResolver],
  imports: [CommentModule],
})
export class PostModule {}
