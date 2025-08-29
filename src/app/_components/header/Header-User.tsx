'use client';

import { useSessionStore } from '@/stores/auth.store';
import Link from 'next/link';
import Button from '../button/Button';
import { signoutAction } from '@/actions/auth';
const HeaderUserSection = () => {

    const {session , status , updateSession , clearSession} = useSessionStore();


    async function handleSignout(){
      await signoutAction();
      clearSession();
      updateSession();
    }

    if(status === 'loading') return(
        <p>
            Loading
        </p>
    )

    return (
      <>
        {session ? (
          <div className="flex flex-col md:flex-row-reverse items-center gap-4">
            <p>{session.mobile}</p>

            <Button onClick={handleSignout} className="" variant="error">
              خروج
            </Button>
          </div>
        ) : (
          <Link href="/signin">ورود یا ثبت نام</Link>
        )}
      </>
    );
}

export default HeaderUserSection;