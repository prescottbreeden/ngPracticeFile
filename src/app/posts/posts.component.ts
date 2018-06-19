import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];
  private url = 'http://jsonplaceholder.typicode.com/posts';


  constructor(private http: Http) {
    // instantiates the dependency but ngOnInit does the workload
  }

  ngOnInit() {
    this.http.get(this.url)
      .subscribe(response => {
       this.posts = response.json();
      });
  }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };

    this.http.post(this.url, JSON.stringify(post))
      .subscribe(response => {
        post['id'] = response.json().id;
        this.posts.splice(0, 0, post);
      });
  }

  updatePost(post) {
    this.http.patch(this.url + '/' + post.id, JSON.stringify({ isRead: true }))
      .subscribe(response => {
        console.log('success', response.json());
      });
    // this.http.put(this.url, JSON.stringify(post))
    //   .subscribe(response => {
    //     console.log('success', response);
    //   });
  }

  deletePost(post) {
    this.http.delete(this.url + '/' + post.id)
      .subscribe(response => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
        console.log('post deleted', response.json());
      });
  }
}
