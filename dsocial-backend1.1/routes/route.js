const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createGroups,
  // uploadGroupsMedia,
  getAllGroups,
  changeGroupCoverPic,
  GroupJoin,
  LeaveGroup,
  // getAllJoinedGroup,
  getMyGroups,
  getGroupsDetailsById,
  sendGroupInvitationtoMultipleUser,
  GroupInvitationStatusChange,
  updateGroupInfo,
  changeGroupStatus,
  uploadGroupCoverPicMedia,
  sendGroupInvitation,
  groupInvitationFriendList,
} = require("../controller/groups/GroupController");
const {
  saveMainPostCommentReaction,
  reactionUserListsOfCommentsDirectPost,
} = require("../controller/Comments/CommentReactionController");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  checkCookie,
  logout,
} = require("../controller/Auth/AuthController");

const {
  createGender,
  editGenderName,
  getAllGenderName,
  updateGender,
  deleteGender,
} = require("../controller/MasterSetup/GenderController");

const { createLocation, searchLocation, listLocation, uploadLocationFile } = require("../controller/MasterSetup/LocationController");

const {
  updateProfile,
  changeOnlyProfilePic,
  uploadProPic,
  saveEducation,
  changePassword,
  saveHobbies,
  getUserHobbies,
  deleteHobbies,
  getEducationInfo,
  deleteEducation,
  changeOnlyCoverPic,
  deleteUser,
  lockYourProfile,
  unlockYourProfile,
  changeMobileNumber,
  editUserGender,
  updateUserGender,
  editUserEducationInfo,
  updateUserEducationInfo,
} = require("../controller/Profile/ProfileController");
const { createInterestType } = require("../controller/MasterSetup/InterestTypeController");
const { createReligion, getAllReligionName } = require("../controller/MasterSetup/ReligionController");
const { createHobbies, getAllHobbiesName } = require("../controller/MasterSetup/HobbiesController");
const { createInstituteType, getAllInstituteType } = require("../controller/MasterSetup/InstituteTypeController");
const { createInstitute, getAllInstitute, searchInstitute } = require("../controller/MasterSetup/InstituteController");
const {
  suggestionList,
  sendFriendRequest,
  isRequestOrFreind,
  friendList,
  friendRequestList,
  acceptFriendRequest,
  unFriendUser,
} = require("../controller/FriendsController");
const {
  createPostFeelings,
  getAllPostFeelings,
  getSearchFeelings,
} = require("../controller/MasterSetup/PostFeelingsController");
const {
  createPostActivity,
  getAllPostActivity,
  getSearchActivity,
} = require("../controller/MasterSetup/PostActivityController");
const {
  createPostSubActivity,
  getAllPostSubActivity,
  getAllPostSubActivityById,
} = require("../controller/MasterSetup/PostSubActivityController");
const { createPostAudience, getAllPostAudience } = require("../controller/MasterSetup/PostAudienceController");
const { body, validationResult } = require("express-validator");
const { auth } = require("../middleware/AuthMiddleware");
const User = require("../models/User");

const {
  savePost,
  uploadPostMedia,
  deleteAllUserPosts,
  getAllUserPostsIndividual,
  getAllUserPosts,
  getUsersLatestImageVideo,
  getViewPostSingleItem,
  deletePostByID,
  viewSingleMainPostWithComments,
  deleteSingleReplyComment,
  deleteSingleComment,
  getPostDetailsById,
  deletePostMediaById,
  editPost,
  updatePostPrivacy,
  updateAllPostPrivacy,
  singlePost,
  getUsersLatestImage,
  getUsersLatestStory,
  getAllUserPostsFnF,
  hideUnhidePost,
  getAllPostComment,
  getAllUserPostsPaginated
} = require("../controller/Posts/PostController");

