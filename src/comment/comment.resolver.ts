import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'; // prettier-ignore
import { User } from 'src/user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentInput } from './dto/create.input';
import { UpdateCommentInput } from './dto/update.input';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  createComment(@Args('createCommentInput') createInput: CreateCommentInput) {
    return this.commentService.create(createInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  findAll() {
    return this.commentService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => Comment)
  updateComment(@Args('updateCommentInput') updateInput: UpdateCommentInput) {
    return this.commentService.update(updateInput.id, updateInput);
  }

  @Mutation(() => Comment, { nullable: true })
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }

  @ResolveField(() => User)
  user(@Parent() comment: Comment) {
    return { __typename: 'User', id: comment.userId };
  }
}
