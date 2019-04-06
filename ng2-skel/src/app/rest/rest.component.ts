import { Component, OnInit } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css'],
  providers: [],
})
export class RestComponent implements OnInit {
  sample = {
    request_id : "record001",
    sentence : "日本語を分析します。",
    info_filter : "form"
  };

  endpoint = 'https://api.apigw.smt.docomo.ne.jp/gooLanguageAnalysis/v1';
  api      = 'morph?APIKEY=(APIキー)';
  request  = JSON.stringify(this.sample, null, '  ');
  respose: string;
  errorMessage: string;

  // constructor(private restService: RestService) { }
  constructor(private http: Http) { }

  ngOnInit() { }

  post () {
    if (this.request) {
      let payload = {
        method: 'POST',
        url: this.endpoint + '/' + this.api,
        payload: this.request
      };

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post('/api/rests', payload, options)
        .map(res => {
          return res.json();
        })
        .catch(err => {
          return Observable.throw(err.json().error || 'Server error');
        })
        .subscribe(
          response => { this.respose = JSON.stringify(JSON.parse(response), null, '  '); },
             error => { this.errorMessage = <any>error; }
        );
    }
  }
}
