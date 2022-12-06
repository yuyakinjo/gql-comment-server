import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Comment {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  body: string;

  @Field(() => Int, { nullable: true })
  postId: number;

  @Field(() => Date, { nullable: true })
  date: Date;
}
