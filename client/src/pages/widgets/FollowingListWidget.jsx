import { Box, Typography, useTheme } from '@mui/material';
import Following from '../../components/Following';
import WidgetWrapper from '../../components/WidgetWrapper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowings } from '../../state';

const FollowingListWidget = ({ userId }) => {
   const dispatch = useDispatch();
   const { palette } = useTheme();
   const token = useSelector((state) => state.token);
   const followings = useSelector((state) => state.user.followings);

   const getFollowings = async () => {
      const response = await fetch(
         `${process.env.REACT_APP_API}/users/${userId}/followings`,
         {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
         }
      );
      const data = await response.json();
      dispatch(setFollowings({ followings: data }));
   };

   useEffect(() => {
      getFollowings();
   }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

   return (
      <WidgetWrapper>
         <Typography
            color={palette.neutral.dark}
            variant='h5'
            fontWeight='500'
            sx={{ mb: '1.5rem' }}
         >
            Following List
         </Typography>
         <Box display='flex' flexDirection='column' gap='1.5rem'>
            {followings.map((following) => (
               <Following
                  key={following._id}
                  followingId={following._id}
                  name={`${following.firstName} ${following.lastName}`}
                  userPicturePath={following.picturePath}
               />
            ))}
         </Box>
      </WidgetWrapper>
   );
};

export default FollowingListWidget;
