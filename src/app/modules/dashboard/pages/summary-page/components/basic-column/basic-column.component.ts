import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
    selector: 'app-basic-column',
    templateUrl: './basic-column.component.html',
    styleUrls: ['./basic-column.component.scss']
})
export class BasicColumnComponent implements OnInit, OnChanges, OnDestroy {

    @Input() basicColumn;

    chart;

    constructor() { }

    ngOnInit() {
        this.chart = new Chart(<any>{
            chart: {
                type: 'column'
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {

        if (!changes.basicColumn.isFirstChange()) {

            this.basicColumn = changes.basicColumn.currentValue;
            const chart = this.chart.ref;

            while (chart.series.length) {
                chart.series[0].remove(false);
            }

            for (let i = 0; i < this.basicColumn.length; i++) {
                chart.addSeries(this.basicColumn[i], false);
            }

            chart.redraw();
        }
    }

    ngOnDestroy() {
        this.chart.destroy();
    }
}
