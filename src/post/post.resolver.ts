import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/entities/comment.entity';
import { Post } from 'src/post/entities/post.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly commentService: CommentService) {}

  @ResolveField(() => [Comment])
  comments(@Parent() post: Post): Comment[] {
    return this.commentService.findByPostId(post.id);
  }
}
