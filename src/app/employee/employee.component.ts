import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  uniqueDepartments = {};
  candidate_data = [{"id": 11,"name": "Ash","department": "Finance","joining_date": '8 / 10 / 2016'},
  { "id": 12, "name": "John", "department": "HR", "joining_date": '18 / 1 / 2011' },
  { "id": 13, "name": "Zuri", "department": "Operations", "joining_date": '28 / 11 / 2019' },
  { "id": 14, "name": "Vish", "department": "Development", "joining_date": '7 / 7 / 2017' },
  { "id": 15, "name": "Barry", "department": "Operations", "joining_date": '19 / 8 / 2014' },
  { "id": 16, "name": "Ady", "department": "Finance", "joining_date": '5 / 10 / 2014' },
  { "id": 17, "name": "Gare", "department": "Development", "joining_date": '6 / 4 / 2014' },
  { "id": 18, "name": "Hola", "department": "Development", "joining_date": '8 / 12 / 2010' },
  { "id": 19, "name": "Ola", "department": "HR", "joining_date": '7 / 5 / 2011' },
  { "id": 20, "name": "Kim", "department": "Finance", "joining_date": '20 / 10 / 2010' }];
  originalCandidateData = JSON.parse(JSON.stringify(this.candidate_data));
  constructor() { }

  get iterateDepartmentKeys() {
    return Object.keys(this.uniqueDepartments);
  }

  sortByName() {
    this.candidate_data.sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDate() {
    this.candidate_data.sort((a,b) => {
      const previous_date = a.joining_date.split('/').reverse().join(),
        current_date = b.joining_date.split('/').reverse().join();
      return previous_date < current_date ? -1 : (previous_date > current_date ? 1 : 0);
    });
  }

  searchByName(searchText) {
    this.candidate_data = this.originalCandidateData.filter((item) => {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
  }

  yearOfexperience(experience) {
    const today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    const formatedDate:any = `${dd}/${mm}/${yyyy}`;
    const todaysDate:any = new Date(formatedDate.split('/')[2],formatedDate.split('/')[1]-1,formatedDate.split('/')[0]);
    switch (experience) {
      case '2':
      this.candidate_data = this.originalCandidateData.filter((data) => {
        const objDate:any = data.joining_date;
        const dateFormat:any = new Date(objDate.split('/')[2],objDate.split('/')[1]-1,objDate.split('/')[0]);
        const diffTime = Math.abs(todaysDate - dateFormat);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const years = diffDays/365;
        if(years > 2) {
          return data;
        }
      });
      break;
      case '8':
      this.candidate_data = this.originalCandidateData.filter((data) => {
        const objDate:any = data.joining_date;
        const dateFormat:any = new Date(objDate.split('/')[2],objDate.split('/')[1]-1,objDate.split('/')[0]);
        const diffTime = Math.abs(todaysDate - dateFormat);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const years = diffDays/365;
        if(years > 8) {
          return data;
        }
      });
      break;
      case 'all':
      this.candidate_data = this.originalCandidateData;
    }
  }

  getDifferentDepartmentsAndCount() {
    this.uniqueDepartments = this.originalCandidateData.reduce( (obj, o) => (obj[o.department] = (obj[o.department] || 0)+1, obj), {} );
  }

  removeAllCandidateFromDevelopmentDepartment() {
    var result = confirm("Do you Want to remove all the candidates from Development departmant?");
    if (result) {
      this.candidate_data = this.originalCandidateData.filter(data => data.department !== 'Development');
    }
  }

  resetData() {
    var result = confirm("Do you Want to reset candidate data?");
    if (result) {
      this.candidate_data = this.originalCandidateData;
    }
  }

  ngOnInit() {
    this.getDifferentDepartmentsAndCount();
  }

}
