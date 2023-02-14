import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../../data/equipment.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EquipmentSerivce } from '../../services/equipment.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.less']
})
export class EquipmentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'model', 'brand', 'weight', 'manufactureDate', 'Action'];
  dataSource: MatTableDataSource<Equipment>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private equipmentSerivce: EquipmentSerivce) {
    this.dataSource = new MatTableDataSource<Equipment>();
  }


  ngOnInit(): void {
    this.getData();
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.equipmentSerivce.getEquipments().subscribe((data: Equipment[]) => {
      this.dataSource.data = data;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  addData() {

  }

  delete(equipment: Equipment) {
    this.equipmentSerivce.confirmDelete(equipment).subscribe(result => {
      if (!result) {
        return;
      }

      this.getData();
    });
  }
}