<template>
  <div class="chart_block" style="width: 200px; height: 100px">
    {{key}}
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
Chart.defaults.global.legend.display = false; // Hide label at the top
Chart.defaults.scale.ticks.display = false;
// Chart.defaults.scale.gridLines.display = false;

import {Line} from 'vue-chartjs';
import {numFormat} from 'src/helper';

export default {
  name: 'Chart',
  props: {
    key: String,
    graphData: Object,
  },
  extends: Line,

  data() {
    return {
      receivedData: this.graphData,
    };
  },

  watch: {
    t: function cb(newVal, oldVal){
      console.log(newVal)
    }
  },

  mounted() {
    this.renderChart({
      // labels: ['R', 'B', 'Y', 'G', 'P', 'O'],
      labels: this.receivedData.labels
        .map(item => item.split('#')[1]),
      datasets: [{
        label: '',
        // data: [2, 35, 3, 5, 19, 3],
        data: this.receivedData.diff.map(item => parseInt(numFormat(item))),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        options: {
          scales: {
            xAxes: [{
              ticks: {
                display: false,
              },
            }],
          },
          maintainAspectRatio: true,
        },
        fill: false,
      }],
    });
  },
};
</script>

<style scoped>

</style>
