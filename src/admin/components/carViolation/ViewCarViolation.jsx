import React from 'react'

import { adminConfig } from '../../../config/adminConfig';
import CarViolationForm from './CarViolationForm'

export default function ViewCarViolation() {
    return (
        <CarViolationForm formState={adminConfig.formState.view} />
    )
}
