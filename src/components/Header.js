import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Dialog, DialogContent, TextField, Menu,MenuItem, } from "@mui/material";
import { NavLink } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import useLogin from "../hooks/useLogin";
import { Token } from "@mui/icons-material";

const Header = () => {
    const [openLogin, setOpenLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [anchorEl, setAnchorEl] = useState(null); // For settings menu

    const { isSubmitting, isLoggedIn, login, logout } = useLogin();

    const handleLoginOpen = () => setOpenLogin(true);
    const handleLoginClose = () => setOpenLogin(false);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(
            username,
            password,
            () => {
                handleLoginClose();
                console.log("Login successful");
            },
            (error) => console.error("Login error:", error)
        );
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* Left-aligned navigation links */}
                    <Box sx={{ flexGrow: 1 }}>
                        <NavLink
                            to="/"
                            style={({ isActive }) => ({
                                textDecoration: "none",
                                color: isActive ? "#000" : "white",
                                marginRight: "16px",
                            })}
                        >
                            <HomeIcon />
                        </NavLink>
                    </Box>

                    {/* Right-aligned buttons */}
                    <Box sx={{ ml: "auto" }}>
                        {isLoggedIn ? (
                            <>
                                <Button color="inherit" onClick={handleMenuOpen}>
                                    Settings
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleMenuClose}>My Auctions</MenuItem>
                                    <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            logout();
                                            handleMenuClose();
                                            sessionStorage.removeItem(Token)
                                        }}
                                    >
                                        Sign Out
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" onClick={handleLoginOpen}>
                                    Login
                                </Button>
                                <NavLink
                                    to="/signup"
                                    style={({ isActive }) => ({
                                        textDecoration: "none",
                                        color: isActive ? "#000" : "white",
                                    })}
                                >
                                    <Button color="inherit">Sign Up</Button>
                                </NavLink>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Login Dialog */}
            <Dialog open={openLogin} onClose={handleLoginClose}>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ mt: 2, textAlign: "center" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                        </Box>
                    </form>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default Header;
