import React from 'react'
import AppBarCommon from '../../app-bar-common';

const ExpertProjectHeader = () => {
    return (
        <AppBarCommon
            title="Projects"
            isSearch={false}
            isUserIcon
            onAddIconClick={() => { }}
            isToggle={false}
            // toggleOptions={["card", "list"]}
            // selectedToggleOption="card"
            // onToggleOptionChange={() => { }}
            isIconDefine={false}
        />
    )
}

export default ExpertProjectHeader