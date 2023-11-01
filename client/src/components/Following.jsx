import { PersonAddOutlined, PersonRemoveOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFollowings } from '../state';
import FlexBetween from './FlexBetween';
import UserImage from './UserImage';
import ReactGA from 'react-ga4';
import { useState, useEffect } from 'react';

const Following = ({ followingId, name, subtitle, userPicturePath }) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { _id } = useSelector((state) => state.user);
   const token = useSelector((state) => state.token);
   const followings = useSelector((state) => state.user.followings);

   const { palette } = useTheme();
   const primaryLight = palette.primary.light;
   const primaryDark = palette.primary.dark;
   const main = palette.neutral.main;
   const medium = palette.neutral.medium;

   const isFollowing = followings.find(
      (following) => following._id === followingId
   );

   console.log('isfollwoing', isFollowing);

   const patchFollowing = async () => {
      const response = await fetch(
         `${process.env.REACT_APP_API}/users/${_id}/${followingId}`,
         {
            method: 'PATCH',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
         }
      );
      const data = await response.json();
      dispatch(setFollowings({ followings: data }));
      ReactGA.event({
         category: 'Button Click',
         action: 'Following Set clicked',
         label: 'Following panel',
      });
   };

   return (
      <FlexBetween>
         <FlexBetween gap='1rem'>
            <UserImage image={userPicturePath} size='55px' />
            <Box
               onClick={() => {
                  navigate(`/profile/${followingId}`);
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
         <Button
            onClick={() => patchFollowing()}
            sx={{ backgroundColor: primaryLight, p: '0.6rem' }}
         >
            {isFollowing ? (
               <div sx={{ color: primaryDark }}>Unfollow</div>
            ) : (
               <div sx={{ color: primaryDark }}>Follow</div>
            )}
         </Button>
      </FlexBetween>
   );
};

export default Following;
