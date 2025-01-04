import React from 'react'
import { adminConfig } from '../../../config/adminConfig'
import CarReviewForm from './CarReviewForm'

export default function ViewCarReview() {
  return (
    <CarReviewForm formState={adminConfig.formState.view} />
  )
}
