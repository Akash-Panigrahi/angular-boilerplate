import {
    Component, OnInit, Input, OnDestroy, SimpleChanges, OnChanges, AfterViewInit
} from '@angular/core';
import { Chart, Highcharts } from 'angular-highcharts';

@Component({
    selector: 'app-gradient-pie',
    templateUrl: './gradient-pie.component.html',
    styleUrls: ['./gradient-pie.component.scss']
})
export class GradientPieComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() gradientPie;

    private _currentGradientPie = null;

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
                        [1, (Highcharts.Color(color) as any).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            })
        });
    }

    ngOnChanges(changes: SimpleChanges) {

        /*
            Not listening for !isFirstChange() event;
            because we are updating data from cache,
            which **will** have data in the first change.
        */
        if (changes.gradientPie.currentValue) {

            /*
                storing data in the local variable,
                to use for subsequent invocation from router.
            */
            this._currentGradientPie = changes.gradientPie.currentValue;

            /*
                But for first change this.chart will not be present,
                hence the *if* check
            */
            if (this.chart) {
                this._updateChart();
            }
        }
    }

    /*
        This code will only execute once after the chart is created;
        (i.e., component initialization; both for first time and subsequent invocation from routing)

        For first time, data will be null.
        For subsequent invocation, data will come from cache,
        and chart will be created.
    */
    ngAfterViewInit() {
        this._updateChart();
    }

    private _updateChart() {
        this.chart.removeSeries(0);
        this.chart.addSeries({ name: 'Share', data: this._currentGradientPie }, true, true);
    }

    ngOnDestroy() {
        this.chart.destroy();
    }
}
