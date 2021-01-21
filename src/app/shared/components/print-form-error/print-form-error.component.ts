import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'print-form-error',
  templateUrl: './print-form-error.component.html',
  styleUrls: ['./print-form-error.component.scss']
})
export class PrintFormErrorComponent implements OnInit {
  @Input() control: AbstractControl;

  constructor() {
  }

  ngOnInit(): void {

  }

}
