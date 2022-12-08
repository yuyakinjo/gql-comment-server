import { Injectable } from '@nestjs/common';
import { CreateCommentInput } from './dto/create.input';
import { UpdateCommentInput } from './dto/update.input';

const comments = [
  { id: 1, body: '121', postId: 2, userId: 1, date: new Date() },
  { id: 2, body: '222', postId: 2, userId: 1, date: new Date() },
  { id: 3, body: '323', postId: 2, userId: 1, date: new Date() },
  { id: 4, body: '414', postId: 1, userId: 1, date: new Date() },
  { id: 5, body: '515', postId: 1, userId: 2, date: new Date() },
  { id: 6, body: '616', postId: 1, userId: 2, date: new Date() },
  { id: 7, body: '737', postId: 3, userId: 3, date: new Date() },
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
