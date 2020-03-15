import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  posts = [
    { id: 1, title: 'Hello World', text: 'Lorem ipsuv' },
    { id: 2, title: 'Hello World 2', text: 'Lorem ipsuv 2' },
    { id: 3, title: 'Hello World 3', text: 'Lorem ipsuv 3' },
  ]

  getPosts() {
    return this.posts
  }

  getPost(id) {
    return this.posts.find(post => post.id === id)
  }

  addPost({ title, text }) {
    this.posts.push({ id: this.posts.length + 1, title, text })
  }

  editPost({ id, title, text }) {
    this.posts = this.posts.map(post => post.id === id ? { id, title, text } : post);
  }

  deletePost(id) {
    this.posts = this.posts.filter(post => post.id !== id)
  }
}
