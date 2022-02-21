import React, { ChangeEvent, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Checkbox from '@mui/material/Checkbox';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import RegistrationBackground from '../../assets/images/RegistrationBackground.png'
import ImageBackground from '../../components/ImageBackground/imageBackground';
import './registration.scss';

import { validateForm } from '../../shared/helpers/helper';
import { FormItemModel } from '../../shared/models/formItemModel';
import { RootReducerInterface } from '../../shared/models/rootReducer';
import { registerUser } from '../../redux/actions';
import { UserModel } from '../../shared/models/signModel';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootReducerInterface) => state.user,
  );
  const [formValues, setFormValues] = useState<{[key: string]: FormItemModel}>({
    name: {
      value: "",
      pattern: [/[A-z0-9]{4,}/],
      valid: true
    },
    surname: {
      value: "",
      pattern: [/[A-z0-9]{4,}/],
      valid: true
    },
    username: {
      value: "",
      pattern: [/^\w{2,}@\w{2,}\.\w{2,4}$/],
      valid: true
    },
    password: {
      value: "",
      pattern: [/.{4,}/],
      valid: true
    },
    confirmPassword: {
      value: "",
      pattern: [/.{4,}/],
      valid: true
    },
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState<{[key: string]: boolean}>({
    password: false,
    confirm: false,
  })
  const [agree, setAgree] = useState<boolean>(false);

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

  const togglePassword = (key: string) => {
    setIsPasswordVisible({
      ...isPasswordVisible,
      [key]: !isPasswordVisible[key]
    })
  }

  const handleRegister = () => {
    const { formData, isFormValid } = validateForm(formValues);
    const isPasswordMatch = formValues.password.value === formValues.confirmPassword.value;
    if(!isFormValid || !isPasswordMatch) {
      formData.confirmPassword.valid = isPasswordMatch;
      setFormValues({...formData});
      return;
    }

    const user = new UserModel(
      "",
      formData.name.value,
      formData.surname.value,
      formData.username.value,
      formData.password.value,
      formData.confirmPassword.value,
    );
    dispatch(registerUser(user));
  }

  const toRegistrationPage = () => {
    navigate('/sign-in')
  }

  const handleAgree = () => {
    setAgree(!agree);
  }

  useEffect(() => {
    if(currentUser.id) {
      navigate('/');
    }
  }, [currentUser])

  return (
    <div className="login-container">
      <ImageBackground
        background={RegistrationBackground}
      />
      <div className="left-block"></div>
      <div className="right-block">
        <div className="login-form">
          <h2 className="form-title">SIGN UP</h2>
          <div className="form-fields">
            <div className="form-item">
              <TextField
                error={!formValues.name.valid}
                name="name"
                label="Name"
                variant="outlined"
                value={formValues.name.value}
                onChange={changeFormValue}
                helperText={formValues.name.valid ? '' : 'Invalid name'}
              />
            </div>
            <div className="form-item">
              <TextField
                error={!formValues.surname.valid}
                name="surname"
                label="Surname"
                variant="outlined"
                value={formValues.surname.value}
                onChange={changeFormValue}
                helperText={formValues.surname.valid ? '' : 'Invalid surname'}
              />
            </div>
            <div className="form-item">
              <TextField
                error={!formValues.username.valid}
                name="username"
                label="Email"
                variant="outlined"
                value={formValues.username.value}
                onChange={changeFormValue}
                helperText={formValues.username.valid ? '' : 'Invalid email'}
              />
            </div>
            <div className="form-item">
              <TextField
                error={!formValues.password.valid}
                name="password"
                label="Password"
                variant="outlined"
                type={isPasswordVisible.password ? 'text' : 'password'}
                value={formValues.password.value}
                onChange={changeFormValue}
                helperText={formValues.password.valid ? '' : 'Invalid password'}
              />
              <span onClick={togglePassword.bind(null, 'password')} className="show-hide">
                {isPasswordVisible.password
                  ? <VisibilityIcon color="disabled" />
                  : <VisibilityOffIcon color="disabled" />
                }
              </span>
            </div>
            <div className="form-item">
              <TextField
                error={!formValues.confirmPassword.valid}
                name="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                type={isPasswordVisible.confirm ? 'text' : 'password'}
                value={formValues.confirmPassword.value}
                onChange={changeFormValue}
                helperText={formValues.confirmPassword.valid ? '' : 'Password not match'}
              />
              <span onClick={togglePassword.bind(null, 'confirm')} className="show-hide">
                {isPasswordVisible.confirm
                  ? <VisibilityIcon color="disabled" />
                  : <VisibilityOffIcon color="disabled" />
                }
              </span>
            </div>
            <div className="checkbox-container">
              <Checkbox
                color="primary"
                checked={agree}
                onChange={handleAgree}
              />
              I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
            </div>
            <button
              className="save-button"
              type="button"
              onClick={handleRegister}
            >SIGN UP</button>
            <span
              className="link"
              onClick={toRegistrationPage}
            >Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
