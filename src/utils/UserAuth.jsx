import { ID } from "appwrite";
import { account } from "../appwriteConfige";

// Function to check if user is logged in
export const checkUserStatus = async (setUser, setLoading) => {
  try {
    const accountDetails = await account.get();
    setUser(accountDetails);
  } catch (error) {
    setUser(null);
  }
  setLoading(false);
};

export const loginUser = async (userInfo, setUser, setLoading) => {
  setLoading(true);
  try {
    const currentUser = await account.get();
    if (currentUser) {
      setUser(currentUser);
      console.log("User already logged in:", currentUser);
      return;
    }
  } catch {
    try {
      await account.createEmailPasswordSession(
        userInfo.email,
        userInfo.password
      );
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.error("Login failed:", error);
    }
  } finally {
    setLoading(false);
  }
};

export const logoutUser = async (setUser, setLoading) => {
  setLoading(true);
  try {
    await account.deleteSession("current");
    setUser(null);
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    setLoading(false);
  }
};

export const registerUser = async (userInfo, setUser, setLoading) => {
  setLoading(true);
  try {
    await account.create(
      ID.unique(),
      userInfo.email,
      userInfo.password1,
      userInfo.name
    );

    await account.createEmailPasswordSession(
      userInfo.email,
      userInfo.password1
    );
    const accountDetails = await account.get();
    setUser(accountDetails);
  } catch (error) {
    console.error("Registration failed:", error);
  } finally {
    setLoading(false);
  }
};
