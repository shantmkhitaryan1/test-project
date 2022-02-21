import React, { ChangeEvent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import LoginBacckground from '../../assets/images/LoginBackground.png'
import ImageBackground from '../../components/ImageBackground/imageBackground';
import { validateForm } from '../../shared/helpers/helper';
import { FormItemModel } from '../../shared/models/formItemModel';
import { LoginModel } from '../../shared/models/signModel';
import { loginUser } from '../../redux/actions';
import { RootReducerInterface } from '../../shared/models/rootReducer';
import './login.scss';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootReducerInterface) => state.user,
  );

  const [formValues, setFormValues] = useState<{[key: string]: FormItemModel}>({
    username: {
      value: "",
      pattern: [/^\w{2,}@\w{2,}\.\w{2,4}$/, /[0-9]/],
      valid: true
    },
    password: {
      value: "",
      pattern: null,
      valid: true
    },
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const changeFormValue = ({ target }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = target;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value
      }
    })
  }

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleLogin = () => {
    const { formData, isFormValid } = validateForm(formValues);
    if(!isFormValid) {
      setFormValues({...formData});
      return;
    }

    const loginForm = new LoginModel(
      formData.username.value,
      formData.password.value
    );
    dispatch(loginUser(loginForm));
  }

  const toRegistrationPage = () => {
    navigate('/sign-up')
  }

  useEffect(() => {
    if(currentUser.id) {
      navigate('/');
    }
  }, [currentUser])

  return (
    <div className="login-container">
      <ImageBackground
        background={LoginBacckground}
      />
      <div className="left-block"></div>
      <div className="right-block">
        <div className="login-form">
          <h2 className="form-title">SIGN IN</h2>
          <div className="form-fields">
            <div className="form-item">
              <TextField
                error={!formValues.username.valid}
                name="username"
                label="Email or phone"
                variant="outlined"
                value={formValues.username.value}
                onChange={changeFormValue}
                helperText={formValues.username.valid ? '' : 'Invalid username'}
              />
            </div>
            <div className="form-item">
              <TextField
                error={!formValues.password.valid}
                name="password"
                label="Password"
                variant="outlined"
                type={isPasswordVisible ? 'text' : 'password'}
                value={formValues.password.value}
                onChange={changeFormValue}
                helperText={formValues.password.valid ? '' : 'Invalid password'}
              />
              <span onClick={togglePassword} className="show-hide">
                {isPasswordVisible
                  ? <VisibilityIcon color="disabled" />
                  : <VisibilityOffIcon color="disabled" />
                }
              </span>
            </div>
            <button
              className="save-button"
              type="button"
              onClick={handleLogin}
            >SIGN IN</button>
            <span
              className="link"
              onClick={toRegistrationPage}
            >Sign Up</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
