import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from './equipments/equipment-list/equipments.component';
import { EquipmentDetailComponent } from './equipments/equipment-detail/equipment-detail.component';
import { EquipmentEditComponent } from './equipments/equipment-edit/equipment-edit.component';
import { canDeactivateGuard } from './core/can-deactivate.guard';

const routes: Routes = [
  { path: '', redirectTo: '/equipments', pathMatch: 'full' },
  { path: 'equipments', component: EquipmentsComponent },
  { path: 'equipments/new', component: EquipmentEditComponent, canDeactivate: [canDeactivateGuard] },
  { path: 'equipments/:id', component: EquipmentDetailComponent },
  { path: 'equipments/:id/edit', component: EquipmentEditComponent, canDeactivate: [canDeactivateGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
