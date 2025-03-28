    require("dotenv").config();
    const express = require("express");
    const mongoose = require("mongoose");
    const session = require("express-session");
    const flash = require("connect-flash");
    const bookRoutes = require("./routes/bookRoutes");

    const app = express();

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
    app.use(flash());

    app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
    });

    // View Engine
    app.set("view engine", "ejs");

    // Connect to MongoDB
    mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("⚠️ MongoDB Connection Error:", err));

    // Routes
    app.use("/", bookRoutes);

    // Start Server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
