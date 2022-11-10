import { useDispatch } from "react-redux";
import { AppDispatch } from "..";
import { register } from '../reducers/userReducer';
import { PrimaryButton } from '../theme';
import { useFetchUserAndNavigate } from '../hooks';
import { useField } from "../hooks";
import { Credentials } from "../types";
import { setErrorfulNotification } from "../reducers/notificationReducer";
import { PrimaryInputField } from "../theme";



const SignUp = () => {
  const dispatch: AppDispatch = useDispatch()
  useFetchUserAndNavigate()

  const username = useField("text")
  const password = useField("password")
  const name = useField("text")
  const email = useField("email")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (username.value.length < 3) {
      !username.value
        ? dispatch(setErrorfulNotification("Username is empty", 5))
        : dispatch(setErrorfulNotification("Username must be at least 3 characters long", 7))

    } else if (password.value.length < 7) {
      !password.value
        ? dispatch(setErrorfulNotification("Password is empty", 5))
        : dispatch(setErrorfulNotification("Passowrd must be at least 7 characters long", 7))
    } else {
      const credentials: Credentials = {
        username: username.value,
        password: password.value
      };
      dispatch(register(credentials))
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

        <div>
          <PrimaryInputField {...name} placeholder="name, Not required for this demo.."
          />
        </div>
        <div>
          <PrimaryInputField {...email} placeholder="email, Not required for this demo.."
          />
        </div>
        <PrimaryButton type="submit">Sign Up</PrimaryButton>
      </form>
    </div>
  )
}


export default SignUp


