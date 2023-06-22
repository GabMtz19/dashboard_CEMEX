import { CmxWebComponentsModule } from '@cmx-web-components/angular';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedPipeModule } from 'src/app/pipes/pipes.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonToggleModule,
        CmxWebComponentsModule,
        FormsModule,
        SharedPipeModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        RouterModule.forChild([
            {
                path: '',
                component: DashboardComponent,
            },
        ])
    ],
    declarations: [
        DashboardComponent,
    ],
    exports: []
})
export class DashboardModule {
    constructor() {
        //
    }
}
