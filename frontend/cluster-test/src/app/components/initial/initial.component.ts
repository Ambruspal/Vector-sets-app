import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http/http.service';
import { Router } from '@angular/router';
import { alea } from 'seedrandom';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css'],
})
export class InitialComponent implements OnInit {
  parametersForm!: FormGroup;

  embeddingList: Array<number>[] = [];

  dataToSend: any = {};

  groupNames: string[] = [];

  isDataValid?: boolean;

  resetMode: boolean = false;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.parametersForm = new FormGroup({
      seed: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+((?=\.)\.\d+)?$/),
      ]),
      embeddingNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{1,}$/),
      ]),
      embeddingLength: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{1,}$/),
      ]),
      groupNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{1,}$/),
      ]),
      threshold: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+((?=\.)\.\d+)?$/),
      ]),
    });
  }

  drop(event: CdkDragDrop<Array<number>[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const isEmptyGroup = Object.values(this.dataToSend).some(
        (value: any) => value.length === 0
      );
      this.isDataValid = isEmptyGroup ? false : true;
    }
  }

  generateGroupsAndEmbeddings(): void {
    if (
      this.embeddingList.length !== 0 ||
      Object.keys(this.dataToSend).length !== 0
    ) {
      return this.resetEveryValue();
    } else {
      const seed = Number(this.parametersForm.value.seed);
      const numberOfEmbeddings = Number(
        this.parametersForm.value.embeddingNumber
      );
      const lengthOfEmbeddings = Number(
        this.parametersForm.value.embeddingLength
      );
      const numberOfGroups = Number(this.parametersForm.value.groupNumber);
      if (numberOfGroups > numberOfEmbeddings) {
        alert(
          `Invalid input:\n\nYou can not initialize more vector-sets (${numberOfGroups}) than the number of embeddings (${numberOfEmbeddings})!`
        );
        return;
      }
      this.generateGroups(numberOfGroups);
      this.generateEmbeddings(seed, numberOfEmbeddings, lengthOfEmbeddings);
      this.resetMode = this.resetMode ? false : true;
    }
  }

  private generateGroups(numberOfGroups: number): void {
    for (let k = 1; k <= numberOfGroups; k++) {
      const groupName = `group_${k}`;
      this.dataToSend[groupName] = [];
      this.groupNames.push(groupName);
    }
  }

  private generateEmbeddings(
    seed: number,
    numberOfEmbeddings: number,
    lengthOfEmbeddings: number
  ): void {
    let newEmbedding: number[] = [];

    for (let i = 1; i <= numberOfEmbeddings; i++) {
      for (let j = 1; j <= lengthOfEmbeddings; j++) {
        // Create random number
        let randomNumberGenerator = alea(String(seed));
        seed = Number(randomNumberGenerator().toFixed(2));
        while (seed === 1 || seed === -1 || seed === 0) {
          randomNumberGenerator = alea(String(seed));
          seed = Number(randomNumberGenerator().toFixed(2));
        }
        // Adding "-" sign with 50% chance
        const isNegative =
          Math.floor(Math.random() * 10) + 1 <= 5 ? true : false;
        if (isNegative) {
          newEmbedding.push(seed * -1);
        } else {
          newEmbedding.push(seed);
        }

        if (j === lengthOfEmbeddings) {
          this.embeddingList.push(newEmbedding);
          newEmbedding = [];
        }
      }
    }
  }

  private resetEveryValue(): void {
    this.parametersForm.reset();
    this.embeddingList = [];
    this.dataToSend = {};
    this.groupNames = [];
    this.resetMode = false;
    this.isDataValid = false;
  }

  sendData(): void {
    this.httpService
      .send({
        group: this.dataToSend,
        threshold: Number(this.parametersForm.value.threshold),
      })
      .subscribe(
        () => {
          console.log('Data has been successfully saved');
          this.router.navigate(['result']);
        },
        (error) => {
          console.log(error.message);
          alert(error.message);
          window.location.reload();
        }
      );
  }
}
