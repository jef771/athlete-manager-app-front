import { AthleteService } from './athlete.service';
import { Component, OnInit } from '@angular/core';
import { Athlete } from './athlete';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public athletes: Athlete[] = [];
  public editAthlete!: Athlete;
  public deleteAthlete!: Athlete;

  constructor(private athleteService: AthleteService){}

  ngOnInit() {
    this.getAthletes();
  }

  public onAddAthlete(addForm: NgForm): void{
    document.getElementById('add-atlhete-form')?.click();
    this.athleteService.addAthlete(addForm.value).subscribe(
      (response: Athlete) => {
        console.log(response);
        this.getAthletes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateAthlete(athlete: Athlete): void{
    this.athleteService.updateAthlete(athlete).subscribe(
      (response: Athlete) => {
        console.log(response);
        this.getAthletes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteAthlete(athleteId: number): void{
    this.athleteService.deleteAthlete(athleteId).subscribe(
      (response: void) => {
        console.log(response);
        this.getAthletes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public getAthletes(): void {
    this.athleteService.getAthletes().subscribe(
      (response: Athlete[]) => {
        this.athletes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchAthletes(key: string): void {
    const results: Athlete[] = [];

    for(const athlete of this.athletes) {
      if(athlete.athleteName.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(athlete);
      }
    }

    if(results.length == 0 || !key) {
      this.getAthletes();
    } else {
      this.athletes = results;
    }
  }

  public onOpenModal(athlete: Athlete, mode: string): void {
    const button = document.createElement('button');
    const container = document.getElementById('main-container');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    switch(mode) {
      case 'add': {
        button.setAttribute('data-target', '#addAthleteModal');
        break;
      } case 'edit': {
        this.editAthlete = athlete;
        button.setAttribute('data-target', '#editAthleteModal');
        break;
      } case 'delete': {
        this.deleteAthlete = athlete;
        button.setAttribute('data-target', '#deleteAthleteModal');
        break;
      }
    };

    container?.appendChild(button);
    button.click();
  }
}
