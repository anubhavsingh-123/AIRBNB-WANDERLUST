const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

// Show Register Form
router.get("/register", (req, res) => {
    res.render("register");
});

// Handle User Registration
router.post("/register", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username });
        const registeredUser = await User.register(user, password);

        req.logIn(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");  // Redirect to listings after registration
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register");
    }
});

// Show Login Form
router.get("/login", (req, res) => {
    res.render("login");
});

// Handle Login with Redirect to Previous Page or Listings
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash("error", "Invalid username or password");
            return res.redirect("/login");
        }

        req.logIn(user, (err) => {
            if (err) return next(err);

            let redirectUrl = req.session.returnTo || "/listings"; // Redirect to previous page or /listings
            delete req.session.returnTo; // Clear the stored return path
            res.redirect(redirectUrl);
        });
    })(req, res, next);
});

// Handle Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings"); // Redirect to listings after logout
    });
});

module.exports = router;