const { getUserInfoByUsername, getAllUsers, getUserInfo, updateUserWebsite, updateUserBirthDate, updateUserNickName, updateUserAbout, updateUserRelationStatus, userUserLocation, upsertUserWebsite, deleteUserAbout, deleteUserRelationStatus, deleteUserLocation, deleteNickName, deleteUserWebsite } = require("../controller/UserController");
const {
  saveUserCommentByPost,
  getAllCommentsDirectPost,
  replyCommentByDirectPost,
  getCommentAndReplyCountForPost,
  saveReplyReplyComment1stChainByDirectPost,
  updateCommentsByDirectPost,
  getEditCommentByDirectPost,
  uploadCommentMedia,
  removeImageOrVideoFileCommentByDirectPost,
} = require("../controller/Comments/CommentController");

const {
  followerUnfollowerRequest,
  isFollower,
  userfollowerCount,
  followingList,
  followerList,
  unfollowUser,
} = require("../controller/FollowersController");
const {
  saveMainPostReaction,
  getAllMainPostReactions,
  reactionUserListsOfDirectPost,
} = require("../controller/Posts/PostReactionController");

const {
  saveStory,
  uploadSaveMedia,
  getStory,
  saveStoryView,
  showSingleStory,
  saveStoryReaction,
  deleteStory,
  getMergeStory,
  getAllUserStory,
} = require("../controller/Posts/StoryController");

const {
  publishReels,
  uploadReelsVideo,
  getAllUserReels,
  deleteAllUserReels,
  getUserReelById,
  deleteOwnUserReel,
  saveUserCommentByReel,
  getAllCommentsDirectReel,
  replyCommentByDirectReel,
  viewSingleReelWithComments,
  deleteSingleReplyCommentReel,
  deleteSingleCommentReel,
  getEditCommentByReelPost,
  updateCommentsByReelPost,
  saveMainReelPostCommentReaction,
  reactionUserListsOfCommentsReelPost,
  saveReelPostReaction,
  getAllIndividualUserReels,
  saveShareReelsCaptionPost,
} = require("../controller/Reels/ReelsController");

const {
  getAllUsersSpecificNotifications,
  seenAllUsersSpecificNotifications,
  unSeenAllNotifications,
  updateNotificationSeenStatus,
} = require("../controller/Notification/NotificationController");

const {
  createPages,
  uploadPagesMedia,
  followPage,
  getAllPages,
  getFollowedPages,
  unFollowedPages,
  getMyPages,
  getPagesDetails,
  updateSettings,
  sendPageInvitation,
  invitedPages,
  acceptInvitation,
  getPagesLatestImage,
  bookmarkPage,
  updatePageInfo,
  updateAddressInfo,
  saveSocialMediaLink,
  getSocialMedia,
  getAllFollowers,
  getPageAdmins,
  saveOrUpdatePageAdmin,
  removePageAdmin,
  deletePage,
  unLikePages,
  getFollowersById,
  updateFollowStatus,
} = require("../controller/Pages/PagesController");

const {
  savePagesPost,
  uploadPagePostMedia,
  getPagesPosts,
  changePagesCoverPic,
  changePagesProfilePic,
} = require("../controller/Pages/PagesPostController");

const {
  SaveGroupPost,
  UploadGroupPostMedia,
  getGroupPosts,
  getAllGroupsPosts,
  EditGroupPost,
  saveShareGroupPost,
  saveShareGroupPostCaptionPost,
  deleteGroupPostByID,
  viewSingleMainGroupPostWithComments,
  getAllGroupMainPostReactions,
  saveMainGroupPostReaction,
  reactionUserListsOfDirectGroupPost,
  getEditCommentByDirectGroupPost,
  reactionUserListsOfCommentsDirectGroupPost,
  deleteSingleGroupPostComment,
  deleteSingleReplyGroupPostComment,
  saveUserCommentByGroupPost,
  replyCommentByDirectGroupPost,
  updateCommentsByDirectGroupPost,
  saveMainGroupPostCommentReaction,
  getGroupResource,
  queryTestingController,
  groupMemberRemove,
} = require("../controller/groups/GroupPostController");

