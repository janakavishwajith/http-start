import { Http, Headers, Response } from "@angular/http";
import { ServerService } from './servers.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ServerService]
})
export class AppComponent {

  appName = this.serverService.getAppName();

  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  constructor(private serverService : ServerService, private http: Http){

  }

  onSave(){
    this.serverService.storeServers(this.servers)
        .subscribe(
            (response)=> console.log( response ),
            (error)=> console.log( error ),
        );
  }

  onGet(){
    this.serverService.getServers()
        .subscribe(
          (servers: any[])=> {
            this.servers = servers;
          },
            (error)=> console.log( error ),
        );
  }

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  } 

  private generateId() {
    return Math.round(Math.random() * 10000);
  }
}
