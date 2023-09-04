import User from '../models/User.js';

export const getUser = async (req, res) => {
   try {
      const { id } = req.params;
      const user = await User.findById(id).select('-password');
      res.status(200).json(user);
   } catch (err) {
      res.status(404).json({ message: err.message });
   }
};

export const getUserFollowers = async (req, res) => {
   try {
      const { id } = req.params;
      const user = await User.findById(id);

      const followers = await Promise.all(
         user.followers.map((id) => User.findById(id))
      );

      const formattedFollowers = followers.map(
         ({ _id, firstName, lastName, location, picturePath }) => {
            return { _id, firstName, lastName, location, picturePath };
         }
      );
      res.status(200).json(formattedFollowers);
   } catch (err) {
      res.status(404).json({ message: err.message });
   }
};

export const getUserFollowings = async (req, res) => {
   try {
      const { id } = req.params;
      const user = await User.findById(id);

      const followings = await Promise.all(
         user.followings.map((id) => User.findById(id))
      );

      const formattedFollowings = followings.map(
         ({ _id, firstName, lastName, location, picturePath }) => {
            return { _id, firstName, lastName, location, picturePath };
         }
      );
      res.status(200).json(formattedFollowings);
   } catch (err) {
      res.status(404).json({ message: err.message });
   }
};

export const addRemoveFollower = async (req, res) => {
   try {
      const { id, followerId } = req.params;
      const user = await User.findById(id);
      const follower = await User.findById(followerId);

      // if (user.followers.includes(followerId)) {
      //    user.followers = user.followers.filter((id) => id !== followerId);
      //    follower.followers = follower.followers.filter((id) => id !== id);
      // } else {
      //    user.followers.push(followerId);
      //    follower.followers.push(id);
      // }

      if (user.followings.includes(followerId)) {
         follower.followers = follower.followers.filter((id) => id !== id);
         user.followings = user.followings.filter((id) => id !== followerId);
      } else {
         user.followings.push(followerId);
         follower.followers.push(id);
      }

      await user.save();
      await follower.save();

      const followers = await Promise.all(
         user.followers.map((id) => User.findById(id))
      );

      const formattedFollowers = followers.map(
         ({ _id, firstName, lastName, location, picturePath }) => {
            return { _id, firstName, lastName, location, picturePath };
         }
      );

      res.status(200).json(formattedFollowers);
   } catch (err) {
      res.status(404).json({ message: err.message });
   }
};
