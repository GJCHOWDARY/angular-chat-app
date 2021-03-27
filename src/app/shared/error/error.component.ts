import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: "./error.component.html",
  selector: "app-error",
})

export class ErrorComponent {

  // private errorSub: Subscription;
  constructor(public dialogRef: MatDialogRef<ErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, title: string }) { }
  // constructor(private errorService: ErrorService) {}
  onClose(): void {
    this.dialogRef.close();
  }
}
