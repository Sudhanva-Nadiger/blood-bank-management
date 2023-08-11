import React from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from 'antd'

import ProtectedPage from '../../components/ProtectedPage'
import Inventory from './Inventory'
import Donars from './Donars'
import Hospital from './Hospital'
import Organizations from './Organization'

const Profile = () => {
    const { currentUser } = useSelector(state => state.users)
    return (
        <ProtectedPage>
            <div>
                <Tabs>
                    {
                        currentUser?.userType === 'organization' ? (
                            <>
                                <Tabs.TabPane tab='Inventory' key='1'>
                                    <Inventory />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Donars' key='2'>
                                    <Donars />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Hospitals' key='3'>
                                    <Hospital />
                                </Tabs.TabPane>
                            </>
                        ) : (
                            <>
                                <Tabs.TabPane tab='Donations' key='4'>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab='Organizations' key='5'>
                                    <Organizations />
                                </Tabs.TabPane>
                            </>
                        )
                    }
                </Tabs>
            </div>
        </ProtectedPage>
    )
}

export default Profile