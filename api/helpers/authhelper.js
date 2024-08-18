import bcrypt from "bcrypt";

export const hashing = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  } catch (error) {
    console.log(error);
  }
};
