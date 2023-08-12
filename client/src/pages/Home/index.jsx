import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { message } from 'antd'

import { GetAllBloodGroupsInventory } from '../../apicalls/dashboard'
import ProtectedPage from '../../components/ProtectedPage'
import { SetLoading } from '../../redux/loaderSlice'
import { getLoggedInUsername } from '../../utils/helper'

const Home = () => {
	const { currentUser } = useSelector(state => state.users)
	const [bloodGroupData, setBloodGroupData] = useState([])
	const dispatch = useDispatch()
	const getData = useCallback(async () => {
		try {
			dispatch(SetLoading(true))
			const response = await GetAllBloodGroupsInventory()
			dispatch(SetLoading(false))
			if (response.success) {
				setBloodGroupData(response.data)
			} else {
				throw new Error(response.message)
			}
		} catch (error) {
			message.error(error.message)
			dispatch(SetLoading(false))
		}
	}, [dispatch])

	useEffect(() => {
		getData()
	}, [getData])

	// array of 8 random light/bitdark colors with no simalarity in colors
	const colors = ['#FF6633', '#FFB399', '#FF33FF', '#F33999', '#00B3E6', '#E6B333', '#3366E6', '#999966']

	// blood groups
	const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

	// create a map with key as blood group and value as a object with totalIn and totalOut from blood group data
	const bloodGroupMap = new Map()
	bloodGroupData.forEach((item, index) => {
		const { _id, totalIn, totalOut } = item
		bloodGroupMap.set(_id, { totalIn, totalOut })
	})

	return (
		<ProtectedPage>
			<div>
				<span className="text-primary text-2xl">
					Welcome {getLoggedInUsername(currentUser)}
				</span>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-5">
					{
						bloodGroups.map((item, index) => {
							let details = bloodGroupMap.get(item)
							let totIn = details?.totalIn || 0
							let totOut = details?.totalOut || 0
							let available = Math.max(totIn - totOut, 0)

							return <div
								key={item}
								style={{
									backgroundColor: colors[index],
								}}
								className={'text-white text-center p-5 flex justify-between mt-5 rounded bg-gradient-to-br'}
							>
								<h1 className='text-4xl uppercase'>{item}</h1>

								<div className="flex flex-col justify-between">
									<div className="justify-between flex gap-5">
										<span>Total In</span>
										<span>{totIn} ML</span>
									</div>
									<div className="justify-between flex gap-5">
										<span>Total Out</span>
										<span>{totOut} ML</span>
									</div>
									<div className="justify-between flex gap-5">
										<span>Available</span>
										<span>{available} ML</span>
									</div>
								</div>
							</div>
						})
					}
				</div>
			</div>
		</ProtectedPage>
	)
}

export default Home