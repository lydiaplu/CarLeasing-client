import React from 'react'

import { adminConfig } from '../../../config/adminConfig';
import CarBrandForm from './CarBrandForm';

export default function ViewCarBrand() {
    return (
        <CarBrandForm formState={adminConfig.formState.view} />
    )
}
