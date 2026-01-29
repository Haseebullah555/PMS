import { useFormik } from "formik"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { initialValues } from "./_model"
import { useDispatch } from "react-redux"
import { getFuelSummary } from "../../../../../../redux/slices/reportSlice/reportSlice"
import { toast } from "react-toastify"
import { useMemo, useState } from "react"

const FuelSummaryReport = () => {

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [data, setData] = useState<any>([])


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

     const memoizedData = useMemo(() => data, [data])
    console.log(data, '=============')
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
                            <div className="col-md-4">
                                <label className="form-label">{t('report.fromDate')}</label>
                                <input
                                    type="date"
                                    name="fromDate"
                                    value={formik.values.fromDate || ''}
                                    onChange={formik.handleChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-4">
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
                        



                         <div className="table-responsive">
                        <table className="table table-hover table-striped text-nowrap mb-0">
                          <thead className="text-center bg-gray-600 text-light">
                            <tr>
                              <th>{t('global.date')}</th>
                              <th>{t('global.ACTION')}</th>
                            </tr>
                          </thead>

                          <tbody>
                            {/* {memoizedData?.map((i: any) => (
                              <tr key={i.id} className="text-center">
                                <td className="fw-bold">{i.name}</td>
                                <td>
                                  <div className="d-flex gap-2 justify-content-center flex-wrap">
                                   
                                   
                                  </div>
                                </td>
                              </tr>
                            ))} */}
                          </tbody>

                        </table>
                      </div>


                    </div>
                </div>
            </Fragment>
        </>
    )
}
export default FuelSummaryReport;