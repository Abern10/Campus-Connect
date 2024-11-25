import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import "../styles/NavBar.scss";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Redirect logo based on sign-in status */}
        <SignedIn>
          <a href="/calendar" className="logo">Campus Connect</a>
        </SignedIn>
        <SignedOut>
          <a href="/" className="logo">Campus Connect</a>
        </SignedOut>
      </div>
      <div className="navbar-right">
        <a href="/" className="nav-link">Home</a>

        <SignedIn>
          <a href="/friends" className="nav-link">Friends</a>
          {/* Calendar link removed for signed-in users */}
        </SignedIn>

        <SignedOut>
          <SignInButton
            mode="modal"
            fallbackRedirectUrl="/friends" // Redirect to Friends page after sign-in if no `redirect_url` exists
          >
            <button className="nav-link button-link">Friends</button>
          </SignInButton>
          <SignInButton
            mode="modal"
            fallbackRedirectUrl="/calendar" // Redirect to Calendar page after sign-in if no `redirect_url` exists
          >
            <button className="nav-link button-link">Calendar</button>
          </SignInButton>
        </SignedOut>

        <a href="/about-us" className="nav-link">About Us</a>

        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton
            mode="modal"
            redirectUrl="/calendar" // Redirect after successful sign-in
            fallbackRedirectUrl="/calendar" // In case no redirectUrl is specified
          >
            <button className="SignIn">Sign In</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}

export default NavBar;