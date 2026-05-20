import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { searchOutline, callOutline, cartOutline, personCircleOutline } from 'ionicons/icons';
import { SearchResultComponent} from '../search-result/search-result.component';
import { CartComponent } from '../cart/cart.component';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
   imports: [IonicModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router) {
    addIcons({ searchOutline, callOutline, cartOutline, personCircleOutline });
  }

  ngOnInit() {}

  goToSearch() {
  this.router.navigate(['/tabs/search']);
}

}
