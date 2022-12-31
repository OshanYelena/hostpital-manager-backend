const jwt = require("jsonwebtoken");

const authI = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Invalid Authentication." });

    jwt.verify(
      token,
      "#^j?4RyY!U3cMPU=x~^GGVQuf#J&p1xKcJmRz*sU8J!C#ENtJq",
      (err, instructor) => {
        if (err)

          return res.status(400).json({ msg: "Invalid Authentication." });
        req.instructor = instructor;
        next();
      }
    );
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authI;
