import {useEffect, useState} from "react";

function App() {
  const initialState = {
    errors: {
      name: false,
      email: false,
      mobile: false,
    },
    userInfo: {
      name: '',
      email: '',
      mobile: '',
    }
  }
  const [userInfo, setUserInfo] = useState(initialState.userInfo)
  const [errors, setErrors] = useState(initialState.errors)
  const [storeUsers, setStoreUsers] = useState([]);

  useEffect(() => {
    setStoreUsers(JSON.parse(localStorage.getItem('userList') || '[]'));
  }, [])

  const setValues = ({target}) => {
    setUserInfo(prev => ({
      ...prev,
      [target.name]: target.value.trim()
    }))
  }

  const validateFields = () => {
    const isNameValid = userInfo.name ? true : false;
    const isEmailValid = /[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/.test(userInfo.email);
    const isMobileValid = /^[0-9]{10}$/.test(userInfo.mobile);

    setErrors({
      name: !isNameValid,
      email: !isEmailValid,
      mobile: !isMobileValid,
    })
    return isNameValid && isEmailValid && isMobileValid;
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if(validateFields()) {
      const userList = JSON.parse(localStorage.getItem('userList') || '[]');
      userList.push(userInfo);
      localStorage.setItem('userList', JSON.stringify(userList));
      setStoreUsers(userList);
      setErrors(initialState.errors)
      setUserInfo(initialState.userInfo)
    };
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={setValues}
            value={userInfo.name}
          />
          {errors.name && <span>Invalid name</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={setValues}
            value={userInfo.email}
          />
          {errors.email && <span>Invalid email</span>}
        </div>

        <div>
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            onChange={setValues}
            value={userInfo.mobile}
          />
          {errors.mobile && <span>Invalid mobile number</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
      <div>
        {storeUsers.map((user, i) => 
          <div key={i}>
            <span>Name: {user.name}</span>
            <span>Email: {user.email}</span>
            <span>Mobile: {user.mobile}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
