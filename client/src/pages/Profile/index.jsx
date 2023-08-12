import React from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from 'antd'

import ProtectedPage from '../../components/ProtectedPage'
import Inventory from './Inventory'
import Donars from './Donars'
import Hospital from './Hospital'
import Organizations from './Organization'
import InventoryTable from '../../components/InventoryTable'

const Profile = () => {
    const { currentUser } = useSelector(state => state.users)
    return (
        <ProtectedPage>
            <div>
                <Tabs>
                    {
                        currentUser?.userType === 'organization' && (
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
                        )
                    } {
                        currentUser?.userType === 'donar' && 
                            (
                                <>
                                    <Tabs.TabPane tab='Donations' key='4'>
                                        <InventoryTable filters={{
                                            donar: currentUser._id,
                                            inventoryType: 'in'
                                        }} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab='Organizations' key='5'>
                                        <Organizations userType={'donar'} />
                                    </Tabs.TabPane>
                                </>
                            )
                            
                    } {
                        currentUser?.userType === 'hospital' && 
                            (
                                <>
                                    <Tabs.TabPane tab='Consumptions' key='6'>
                                        <InventoryTable filters={{
                                            hospital: currentUser._id,
                                            inventoryType: 'out'
                                        }} />
                                    </Tabs.TabPane>
                                    <Tabs.TabPane tab='Organizations' key='7'>
                                        <Organizations userType='hospital' />
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