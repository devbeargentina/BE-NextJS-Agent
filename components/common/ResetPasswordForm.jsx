import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../features/hero/authSlice';
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

const initialState = {
  confirmPassword: "",
  newPassword: "",
  userId : "",
  token : ""
};
const ResetPassword = () => {
  const [loginRQ, setloginRQ] = useState(initialState);
  const [validation, setValidation] = useState({
    confirmPassword: true,
    newPassword: true,
  });
  const { loading, error } = useSelector((state) => state.user);
  const { username, newPassword } = loginRQ;
  const dispatch = useDispatch();
  const router = useRouter();

  const queryParams = useSearchParams();
  const userId = queryParams.get('userId');
  const token = queryParams.get('token');  
  const validationRules = {
    confirmPassword: true,
    newPassword: true,
  };
  
  useEffect(() => {
    
  if(userId && token){    
    setloginRQ({ ...loginRQ, ["userId"]: userId, ["token"]: token  });
  }
}, []);
  useEffect(() => {
    
    //console.log(error);
    error && toast.error(error);
  }, [error]);

  const validateInput = () => {
    const newValidation = {
      newPassword: !validationRules.newPassword || !!newPassword,
      confirmPassword: !validationRules.confirmPassword || !!confirmPassword,
    };

    setValidation(newValidation);

    return Object.values(newValidation).every((isValid) => isValid);
  };
  const handleSubmit = async (e) => {
    if (validateInput() && userId && token) {
      try {
        await dispatch(resetPassword({ loginRQ,toast,router }));
        
        } catch (error) {
          console.error('Login error:', error);
        }
    }
  };
  const onInputChange = (e) => {
    
    let { name, value } = e.target;
    setloginRQ({ ...loginRQ, [name]: value });
  };

  return (
    <div className="row y-gap-20">
      <div className="col-12">
        <h1 className="text-22 fw-500">Reset Password</h1>
      </div>
      <div className="col-12">
        <div className={`form-input ${validationRules.newPassword && !validation.newPassword ? 'error' : ''}`}>
          <input type="newPassword" id="newPassword" name="newPassword" required  onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Password</label>
        </div>
      </div>
      
      <div className="col-12">
        <div className={`form-input ${validationRules.confirmPassword && !validation.confirmPassword ? 'error' : ''}`}>
          <input type="text" required id="confirmPassword" name="confirmPassword"  onChange={onInputChange} />
          <label className="lh-1 text-14 text-light-1">Confirm Password</label>
        </div>
      </div>

      <div className="col-12">
        <button
          type="submit"
          href="#"
          className="button py-20 -dark-1 bg-blue-1 text-white w-100"
          onClick={() => handleSubmit()}
        >
          Submit {loading ? <i class="spinner-border spinner-border-sm"></i>:<div className="icon-arrow-top-right ml-15" />}
        </button>
      </div>
      {/* End .col */}
    </div>
  );
};

export default ResetPassword;
