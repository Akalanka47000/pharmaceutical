import { useEffect, useState } from 'react'
import { Pagination } from 'flowbite-react'
import { debounce } from 'lodash'
import { Button, Filters, NoRecords, Sorts } from '../components/common'
import { default as Layout } from '../components/layout'
import { User } from '../components/users'
import { getAllUsers } from '../services/user'
import { userFilters, userSorts } from '../filters'

const Users = () => {
    const [userRes, setUserRes] = useState(null)
    const [page, setPage] = useState(1)
    const [filterQuery, setFilterQuery] = useState('')
    const [sortQuery, setSortQuery] = useState('')

    const [showUserModal, setShowUserModal] = useState(false)

    const refresh = debounce(() => {
        getAllUsers(filterQuery, sortQuery, page).then((res) => {
            if (res.success) {
                setUserRes(res.data)
            }
        })
    }, 300)

    useEffect(() => {
        refresh()
    }, [page, filterQuery, sortQuery])

    return (
        <Layout title="Bashaway | Users">
            <div className="w-screen min-h-screen flex flex-col justify-center items-center">
                {
                    userRes && (
                        <>
                            <div className="w-10/12 flex flex-col justify-center items-start mt-24 mb-5">
                                <Filters filters={userFilters} setFilterQuery={setFilterQuery} />
                                <Sorts sorts={userSorts} setSortQuery={setSortQuery} />
                            </div>
                            <div className='w-10/12 flex justify-end items-center mb-6'>
                                <Button
                                    className="px-12 py-2 font-semibold md:text-xl focus:outline-none focus:ring focus:ring-offset-1 bg-white focus:ring-black focus:ring-opacity-10"
                                    onClick={() => {
                                        setShowUserModal(true)
                                    }}
                                >
                                    Add User
                                </Button>
                            </div>
                            <div className="w-10/12 min-h-screen flex flex-col justify-between items-center mb-16">
                                <div className="w-full h-full flex flex-col justify-start items-center gap-y-6">
                                    {userRes.docs?.length > 0 ? (
                                        userRes.docs?.map((user) => {
                                            return (
                                                <div key={`user-list-${user._id}`} className="w-full flex justify-center items-center">
                                                    <User user={user} refresh={refresh} />
                                                </div>
                                            )
                                        })
                                    ) : (
                                        <NoRecords text="No Users Found" className="mt-12" />
                                    )}
                                </div>
                                <div className="w-full flex justify-end items-center mt-4 md:mt-0">
                                    <Pagination
                                        currentPage={page}
                                        onPageChange={(newPage) => {
                                            setPage(newPage)
                                        }}
                                        showIcons={true}
                                        totalPages={userRes.totalPages}
                                    />
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
            {/* <UserModal show={showUserModal} setShow={setShowUserModal} refresh={refresh} /> */}
        </Layout>
    )
}

export default Users
