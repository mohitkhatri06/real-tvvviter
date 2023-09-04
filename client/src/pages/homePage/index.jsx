import { Box, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from '../../pages/navbar';
import UserWidget from '../../pages/widgets/UserWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import PostsWidget from '../../pages/widgets/PostsWidget';
import FollowerListWidget from '../widgets/FollowerListWidget';
import FollowingListWidget from '../widgets/FollowingListWidget';

const HomePage = () => {
   const isNonMobileScreens = useMediaQuery('(min-width:1000px)');
   const { _id, picturePath } = useSelector((state) => state.user);

   return (
      <Box>
         <Navbar />
         <Box
            width='100%'
            padding='2rem 6%'
            display={isNonMobileScreens ? 'flex' : 'block'}
            gap='0.5rem'
            justifyContent='space-between'
         >
            <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
               <UserWidget userId={_id} picturePath={picturePath} />
            </Box>
            <Box
               flexBasis={isNonMobileScreens ? '42%' : undefined}
               mt={isNonMobileScreens ? undefined : '2rem'}
            >
               <MyPostWidget picturePath={picturePath} />
               <PostsWidget userId={_id} />
            </Box>
            {isNonMobileScreens && (
               <Box flexBasis='26%'>
                  {/* <Box m='2rem 0' /> */}
                  <FollowerListWidget userId={_id} />
                  <Box m='2rem 0' />
                  <FollowingListWidget userId={_id} />
               </Box>
            )}
         </Box>
      </Box>
   );
};

export default HomePage;