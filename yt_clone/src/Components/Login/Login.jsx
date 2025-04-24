import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { loginUser } from "../../api";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser(email, password);
            if (response.success) {
                onLogin(); // Call parent-provided login handler
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert(error.message || "An error occurred during login. Please try again.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <h2>Login to YouTube</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;