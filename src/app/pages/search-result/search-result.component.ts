import { Component, OnInit } from '@angular/core';

import { IonicModule } from '@ionic/angular';
import { Data } from '../../shared/services/data';
import { addIcons } from 'ionicons';
import { locationOutline, optionsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-search-result',
  imports: [IonicModule],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent  implements OnInit {

  crops: any[] = [];
  filteredCrops: any[] = [];
  categories: any[] = [];

  recentSearch = [
    'fresh apricots',
    'frozen pizza',
    'Bananas',
    'cheetos',
    'discounted items',
    'fresh vegetables'
  ];
  constructor(private data: Data) {
    addIcons({ locationOutline, optionsOutline })
  }

  ngOnInit() {
  }


}
