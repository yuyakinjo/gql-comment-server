import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo'; // prettier
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { CommentResolver } from './comment/comment.resolver';
import { CommentService } from './comment/comment.service';
import { Post } from './post/entities/post.entity';
import { PostModule } from './post/post.module';
import { PostResolver } from './post/post.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
      path: 'graphql/comments',
      plugins: [ApolloServerPluginInlineTraceDisabled()],
      buildSchemaOptions: {
        orphanedTypes: [Post],
      },
    }),
    CommentModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommentService, CommentResolver, PostResolver],
})
export class AppModule {}
