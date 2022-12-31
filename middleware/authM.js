const jwt = require("jsonwebtoken");

const authM = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    jwt.verify(
      token,
      "#^j?4RyY!U3cMPU=x~^GGVQuf#J&p1xKcJmRz*sU8J!C#ENtJq",
      (err, user) => {
        console.log(user)
        if (err)
          return res.status(400).json({ msg: "Invalid Authentication." });
        if (user.role === "instructor") {
          req.instructor = user;
          next();
        } else {
          req.member = user;
          next();
        }
    
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authM;
