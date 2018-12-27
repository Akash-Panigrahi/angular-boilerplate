import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Chart, Highcharts } from 'angular-highcharts';
// import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-gradient-pie',
    templateUrl: './gradient-pie.component.html',
    styleUrls: ['./gradient-pie.component.scss']
})
export class GradientPieComponent implements OnInit, OnDestroy {

    @Input() gradientPie;

    chart;

    constructor() { }

    ngOnInit() {

        this.chart = new Chart(<any>{
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares in January, 2018'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
                return {
                    radialGradient: {
                        cx: 0.5,
                        cy: 0.3,
                        r: 0.7
                    },
                    stops: [
                        [0, color],
                        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            }),
            series: [{
                name: 'Share',
                data: this.gradientPie
            }]
        });
    }

    ngOnDestroy() {
        this.chart.destroy();
    }
}
