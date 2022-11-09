import * as yup from 'yup'
import { Form, Formik, Field, FormikProps } from 'formik';
import { useDispatch } from "react-redux";
import { AppDispatch } from "..";
import { logIn } from '../reducers/userReducer';
import { PrimaryButton } from '../theme';

import { useFetchUserAndNavigate } from '../hooks';

interface Values {
  username: string;
  password: string
}

const SignIn = () => {
  const dispatch: AppDispatch = useDispatch()
  useFetchUserAndNavigate()

  const valdiationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required.'),
    password: yup
      .string()
      .required('Password is required.')
  })



  const onSubmit = async (values: Values) => {
    const credentials = values;
    dispatch(logIn(credentials))
  }

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={valdiationSchema}
      >
        {(props: FormikProps<Values>) => (
          <Form>
              <Field type="username" name="username" placeholder="username" />
              <Field type="password" name="password" placeholder="password" />
              <PrimaryButton type="submit">login</PrimaryButton>
          </Form>
        )}
      </Formik>
    </div>
  )
}


export default SignIn


