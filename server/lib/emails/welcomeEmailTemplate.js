// These are the primary templates to notify user when
// they first sign up

// This is used to customize the subject of the email
// It takes in the name of the user and returns the subject in string format
exports.welcomeEmailSubjectTemplate = (name) => {
  return `🎉 You're In ${name}! Your Swipe Savvy Listing is Live — Here’s What’s Next`;
};

// This is used to customize the main body of the email
// It takes in the name of the user and returns the body in string format
exports.welcomeEmailTemplate = (name) => {
  return `
Hi ${name},\n
Welcome to Swipe Savvy — your business is now officially listed in our Loyalty Rewards Network!\n
You’ve taken the first step toward growing customer loyalty without spending a dime.\n\n
✅ Here’s What Happens Next:\n
Your window sticker and POS signage are being printed and will arrive within 5–7 business days.\n
You can now log into your dashboard to manage your listing, edit your details, and track activity.\n 
[dashboard link]\n\n
💎 Want More Visibility? Try Shop Savvy — Risk Free\n
For a limited time, we’re offering you:\n
🎁 30 Days Free + 50% Off for Life ($34.50/mo)\n
Unlock Premium Perks:\n
🔝 1.Featured placement in the Swipe Savvy app\n
🎯 Run double rewards campaigns\n
🌐 Sync your listing across Google, Yelp, Facebook & more\n
📊 Access customer insights & performance reports\n
👉 [link to upgrade]\n\n
🛍️ Your Free Plan Includes:\n
1. Free listing in the Swipe Savvy network\n
Loyalty-ready signage for your store\n
Swipe-enabled checkout option for customers\n
Thanks for joining — we’re pumped to help you thrive!\n
—\n
Team Swipe Savvy\n
[email of swipe savvy]]`;
};
