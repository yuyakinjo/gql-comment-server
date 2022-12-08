import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
