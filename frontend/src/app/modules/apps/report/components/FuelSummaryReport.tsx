import exp from "constants"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"

const FuelSummaryReport = () => {

    const { t } = useTranslation()

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
                </div>
            </Fragment>
        </>
    )
}
export default FuelSummaryReport;