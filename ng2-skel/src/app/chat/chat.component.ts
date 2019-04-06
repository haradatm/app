import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

import { SocketService } from './socket.service';

import { User, Message, Comment } from './chat';
// import { ChatService }            from './chat.service';

const HUMAN: User = {
  userId: 'human',
  userType: 'human',
  initial: '有人',
  name: 'あなた'
};

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  // providers: [ ChatService ],
})
export class ChatComponent implements OnInit {
  connection;

  comments = [];
  current_user = HUMAN;
  userId = '';
  newComment: string
  response: string;
  errorMessage: string;

  constructor(private http: Http, private _SocketService_: SocketService) { }

  ngOnInit () {
    this.http.get('/api/chats/comments')
      .map(res => {
        return res.json();
      })
      .catch(err => {
        return Observable.throw(err.json().error || 'Server error');
      })
      .subscribe(comments => {
        this.comments = comments;
        this._SocketService_.syncUpdates('comment', this.comments, null);
      });

    this.connection = new Observable(observer => {
        let event = 'new:chat:message';
        let socket = io();
        socket.on(event, (comment: Comment) => {
              console.dir(comment);
              observer.next(comment);
        });
        return () => { socket.disconnect(); };
      })
      .subscribe((comment: Comment) => {
        this.addComment(comment);
      });
  }

  sendComment (newComment: string) {
    if (newComment) {
      console.log(newComment);

      let message: Message = {
        messageId: (new Date()).getTime().toString(),
        messageType: 'text',
        content: newComment,
        replyToken: '',
        timestamp: new Date(),
        answer: ''
      };

      let comment: Comment = {
        user: this.current_user,
        message: message,
        replyToId: this.userId
      };

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post('/api/chats/send', comment, options)
        .map(res => {
          return res.json();
        })
        .catch(err => {
          return Observable.throw(err.json().error || 'Server error');
        })
        .subscribe(
          response => { this.response = JSON.stringify(JSON.parse(response), null, '  '); },
             error => { this.errorMessage = <any>error; }
        );

      this.addComment(comment);
    }
  }

  ngOnDestroy () {
    this._SocketService_.unsyncUpdates('comments');
    this.connection.unsubscribe();
  }

  addComment (newComment: Comment) {
    console.dir(newComment);
    this.http.post('/api/chats/comments', newComment)
      .map(res => { return res.json(); })
      .catch(err => { return Observable.throw(err.json().error || 'Server error'); })
      .subscribe();

    if (newComment.user.userType !== 'human') {
      this.newComment = newComment.message.answer;
      this.userId = newComment.user.userId;
    }
  }
}
