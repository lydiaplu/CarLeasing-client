import React from 'react'
import { adminConfig } from '../../../config/adminConfig'
import CarTypeForm from './CarTypeForm'

export default function ViewCarType() {
  return (
    <CarTypeForm formState={adminConfig.formState.view} />
  )
}