const {
  saveReviews,
  getPagesReviews,
  saveReactionOnReviews,
  saveUserCommentByReview,
  replyCommentByReviews,
  viewReviewsWithComments,
  deletePageReview,
  reactionUserListsOfReviews,
} = require("../controller/Pages/PageReviewsController");

const { saveSharePost, saveShareCaptionPost } = require("../controller/Posts/SharePostController");

const {
  saveStore,
  uploadStoreMedia,
  getAllStore,
  deleteStore,
  updateStore,
} = require("../controller/MarketPlace/StoreController");

const {
  saveProduct,
  uploadProductMedia,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  productFileUpload,
} = require("../controller/MarketPlace/StoreProductsController");
const {
  saveUserPrivateMessageOnetoOne,
  getUserPrivateMessageOnetoOne,
  getIncludingMeAllChatUsers,
  allChat,
  deleteAllChat,
  deleteUserPrivateMessageOnetoOne,
  updateUserPrivateMessageOnetoOne,
  replyUserPrivateMessageOnetoOne,
  getAllPrivateOneToOneMessageNotification,
  deleteAllPrivateOneToOneMessageNotification,
  saveGroupChatInfo,
  getAllGroupChatInfo,
  updateGroupChatInfo,
  uploadMessengerGroupMedia,
  getAllGroupMessagesIncludingMe,
  getGroupChatMessages,
  getGroupChatInformation,
  deleteGroupSingleMessageOneToOne,
} = require("../controller/Messenger/MessengerController");
const {
  getOrSaveOrganization,
  saveWorkPlace,
  getWorkplaceByUserId,
  deleteWorkplace,
  saveOrUpdateWorkplace,
  updateWorkplace,
  saveOrUpdateWorkPlace,
} = require("../controller/Organization/OrganizationController");

const { getToDayBirthday } = require("../controller/BirthDayManageController");
const { saveUserPrivacy } = require("../controller/UserPrivacyController");
const { saveCustomizeMenu, gettingCustomizeMenu } = require("../controller/Settings/CustomizeMenuController");
const { savePostReport } = require("../controller/ReportPosts/ReportPostsController");
const { getLatestNews } = require("../controller/News/NewsController");

/*=====================================
/ Gender Setup Data
=========================================*/
router.get("/gender", getAllGenderName);
router.post("/create-gender", createGender);
router.get("/edit-gender/:id", editGenderName);
router.put("/update-gender/:id", updateGender);
router.delete("/delete-gender/:id", deleteGender);

/*=====================================
/ Interest Type Setup Data @MAI
=========================================*/

router.post("/create-interest-type", createInterestType);

/*=====================================
/ Religion Setup Data @MAI
=========================================*/
router.get("/religion", getAllReligionName);
router.post("/create-religion", createReligion);

/*=====================================
/ PHobbies Setup Data @MAI
=========================================*/
router.get("/hobbies", getAllHobbiesName);
router.post("/create-hobbies", createHobbies);

/*=====================================
/ POst Feelings Setup Data @MAI
=========================================*/
router.post("/create-post-feelings", createPostFeelings);
router.get("/get-all-feelings", getAllPostFeelings);
router.post("/search-feelings", getSearchFeelings);

/*=====================================
/ POst Activity Setup Data @MAI
=========================================*/
router.post("/create-post-activity", createPostActivity);
router.get("/get-all-activity", getAllPostActivity);
router.post("/search-activity", getSearchActivity);

router.post("/create-post-subactivity", createPostSubActivity);
router.get("/get-all-subactivity", getAllPostSubActivity);
router.get("/get-subactivity-by-id/:id", getAllPostSubActivityById);

/*=====================================
/ POst Audience Setup Data @MAI
=========================================*/
router.post("/create-post-audience", createPostAudience);
router.get("/get-post-audience", getAllPostAudience);

/*=====================================
/ Sign Up Sign In
=========================================*/
router.post(
  "/signup",
  [body("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required")],
  register
);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/login-status-cookies", checkCookie);
router.get("/logout", logout);
router.post("/reset-password", resetPassword);

