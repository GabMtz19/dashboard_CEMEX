import {CommonModule} from '@angular/common';
import { FormatDatePipe } from './format-date.pipe';
import { FormatDateTimePipe } from './format-datetime.pipe';
import { FormatNumberPipe } from './format-number.pipe';
import { FormatTimePipe } from './format-time.pipe';
import {NgModule} from '@angular/core';
import { SafeHtmlPipe } from './sanitize-html.pipe';
import { TranslatePipe } from './translate.pipe';

@NgModule({
    declarations: [TranslatePipe, FormatDatePipe, FormatTimePipe, FormatDateTimePipe, FormatNumberPipe, SafeHtmlPipe],
    imports: [
        CommonModule
    ],
    exports: [
        TranslatePipe, FormatDatePipe, FormatTimePipe, FormatDateTimePipe, FormatNumberPipe, SafeHtmlPipe
    ]
})
export class SharedPipeModule {}
