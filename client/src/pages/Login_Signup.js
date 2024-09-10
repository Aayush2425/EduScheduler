import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import "../style/login_signup.scss"
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { toast,Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login_Signup = () => {
  const [switched, setSwitched] = useState(false);

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Toaster/>
        <div className="local-container">
        <div className={cn('demo', { 's--switched': switched })}>
          <div className="demo__inner">
            <div className="demo__forms">
              <div className="demo__form">
                <div className="demo__form-content ">
                  <FakeForm
                    heading="Welcome back"
                    fields={['universityEmail', 'password']}
                    submitLabel="Sign in"
                  />
                </div>
              </div>
              <div className="demo__form">
                <div className="demo__form-content">
                  <FakeForm
                    heading="Time to feel like home"
                    fields={['username', 'universityName', 'password', 'universityEmail']}
                    submitLabel="Sign up"
                  />
                </div>
              </div>
            </div>
            <div className="demo__switcher">
              <div className="demo__switcher-inner">
                <div className="demo__switcher-content">
                  <div className="demo__switcher-text">
                    <div>
                      <h3>New here?</h3>
                      <p>
                        Sign up and discover a great number of new opportunities!
                      </p>
                    </div>
                    <div>
                      <h3>One of us?</h3>
                      <p>
                        If you already have an account, just sign in. We've missed you!
                      </p>
                    </div>
                  </div>
                  <button
                    className="demo__switcher-btn"
                    onClick={() => setSwitched(!switched)}
                  >
                    <span className="animated-border" />
                    <span className="demo__switcher-btn-inner">
                      <span>Sign Up</span>
                      <span>Sign In</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// const FakeForm = ({ heading, fields, submitLabel }) => {

//   const [formData, setFormData] = useState({});
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setErrors({
//       ...errors,
//       [e.target.name]: "",
//     });
//   };
  
//   const validateForm = () => {
//     let valid = true;
//     const newError = {};
  
//     fields.forEach((field) => {
//       const value = formData(field);
//       if (!value) {
//         newErrors(field) = `${field} is required`;
//         valid = false;
//       } else {
//         if (field === "Email" && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
//           newErrors(field) = "Invalid email address";
//           valid = false;
//         }
//         if (field === "Password" && value.length < 6) {
//           newErrors(field) = "Password must be at least 6 characters long";
//           valid = false;
//         }
//       }
//     });
  
//     setErrors(newErrors);
//     return valid;
//   };
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error("Please fix the errors before submitting");
//       return;
//     }
  
//     try {
//       let url = "";
//       if (submitLabel === "Sign up") {
//         url = "http://localhost:8000/admin/signup";
//       } else if (submitLabel === "Sign in") {
//         url = "http://localhost:8000/admin/signin";
//       }
  
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to ${submitLabel.toLowerCase()}`);
//       }
  
//       const result = await response.json();
//       console.log(`${submitLabel} successful:`, result);
//     } catch (error) {
//       console.error(`Error during ${submitLabel.toLowerCase()}:`, error);
//     }
//   };
  
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <form className="form" onSubmit={handleSubmit}>
//       <div className="form__heading">{heading}</div>
//       {fields.map((field) => (
//         <label className="form__field" key={field}>
//           <span className="form__field-label">{field}</span>
//           <input
//             className="form__field-input"
//             type={field === "Password" && !showPassword ? "password" : "text"}
//             name={field}
//             value={formData(field) || ""}
//             onChange={handleChange}
//           />
//           {field === "Password" && (
//             <span
//               className="absolute top-2 right-2 cursor-pointer"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
//             </span>
//           )}
//           {errors(field) && (
//             <p className="text-red-500 text-sm absolute top-[60%] left-2.5">{errors(field)}</p>
//           )}
//         </label>
//       ))}
//       <button type="submit" className="form__submit">
//         {submitLabel}
//       </button>
//     </form>
//   );
// };

const FakeForm = ({ fields, submitLabel }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    fields.forEach((field) => {
      const value = formData[field];
      if (!value) {
        newErrors[field] = `${field} is required`;
        valid = false;
      } else {
        if (field === 'Email' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          newErrors[field] = 'Invalid email address';
          valid = false;
        }
        if (field === 'Password' && value.length < 6) {
          newErrors[field] = 'Password must be at least 6 characters long';
          valid = false;
        }
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      let url = '';
      let adminUrl = '';
      if (submitLabel === 'Sign up') {
        url = 'http://localhost:8000/admin/signup';
        adminUrl = 'http://localhost:8000/university/createuniversity';
      } else if (submitLabel === 'Sign in') {
        url = 'http://localhost:8000/admin/signin';
      }
      console.log(formData);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      

      if (!response.ok) {
        throw new Error(`Failed to ${submitLabel.toLowerCase()}`);
      }

      const result = await response.json();
      console.log(result);
      
      localStorage.setItem("token",result.data.token);
      localStorage.setItem("uniName", result.data.universityName);

      const universityResponse = await fetch(adminUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name : result.data.universityName,
          admin : result.data._id
        }),
      });

      toast.success(`${submitLabel} successful!`);
      if (submitLabel === 'Sign up') {
        navigate("/generalDetailForm");
      } else if (submitLabel === 'Sign in') {
        navigate("/dashboard");
      }
      console.log(`${submitLabel} successful:`, result);
    } catch (error) {
      toast.error(`Error during ${submitLabel.toLowerCase()}.`);
      console.error(`Error during ${submitLabel.toLowerCase()}:`, error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      className="form w-full h-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center">
        {/* Logo/Image can be added here */}
      </div>
      {fields.map((field) => (
        <label className="form__field relative" key={field}>
          <input
            className="form__field-input text-xl"
            placeholder={field}
            type={field === 'Password' && !showPassword ? 'password' : 'text'}
            name={field}
            value={formData[field] || ''}
            onChange={handleChange}
          />
          {field === 'Password' && (
            <span
              className="absolute top-2 right-2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaRegEyeSlash className="text-xl" /> : <FaRegEye className="text-xl" />}
            </span>
          )}
          {errors[field] && (
            <p className="text-red-500 text-sm absolute left-2.5">
              {errors[field]}
            </p>
          )}
        </label>
      ))}
      <button type="submit" className="form__submit">
        {submitLabel}
      </button>
    </form>
  );
};

export default Login_Signup;
