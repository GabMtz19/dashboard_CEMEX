import { CmxWebComponentsModule } from '@cmx-web-components/angular';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info.component';
import { FormsModule } from '@angular/forms';
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
        RouterModule.forChild([
            {
                path: '',
                component: UserInfoComponent,
            },
        ])
    ],
    declarations: [
        UserInfoComponent,
    ],
    exports: []
})
export class UserInfoModule {
    constructor() {
        //
    }
}