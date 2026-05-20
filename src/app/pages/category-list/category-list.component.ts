import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Data } from '../../shared/services/data'
import { addIcons } from 'ionicons';
import { searchOutline, callOutline } from 'ionicons/icons';

@Component({
  selector: 'app-category-list',
   imports: [IonicModule, CommonModule],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent  implements OnInit {

  category = '';
  allItems:any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: Data
  ) {
    addIcons({ searchOutline, callOutline });
  }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('key')!;
    this.allItems = this.dataService.getDatabycategory(this.category);
  }

    detailspage(data: any) {
    this.router.navigate(['/tabs/details', data.id]);
  }
  
}