/*=====================================
/ Profile Setting BLock
=========================================*/
router.post("/update-profile", auth, updateProfile);
router.post("/change-only-profile-pic", auth, uploadProPic.single("profile_pic"), changeOnlyProfilePic);
router.post("/change-only-cover-pic", auth, uploadProPic.single("cover_pic"), changeOnlyCoverPic);
// router.post('/change-only-profile-pic', uploadProPic.single('profile_pic'), changeOnlyProfilePic);
router.post("/save-user-hobbies", saveHobbies);
router.post("/delete-user-hobbies", deleteHobbies);
router.get("/get-user-specific-hobbies", auth, getUserHobbies);
router.get("/get-user-education-info", auth, getEducationInfo);
router.post("/get-user-education-info", auth, getEducationInfo);
router.post("/change-password", auth, changePassword);
router.post("/change-mobile-number", auth, changeMobileNumber);
// router.post("/save-user-education-info", auth, saveEducation);
router.post("/delete-education/:educationId", auth, deleteEducation);


//edit and update user profile info 

router.get("/edit-user-gender/:id", editUserGender)
router.patch("/update-user-gender", auth, updateUserGender)
router.post("/save-user-education-info", auth, saveEducation);
router.get("/edit-user-education-info/:educataionId", auth, editUserEducationInfo);
router.patch("/update-user-education-info/:educationId", auth, updateUserEducationInfo);



/*=====================================
/ Institute Setting BLock
=========================================*/
router.get("/insititue-type", getAllInstituteType);
router.get("/insititue", getAllInstitute);
router.post("/create-insititue-type", createInstituteType);
router.post("/create-insititue", createInstitute);
router.post("/search-institute", searchInstitute);

router.get("/delete-user", deleteUser);

/*=====================================
/ Location Settings
=========================================*/
router.post("/create-location",uploadLocationFile.single('location'), createLocation);
router.post("/search-location", searchLocation);
router.post("/list-location", listLocation);

/*=====================================
/ Suggest friend
=========================================*/
router.get("/suggestion-list", auth, suggestionList);
router.post("/send-friend-request", auth, sendFriendRequest);
router.post("/is-request-or-friend", auth, isRequestOrFreind);
router.post("/friend-list", friendList);

router.post("/friend-request-list", auth, friendRequestList);
router.post("/friend-accept-friend-request", auth, acceptFriendRequest);
router.post("/unfriend-user", auth, unFriendUser);

router.post("/lock-profile", auth, lockYourProfile);
router.post("/unlock-profile", auth, unlockYourProfile);

router.post("/get-user-info", getUserInfoByUsername);

/*=====================================
/ Followers
=========================================*/
router.post("/follower-unfollow-request", auth, followerUnfollowerRequest);
router.post("/is-follower", auth, isFollower);
router.post("/user-follower-count", userfollowerCount);
router.post("/follower-list", followerList);
router.post("/following-list", followingList);
router.post("/unfollow-user", unfollowUser);
/*=====================================
/ Suggest friend
=========================================*/

//posts
router.post("/save-post", auth, uploadPostMedia.array("files"), savePost);
router.post("/edit-post", auth, uploadPostMedia.array("files"), editPost);
router.post("/hide-post", auth, hideUnhidePost);
router.post("/get-all-users-post-individual", getAllUserPostsIndividual);
router.post("/get-users-latest-image-video", getUsersLatestImageVideo);
router.post("/get-users-latest-image", getUsersLatestImage);
router.post("/get-users-latest-story", getUsersLatestStory);
// router.get("/get-all-users-posts", auth, getAllUserPosts);
router.get("/get-all-users-posts", auth, getAllUserPostsPaginated);

router.get("/delete-all-user-post", deleteAllUserPosts);
router.post("/delete-post-by-id", deletePostByID);
router.post("/get-single-post", singlePost);


//update post privacy
router.patch("/update-post-privacy-of-direct-post/:postId", updatePostPrivacy);

