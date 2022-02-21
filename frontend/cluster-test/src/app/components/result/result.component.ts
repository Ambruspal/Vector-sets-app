import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  groupList: Array<any>[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {}

  getLastResult(): void {
    this.httpService.getLastResult().subscribe(
      (data: any) => (this.groupList = Object.entries(data)),
      (error) => {
        console.log(error.message);
        alert('There is no data in the database!');
        window.location.reload();
      }
    );
  }
}
