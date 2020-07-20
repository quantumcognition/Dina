import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title = "Dina";
  dictionaryData = [];
  returnData = [];

  constructor() { }

  ngOnInit() {
    this.getDictionary();

  }

  getDictionary() {
    fetch('../assets/example_results.json').then(response => response.json())
      .then(data =>
        this.dictionaryData = data.results
      )
  }

  search() {

    let fnameUserVal = document.getElementById('fname').value;
    let lnameUserVal = document.getElementById('lname').value;
    let cityUserVal = document.getElementById('city').value;
    let postalCodeUserVal = document.getElementById('postalCode').value;

    if (postalCodeUserVal.length != 0) {
      this.searchHelperAddresses(postalCodeUserVal, 'postal_code');
    }

    else if (cityUserVal.length != 0) {
      this.searchHelperAddresses(cityUserVal, 'city');

    }

    else if (lnameUserVal != 0) {
      this.searchHelperBasicUserInformation(lnameUserVal, 'last_name');

    }

    else if (fnameUserVal != 0) {
      this.searchHelperBasicUserInformation(fnameUserVal, 'first_name');

    }

    else {
      return 0;
    }

  }

  searchHelperBasicUserInformation(userData, key) {

    for (let i = 0; i < this.dictionaryData.length; i++) {
      let compareUserData = this.dictionaryData[i].basic[key];
      
      if (userData === compareUserData) {
        this.returnData.push(this.dictionaryData[i]);
        console.log(this.returnData);
      }
    }
  }

  searchHelperAddresses(userData, key) {

    for (let i = 0; i < this.dictionaryData.length; i++) {
      let compareUserData = this.dictionaryData[i].addresses[0][key];
      
      if (userData === compareUserData) {
        this.returnData.push(this.dictionaryData[i]);
        console.log(this.returnData);
      }
    }
  }

}

