import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => String)
  body: string;

  @Field(() => Int)
  postId: number;

  @Field(() => Int)
  userId: number;
}
