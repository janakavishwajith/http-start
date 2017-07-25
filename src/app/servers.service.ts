
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Rx";

@Injectable()
export class ServerService{

    constructor(private http: Http){
        
    }

    storeServers(serversList : any[]){
        const custHeaders = new Headers({'Content-Type': 'application/json'});


        // return this.http.post(
        //         'https://udemy-ng-http-305d8.firebaseio.com/data.json', 
        //         serversList,
        //         {headers: custHeaders});
        return this.http.put(
                'https://udemy-ng-http-305d8.firebaseio.com/data.json', 
                serversList,
                {headers: custHeaders});
    }



    getServers(){
        return this.http.get('https://udemy-ng-http-305d8.firebaseio.com/data')
            .map(
                (response: Response) => {
                    const data = response.json();

                    for( const server of data ){
                        server.name = 'Fetched_' + server.name;
                    }

                    return data;
                }
            )
            .catch(
                (error: Response) => {                   
                    return Observable.throw("something went wrong");
                }
            );
    }


    getAppName(){
    return this.http.get('https://udemy-ng-http-305d8.firebaseio.com/data/appName.json')
          .map(
            (response : Response) => {
              return response.json();
            }
          );
    
    
  }

}