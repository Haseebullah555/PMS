/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { Dropdown1, useThemeMode } from '../../../_metronic/partials'
import { getCSS, getCSSVariableValue } from '../../../_metronic/assets/ts/_utils'

type Props = {
    className: string
}

const DashboardChart: React.FC<Props> = ({ className }) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
    const { mode } = useThemeMode()

    useEffect(() => {
        const chart = refreshChart()

        return () => {
            if (chart) {
                chart.destroy()
            }
        }
    }, [chartRef, mode])

    const refreshChart = () => {
        if (!chartRef.current) {
            return
        }

        const height = parseInt(getCSS(chartRef.current, 'height'))

        const chart = new ApexCharts(chartRef.current, getChartOptions(height, [
            { name: 'Petrol 95', data: [44, 55, 57, 56, 61, 58, 63, 66, 70, 72, 75, 80] },
            { name: 'Petrol 92', data: [40, 50, 54, 52, 58, 55, 59, 61, 65, 68, 70, 74] },
            { name: 'Diesel', data: [76, 85, 101, 98, 87, 105, 110, 108, 112, 115, 118, 120] },
            { name: 'LPG', data: [30, 35, 40, 38, 45, 50, 55, 60, 65, 68, 72, 75] },
        ]))

        if (chart) {
            chart.render()
        }

        return chart
    }

    return (
        <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>
                {/* begin::Title */}
                <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Recent Statistics</span>

                    {/* <span className='text-muted fw-semibold fs-7'>More than 400 new members</span> */}
                </h3>
                {/* end::Title */}
            </div>
            {/* end::Header */}

            {/* begin::Body */}
            <div className='card-body'>
                {/* begin::Chart */}
                <div ref={chartRef} id='kt_charts_widget_1_chart' style={{ height: '350px' }} />
                {/* end::Chart */}
            </div>
            {/* end::Body */}
        </div>
    )
}

export { DashboardChart }

function getChartOptions(height: number, seriesData: any[]): ApexOptions {
  const labelColor = getCSSVariableValue('--bs-gray-600')
  const borderColor = getCSSVariableValue('--bs-gray-300')

  return {
    series: seriesData,

    chart: {
      type: 'bar',
      height,
      fontFamily: 'inherit',
      toolbar: { show: false },
    },

    plotOptions: {
      bar: {
        columnWidth: '55%',
        borderRadius: 6,
      },
    },

    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: labelColor,
      },
    },

    dataLabels: { enabled: false },

    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },

    xaxis: {
      categories: [
        'Jan','Feb','Mar','Apr','May','Jun',
        'Jul','Aug','Sep','Oct','Nov','Dec',
      ],
      labels: {
        style: { colors: labelColor, fontSize: '12px' },
      },
    },

    yaxis: {
      labels: {
        style: { colors: labelColor, fontSize: '12px' },
      },
    },

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val.toLocaleString()} AFN`,
      },
    },

    states: {
      hover: {
        filter: { type: 'lighten', value: 0.08 },
      },
      active: {
        filter: { type: 'darken', value: 0.1 },
      },
    },

    grid: {
      borderColor,
      strokeDashArray: 4,
    },

    colors: [
      getCSSVariableValue('--bs-primary'),
      '#7C5CFC',
      '#64748B',
      getCSSVariableValue('--bs-success'),
    ],
  }
}

