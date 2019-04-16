<template>
    <div>
        <GChart
            :settings="{packages: ['bar']}"
            :data="chartData"
            :options="chartOptions"

            :createChart="(el, google) => new google.charts.Bar(el)"
            @ready="onChartReady"
        />
    </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import Api from '@/api/user'

export default {
    props: ['username'],

    components: {
        GChart,
    },

    data() {
        return {
            chartsLib: null,
            // Array will be automatically processed with visualization.arrayToDataTable function
            chartData: [
                // ['ID', 'X', 'Y', 'Temperature'],
                // ['', 80, 167, 120],
                // ['', 79, 136, 130],
                // ['', 78, 184, 50],
                // ['', 72, 278, 230],
                // ['', 81, 200, 210],
                // ['', 72, 170, 100],
                // ['', 68, 477, 80],
            ],

            stats: [
                { _id: '5a1e743a0e17220016172efb', title: 'Number Theory', total: 72, user: 29 },
                { _id: '5a202b771a5d4a0016611ddd', title: 'Data Structure', total: 126, user: 69 },
                { _id: '5a22565c883d3e0016b5a9e8', title: 'Combinatorics', total: 59, user: 24 },
                { _id: '5a24310a2ef23f0016176b67', title: 'Network Flow', total: 31, user: 13 },
                { _id: '5a2431642ef23f0016176b6a', title: 'Dynamic Programming', total: 139, user: 53 },
                { _id: '5a243c112ef23f0016176b72', title: 'Mathematics', total: 48, user: 20 },
                { _id: '5a2e3ece65252d00166fe387', title: 'Graph Theory', total: 124, user: 40 },
                { _id: '5a2ffed27b2ad8001603aab7', title: 'Game Theory', total: 31, user: 8 },
                { _id: '5a3012400783070016a502fb', title: 'Geometry', total: 45, user: 10 },
                { _id: '5a305e460783070016a50426', title: 'String', total: 51, user: 23 },
                { _id: '5a30cf810783070016a5044e', title: 'Adhoc', total: 21, user: 7 },
                { _id: '5a3794e7980ec100156a440c', title: 'Greedy', total: 38, user: 9 },
                { _id: '5ada35efdf29e8004133db21', title: 'Misc', total: 8, user: 3 },
            ],
        }
    },

    computed: {

        chartOptions() {
            if (!this.chartsLib) {
                return null
            }
            return this.chartsLib.charts.Bar.convertOptions({
                chart: {
                    title: 'Performance in Gateway',
                    // subtitle: 'Subtitle',
                },
                bars: 'horizontal', // Required for Material Bar Charts.
                hAxis: { format: 'decimal' },
                // height: 900,
                colors: ['#03A9F4', '#FF5252', '#7570b3'],
            })
        },
    },

    async mounted() {
        const response = await Api.getStats(this.username)
        console.log('root stats = ', response)
        this.stats = response.data.children
        this.chartData = this.getChartData(this.stats)
    },

    methods: {
        getChartData(stats) {
            const chartData = [['ID', 'Solved', 'Total']]
            for (const row of stats) {
                chartData.push(
                    [row.title, row.user, row.total]
                )
            }

            return chartData
        },

        onChartReady(chart, google) {
            this.chartsLib = google
        },
    },
}
</script>
