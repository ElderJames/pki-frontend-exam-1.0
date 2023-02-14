import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Equipment } from 'src/app/data/equipment.model';
import { EquipmentSerivce } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.less']
})
export class EquipmentEditComponent implements OnInit {

  equipmentForm = this.fb.group({
    model: '',
    brand: '',
    weight: '',
    manufactureDate: '',
  });

  isNew: boolean = true;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private equipmentSerivce: EquipmentSerivce) { }

  ngOnInit(): void {
    this.getEquipment();
  }

  getEquipment() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
      this.isNew = false;
      this.equipmentSerivce.getEquipment(id).subscribe((data: Equipment) => {
        this.equipmentForm.patchValue(data)
      });
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = this.canDeactivate();
  }

  canDeactivate(): boolean {
    if (!this.equipmentForm?.dirty) {
      return true;
    }

    return confirm('Discard changes?');
  }


  onSubmit() {
    console.log('equipmentForm');
    this.equipmentForm.updateValueAndValidity();
    if (this.equipmentForm.invalid) {
      return;
    }
    if (this.isNew) {
      this.equipmentSerivce.createEquipment({ ...this.equipmentForm.value as Equipment }).subscribe(data => {
        this.equipmentForm.markAsPristine();
        this.router.navigateByUrl(`/equipments/` + data.id);
      });
    }
    else {
      this.equipmentSerivce.updateEquipment({ ...this.equipmentForm.value as Equipment, id: this.id, }).subscribe(res => {
        this.equipmentForm.markAsPristine();
        this.router.navigateByUrl(`/equipments/` + this.id);
      });

    }
  }
}
