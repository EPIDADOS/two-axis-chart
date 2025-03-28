<template>
  <div class="chart-wrapper" :style="containerStyle">
    <div ref="chartContainer" class="chart-container"></div>
    
    <!-- Legend -->
    <div class="chart-legend">
      <div class="legend-item">
        <div class="legend-marker accuracy"></div>
        <div class="legend-text">{{ content.percentageLegend || 'Taxa de Acerto Geral' }}</div>
      </div>
      <div class="legend-item">
        <div class="legend-marker questions"></div>
        <div class="legend-text">{{ content.countLegend || 'Questões Respondidas' }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DualAxisChart',
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      chartInstance: null,
      tooltipEl: null
    };
  },
  computed: {
    containerStyle() {
      return {
        backgroundColor: this.content.backgroundColor || '#f0f9f5',
        borderRadius: '8px',
        padding: '16px',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box'
      };
    },
    // Field mapping for flexible data structure
    fieldMapping() {
      return {
        percentage: this.content.percentageField || 'percentage',
        count: this.content.countField || 'count',
        period: this.content.periodField || 'period'
      };
    },
    chartData() {
      // Default data if not provided
      if (!this.content.data || !Array.isArray(this.content.data) || this.content.data.length === 0) {
        return [
          { percentage: 50, count: 30, period: 'Out' },
          { percentage: 55, count: 145, period: 'Nov' },
          { percentage: 60, count: 180, period: 'Dez' },
          { percentage: 65, count: 220, period: 'Jan' },
          { percentage: 67, count: 280, period: 'Fev' },
          { percentage: 70, count: 350, period: 'Mar' }
        ];
      }
      return this.content.data;
    },
    // Extract data with field mapping
    periods() {
      return this.chartData.map(item => item[this.fieldMapping.period]);
    },
    percentages() {
      return this.chartData.map(item => item[this.fieldMapping.percentage]);
    },
    counts() {
      return this.chartData.map(item => item[this.fieldMapping.count]);
    }
  },
  mounted() {
    this.loadApexCharts();
  },
  beforeUnmount() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  },
  watch: {
    'content.data': {
      handler() {
        this.updateChart();
      },
      deep: true
    },
    content: {
      handler() {
        this.updateChart();
      },
      deep: true
    }
  },
  methods: {
    loadApexCharts() {
      if (window.ApexCharts) {
        this.initChart();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
      script.async = true;
      script.onload = () => {
        this.initChart();
      };
      document.head.appendChild(script);
    },
    
    initChart() {
      if (!window.ApexCharts) return;

      const options = {
        chart: {
          height: '100%',
          type: 'line',
          fontFamily: 'Arial, sans-serif',
          toolbar: {
            show: false
          },
          background: 'transparent'
        },
        colors: [
          this.content.percentageColor || '#4CAF50', 
          this.content.countColor || '#2196F3'
        ],
        stroke: {
          width: [this.content.lineWidth || 3, this.content.lineWidth || 3],
          curve: 'smooth',
          dashArray: [0, 5]
        },
        grid: {
          borderColor: '#e0e6ed',
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        markers: {
          size: 5,
          colors: [
            this.content.percentageColor || '#4CAF50', 
            this.content.countColor || '#2196F3'
          ],
          strokeWidth: 0,
          hover: {
            size: 7
          }
        },
        xaxis: {
          categories: this.periods,
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 6,
            offsetX: 0,
            offsetY: 0
          },
          labels: {
            style: {
              colors: '#333',
              fontSize: '12px'
            }
          }
        },
        yaxis: [
          {
            title: {
              text: this.content.percentageLabel || 'Taxa de Acerto (%)',
              style: {
                color: '#333',
                fontSize: '12px',
                fontWeight: 600
              }
            },
            min: 0,
            max: 100,
            tickAmount: 5,
            decimalsInFloat: 0,
            labels: {
              formatter: (value) => {
                return `${value}%`;
              },
              style: {
                colors: '#333',
                fontSize: '12px'
              }
            }
          },
          {
            title: {
              text: this.content.countLabel || 'Questões Respondidas',
              style: {
                color: '#333',
                fontSize: '12px',
                fontWeight: 600
              }
            },
            opposite: true,
            min: 0,
            tickAmount: 5,
            decimalsInFloat: 0,
            labels: {
              style: {
                colors: '#333',
                fontSize: '12px'
              }
            }
          }
        ],
        tooltip: {
          enabled: true,
          shared: true,
          intersect: false,
          custom: ({ series, seriesIndex, dataPointIndex, w }) => {
            const period = this.periods[dataPointIndex];
            const percentage = this.percentages[dataPointIndex];
            const count = this.counts[dataPointIndex];
            
            return `
              <div class="custom-tooltip">
                <div class="tooltip-header">${period}</div>
                <div class="tooltip-row">
                  <span class="tooltip-label accuracy">${this.content.percentageLegend || 'Taxa de Acerto Geral'}:</span> 
                  <span class="tooltip-value">${percentage}%</span>
                </div>
                <div class="tooltip-row">
                  <span class="tooltip-label questions">${this.content.countLegend || 'Questões Respondidas'}:</span> 
                  <span class="tooltip-value">${count}</span>
                </div>
              </div>
            `;
          }
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        }
      };

      const series = [
        {
          name: this.content.percentageLegend || 'Taxa de Acerto',
          type: 'line',
          data: this.percentages
        },
        {
          name: this.content.countLegend || 'Questões Respondidas',
          type: 'line',
          data: this.counts
        }
      ];

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new ApexCharts(this.$refs.chartContainer, { ...options, series });
      this.chartInstance.render();
    },
    
    updateChart() {
      if (!this.chartInstance) {
        this.initChart();
        return;
      }

      this.chartInstance.updateOptions({
        colors: [
          this.content.percentageColor || '#4CAF50', 
          this.content.countColor || '#2196F3'
        ],
        stroke: {
          width: [this.content.lineWidth || 3, this.content.lineWidth || 3]
        },
        markers: {
          colors: [
            this.content.percentageColor || '#4CAF50', 
            this.content.countColor || '#2196F3'
          ]
        },
        xaxis: {
          categories: this.periods
        }
      });

      this.chartInstance.updateSeries([
        {
          name: this.content.percentageLegend || 'Taxa de Acerto',
          data: this.percentages
        },
        {
          name: this.content.countLegend || 'Questões Respondidas',
          data: this.counts
        }
      ]);
    }
  }
};
</script>

<style scoped>
.chart-wrapper {
  height: 100%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
}

.chart-container {
  flex: 1;
  min-height: 300px;
}

.chart-legend {
  display: flex;
  justify-content: center;
  margin-top: 8px;
  gap: 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-marker.accuracy {
  background-color: v-bind('content.percentageColor || "#4CAF50"');
}

.legend-marker.questions {
  background-color: transparent;
  border: 2px dashed v-bind('content.countColor || "#2196F3"');
  width: 8px;
  height: 8px;
}

.legend-text {
  font-size: 12px;
  color: #333;
}

/* Custom tooltip styles that will be injected */
:global(.custom-tooltip) {
  padding: 8px 12px;
  background: #333;
  border-radius: 6px;
  color: white;
  font-family: Arial, sans-serif;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

:global(.tooltip-header) {
  font-weight: bold;
  padding-bottom: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 6px;
}

:global(.tooltip-row) {
  margin: 4px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

:global(.tooltip-label.accuracy) {
  color: v-bind('content.percentageColor || "#4CAF50"');
}

:global(.tooltip-label.questions) {
  color: v-bind('content.countColor || "#2196F3"');
}

:global(.tooltip-value) {
  font-weight: bold;
}
</style>