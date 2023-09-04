import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFollowers, setFollowings } from '../state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import { useState, useEffect } from 'react';

const Follower = ({ followerId, name, subtitle, userPicturePath }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { _id } = useSelector((state) => state.user);
   const token = useSelector((state) => state.token);
   const followings = useSelector((state) => state.user.followings);

   const [followingSuccess, setFollowingSuccess] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const { palette } = useTheme();
   const primaryLight = palette.primary.light;
   const primaryDark = palette.primary.dark;
   const main = palette.neutral.main;
   const medium = palette.neutral.medium;

   const isFollowing = followings.find(
      (follower) => follower._id === followerId
   );

   const isSelf = followerId === _id;

   const patchFollower = async () => {
      setIsLoading(true);
      const response = await fetch(
         `${process.env.REACT_APP_API}/users/${_id}/${followerId}`,
         {
            method: 'PATCH',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
         }
      );
      const data = await response.json();
      dispatch(setFollowers({ followers: data }));
      setFollowingSuccess((followingSuccess) => !followingSuccess);
   };

   const getFollowingsHere = async () => {
      const response = await fetch(
         `${process.env.REACT_APP_API}/users/${_id}/followings`,
         {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
         }
      );
      const data = await response.json();
      dispatch(setFollowings({ followings: data }));
      setIsLoading(false);
   };
   useEffect(() => {
      getFollowingsHere();
   }, [followingSuccess]);

   return (
      <FlexBetween>
         <FlexBetween gap='1rem'>
            <UserImage image={userPicturePath} size='55px' />
            <Box
               onClick={() => {
                  navigate(`/profile/${followerId}`);
                  navigate(0);
               }}
            >
               <Typography
                  color={main}
                  variant='h5'
                  fontWeight='500'
                  sx={{
                     '&:hover': {
                        color: palette.primary.light,
                        cursor: 'pointer',
                     },
                  }}
               >
                  {name}
               </Typography>
               <Typography color={medium} fontSize='0.75rem'>
                  {subtitle}
               </Typography>
            </Box>
         </FlexBetween>
         {isSelf ? (
            ''
         ) : (
            <Button
               onClick={() => patchFollower()}
               sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
            >
               {isLoading ? (
                  <div>loading</div>
               ) : isFollowing ? (
                  <div sx={{ color: primaryDark }}>Unfollow</div>
               ) : (
                  <div sx={{ color: primaryDark }}>Follow</div>
               )}
            </Button>
         )}
      </FlexBetween>
   );
};

export default Follower;
