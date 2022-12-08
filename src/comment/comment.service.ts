import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create.input';
import { UpdateCommentInput } from './dto/update.input';

const comments = [
  { id: 1, postId: 1, body: 'コメント1', date: new Date() },
  { id: 2, postId: 1, body: 'コメント1', date: new Date() },
  { id: 3, postId: 1, body: 'コメント2', date: new Date() },
  { id: 4, postId: 2, body: 'コメント3', date: new Date() },
  { id: 5, postId: 2, body: 'コメント3', date: new Date() },
  { id: 6, postId: 2, body: 'コメント3', date: new Date() },
  { id: 7, postId: 3, body: 'コメント3', date: new Date() },
];

@Injectable()
export class CommentService {
  #comments = comments;

  create({ ...props }: CreateCommentInput) {
    const ids = this.#comments.map(({ id }) => id);
    const incremantalId = Math.max(...ids) + 1;
    const comment = { id: incremantalId, date: new Date(), ...props };
    this.#comments.push(comment);
    return comment;
  }

  findAll() {
    return this.#comments;
  }

  findByPostId(postId: number) {
    return this.#comments.filter((comment) => comment.postId === postId);
  }

  findOne(id: number) {
    return this.#comments.find((comment) => comment.id === id);
  }

  update(id: number, updateUserInput: UpdateCommentInput) {
    const [target] = this.#comments
      .filter((comment) => comment.id === id)
      .map((comment) => ({ ...comment, ...updateUserInput }));
    this.#comments = this.#comments
      .filter((comment) => comment.id !== id)
      .concat(target);
    return target;
  }

  remove(id: number) {
    const target = this.#comments.find((comment) => comment.id === id);
    this.#comments = this.#comments.filter((comment) => comment.id !== id);
    return target;
  }
}
