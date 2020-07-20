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

  fnameUserVal = "";
  lnameUserVal = "";
  cityUserVal = "";
  postalCodeUserVal = "";


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


    if (this.postalCodeUserVal.length != 0) {
      this.searchHelperAddresses(this.postalCodeUserVal, 'postal_code');
    }

    else if (this.cityUserVal.length != 0) {
      this.searchHelperAddresses(this.cityUserVal, 'city');

    }

    else if (this.lnameUserVal.length != 0) {
      this.searchHelperBasicUserInformation(this.lnameUserVal, 'last_name');

    }

    else if (this.fnameUserVal.length != 0) {
      this.searchHelperBasicUserInformation(this.fnameUserVal, 'first_name');

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


  showMoreInfo(val) {
    var modal = document.getElementById("myModal");
    
    modal.style.display = "block";
  }

  closeModal() {
    var modal = document.getElementById("myModal");
   
    modal.style.display = "none";
  }
}

