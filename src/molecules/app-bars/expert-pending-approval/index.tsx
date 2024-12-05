import React from 'react'
import AppBarCommon from '../../app-bar-common'

const ExpertPendingApprovalHeader = () => {
    return (
        <AppBarCommon
            title={"Pending Edits"}
            isSearch={false}
            isUserIcon
            isIconDefine={false}
            isSidebar
        />
    )
}

export default ExpertPendingApprovalHeader