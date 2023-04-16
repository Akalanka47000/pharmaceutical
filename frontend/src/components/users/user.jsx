import { useState } from 'react';
import { IoStar } from 'react-icons/io5'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { toast } from "react-toastify";
import { updateUser } from '../../services'


const User = ({ user, refresh }) => {

    const [isDetailsSectionOpen, setIsDetailsSectionOpen] = useState(false)

    const toggleActiveState = async () => {
        await updateUser(user._id, { is_active: !user.is_active }).then((res) => {
            if (res.success) {
                toast.success(`User ${user.is_active ? 'deactivated' : 'activated'} successfully`)
                refresh()
            }
        })
    }

    return (
        <div className="w-full items-center bg-card/30 shadow-md border rounded-md overflow-hidden my-4 px-3 py-6 md:px-6 md:py-8 grid md:grid-cols-5 relative" style={{
            border: `1px solid ${user.is_active ? '#ffffff26' : '#ff000045'}`
        }}>
            <div className="md:col-span-4">
                <div className="flex items-center ">
                    <IoStar className="text-white" />
                    <h3 className="ml-2 text-md md:text-lg text-white">{user.name}</h3>
                </div>
                <div className="flex flex-row gap-x-6 gap-y-2 flex-wrap text-xs text ml-6 mt-4 mb-3 text-gray-400">
                    <p className='w-full sm:w-1/2 2xl:w-1/4'>Email&nbsp; - <span className='ml-1'>{user.email}</span></p>
                    <p className='w-full sm:w-5/12 2xl:w-2/12'>Type&nbsp; - <span className='ml-1 text-primary'>{user.role === 'ADMIN' ? 'Admin' : 'Competitor'}</span></p>
                    {
                        user.role === 'GROUP' && <>
                            <p className='w-full sm:w-1/2 2xl:w-1/4'>University&nbsp; - <span className='ml-1 text-primary'>{user.university}</span></p>
                            <p className='w-full sm:w-5/12 2xl:w-2/12'>Score&nbsp; - <span className='ml-1 text-primary'>{user.score || 0}</span></p>
                        </>
                    }
                </div>
                {
                    user.role === 'GROUP' && <>
                        <div className='w-fit flex justify-start items-center ml-6 text-sm text-white cursor-pointer hover:text-primary transition duration-300' onClick={() => setIsDetailsSectionOpen(!isDetailsSectionOpen)} >
                            <span className=''>{isDetailsSectionOpen ? 'Hide' : 'Show'} Member Details</span>
                            {isDetailsSectionOpen ? <TiArrowSortedUp className='ml-2 mt-0.5 h-6 w-6' /> : <TiArrowSortedDown className='ml-2 mt-0.5 h-6 w-6' />}
                        </div>
                        <div className={`mt-4 ${isDetailsSectionOpen ? 'h-auto' : 'h-0 opacity-0 pointer-events-none'} transition duration-600`}>
                            {
                                user.members?.map((member, index) => (<div key={`${user.name}-${member.email}-${index}`} className="flex flex-row gap-x-6 gap-y-2 flex-wrap text-xs text ml-6 mt-4 mb-1 text-gray-400">
                                    <p className='w-full md:w-1/2 lg:w-3/12'>Name&nbsp; - <span className='ml-1'>{member.name}</span></p>
                                    <p className='w-full md:w-1/2 lg:w-3/12'>Email&nbsp; - <span className='ml-1 text-primary'>{member.email}</span></p>
                                    <p className='w-full md:w-1/2 lg:w-2/12'>Phone&nbsp; - <span className='ml-1 text-primary'>{member.phone}</span></p>
                                    <p className='w-full md:w-1/2 lg:w-1/12'>Year&nbsp; - <span className='ml-1 text-primary'>{member.academic_year}</span></p>
                                </div>))
                            }
                        </div>
                    </>
                }
            </div>
            <div className="flex mt-4 ml-6 items-center md:justify-end mr-8 sm:ml-6 sm:mt-4 md:col-span-1 md:mt-0 md:ml-0 ">
                <span className={`w-44 px-6 py-2 font-semibold sm:text-xl cursor-pointer ${user.is_active ? 'bg-red-500 hover:border-red-500' : 'bg-primary hover:border-primary'} hover:bg-black hover:border border-transparent text-white text-center rounded-md transition-all duration-300`} onClick={toggleActiveState}>
                    {user.is_active ? 'Deactivate' : 'Activate'}
                </span>
            </div>
            {!user.is_active && <div className='absolute top-0 left-0 w-full h-full bg-red-400 flex justify-center items-center opacity-10 pointer-events-none' />}
        </div>
    )
}

export default User
