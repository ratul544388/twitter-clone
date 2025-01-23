import { PageHeader } from '@/components/page-header'
import { Metadata } from 'next'
import React from 'react'
import { Notifications } from './notifications'

export const generateMetadata = (): Metadata => {
    return {
        title: "Notifications"
    }
}

const Page = () => {
  return (
    <>
      <PageHeader label='Notifications' backButtonUrl='/'/>
      <Notifications/>
    </>
  )
}

export default Page
