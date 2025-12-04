import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { Button, Modal } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { toast } from 'react-toastify'
import { updateFuelStand } from '../../../../../redux/slices/fuelStand/FuelStandSlice'
import { initialValues } from './_module'
import { name } from '../../../../custom/persian_fa'
import { getAllFuelType } from '../../../../../redux/slices/fuelType/FuelTypeSlice'

interface EditFuelStandModalProps {
  isOpen: boolean
  onClose: () => void
  selectedFuelStand: any // Type it as appropriate based on your data structure
  handleReloadTable: () => void
}

const EditFuelStandModal: React.FC<EditFuelStandModalProps> = ({
  isOpen,
  onClose,
  selectedFuelStand,
  handleReloadTable,
}) => {
  const intl = useIntl()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [roles, setRoles] = useState([])
  const fuelTypes = useAppSelector((state: any) => state.fuelType.fuelTypeAllList)
  // Populate form with user data when `selectedFuelStand` changes
  useEffect(() => {
    if (selectedFuelStand) {
      const fuelGuns = selectedFuelStand.fuelGuns?.length
        ? selectedFuelStand.fuelGuns.map((d) => ({
          fuelTypeId: d.fuelTypeId || 0,
          name: d.name || "",
        }))
        : [
          {
            fuelTypeId: 0,
            name: "",
          },
        ];

      formik.setValues({
        id: selectedFuelStand.id || null,
        name: selectedFuelStand.name || "",
        fuelGuns: fuelGuns
      });
    }
  }, [selectedFuelStand]);


  // Validation schema
  const userSchema = Yup.object().shape({
    expenseType: Yup.string().required(t('validation.required', { name: t('expense.expenseType') })),
    notes: Yup.string().required(t('validation.required', { name: t('global.expenseDate') })),
    amount: Yup.string()
      .required(t('validation.required', { name: t('global.phone') }))
  })

  // Formik setup
  const formik = useFormik({
    initialValues,
    validationSchema: userSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await dispatch(updateFuelStand(values) as any)
        if (updateFuelStand.fulfilled.match(response)) {
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
    console.error('Error creating department:', error.message)
  }
    useEffect(() => {
      if (!fuelTypes) {
        dispatch(getAllFuelType())
          .then((res) => { })
          .catch((err) => {
            console.log(err)
          })
      }
    }, [])
  return (
    <Modal show={isOpen} onHide={onClose} backdrop='static' keyboard={false} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{t('global.edit', { name: t('fuelStand.fuelStands') })}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          {/* Name and FuelStand Name Fields */}
          <div className='row'>
            <div className='col-md-12'>
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
          </div>
          {/* Fuel Guns Section */}
          <div className="mt-4">
            <h5>{t("fuelGun.fuelGuns")}</h5>

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
                    <label>{t("fuelType.fuelType")} *</label>
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
                  <div className='col-md-4 mt-5'>
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
                        <i className="fas fa-trash"></i>
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
                  { name: "", fuelTypeId: "" }
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

export default EditFuelStandModal
