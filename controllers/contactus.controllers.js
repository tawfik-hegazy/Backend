const Contact = require("../models/contactus.model");

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newMessage = new Contact({ name, email, message });
    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
      data: newMessage
    });
  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { sendMessage };