//view post single item
router.get("/view-post-single-item/:post_id/:media_id", auth, getViewPostSingleItem);
router.get("/view-single-main-post-with-comments/:postId", viewSingleMainPostWithComments);
router.post("/delete-single-reply-comment", deleteSingleReplyComment);
router.post("/delete-single-comment", deleteSingleComment);
router.get('/get-all-post-comment/:postId', getAllPostComment)

//comments
router.post("/save-user-comment-by-post", auth, uploadCommentMedia.single("image_or_video"), saveUserCommentByPost);
router.get("/get-all-comments-direct-post/:postId", getAllCommentsDirectPost);

//reply comments save corresponding main post commentId
router.post(
  "/reply-comment-by-direct-post",
  auth,
  uploadCommentMedia.single("image_or_video"),
  replyCommentByDirectPost
);

//edit comments of direct post
router.get("/edit-comment-by-direct-post/:postId/:commentId/:commentType", getEditCommentByDirectPost);
router.post(
  "/update-comments-by-direct-post/:postId/:commentId",
  uploadCommentMedia.single("image_or_video"),
  updateCommentsByDirectPost
);

//edit main comment or reply comment image_or_video file remove
router.patch(
  "/remove-image-or-videofile-comment-by-direct-post/:postId/:commentId/:commentType",
  removeImageOrVideoFileCommentByDirectPost
);

//save main post reaction
router.post("/save-reaction-main-post", auth, saveMainPostReaction);
router.get("/get-all-reaction-main-post", auth, getAllMainPostReactions);
router.get("/reaction-user-lists-of-direct-post/:postId", reactionUserListsOfDirectPost);

//count comment a main post
router.get("/count-comments-for-main-post/:postId", getCommentAndReplyCountForPost);

router.post("/get-post-details-by-id", getPostDetailsById);
router.post("/delete-post-media-by-id", deletePostMediaById);

//comment reaction routes starts //
router.post("/save-comment-reaction-of-direct-post", auth, saveMainPostCommentReaction);
router.post(
  "/reaction-user-lists-comments-of-a-direct-post",
  reactionUserListsOfCommentsDirectPost
);

//comment reaction routes ends //

/*=====================================
/ Story Module
=========================================*/
router.post("/save-story", auth, uploadSaveMedia.array("files"), saveStory);
router.post("/get-story", auth, getStory);
router.post("/get-merge-story", auth, getMergeStory);
router.post("/save-story-view", auth, saveStoryView);
router.post("/single-story", auth, showSingleStory);
router.post("/get-user-story", auth, getAllUserStory);
router.post("/save-story-reaction", auth, saveStoryReaction);
router.post("/delete-story", deleteStory);

/*=====================================
/ Pages Module
=========================================*/
router.post("/create-pages", auth, uploadPagesMedia.fields([{ name: "profilePic" }, { name: "coverPic" }]), createPages);
router.get("/get-all-pages", auth, getAllPages);
router.get("/get-followed-pages", auth, getFollowedPages);
router.post("/get-followers-by-Id", auth, getFollowersById);
router.post("/follow-page", auth, followPage);
router.post("/update-follow-page-status", auth, unFollowedPages);
router.post("/unfollow-page", auth, unFollowedPages);
router.post("/unlike-page", auth, unLikePages);
router.get("/get-my-pages", auth, getMyPages);
router.post("/get-page-details", getPagesDetails);

router.post("/get-all-followers", getAllFollowers);
router.post("/get-page-admins", getPageAdmins);
router.post("/make-page-admin", saveOrUpdatePageAdmin);
router.post("/remove-page-admin", removePageAdmin);
router.post("/delete-page", deletePage);

