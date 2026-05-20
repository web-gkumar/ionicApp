import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { Crud } from '../../shared/services/crud';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addCircleOutline, cameraOutline, caretForwardCircle, closeCircleOutline, pencilOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
// import { register } from 'swiper/element/bundle';

// register();
@Component({
  selector: 'app-create-post',
  imports: [IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CreatePostComponent implements OnInit {
  orderForm!: FormGroup;
  files: any[] = [];
  user: any = {};
  urlId: any;

  constructor(private fb: FormBuilder, private _crudService: Crud, private route: ActivatedRoute) {
    addIcons({ pencilOutline, closeCircleOutline, cameraOutline, caretForwardCircle, addCircleOutline });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('profile') || '{}');
    this.orderForm = this.fb.group({
      purpose: ['', Validators.required],
      cropName: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      deliveryDate: ['', Validators.required]
    });

    this.urlId = this.route.snapshot.paramMap.get('id');

    if (this.urlId) {
      const storedData = localStorage.getItem('Posted-data');
      const getData = storedData ? JSON.parse(storedData) : [];
      const selectedData = getData.find((item: any) => item._id === this.urlId);
      if (selectedData) {
        if (selectedData.deliveryDate) {
          const d = new Date(selectedData.deliveryDate);
          selectedData.deliveryDate = d.toISOString().split('T')[0]; // 👉 YYYY-MM-DD
        }
        this.orderForm.patchValue(selectedData);
      }




    }
  }


  submitOrder() {
    if (this.orderForm.invalid) return;
    const formData = new FormData();
    formData.append('userId', this.user._id);
    formData.append('purpose', this.orderForm.value.purpose);
    formData.append('cropName', this.orderForm.value.cropName);
    formData.append('price', this.orderForm.value.price);
    formData.append('quantity', this.orderForm.value.quantity);
    formData.append('deliveryDate', this.orderForm.value.deliveryDate);

    this.files.forEach(f => {
      formData.append('files', f.file);
    });

    this._crudService.addOrder(formData).subscribe({
      next: () => {
        alert('Order Saved');
        this.orderForm.reset();
        this.files = [];
      }
    });
  }


  updateOrder() {
    if (this.orderForm.invalid) return;
    this._crudService.updateOrder(this.urlId, this.orderForm.value).subscribe({
      next: () => {
        alert('Order Updated');
        this.orderForm.reset();
        this.files = [];
      }
    });
  }


  onFilesSelected(event: any) {
    const selectedFiles: FileList = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      this.files.push({ file: file, url: URL.createObjectURL(file), type: file.type.startsWith('image') ? 'image' : 'video' });
    }
  }


  removeSlideimage(index: number) {
    URL.revokeObjectURL(this.files[index].url);
    this.files.splice(index, 1);
  }





}
