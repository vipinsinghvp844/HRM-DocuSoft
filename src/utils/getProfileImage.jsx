// src/utils/getProfileImage.js

/**
 * Get user profile image or initials
 * @param {string|number} userId - User's ID
 * @param {Array} TotalUsers - List of all users [{ id, first_name, last_name }]
 * @param {Array} AllProfilesImage - List of all profile images [{ user_id, profile_image }]
 * @param {string} placeholderImage - Default placeholder URL
 * @returns {{ type: "image" | "initials", value: string }}
 */

export const getProfileImage = (userId, TotalUsers, AllProfilesImage, placeholderImage) => {
  const userData = TotalUsers?.find(
    (user) => String(user.id) === String(userId)
  );
  const firstName = userData?.first_name?.trim() || "";
  const lastName = userData?.last_name?.trim() || "";
  const userName = `${firstName} ${lastName}`.trim();

  const profile = AllProfilesImage?.find(
    (p) => String(p.user_id) === String(userId)
  );

  if (profile?.profile_image?.trim()) {
    return { type: "image", value: profile.profile_image };
  }

  if (userName) {
    const nameParts = userName.split(" ");
    const firstInitial = nameParts[0]?.[0]?.toUpperCase() || "";
    const lastInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1]?.[0]?.toUpperCase()
        : "";
    const initials = `${firstInitial}${lastInitial}` || "?";
    return { type: "initials", value: initials };
  }

  return { type: "image", value: placeholderImage };
};

/**
 * Get a consistent color class based on user's name
 */
export const getAvatarColor = (name = "") => {
  // Ensure value is a string before calling charCodeAt
  const safeName = String(name || "").trim();

  const colorMap = {
    0: "bg-blue-600 border-blue-600",
    1: "bg-green-600 border-green-600",
    2: "bg-red-600 border-blue-600",
    3: "bg-purple-600 border-purple-600",
    4: "bg-pink-600 border-pink-600",
    5: "bg-yellow-600 border-yellow-600",
  };

  // charCodeAt will now always work safely
  const index = safeName ? safeName.charCodeAt(0) % 6 : 0;
  return colorMap[index];
};



