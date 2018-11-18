import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TaskModel } from './TaskModel/addtask.model';
import {RequestOptions,  URLSearchParams, RequestMethod,  ResponseContentType, Headers} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
    public taskManagerUrl = 'http://localhost:55600/api/taskmanager/';

     requestOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };

//      httpHeaders = new HttpHeaders({
//       'Content-Type' : 'application/json',
//       'Cache-Control': 'no-cache',
//       'Accept': 'application/json',
//       'Access-Control-Allow-Origin' : 'true'
//  });

//  httpOptions = {
//   headers: this.httpHeaders
// };
//   requestOption: any;

  constructor(private httpClient: HttpClient) {

    // const options = new RequestOptions();
    // options.search = new URLSearchParams();
    // options.headers = new Headers();
    // options.headers.append('Content-Type', 'application/json');
    // options.headers.append('Access-Control-Allow-Origin', '*');
    // this.requestOption = options;

   }

  addTask(taskItem: TaskModel): Observable<any> {
    const url = this.taskManagerUrl + 'addTask';
      return  this.httpClient.post<any>(url, taskItem, this.requestOption);
  }

  updateTask(taskItem: TaskModel): Observable<any> {
    // tslint:disable-next-line:prefer-const
    let url = this.taskManagerUrl + 'updateTask';
    return this.httpClient.post<TaskModel>(url, taskItem, this.requestOption);
  }

  deleteTask(taskId: number) {
    // tslint:disable-next-line:prefer-const
    let url = this.taskManagerUrl + 'endTask?taskId=' + taskId;
    return this.httpClient.get<any>(url);
  }
  getTask(taskSearch: TaskModel): Observable<any> {
    // tslint:disable-next-line:no-debugger
    debugger;
    const url = this.taskManagerUrl + 'viewTask';
    return this.httpClient.post<TaskModel[]>(url, taskSearch, {headers: new HttpHeaders({'Content-Type':  'application/json'})});

  }

//   getWeatherDetails(searchCity: string)
//   {
// tslint:disable-next-line:max-line-length
//     let url='https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22%27'+searchCity+'%27%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
//     return this.http.get<any>(url);
//   }
//   getMovieDetails(MovieName:string)
//   {
//     let url=this.MovieUrl+MovieName+"%27&apikey=8b8b3f2";
//     return this.http.get<any>(url);
//   }
//   getCurrencyDetails(Currency:string)
//   {
//     let url=this.CurrencyUrl+Currency;
//     return this.http.get<any>(url);
//   }

}
