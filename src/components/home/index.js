import { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styles from "./style.module.css";
import backgroundImage from "../../assets/Computer-Centre.jpg";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
	const history = useHistory()
	const [data, setData] = useState({ username: "", password: "" });
	const [error, setError] = useState("");


	// useEffect(() => {
	// 	localStorage.setItem("isLoggedIn", "false");
	// }, []); 

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:5000/api/v1/auth/login", data);
			console.log("Response status:", response.status); // Log response status
			console.log("Login response:", response.data); // Log response data
			const isLoggedIn = response.status === 200;
			console.log("Is logged in:", isLoggedIn); // Log whether user is logged in or not
			localStorage.setItem("isLoggedIn", isLoggedIn);
			localStorage.setItem("isEncryptClicked", "false");
			localStorage.setItem("encryptClickCount", 0);
			if (isLoggedIn) {
				localStorage.setItem("token", response.data.accessToken);
				localStorage.setItem("user", JSON.stringify(response.data.username));
			}
			toast.success("Login successful");
			window.location.href = "/encrypt-records";

		} catch (error) {
			console.error("Login failed", error);
			console.log("Error response data:", error.response.data); // Log error response data
			console.log("Error response status:", error.response.status); // Log error status code
			localStorage.setItem("isLoggedIn", "false");
			setError(error.response.data.message);
		}
	};

	const backgroundStyle = {
		backgroundImage: `url(${backgroundImage})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
	};

	return (
		<div className={styles.login_container} style={backgroundStyle}>
			<ToastContainer
				position="top-center"
			/>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="string"
							placeholder="User Name"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Account</h1>
					<Link to="/register">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