router.post("/save-page-post", auth, uploadPagePostMedia.array("files"), savePagesPost);
router.post("/change-pages-profile-pic", auth, uploadPagesMedia.single("profile_pic"), changePagesProfilePic);
router.post("/change-pages-cover-pic", uploadPagesMedia.single("cover_pic"), changePagesCoverPic);
router.post("/get-pages-posts", getPagesPosts);
router.post("/update-page-settings", updateSettings);
router.post("/send-page-invitation", auth, sendPageInvitation);
router.post("/invited-page", auth, invitedPages);
router.post("/accept-invitation", auth, acceptInvitation);
router.post("/get-pages-latest-image-video", getPagesLatestImage);
router.post("/bookmark-page", auth, bookmarkPage);
router.post("/update-page-info", auth, updatePageInfo);
router.post("/update-address-info", auth, updateAddressInfo);
router.post("/save-pages-social-link", saveSocialMediaLink);
router.get("/get-social-media", getSocialMedia);
/*=====================================
/ Pages Reviews Module
=========================================*/
router.post("/save-pages-reviews", auth, saveReviews);
router.post("/get-pages-reviews", getPagesReviews);
router.post("/save-reaction-on-reviews", auth, saveReactionOnReviews);
router.post("/save-user-comment-by-review", auth, saveUserCommentByReview);
router.post("/reply-comment-by-direct-review", auth, replyCommentByReviews);
router.get("/view-single-main-reviews-with-comments/:reviewId", viewReviewsWithComments);
router.post("/delete-page-review", deletePageReview);
router.get("/reaction-user-lists-of-reviews/:reviewId", reactionUserListsOfReviews);
// router.get('/reaction-user-lists-of-direct-review/:reviewId', reactionUserListsOfDirectPost);

// Reels routes

router.post("/save-user-reels", auth, uploadReelsVideo.single("video"), publishReels);
router.post("/save-share-reels", auth, saveShareReelsCaptionPost);
router.delete("/delete-own-user-reel/:reelId", auth, deleteOwnUserReel);
router.get("/all-user-reels", getAllUserReels);
router.get("/get-user-reel-by-id/:id", getUserReelById);
router.get("/delete-all-reels", deleteAllUserReels);

//reels comments
router.post("/save-user-comment-by-reel", auth, uploadCommentMedia.single("image_or_video"), saveUserCommentByReel);
router.get("/get-all-comments-direct-reel/:postId", getAllCommentsDirectReel);
router.post("/delete-single-reply-comment-reel", deleteSingleReplyCommentReel);
//delete main comments with nested reply if exits
router.post("/delete-single-comment-reel", deleteSingleCommentReel);

//edit comments of  reel post
router.get("/edit-comment-by-reel-post/:postId/:commentId/:commentType", getEditCommentByReelPost);
router.post(
  "/update-comments-by-reel-post/:postId/:commentId",
  uploadCommentMedia.single("image_or_video"),
  updateCommentsByReelPost
);

//reply comments save corresponding  reel post commentId
router.post("/reply-comment-by-reel-post", auth, uploadCommentMedia.single("image_or_video"), replyCommentByDirectReel);
router.get("/view-single-reel-with-comments/:postId", auth, viewSingleReelWithComments);

//reel comment reaction //
router.post("/save-comment-reaction-of-reel-post", auth, saveMainReelPostCommentReaction);
router.get(
  "/reaction-user-lists-comments-of-a-reel-post/:postId/:commentId/:commentRepliesId",
  reactionUserListsOfCommentsReelPost
);

//reel post reaction
router.post("/save-reaction-reel-post", auth, saveReelPostReaction);

//reels of individual users
router.get("/get-all-individual-user-reels", auth, getAllIndividualUserReels);

//notifications

router.get("/get-all-user-specific-unseen-notifications/:userId", unSeenAllNotifications)
router.get("/get-all-user-specific-notifications/:userId", getAllUsersSpecificNotifications);
router.get("/seen-all-user-specific-notifications/:userId", seenAllUsersSpecificNotifications);
router.post("/update-notification-seen-status/:notificationId", updateNotificationSeenStatus);

/*=====================================
/ Group Module
=========================================*/
router.post("/create-group", auth, uploadGroupCoverPicMedia.single("group_cover_pic"), createGroups);

router.post("/friend-list-for-group-invitation", auth, groupInvitationFriendList);
// Group invitation and Join request both
router.post("/send-group-join-request", auth, sendGroupInvitation);

