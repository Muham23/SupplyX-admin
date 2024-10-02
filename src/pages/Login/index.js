import { useContext, useEffect, useState } from 'react';
import Logo from '../../assets/images/logonew.png';
import patern from '../../assets/images/pattern.webp';
import { MyContext } from '../../App';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// import googleIcon from '../../assets/images/googleIcon.png';

const Login = () => {
    const navigate = useNavigate(); // Initialize navigate
    const [inputIndex, setInputIndex] = useState(null);
    const [isShowPassword, setisShowPassword] = useState(false);
    const context = useContext(MyContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    useEffect(() => {
        context.setisHideSidebarAndHeader(true);
    }, []);
    // Handle input changes and update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const { email, password } = formData;
        // Simple authentication check
        if (email.trim() === 'patelbilal15@gmail.com' && password.trim() === 'Dolphin@21') {
            localStorage.setItem('isLogin', true); // Store login status in local storage
            alert("Successfully Logged In");
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            alert("Incorrect username or password");
        }
    };

    return (
        <>
            <img src={patern} className='loginPatern' />
            <section className="loginSection">
                <div className="loginBox">
                    <div className='logo text-center'>
                        <img src={Logo} width="200px" />
                        <h5 className='font-weight-bold' style={{ marginTop: '20px' }}>Login to SupplyX</h5>
                    </div>

                    <div className='wrapper mt-3 card border'>
                        <form onSubmit={handleSubmit}>
                            <div className={`form-group position-relative ${inputIndex === 0 ? 'focus' : ''}`}>
                                <span className="icon"><MdEmail /></span>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter Your Email"
                                    autoFocus={inputIndex === 0}
                                    value={formData.email}
                                    required
                                    autoComplete="email" // Correct autocomplete
                                    onChange={handleChange}
                                />
                            </div>

                            <div className={`form-group position-relative ${inputIndex === 1 ? 'focus' : ''}`}>
                                <span className="icon"><RiLockPasswordFill /></span>
                                <input
                                    type={isShowPassword ? 'text' : 'password'}
                                    name="password"
                                    className="form-control"
                                    placeholder="Enter Your Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password" // Ensure it's properly set
                                    required
                                />
                                <span className="toggleShowPassword" onClick={() => setisShowPassword(!isShowPassword)}>
                                    {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                                </span>
                            </div>

                            <div className="form-group">
                                <Button className="btn-blue btn-lg w-100 btn-big" type="submit">Sign In</Button>
                            </div>
                        </form>

                    </div>

                    <div className='wrapper mt-3 card border footer p-3'>
                        <span className='text-center'>
                            Don't have an account?
                            <Link to={'/signUp'} className='link color ml-2'>Register</Link>
                        </span>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Login;