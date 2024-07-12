import React from 'react'

import { adminConfig } from '../../../config/adminConfig'
import CarForm from './CarForm'

export default function ViewCar() {
  return (
    <CarForm formState={adminConfig.formState.view} />
  )
}