router.post("/group-invitation-status-change", auth, GroupInvitationStatusChange);

// router.post('/change-group-cover-pic', uploadGroupsMedia.single('coverPic'), changeGroupCoverPic);
router.post(
  "/save-group-post",
  auth,
  UploadGroupPostMedia.array("files"),
  SaveGroupPost
);

router.get("/get-group-resource/:group_id", auth, getGroupResource);
router.post("/get-group-posts", getGroupPosts);
router.get("/get-all-groups-post", auth, getAllGroupsPosts);
router.post("/join-group", GroupJoin);
router.post("/leave-group", LeaveGroup);

router.patch("/edit-group-post/:group_post_id", EditGroupPost);
// router.post('/get-all-joined-group', getAllJoinedGroup);;

router.get("/get-my-groups", auth, getMyGroups);
router.post("/get-group-details-by-id", auth, getGroupsDetailsById);
router.get("/get-all-group", getAllGroups);

router.post("/send-multiple-user-geroup-invitation", sendGroupInvitationtoMultipleUser);

router.post("/update-group-info", updateGroupInfo);
router.post("/change-group-status", changeGroupStatus);

router.post("/save-share-group-post", auth, saveShareGroupPost);
router.post("/save-share-group-post-with-caption", auth, saveShareGroupPostCaptionPost);
router.post("/delete-group-post-by-id", deleteGroupPostByID);
router.get("/view-single-main-group-post-with-comments/:groupPostId", viewSingleMainGroupPostWithComments);
router.get("/get-all-reaction-group-main-post", auth, getAllGroupMainPostReactions);
router.post("/save-reaction-group-main-post", auth, saveMainGroupPostReaction);
router.get("/reaction-user-lists-of-direct-group-post/:postId", reactionUserListsOfDirectGroupPost);
router.get("/edit-comment-by-direct-group-post/:postId/:commentId/:commentType", getEditCommentByDirectGroupPost);
router.get(
  "/reaction-user-lists-comments-of-a-direct-group-post/:postId/:commentId/:commentRepliesId",
  reactionUserListsOfCommentsDirectGroupPost
);
router.post("/delete-single-group-post-comment", deleteSingleGroupPostComment);
router.post("/delete-single-reply-group-post-comment", deleteSingleReplyGroupPostComment);
router.post(
  "/save-user-comment-by-group-post",
  auth,
  UploadGroupPostMedia.single("image_or_video"),
  saveUserCommentByGroupPost
);
router.post(
  "/reply-comment-by-direct-group-post",
  auth,
  UploadGroupPostMedia.single("image_or_video"),
  replyCommentByDirectGroupPost
);
router.post(
  "/update-comments-by-direct-group-post/:postId/:commentId",
  UploadGroupPostMedia.single("image_or_video"),
  updateCommentsByDirectGroupPost
);
router.post("/save-comment-reaction-of-direct-group-post", auth, saveMainGroupPostCommentReaction);

router.get("/queryTestingController", queryTestingController);

// Group member remove or left group
router.patch("/group-member-status-change", auth, groupMemberRemove);


/*=====================================
/ Menu Customization Module
=========================================*/
router.get('/get-customize-menu', auth, gettingCustomizeMenu)
router.post('/save-customize-menu', auth, saveCustomizeMenu)

/*=====================================
/ Share Post @MAI
=========================================*/

router.post("/save-share-post", auth, saveSharePost);
router.post("/save-share-post-with-caption", auth, saveShareCaptionPost);

/*=====================================
/ Shop Module
=========================================*/
router.post("/save-store", auth, uploadStoreMedia.single("image"), saveStore);
router.get("/get-all-store", auth, getAllStore);
router.post("/delete-store", auth, deleteStore);
router.post("/update-store", auth, uploadStoreMedia.single("image"), updateStore);

/*=====================================
/ Product Module
=========================================*/
// auth
router.post("/product-file-upload", uploadProductMedia.single("image"), productFileUpload);
router.post("/save-product", saveProduct);
router.get("/get-all-product", auth, getAllProduct);
router.post("/get-product-details", getSingleProduct);
router.post("/delete-product", deleteProduct);

