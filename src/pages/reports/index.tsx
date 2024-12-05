import React from 'react'
import PageLayout from '../../atoms/page-layout'
import ReportsPageHeader from '../../molecules/app-bars/reports-page'
import ReportList from '../../organisms/reports-page'

const Reports = () => {
    return (
        <PageLayout>
            <ReportsPageHeader />
            <ReportList />
        </PageLayout>
    )
}

export default Reports