import { HttpClient } from "@angular/common/http";
import { Equipment } from "../data/equipment.model";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { EquipmentDeleteDialogComponent } from "../equipments/equipment-delete-dialog/equipment-delete-dialog.component";
import { Observable } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EquipmentSerivce {
    constructor(
        public dialog: MatDialog,
        private snackBar: MatSnackBar,
        private httpClient: HttpClient) {
    }

    baseUrl: string = environment.apiEndPoint;

    getEquipments() {
        return this.httpClient.get<Equipment[]>(`${this.baseUrl}/equipments`);
    }

    getEquipment(id: string) {
        return this.httpClient.get<Equipment>(`${this.baseUrl}/equipments/${id}`);
    }

    createEquipment(equipment: Equipment) {
        return this.httpClient.post<Equipment>(`${this.baseUrl}/equipments`, equipment).pipe(res => {
            this.showMessage('Create successfully✔️');
            return res;
        });
    }

    updateEquipment(equipment: Equipment) {
        return this.httpClient.put(`${this.baseUrl}/equipments/${equipment.id}`, equipment).pipe(res => {
            this.showMessage('Update successfully✔️');
            return res;
        });
    }

    deleteEquipment(id: string) {
        return this.httpClient.delete(`${this.baseUrl}/equipments/${id}`).pipe(res => {
            this.showMessage('Delete successfully✔️');
            return res;
        });;
    }

    confirmDelete(equipment: Equipment): Observable<boolean> {
        const dialogRef = this.dialog.open(EquipmentDeleteDialogComponent, {
            data: equipment,
        });

        return new Observable<boolean>((observer) => {
            dialogRef.beforeClosed().subscribe(result => {
                if (!result) {
                    observer.next(false);
                    return;
                }

                this.deleteEquipment(equipment.id).subscribe((data: any) => {
                    observer.next(true)
                });
            });
        })
    }

    showMessage(message: string) {
        this.snackBar.open(message, undefined, {
            duration: 2000, horizontalPosition: 'center',
            verticalPosition: 'top',
        });
    }
}