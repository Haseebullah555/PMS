import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'

import { toast } from 'react-toastify'
import { storeFuelDistribution } from '../../../../../redux/slices/fuelDistribution/FuelDistributionSlice'
import { getAllFuelType } from '../../../../../redux/slices/fuelType/FuelTypeSlice'
import { FuelDistributionForm, initialValues } from './_module'

// Define the props for the modal
interface CreateFuelDistributionModalProps {
    isOpen: boolean
    onClose: () => void
    handleReloadTable: () => void
}

const CreateFuelDistributionModal: React.FC<CreateFuelDistributionModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
    const intl = useIntl()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [roles, setRoles] = useState([])

    const fuelTypes = useAppSelector((state: any) => state.fuelType.fuelTypeAllList)
    // Form Validation Schema
    const FuelDistributionSchema = Yup.object().shape({
        name: Yup.string().required(t('validation.required', { name: t('fuelDistribution.fuelDistribution') })),
        fuelTypeId: Yup.number().required(t('validation.required', { name: t('staff.staff') })),
        fuelGuns: Yup.array()
            .of(
                Yup.object().shape({
                    name: Yup.string().required(t('validation.required', { name: t('fuelGun.fuelGun') })),
                })
            )
            .min(1, "At least one fuel gun is required"),
    })


    // Formik Hook
    const formik = useFormik<FuelDistributionForm>({
        initialValues,
        validationSchema: FuelDistributionSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await dispatch(storeFuelDistribution(values) as any)
                if (storeFuelDistribution.fulfilled.match(response)) {
                    handleFulfilledResponse(response)
                    handleReloadTable()
                    onClose()
                    resetForm()
                } else {
                    handleRejectedResponse(response)
                }
            } catch (error) {
                handleError(error)
            } finally {
                // setLoading(false)
                setSubmitting(false)
            }
        },
    })

    const handleFulfilledResponse = (response: any) => {
        const { meta, payload } = response
        if (meta.requestStatus === 'fulfilled') {
            toast.success(<p className='fs-4 fw-bold'>{payload.message}</p>)
        } else {
            toast.error(<p className='fs-4 fw-bold'>{t('validation.required')}</p>)
        }
    }

    const handleRejectedResponse = (response: any) => {
        const { payload } = response
        toast.error(<p className='fs-4 fw-bold'>{payload}</p>)
    }

    const handleError = (error: any) => {
        console.error('Error creating fuelDistribution:', error.message)
    }
    useEffect(() => {
        if (!fuelTypes) {
            dispatch(getAllFuelType())
                .then((res) => {
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])
    return (
        <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} >
            <Modal.Header closeButton>
                <Modal.Title>{t('global.add', { name: t('fuelDistribution.fuelDistribution') })}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    {/* Name and FuelDistribution Name Fields */}
                    <div className='row'>
                        {/* Fuel Type */}
                        <div className="col-md-12 mb-3">
                            <label className='form-label'>{t("fuelType.fuelType")} *</label>
                            <select
                                className={clsx('form-select', {
                                    'is-invalid': formik.touched.fuelTypeId && formik.errors.fuelTypeId,
                                    'is-valid': formik.touched.fuelTypeId && !formik.errors.fuelTypeId,
                                })}
                                value={formik.values.fuelTypeId ?? ""}
                                onChange={(e) =>
                                    formik.setFieldValue("fuelTypeId", Number(e.target.value))
                                }
                            >
                                <option value="">{t("global.SELECT.OPTION")}</option>
                                {fuelTypes?.data.map((f: any) => (
                                    <option key={f.id} value={f.id}>{f.name}</option>
                                ))}
                            </select>
                            {formik.touched.fuelTypeId &&
                                formik.errors?.fuelTypeId && (
                                    <div className="invalid-feedback">
                                        {t('validation.required', { name: t('staff.staff') })}
                                    </div>
                                )}
                        </div>
                        {/* Quantity Field */}
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>
                                {t('fuelDistribution.quantity')} <span className='text-danger'>*</span>
                            </label>
                            <input
                                type='text'
                                {...formik.getFieldProps('quantity')}
                                className={clsx('form-control', {
                                    'is-invalid': formik.touched.quantity && formik.errors.quantity,
                                    'is-valid': formik.touched.quantity && !formik.errors.quantity,
                                })}
                            />
                            {formik.touched.quantity && formik.errors.quantity && (
                                <div className='invalid-feedback'>
                                    {t('validation.required', { name: t('fuelDistribution.quantity') })}
                                </div>
                            )}
                        </div>
                        <div className="col-md-12 mb-5">
                            <label className="form-label">{t('global.date')}</label>
                            <input
                                type="date"
                                name="distributionDate"
                                value={formik.values.distributionDate}
                                onChange={formik.handleChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    {/* Submit Buttons */}
                    <div className='text-end'>
                        <Button variant='danger' onClick={onClose} className='me-2 '>
                            {t('global.BACK')}
                        </Button>
                        <Button
                            variant='primary'
                            type='submit'
                            disabled={formik.isSubmitting}
                        // classname='me-2 '
                        >
                            {t('global.SAVE')}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateFuelDistributionModal
