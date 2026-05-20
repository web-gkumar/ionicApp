import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { searchOutline, callOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Data } from 'src/app/shared/services/data';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category',
  imports: [HeaderComponent, IonicModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent  implements OnInit {

categories: any[] = [];



  constructor(
    private ds: Data,
    private router: Router
  ) {
    addIcons({ searchOutline, callOutline });
  }

  ngOnInit() {
    this.categories = this.ds.getCategories();
  }



  openCategory(cat: any) {
    this.router.navigate(['/tabs/category', cat], { replaceUrl: true });
  }


}
