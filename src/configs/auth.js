module.exports = {
	jwt: {
		secret: process.env.AUTH_SECRET,
		expiresIn: "3d",
	},
};
