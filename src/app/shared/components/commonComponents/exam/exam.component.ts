import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  public semesterList = [
    { field: 'first-sem', name: '1st Semester' },
    { field: 'second-sem', name: '2nd Semester' },
    { field: 'third-sem', name: '3rd Semester' },
    { field: 'fourth-sem', name: '4th Semester' }
  ];
  public classList = [
    { field: '8', name: '8th' },
    { field: '9', name: '9th' },
    { field: '10', name: '10th' },
    { field: '11', name: '11th' },
    { field: '12', name: '12th' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
