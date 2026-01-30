import { useFormik } from "formik"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { initialValues } from "./_model"
import { useDispatch } from "react-redux"
import { getFuelSummary } from "../../../../../../redux/slices/reportSlice/reportSlice"
import { toast } from "react-toastify"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks"
import { getAllFuelType } from "../../../../../../redux/slices/fuelType/FuelTypeSlice"

const FuelSummaryReport = () => {

    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [data, setData] = useState<any>([])
    const fuelTypes = useAppSelector((state: any) => state.fuelType.fuelTypeAllList)


    const formik = useFormik({
        initialValues,
        validationSchema: null,
        onSubmit: async (values) => {
            try {
                const response = await dispatch(getFuelSummary(values) as any)
                if (response.meta.requestStatus == 'fulfilled') {
                    setData(response.payload)
                } else {
                    toast.error(<p className="fs-4 fw-bold">{response.payload}</p>)
                }
            } catch (error: any) {
                console.error('Error creating supplier:', error.message)
            }
        },
    })

    useEffect(() => {
        if (!fuelTypes) {
            dispatch(getAllFuelType())
                .then((res) => { })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    const getTotalForFuel = (fuelName: string) => {
        return memoizedData?.sales?.reduce(
            (sum: number, sale: any) =>
                sum + (sale.sold?.[fuelName] ?? 0),
            0
        ) ?? 0
    }


    const memoizedData = useMemo(() => data, [data])
    console.log(memoizedData.length, "mmmmmmmmmmmmmmmmmmmmm")
    return (
        <>
            <Fragment>
                <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
                    <div className='card-header cursor-pointer'>
                        <div className='card-title m-0'>
                            <h3 className='fw-bolder m-0'>
                                <i className="fas fa-list fs-4 text-primary"></i>
                                {' '}
                                {t('report.fuelSummaryReport')}
                            </h3>
                        </div>
                        <div>
                            <div className='d-none d-lg-flex mt-5'>
                                <div className='d-flex align-items-center'>
                                    <Link className='btn btn-sm btn-flex btn-danger fw-bold' to='/dashboard'>
                                        <b>
                                            <i className='fa-solid fa-reply-all'></i>
                                        </b>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='card-body p-9 table-responsive'>
                        <div className="row">
                            <div className="col-md-5">
                                <label className="form-label">{t('report.fromDate')}</label>
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={formik.values.fromDate || ''}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">{t('report.toDate')}</label>
                                <input
                                    type="date"
                                    name="toDate"
                                    value={formik.values.toDate || ''}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-2">
                                <button type="button" className='btn mt-8 btn-primary' onClick={() =>
                                    formik.handleSubmit()}>
                                    <span className="fa fa-search fw-bold"></span>{' '}
                                    {t('global.search')}
                                </button>
                            </div>
                        </div>

                        {  memoizedData.length == undefined && (
                                <>
                                <hr />
                                    {/* sales report table  */}
                                    <h2 className="text-center mt-4">{t('report.dailyFuelSell')}</h2>
                                    <div className="table-responsive mt-3">
                                        <table className="table table-hover table-striped text-nowrap mb-0">
                                            <thead className="text-center bg-gray-600 fw-bold">
                                                <tr>
                                                    <th>{t('global.date')}</th>
                                                    {fuelTypes?.data?.map((fuelType: any) => (
                                                        <th key={fuelType.id}>{fuelType.name}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* Sales rows */}
                                                {memoizedData?.sales?.map((sale: any, rowIdx: number) => (
                                                    <tr key={rowIdx} className="text-center">
                                                        <td className="fw-bold">{sale.date}</td>

                                                        {fuelTypes?.data?.map((fuelType: any) => {
                                                            const value = sale.sold?.[fuelType.name] ?? 0

                                                            return (
                                                                <td key={fuelType.id}>
                                                                    {value}
                                                                </td>
                                                            )
                                                        })}
                                                    </tr>
                                                ))}

                                                {/* TOTAL row */}
                                                <tr className="text-center fw-bold bg-danger">
                                                    <td>{t('global.TOTAL')}</td>

                                                    {fuelTypes?.data?.map((fuelType: any) => (
                                                        <td key={fuelType.id}>
                                                            {getTotalForFuel(fuelType.name)}
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                    {/* purchase report table  */}
                                    <h2 className="text-center mt-4">{t('report.purchase')}</h2>
                                    <div className="table-responsive mt-3">
                                        <table className="table table-hover table-striped text-nowrap mb-0">
                                            <thead className="text-center bg-gray-600 fw-bold">
                                                <tr>
                                                    <th></th>
                                                    {fuelTypes?.data?.map((fuelType: any) => (
                                                        <th key={fuelType.id}>{fuelType.name}</th>
                                                    ))}
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {/* Purchases row */}
                                                <tr className="text-center fw-bold bg-light">

                                                    <td></td>
                                                    {fuelTypes?.data?.map((fuelType: any, index: number) => {
                                                        const value = memoizedData?.purchases?.[fuelType.name] ?? 0
                                                        return (
                                                            <td key={fuelType.id}>
                                                                {value}
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                    {/* stock report table  */}
                                    <h2 className="text-center mt-4">{t('report.stock')}</h2>
                                    <div className="table-responsive mt-3">
                                        <table className="table table-hover table-striped text-nowrap mb-0">
                                            <thead className="text-center bg-gray-600 fw-bold">
                                                <tr>
                                                    <th></th>
                                                    {fuelTypes?.data?.map((fuelType: any) => (
                                                        <th key={fuelType.id}>{fuelType.name}</th>
                                                    ))}
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {/* Purchases row */}
                                                <tr className="text-center fw-bold bg-light">
                                                    <td></td>
                                                    {fuelTypes?.data?.map((fuelType: any, index: number) => {
                                                        const value = memoizedData?.stock?.[fuelType.name] ?? 0
                                                        return (
                                                            <td key={fuelType.id}>
                                                                {value}
                                                            </td>
                                                        )
                                                    })}
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </>
                        )
                            }
                    </div>
                </div>
            </Fragment>
        </>
    )
}
export default FuelSummaryReport;