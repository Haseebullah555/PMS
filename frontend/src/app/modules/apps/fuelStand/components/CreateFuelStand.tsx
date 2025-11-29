import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { initialValues } from './_module'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'

import { toast } from 'react-toastify'
import { storeFuelStand } from '../../../../../redux/slices/fuelStand/FuelStandSlice'
import { getStaff, getStaffsList } from '../../../../../redux/slices/staff/StaffSlice'
import { getAllFuelType, getFuelTypes } from '../../../../../redux/slices/fuelType/FuelTypeSlice'

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
  const staffs = useAppSelector((state) => state.staffs.allStaffs)
  const fuelTypes = useAppSelector((state: any) => state.fuelType.fuelTypeAllList)
  // Form Validation Schema
  const FuelStandSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    staffId: Yup.number().required("Required"),
    fuelGuns: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().required("Required"),
          fuelTypeId: Yup.number().required("Required"),
          quantity: Yup.number().required("Required")
        })
      )
      .min(1, "At least one fuel gun is required"),
  })


  // Formik Hook
  const formik = useFormik({
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
    if (!staffs) {
      dispatch(getStaffsList())
        .then((res) => {
          console.log(res, "hiiiiiiiiiiiiiiiii")
        })
        .catch((err) => {
          console.log(err)
        })
    }
    if (!fuelTypes) {
      dispatch(getAllFuelType())
        .then((res) => {
          console.log(res, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])
  console.log(staffs, "lkdjflsjfskldflsdf144444444444");
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.add', { name: t('fuelStand.fuelStands') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and FuelStand Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
              <div className='row'>
                {/* Name Field */}
                <div className='col-md-6 mb-3'>
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
                {/* Name Field */}

                <div className='col-md-6 mb-3'>
                  <label className='form-label'>
                    {t('staff.staff')}
                  </label>
                  <select
                    name="staffId"
                    value={formik.values.staffId ?? ""}
                    onChange={(e) => {
                      formik.setFieldValue(`staffId`, Number(e.target.value))
                    }}
                    className="form-select"
                  >
                    <option value="" disabled selected>
                      {t('global.SELECT.OPTION')}
                    </option>
                    {
                      staffs?.map((s: any) => (
                        <option key={s.id} value={s.id}>{s.fullName}</option>
                      ))
                    }
                  </select>
                  {formik.touched.staffId && formik.errors.staffId && (
                    <div className='invalid-feedback'>
                      {t('validation.required', { name: t('staff.staff') })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Fuel Guns Section */}
          <div className="mt-4">
            <h5>{t("fuelStand.fuelGuns")}</h5>

            {formik.values.fuelGuns.map((gun, index) => (
              <div key={index} className="border rounded p-3 mb-3">

                <div className="row">
                  {/* Gun Name */}
                  <div className="col-md-4 mb-3">
                    <label>{t("fuelGun.name")} *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={gun.name}
                      onChange={(e) =>
                        formik.setFieldValue(`fuelGuns[${index}].name`, e.target.value)
                      }
                    />
                  </div>

                  {/* Fuel Type */}
                  <div className="col-md-4 mb-3">
                    <label>{t("fuelGun.fuelType")} *</label>
                    <select
                      className="form-select"
                      value={gun.fuelTypeId}
                      onChange={(e) =>
                        formik.setFieldValue(`fuelGuns[${index}].fuelTypeId`, Number(e.target.value))
                      }
                    >
                      <option value="">{t("global.SELECT.OPTION")}</option>
                      {fuelTypes?.data?.map((f: any) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="col-md-4 mb-3">
                    <label>{t("fuelGun.quantity")} *</label>
                    <input
                      type="number"
                      className="form-control"
                      value={gun.quantity}
                      onChange={(e) =>
                        formik.setFieldValue(`fuelGuns[${index}].quantity`, Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                {/* Remove Gun Button (only show if more than 1 gun) */}
                {formik.values.fuelGuns.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger mt-2"
                    onClick={() => {
                      const updated = [...formik.values.fuelGuns]
                      updated.splice(index, 1)
                      formik.setFieldValue("fuelGuns", updated)
                    }}
                  >
                    {t("global.DELETE")}
                  </button>
                )}
              </div>
            ))}

            {/* Add More Gun Button */}
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                formik.setFieldValue("fuelGuns", [
                  ...formik.values.fuelGuns,
                  { name: "", fuelTypeId: "", quantity: "" }
                ])
              }
            >
              {t("global.ADD.MORE")}
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
