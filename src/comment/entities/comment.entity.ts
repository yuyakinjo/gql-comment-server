import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class Comment {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  body: string;

  @Field(() => Int, { nullable: true })
  postId: number;

  @Field(() => Int, { nullable: true })
  userId: number;

  @Field(() => Date, { nullable: true })
  date: Date;

  @Field(() => User, { nullable: true })
  user?: User;
}
