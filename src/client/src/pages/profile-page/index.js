import React, { useEffect, useState } from 'react';
import PageLayout from '../../components/page-layout';
import usersService from '../../services/api/users';
import { Spinner } from 'react-bootstrap';
import PageHeader from '../../components/page-header';
import UserInfo from '../../components/user-info';
import UserAds from '../../components/user-ads';

const ProfilePage = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const pathname = props.location.pathname;
        const id = pathname.substring(pathname.lastIndexOf('/') + 1);

        async function fetchUser() {
            const user = await usersService.getUser(id);
            setUser(user);
        }
        fetchUser();
    }, [])

    if (!user) {
        return (
        <PageLayout>
            <Spinner />
        </PageLayout>)
    }

    return (
        <PageLayout>
            <PageHeader title={`The profile of ${user.firstName} ${user.lastName}`} />
            <UserInfo 
                imageUrl={user.imageUrl} 
                email={user.email}
                phoneNumber={user.phoneNumber}
                />
            <hr />
            <UserAds ads={user.ads} />
        </PageLayout>
    )
}

export default ProfilePage;