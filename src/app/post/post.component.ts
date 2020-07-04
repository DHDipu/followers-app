import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { NotFoundError } from '../common/not-found-error';
import { AppError } from '../common/app-error';
import { BadInput } from '../common/bad-input';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  
  posts;
  constructor(private service: PostService) { }

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(response=>{
        this.posts = response;
      });
  }

  createPost(input: HTMLInputElement){
    let post = {title: input.value};
    this.posts.splice(0, 0, post);
    
    input.value = '';

    this.service.create(post)
      .subscribe(response=>{
        post['id'] = response;
      },
      (error: AppError) =>{
        this.posts.splice(0, 1);
        
        if (error instanceof BadInput) {
          // this.form.setError(error.originalErro);
        }else throw error;
      });
  }

  updatePost(post){
    this.service.update(post)
      .subscribe(response =>{
        console.log(response);
      });
  }

  deletePost(post){
    let index = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.service.delete(post.id)
      .subscribe(
        null,
      (error: AppError) =>{
        this.posts.splice(index, 0, post);
        
        if (error instanceof NotFoundError) {
          alert('This post has already been deleted.');
        }else throw error;
      });
  }

}
