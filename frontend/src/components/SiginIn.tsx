import { useDispatch } from "react-redux";
import { AppDispatch } from "..";
import { logIn } from '../reducers/userReducer';
import { PrimaryButton } from '../theme';
import { useFetchUserAndNavigate } from '../hooks';
import { useField } from "../hooks";
import { Credentials } from "../types";
import { setErrorfulNotification } from "../reducers/notificationReducer";
import { PrimaryInputField } from "../theme";



const SignIn = () => {
  const dispatch: AppDispatch = useDispatch()
  useFetchUserAndNavigate()

  const username = useField("text")
  const password = useField("password")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username.value) {
      dispatch(setErrorfulNotification("Username is empty", 3))
    } else if (!password.value){
      dispatch(setErrorfulNotification("Password is empty", 3))

    } else {
      const credentials: Credentials = {
        username: username.value,
        password: password.value
      };
      dispatch(logIn(credentials))
    }

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <PrimaryInputField {...username} placeholder="username"
          />
        </div>
        <div>
          <PrimaryInputField {...password} placeholder="password"
           />
        </div>
        <PrimaryButton type="submit">login</PrimaryButton>
      </form>
    </div>
  )
}


export default SignIn


