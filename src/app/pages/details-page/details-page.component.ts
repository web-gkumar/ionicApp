import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Data } from '../../shared/services/data'
// import { register } from 'swiper/element/bundle';
import { addIcons } from 'ionicons';
import { searchOutline, callOutline } from 'ionicons/icons';


// register();
@Component({
  selector: 'app-details-page',
  imports: [IonicModule, CommonModule],
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsPageComponent  implements OnInit {

  title = "Test"
  dataId = '';
  allItems:any

  constructor(
    private route: ActivatedRoute,
    private dataService: Data
  ) {
    addIcons({ searchOutline, callOutline });
  }

  ngOnInit() {
    this.dataId = this.route.snapshot.paramMap.get('id')!;
    this.allItems = this.dataService.getdatabyId(Number(this.dataId));
    this.title = this.allItems[0].name;
  }

}
