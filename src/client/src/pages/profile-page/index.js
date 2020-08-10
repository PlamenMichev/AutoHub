import React, { useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import usersService from '../../services/api/users';

const ProfilePage = (props) => {

    useEffect(() => {
        const pathname = props.location.pathname;
        const id = pathname.substring(pathname.lastIndexOf('/') + 1);

        async function fetchUser() {
            await usersService.getUser(id);
        }
        fetchUser();
    }, [])

    return (
        <PageLayout>
            <h1>This is the profile of</h1>
        </PageLayout>
    )
}

export default ProfilePage;