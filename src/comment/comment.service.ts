import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create.input';
import { UpdateCommentInput } from './dto/update.input';

const comments = [
  { id: 1, postId: 2, body: '121', date: new Date() },
  { id: 2, postId: 2, body: '222', date: new Date() },
  { id: 3, postId: 2, body: '323', date: new Date() },
  { id: 4, postId: 1, body: '414', date: new Date() },
  { id: 5, postId: 1, body: '515', date: new Date() },
  { id: 6, postId: 1, body: '616', date: new Date() },
  { id: 7, postId: 3, body: '737', date: new Date() },
];

@Injectable()
export class CommentService {
  #comments = comments;

  create(input: CreateCommentInput) {
    const ids = this.#comments.map(({ id }) => id);
    const incremantalId = Math.max(...ids) + 1;
    const comment = { id: incremantalId, date: new Date(), ...input };
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

  update(id: number, inputs: UpdateCommentInput) {
    const target = this.findOne(id);
    const updated = { ...target, ...inputs };
    this.#comments = this.#comments
      .filter((comment) => comment.id !== id)
      .concat(updated);
    return updated;
  }

  remove(id: number) {
    const removed = this.findOne(id);
    this.#comments = this.#comments.filter((comment) => comment.id !== id);
    return removed;
  }
}
