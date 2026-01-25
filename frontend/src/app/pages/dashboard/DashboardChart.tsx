/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react'
import ApexCharts, { ApexOptions } from 'apexcharts'
import { Dropdown1, useThemeMode } from '../../../_metronic/partials'
import { getCSS, getCSSVariableValue } from '../../../_metronic/assets/ts/_utils'
import { getAnnualSales } from '../../../redux/slices/Dashboard/DashboardSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

type Props = {
  className: string
}
const isRTL = document.documentElement.dir === 'rtl'
const DashboardChart: React.FC<Props> = ({ className }) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const { mode } = useThemeMode()
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [seriesData, setSeriesData] = useState<any[]>([])
  const dispatch = useDispatch<any>()
  const { t } = useTranslation()



  useEffect(() => {
    if (seriesData.length === 0) return

    const chart = refreshChart()

    return () => {
      if (chart) chart.destroy()
    }
  }, [seriesData, mode])



  useEffect(() => {
    setLoading(true)

    dispatch(getAnnualSales())
      .unwrap()
      .then((data) => {
        const chartSeries = mapBackendDataToSeries(data)
        setSeriesData(chartSeries)
        setLoading(false)
      })
      .catch(() => {
        setIsAuthorized(false)
        setLoading(false)
      })
  }, [dispatch])

  const mapBackendDataToSeries = (data: any[]) => {
    const fuelMap: Record<string, number[]> = {}

    data.forEach(item => {
      if (!fuelMap[item.fuelTypeName]) {
        fuelMap[item.fuelTypeName] = Array(12).fill(0)
      }
      fuelMap[item.fuelTypeName][item.shamsiMonth - 1] = item.totalSoldAmount
    })

    return Object.keys(fuelMap).map(fuelName => ({
      name: fuelName,
      data: isRTL
        ? [...fuelMap[fuelName]].reverse()
        : fuelMap[fuelName],
    }))
  }


  const refreshChart = () => {
    if (!chartRef.current || seriesData.length === 0) return

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(height, seriesData)
    )

    chart.render()
    return chart
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        {/* begin::Title */}
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>{t('dashboard.annualSales')}</span>

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

  const persianMonths = [
    'حمل', 'ثور', 'جوزا', 'سرطان', 'اسد', 'سنبله',
    'میزان', 'عقرب', 'قوس', 'جدی', 'دلو', 'حوت',
  ]

  const categories = isRTL
    ? [...persianMonths].reverse()
    : persianMonths

  return {
    series: seriesData,

    chart: {
      type: 'bar',
      height,
      fontFamily: 'inherit',
      toolbar: { show: false },
    },

    xaxis: {
      categories,
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val) => `${val.toLocaleString('fa-IR')} لیتر`,
      },
    },

    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      itemMargin: {
        horizontal: 16, // space between legend items
        vertical: 8,    // space between rows (if wrapped)
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
        offsetX: 3, // ⬅️ pushes marker away from text (RTL-friendly)
      },
      labels: { colors: labelColor },
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

