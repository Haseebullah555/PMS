import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'

import { toast } from 'react-toastify'
import { getAllFuelType } from '../../../../../redux/slices/fuelType/FuelTypeSlice'
import { DailyFuelSellForm, dailyFuelSellInitialValues, initialValues } from './_module'
import { storeDailyFuelSell } from '../../../../../redux/slices/DailyFuelSell/DailyFuelSellSlice'

// Define the props for the modal
interface CreateDailyFuelSellModalProps {
    isOpen: boolean
    selectedDailySell: any
    onClose: () => void
    handleReloadTable: () => void
    mode: any
}

const CreateDailyFuelSellModal: React.FC<CreateDailyFuelSellModalProps> = ({ isOpen, onClose, selectedDailySell, handleReloadTable, mode }) => {
const initialValues = {
        id: mode === "update" ? selectedDailySell?.id : null,
        currentMeterDegree: mode === "update" ? selectedDailySell?.currentMeterDegree ?? "" : "",
        oldMeterDegree: mode === "update" ? selectedDailySell?.oldMeterDegree ?? "" : "",
        soldFuelAmount: mode === "update" ? selectedDailySell?.soldFuelAmount ?? "" : "",
        fuelUnitPrice: mode === "update" ? selectedDailySell?.fuelUnitPrice ?? "" : "",
        collectedMoney: mode === "update" ? selectedDailySell?.collectedMoney ?? "" : "",
        date: mode === "update" ? selectedDailySell?.date ?? "" : "",
        note: mode === "update" ? selectedDailySell?.note ?? "" : "",
    };
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false);

    const fuelTypes = useAppSelector((state: any) => state.fuelType.fuelTypeAllList)

    // Form Validation Schema
    const DailyFuelSellSchema = Yup.object().shape({
        currentMeterDegree: Yup.number().required(),
        oldMeterDegree: Yup.number().required(),
        soldFuelAmount: Yup.number().required(),
        fuelUnitPrice: Yup.number().required(),
        collectedMoney: Yup.number().required(),
    })

    // Formik Hook
    const formik = useFormik<any>({
        initialValues: initialValues,
        validationSchema: DailyFuelSellSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                const response = await dispatch(storeDailyFuelSell(values) as any)
                if (storeDailyFuelSell.fulfilled.match(response)) {
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

    useEffect(() => {
        if (selectedDailySell) {
            formik.setFieldValue('fuelStandId', selectedDailySell.fuelStandId);
            formik.setFieldValue('fuelGunId', selectedDailySell.fuelGunId);
        }
    }, [selectedDailySell]);

    console.log(formik.values, '---------------');
    // useEffect(() => {
    //     const current = Number(formik.values.currentMeterDegree);
    //     const old = Number(formik.values.oldMeterDegree);

    //     if (!isNaN(current) && !isNaN(old)) {
    //         formik.setFieldValue('soldFuelAmount', current - old);
    //     }
    // }, [formik.values.currentMeterDegree, formik.values.oldMeterDegree]);


    return (
        <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='xl' >
            <Modal.Header closeButton>
                <Modal.Title>{t('global.add', { name: t('dailyFuelSell.dailyFuelSell') })}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    {/* Name and DailyFuelSell Name Fields */}
                    <div className='row'>
                        {/* CurrentMeterDegree Field */}
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>
                                {t('dailyFuelSell.currentMeterDegree')} <span className='text-danger'>*</span>
                            </label>
                            <input
                                type='number'
                                placeholder="0"
                                {...formik.getFieldProps('currentMeterDegree')}
                                className={clsx('form-control', {
                                    'is-invalid': formik.touched.currentMeterDegree && formik.errors.currentMeterDegree,
                                    'is-valid': formik.touched.currentMeterDegree && !formik.errors.currentMeterDegree,
                                })}
                            />
                            {formik.touched.currentMeterDegree && formik.errors.currentMeterDegree && (
                                <div className='invalid-feedback'>
                                    {t('validation.required', { name: t('dailyFuelSell.currentMeterDegree') })}
                                </div>
                            )}
                        </div>
                        {/* OldMeterDegree Field */}
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>
                                {t('dailyFuelSell.oldMeterDegree')} <span className='text-danger'>*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="0"
                                {...formik.getFieldProps('oldMeterDegree')}
                                onChange={(e) => {
                                    const currentMeterValue = Number(formik.values.currentMeterDegree);
                                    const oldMeterValue = Number(e.target.value);

                                    formik.setFieldValue('oldMeterDegree', oldMeterValue);
                                    formik.setFieldValue('soldFuelAmount', currentMeterValue - oldMeterValue);
                                }}
                                className={clsx('form-control', {
                                    'is-invalid': formik.touched.oldMeterDegree && formik.errors.oldMeterDegree,
                                    'is-valid': formik.touched.oldMeterDegree && !formik.errors.oldMeterDegree,
                                })}

                            />
                            {formik.touched.oldMeterDegree && formik.errors.oldMeterDegree && (
                                <div className='invalid-feedback'>
                                    {t('validation.required', { name: t('dailyFuelSell.oldMeterDegree') })}
                                </div>
                            )}
                        </div>
                        {/* FuelUnitPrice Field */}
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>
                                {t('dailyFuelSell.fuelUnitPrice')} <span className='text-danger'>*</span>
                            </label>
                            <input
                                type='number'
                                placeholder="0"
                                {...formik.getFieldProps('fuelUnitPrice')}
                                onChange={(e) => {
                                    formik.setFieldValue('fuelUnitPrice', e.target.value)
                                    formik.setFieldValue('totalPrice', Number(formik.values.soldFuelAmount) * Number(e.target.value))
                                }}
                                className={clsx('form-control', {
                                    'is-invalid': formik.touched.fuelUnitPrice && formik.errors.fuelUnitPrice,
                                    'is-valid': formik.touched.fuelUnitPrice && !formik.errors.fuelUnitPrice,
                                })}
                            />
                            {formik.touched.fuelUnitPrice && formik.errors.fuelUnitPrice && (
                                <div className='invalid-feedback'>
                                    {t('validation.required', { name: t('dailyFuelSell.fuelUnitPrice') })}
                                </div>
                            )}
                        </div>
                        {/* Collected Money Amount Field */}
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>
                                {t('dailyFuelSell.collectedMoney')} <span className='text-danger'>*</span>
                            </label>
                            <input
                                type='number'
                                placeholder="0"
                                {...formik.getFieldProps('collectedMoney')}
                                className={clsx('form-control', {
                                    'is-invalid': formik.touched.collectedMoney && formik.errors.collectedMoney,
                                    'is-valid': formik.touched.collectedMoney && !formik.errors.collectedMoney,
                                })}
                            />
                            {formik.touched.collectedMoney && formik.errors.collectedMoney && (
                                <div className='invalid-feedback'>
                                    {t('validation.required', { name: t('dailyFuelSell.collectedMoney') })}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='row'>
                        {/* Date Field */}
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>
                                {t('global.date')} <span className='text-danger'>*</span>
                            </label>
                            <input
                                type='date'
                                {...formik.getFieldProps('date')}
                                className={clsx('form-control', {
                                    'is-invalid': formik.touched.date && formik.errors.date,
                                    'is-valid': formik.touched.date && !formik.errors.date,
                                })}
                            />
                            {formik.touched.date && formik.errors.date && (
                                <div className='invalid-feedback'>
                                    {t('validation.required', { name: t('global.date') })}
                                </div>
                            )}
                        </div>
                        {/* Note Field */}
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>
                                {t('dailyFuelSell.note')} <span className='text-danger'>*</span>
                            </label>
                            <textarea
                                rows={1}
                                {...formik.getFieldProps('note')}
                                className={clsx('form-control', {
                                    'is-invalid': formik.touched.note && formik.errors.note,
                                    'is-valid': formik.touched.note && !formik.errors.note,
                                })}
                            ></textarea>
                            {formik.touched.note && formik.errors.note && (
                                <div className='invalid-feedback'>
                                    {t('validation.required', { name: t('dailyFuelSell.note') })}
                                </div>
                            )}
                        </div>
                        {/* SoldFuelAmount Field */}
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>
                                {t('dailyFuelSell.soldFuelAmount')} <span className='text-danger'>*</span>
                            </label>
                            <input
                                type='number'
                                placeholder="0"
                                readOnly
                                {...formik.getFieldProps('soldFuelAmount')}
                                className='form-control'
                            />
                        </div>
                        {/* Total Price Field */}
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>
                                {t('dailyFuelSell.totalPrice')} <span className='text-danger'>*</span>
                            </label>
                            <input
                                type='number'
                                placeholder="0"
                                readOnly
                                {...formik.getFieldProps('totalPrice')}
                                className='form-control'
                            />
                            {formik.touched.totalPrice && formik.errors.totalPrice && (
                                <div className='invalid-feedback'>
                                    {t('validation.required', { name: t('dailyFuelSell.totalPrice') })}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Submit Buttons */}
                    <div className='text-end'>
                        <Button variant='danger' onClick={onClose} className='me-2 '>
                            {t('global.BACK')}
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "..." : mode === "send" ? (
                                t('global.SAVE')
                            ) : (
                                t('global.Update')
                            )}
                        </Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal >
    )
}

export default CreateDailyFuelSellModal
