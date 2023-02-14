import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipment } from 'src/app/data/equipment.model';

@Component({
  selector: 'app-equipment-delete-dialog',
  templateUrl: './equipment-delete-dialog.component.html',
  styleUrls: ['./equipment-delete-dialog.component.less']
})
export class EquipmentDeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EquipmentDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Equipment,
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onOkClick(): void {
    this.dialogRef.close(true);
  }
}
