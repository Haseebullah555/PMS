import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useThemeMode } from "../../../_metronic/partials"
import { getAvailableStock, getDailySales } from "../../../redux/slices/Dashboard/DashboardSlice"

type Props = {
  className: string
  description: string
  color: string
  img: string
  fuelTypeId: number
}
const AviliableStockCard = ({ className, description, color, img, fuelTypeId }: Props) => {
  const chartRef = useRef<HTMLDivElement | null>(null)
  const { mode } = useThemeMode()
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  const [cardData, setCardData] = useState<any[]>([])
  const dispatch = useDispatch<any>()
  const { t } = useTranslation()
  useEffect(() => {
    setLoading(true)

    dispatch(getAvailableStock())
      .unwrap()
      .then((data) => {
        setCardData(data)
        setLoading(false)
      })
      .catch(() => {
        setIsAuthorized(false)
        setLoading(false)
      })
  }, [dispatch])
  const fuelData = cardData.find(
    (item) => item.fuelTypeId === fuelTypeId
  )
  console.log('شبشبسبسشیبسشیبس', fuelData)
  return (
    <div
      className={`card card-flush bgi-no-repeat bgi-size-contain bgi-position-x-end ${className}`}
      style={{
        backgroundColor: color,
        backgroundImage: `url('${img}')`,
      }}
    >
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <span className='fs-2x fw-bold text-white'>
            {fuelData?.fuelTypeName ?? '—'}
          </span>
        </div>
      </div>

      <div className='card-body d-flex align-items-center justify-content-between pt-0'>
        <div className='card-title d-flex flex-column'>
          <span className='fs-2hx fw-bold text-white'>
            {fuelData?.amount?.toLocaleString() ?? 0}
          </span>
          <span className='text-white opacity-75 fs-6'>{t("dashboard.liter")}</span>
        </div>

        {/* <div className='card-title d-flex flex-column'>
          <span className='fs-2hx fw-bold text-white'>
            {fuelData
              ? (fuelData.totalSoldAmount * fuelData.fuelUnitPrice).toLocaleString()
              : '—'}
          </span>

          <span className='text-white opacity-75 fs-6'>AFN</span>
        </div> */}
      </div>
    </div>
  )
}
export { AviliableStockCard }
