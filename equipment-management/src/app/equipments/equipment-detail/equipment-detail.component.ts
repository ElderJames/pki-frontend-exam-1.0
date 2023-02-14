import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { Equipment } from 'src/app/data/equipment.model';
import { EquipmentSerivce } from 'src/app/services/equipment.service';
import { EquipmentDeleteDialogComponent } from '../equipment-delete-dialog/equipment-delete-dialog.component';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.less']
})
export class EquipmentDetailComponent implements OnInit {

  equipment?: Equipment;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private equipmentSerivce: EquipmentSerivce) {
  }

  ngOnInit(): void {
    this.getEquipment();
  }


  getEquipment() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.equipmentSerivce.getEquipment(id).subscribe((data: Equipment) => {
        this.equipment = data;
      });
    }
  }

  delete() {
    if (!this.equipment) {
      return;
    }
    this.equipmentSerivce.confirmDelete(this.equipment).subscribe(result => {
      if (!result) {
        return;
      }

      this.router.navigateByUrl('/equipments');
    });
  }
}
