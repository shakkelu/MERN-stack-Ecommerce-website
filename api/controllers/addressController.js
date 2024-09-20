import Address from "../models/address.js";

// Get all addresses for a specific user
export const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses", error });
  }
};

// Create a new address
export const createAddress = async (req, res) => {
  try {
    const { addressLine1, addressLine2, city, state, postalCode, country } =
      req.body;
    const newAddress = new Address({
      user: req.user._id,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
    });
    await newAddress.save();
    res.status(201).json({ message: "Address created", address: newAddress });
  } catch (error) {
    res.status(500).json({ message: "Error creating address", error });
  }
};
