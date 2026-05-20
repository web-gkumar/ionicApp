import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { searchOutline, callOutline, locateOutline } from 'ionicons/icons';
import { Data } from '../../shared/services/data';
// import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';
import { IonicModule} from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';



// register();
@Component({
  selector: 'app-home',
  imports: [HeaderComponent, IonicModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {

  crops: any[] = [];
  categories: any[] = [];

  constructor(
    private ds: Data,
    private router: Router
  ) {
    addIcons({ searchOutline, callOutline, locateOutline });
  }



  ngOnInit() {
    this.crops = this.ds.getCrops();
    this.categories = this.ds.getCategories();
  }


  openCategory(cat: any) {
    this.router.navigate(['/tabs/category', cat]);
  }

  detailspage(data:any){
    this.router.navigate(['/tabs/details', data.id]);
  }

}
