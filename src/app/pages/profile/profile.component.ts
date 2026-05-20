import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Crud } from '../../shared/services/crud';
import { Auth } from '../../shared/services/auth';
import { addIcons } from 'ionicons';
// import { register } from 'swiper/element/bundle';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addCircleOutline, cameraOutline, caretForwardCircle, closeCircleOutline, pencilOutline } from 'ionicons/icons';

// register();
@Component({
  selector: 'app-profile',
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileComponent implements OnInit {
  @ViewChild('accordionGroup', { static: true }) accordionGroup!: any;
  profileForm!: FormGroup;
  apiUrl = "https://new-backend-w7jv.onrender.com";
  user: any = {};
  activeTab = 'orders';
  crops: any[] = [];


  constructor(
    private _crudService: Crud,
    private _auth: Auth,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ pencilOutline, closeCircleOutline, cameraOutline, caretForwardCircle, addCircleOutline });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('profile') || '{}');
    this.profileForm = this.fb.group({
      mobile: [this.user?.mobile || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      village: [this.user?.village || '', Validators.required],
      distic: [this.user?.distic || '', Validators.required],
      state: [this.user?.state || '', Validators.required],
      pincode: [this.user?.pincode || '', Validators.required],
      fulladdress: [this.user?.fulladdress || '', Validators.required],
      country: [this.user?.country || '', Validators.required]
    });
    this.loadOrders();
  }

  onImgError(event: any) {
    event.target.src = 'assets/avatar.png';
  }

  submitProfile() {
    if (this.profileForm.invalid) return;
    this._auth.updateProfile(this.profileForm.value).subscribe((res: any) => {
      this.user = res.user;
      // localStorage.setItem('profile', JSON.stringify(res.user));
      // alert('Profile updated successfully');
      // this.user = localStorage.getItem('profile') ? JSON.parse(localStorage.getItem('profile') || '{}') : {};
    });
  }



  loadOrders() {
    if (this.user._id) {
      this._crudService.getOrders(this.user._id).subscribe((res: any) => {
        if (res.success) {
          localStorage.setItem("Posted-data", JSON.stringify(res.data))
          this.crops = res.data;
        }
      });
    }
  }

  updateitem(c: any) {
    this.router.navigate(['../update-post', c._id], { relativeTo: this.route });
  }

  removeItem(c: any) {
    if (confirm("Do you really want to delete this item?")) {
      this._crudService.deleteItem(c._id).subscribe(data => {
        this.loadOrders();
      })
    }
  }







}
