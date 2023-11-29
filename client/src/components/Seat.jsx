import { CheckIcon } from '@heroicons/react/24/outline'
import { memo, useState } from 'react'
import { MdEventSeat } from "react-icons/md";
import { PiArmchairDuotone } from "react-icons/pi";

const Seat = ({ seat, setSelectedSeats, selectable, selectedSeats, isAvailable, isLimitExceeded }) => {
	const [isSelected, setIsSelected] = useState(false)
	return (!isAvailable || (isLimitExceeded && !selectedSeats.includes(`${seat.row}${seat.number}`)))? (
		<PiArmchairDuotone
			title={`${seat.row}${seat.number}`}
			className="flex h-8 w-8 cursor-not-allowed items-center justify-center transform scale -x-[-1]"
		>
			<div className="h-6 w-6 rounded-full bg-gray-500 drop-shadow-md"></div>
		</PiArmchairDuotone>
	) : isSelected ? (
		<PiArmchairDuotone
			title={`${seat.row}${seat.number}`}
			className="flex h-8 w-8 items-center justify-center transform scale -x-[-1]"
			onClick={() => {
				setIsSelected(false)
				setSelectedSeats((prev) => prev.filter((e) => e !== `${seat.row}${seat.number}`))
				console.log(selectedSeats)
			}}
		>
			<div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 drop-shadow-md">
				<CheckIcon className="h-5 w-5 stroke-[3] text-white" />
			</div>
		</PiArmchairDuotone>
	) : (
		<PiArmchairDuotone
			title={`${seat.row}${seat.number}`}
			className={`flex h-8 w-8 items-center justify-center ${!selectable && 'cursor-not-allowed'} transform scale -x-[-1]`}
			onClick={() => {
				if (selectable) {
					setIsSelected(true)
					setSelectedSeats((prev) => [...prev, `${seat.row}${seat.number}`])
					console.log(selectedSeats)
				}
			}}
		>
			<div className="h-6 w-6 rounded-full bg-white drop-shadow-md"></div>
		</PiArmchairDuotone>
		
	)
}

export default memo(Seat)
