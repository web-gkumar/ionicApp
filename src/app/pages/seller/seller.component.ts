import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { searchOutline, callOutline } from 'ionicons/icons';
import { Data } from '../../shared/services/data';
import { HeaderComponent } from '../header/header.component';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller',
  imports: [CommonModule, HeaderComponent, IonicModule],
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {

  crops: any[] = [];
  constructor(private ds: Data, private router: Router) {
    addIcons({ searchOutline, callOutline });
  }
  ngOnInit() { this.crops = this.ds.getCrops(); }


  detailspage(data: any) {
    this.router.navigate(['/tabs/details', data.id]);
  }

}
