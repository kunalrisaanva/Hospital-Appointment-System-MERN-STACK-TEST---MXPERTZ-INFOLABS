import asyncHandler from "../uitls/asyncHandler.js";
// import User from "../models/user.model.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../uitls/ApiRespnse.js";
import { ApiError } from "../uitls/APIError.js";

const genrateAccessAndRefreshTokens = async (userId) => {
  try {
    if (!userId) {
      throw new ApiError(
        400,
        "userId is required to genrate access and refresh tokens"
      );
    }
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();

    const refreshToken = await user.genraterefreshToken();
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Token generation error:", error);
    throw new ApiError(500, " Something went wrong refresh and access token ");
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, password, role } = req.body;

  if (
    [username, password, role].some(
      (fields) => fields?.trim() === "" || undefined
    )
  ) {
    throw new ApiError(400, "all fields are required");
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new ApiError(409, "User with username allready existed");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    password,
    role,
  });

  const createdUser = await User.findOne(user._id).select(
    "-password -refreshToken "
  );

  if (!createdUser) {
    throw new ApiError(500, "Somethind wencomt wrong while registering a User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user Created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    throw new ApiError(400, " username or password is required ");
  }

  const user = await User.findOne({
    username: username.toLowerCase(),
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isMatch = await user.isPasswordCorrect(password);

  console.log("isMatch", isMatch);

  if (!isMatch) {
    throw new ApiError(401, " Invlid user credintails ");
  }

  const { refreshToken, accesToken } = await genrateAccessAndRefreshTokens(
    user._id
  );
  //    console.log(refreshToken)
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  const cookieOptions = {
    httpOnly: true, // Makes the cookie inaccessible to JavaScript
    // secure: true, // Sends cookie only over HTTPS
  };

  return res
    .status(200)
    .cookie("accessToken", accesToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          refreshToken,
          accesToken,
        },
        "User logged In Successfully"
      )
    );
});

const logOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // it will remove refresh token from the document
      },
    },
    { new: true }
  );

  const cookieOptions = {
    httpOnly: true,
    // secure:true
  };
  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "user logged Out"));
});

 const getUsersByRole = async (req, res, next) => {
  try {
    const { role } = req.query;

    if (!role || !['doctor', 'patient'].includes(role)) {
      return res.status(400).json({ error: 'Invalid or missing role parameter' });
    }

    const users = await User.find({ role }).select('-password -refreshToken'); // hide sensitive data
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





export { registerUser, loginUser, logOutUser , getUsersByRole};
