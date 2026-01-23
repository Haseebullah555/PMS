import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { FuelStandForm, initialValues } from './_module'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'

import { toast } from 'react-toastify'
import { storeFuelStand } from '../../../../../redux/slices/fuelStand/FuelStandSlice'
import { getAllFuelType, getFuelTypes } from '../../../../../redux/slices/fuelType/FuelTypeSlice'
import { getStaffsList } from '../../../../../redux/slices/staff/StaffSlice'

// Define the props for the modal
interface CreateFuelStandModalProps {
  isOpen: boolean
  onClose: () => void
  handleReloadTable: () => void
}

const CreateFuelStandModal: React.FC<CreateFuelStandModalProps> = ({ isOpen, onClose, handleReloadTable }) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])

  const fuelTypes = useAppSelector((state: any) => state.fuelType.fuelTypeAllList)
  const staffs = useAppSelector((state: any) => state.staffs.allStaffs)
  // Form Validation Schema
  const FuelStandSchema = Yup.object().shape({
    name: Yup.string().required(t('validation.required', { name: t('fuelStand.fuelStand') })),
    fuelGuns: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required(t('validation.required', { name: t('fuelGun.fuelGun') })),
        })
      )
      .min(1, "At least one fuel gun is required"),
  })


  // Formik Hook
  const formik = useFormik<FuelStandForm>({
    initialValues,
    validationSchema: FuelStandSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(storeFuelStand(values) as any)
        if (storeFuelStand.fulfilled.match(response)) {
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
    console.error('Error creating fuelStand:', error.message)
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
    if (!staffs) {
      dispatch(getStaffsList())
        .then((res) => {
          console.log(res,"result")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])
  console.log(staffs, "fooooooooooooooooooooooooooooooooooooooo")
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} className='custom-modal'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('fuelStand.fuelStands') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and FuelStand Name Fields */}
          <div className='row'>
            <div className='col-md-12'></div>
            <div className='row'>
              {/* Name Field */}
              <div className='col-md-12 mb-3'>
                <label className='form-label'>
                  {t('fuelStand.name')} <span className='text-danger'>*</span>
                </label>
                <input
                  type='text'
                  {...formik.getFieldProps('name')}
                  className={clsx('form-control', {
                    'is-invalid': formik.touched.name && formik.errors.name,
                    'is-valid': formik.touched.name && !formik.errors.name,
                  })}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className='invalid-feedback'>
                    {t('validation.required', { name: t('fuelStand.name') })}
                  </div>
                )}
              </div>

             
            </div>
          </div>
          {/* Fuel Guns Section */}
          <div className="mt-4">
            <h5>{t("fuelGun.fuelGuns")}</h5>

            {formik.values.fuelGuns.map((gun, index) => (
              <div key={index} className="border rounded p-3 mb-3 bg-gray-200">

                <div className="row">
                  {/* Gun Name */}
                  <div className="col-md-10 mb-3">
                    <label className='form-label'>{t("fuelGun.name")} *</label>
                    <input
                      type="text"
                      className={clsx("form-control", {
                        "is-invalid":
                          (formik.touched.fuelGuns?.[index] as any)?.name &&
                          (formik.errors.fuelGuns?.[index] as any)?.name,
                        "is-valid":
                          formik.touched.fuelGuns?.[index]?.name &&
                          !(formik.errors.fuelGuns?.[index] as any)?.name,
                      })}
                      value={gun.name}
                      onChange={(e) =>
                        formik.setFieldValue(`fuelGuns[${index}].name`, e.target.value)
                      }
                      onBlur={formik.handleBlur}
                      name={`fuelGuns[${index}].name`}
                    />
                    {(formik.touched.fuelGuns?.[index] as any)?.name &&
                      (formik.errors.fuelGuns?.[index] as any)?.name && (
                        <div className="invalid-feedback">
                          {t('validation.required', { name: t('fuelGun.fuelGun') })}
                        </div>
                      )}
                  </div>
                  <div className='col-md-2 mt-8'>
                    {formik.values.fuelGuns.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger mt-2"
                        onClick={() => {
                          const updated = [...formik.values.fuelGuns]
                          updated.splice(index, 1)
                          formik.setFieldValue("fuelGuns", updated)
                        }}
                      >
                        <span className="fas fa-trash"></span>
                      </button>
                    )}
                  </div>
                  {/* Remove Gun Button (only show if more than 1 gun) */}
                </div>

              </div>
            ))}

            {/* Add More Gun Button */}
            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={() =>
                formik.setFieldValue("fuelGuns", [
                  ...formik.values.fuelGuns,
                  { name: "" }
                ])
              }
            >
              <span className="fas fa-plus"></span>
            </button>
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

export default CreateFuelStandModal
