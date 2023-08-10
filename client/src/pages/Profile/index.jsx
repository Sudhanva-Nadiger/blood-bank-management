import React from 'react'
import { useSelector } from 'react-redux'
import ProtectedPage from '../../components/ProtectedPage'
import { Tabs } from 'antd'

const Profile = () => {
    const { currentUser } = useSelector(state => state.users)
    return (
        <ProtectedPage>
            <div>
                <Tabs>
                    {
                        currentUser.userType === 'organization' && (
                            <>
                                <Tabs.TabPane tab='Inventory' key='1'></Tabs.TabPane>
                                <Tabs.TabPane tab='Donars' key='2'></Tabs.TabPane>
                                <Tabs.TabPane tab='Hospitals' key='3'></Tabs.TabPane>
                            </>
                        )
                    }
                </Tabs>
            </div>
        </ProtectedPage>
    )
}

export default Profile