// router.post("/get-url", getUrl);

router.get("/hello", function (req, res) {
  return res.json({
    status: 200,
  });
});


// Messenger api starts

router.get("/all-users", getAllUsers);
router.get("/including-me-chat-users", auth, getIncludingMeAllChatUsers);
router.get("/get-user-info/:id", getUserInfo);
router.post("/save-private-message-one-to-one", saveUserPrivateMessageOnetoOne);
router.post("/reply-private-message-one-to-one/:messageId", replyUserPrivateMessageOnetoOne);
router.get("/get-private-message-one-to-one/:sender_id/:receiver_id", getUserPrivateMessageOnetoOne);
router.patch("/delete-private-message-one-to-one/:messageId", deleteUserPrivateMessageOnetoOne);
router.patch("/update-private-message-one-to-one/:messageId", updateUserPrivateMessageOnetoOne)
router.get("/get-all-private-one-to-one-message-notifications", auth, getAllPrivateOneToOneMessageNotification)
router.get("/delete-all-private-one-to-one-message-notifications", auth, deleteAllPrivateOneToOneMessageNotification)
router.patch("/update-group-chat-info/:groupId", uploadMessengerGroupMedia.single("group_image"), updateGroupChatInfo)

router.post("/save-group-chat-info", auth, saveGroupChatInfo)
router.get("/get-all-group-chat-info", auth, getAllGroupChatInfo)
router.get("/get-all-group-messages-including-me", auth, getAllGroupMessagesIncludingMe)
router.get("/get-group-chat-messages/:groupId", getGroupChatMessages)
router.get("/get-group-chat-infomation/:groupId", getGroupChatInformation)
router.patch("/delete-group-single-message-one-to-one/:messageId", deleteGroupSingleMessageOneToOne)


// Messenger api starts

router.get("/all-users", getAllUsers);
router.get("/including-me-chat-users", auth, getIncludingMeAllChatUsers);
router.get("/get-user-info/:id", getUserInfo);
router.post("/save-private-message-one-to-one", saveUserPrivateMessageOnetoOne);
router.get("/get-private-message-one-to-one/:sender_id/:receiver_id", getUserPrivateMessageOnetoOne);

router.get("/all-chat", allChat);
// Messenger api ends

router.get("/get-todays-birthday-friends", auth, getToDayBirthday);

//===== organization api =====//
router.post("/organization-list", getOrSaveOrganization);
router.get("/get-workplace-list", auth, getWorkplaceByUserId);
router.post("/get-workplace-list", auth, getWorkplaceByUserId);
router.post("/save-workplace", auth, saveOrUpdateWorkPlace);
router.post("/delete-workplace", auth, deleteWorkplace);
router.patch("/update-workplace", auth, updateWorkplace);
//===== XXX =====//

// update User information //
router.patch("/upsert-user-website", auth, upsertUserWebsite);
router.patch("/update-user-birthday", auth, updateUserBirthDate);
router.patch("/update-user-nickname", auth, updateUserNickName);
router.patch("/update-user-about", auth, updateUserAbout);
router.patch("/update-user-relation", auth, updateUserRelationStatus);
router.patch("/update-user-location", auth, userUserLocation);

// delete
router.delete("/delete-user-about", auth, deleteUserAbout);
router.delete("/delete-user-relStatus", auth, deleteUserRelationStatus);
router.delete("/delete-user-location/:address", auth, deleteUserLocation);
router.delete("/delete-user-nickname", auth, deleteNickName);
router.delete("/delete-user-website/:id", auth, deleteUserWebsite);

//------X------//
router.post("/delete-all-chat", deleteAllChat);
// Messenger api ends


/*=====================================
/ Privacy Module
=========================================*/

router.post('/save-user-privacy', auth, saveUserPrivacy);


// Post Report Module//
router.post("/save-post-report", auth, savePostReport);

router.get('/get-latest-news', getLatestNews);

module.exports = router;
