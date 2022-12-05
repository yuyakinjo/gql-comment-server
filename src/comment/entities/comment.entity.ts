import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  body: string;

  @Field(() => Int)
  postId: number;

  @Field(() => Date)
  date: Date;
}
