import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Data } from '../../shared/services/data';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyers',
  imports: [HeaderComponent, IonicModule, CommonModule],
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.scss'],
})
export class BuyersComponent implements OnInit {

  crops: any[] = [];
  constructor(private ds: Data, private router: Router) { }
  ngOnInit() { this.crops = this.ds.getCrops(); }

  detailspage(data: any) {
    this.router.navigate(['/tabs/details', data.id]);
  }

}
