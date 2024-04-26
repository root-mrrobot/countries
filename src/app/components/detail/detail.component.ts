import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {
  country: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { country: any }) {
    this.country = data.country;
  }
}
