import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/posts')
  getPosts(): any[] {
    return this.appService.getPosts();
  }

  @Get('/posts/:id')
  getPost(@Param('id') id) {
    return this.appService.getPost(id)
  }

  @Post('/posts')
  addPost(@Body() body) {
    return this.appService.addPost(body)
  }

  @Put('/posts/:id')
  editPost(@Param('id') id, @Body() body) {
    return this.appService.editPost({ id, ...body })
  }

  @Delete('/posts/:id')
  deletePost(@Param('id') id) {
    return this.appService.deletePost(id)
  }
}
