import {
  Register,
  IServerSideProps as IRegisterServerSideProps,
  IGetServerSideProps
} from '../register';
import { prisma } from '../../lib/prisma';
import { getUser } from '../../lib/user';

type IServerSideProps = Pick<IRegisterServerSideProps, 'userCount'>;


function ChangePassword({ userCount }: IServerSideProps) {
  return <Register
    user={null}
    userCount={userCount}
  />
}

// This gets called on every request
export async function getServerSideProps({ req }: IGetServerSideProps) {

  const userCount = await prisma.user.count();
  // FIXME When clicking the change password link in an email, user is always null because authentication cookie isn't visible for few miliseconds when redirecting from external website. 
  const user = await getUser(req, prisma);

  // If user is logged in this page cannot be viewed.
  if (user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      userCount,
    }
  }
}

export default ChangePassword;