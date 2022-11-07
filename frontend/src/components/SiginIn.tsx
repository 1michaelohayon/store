import * as yup from 'yup'
import { Form, Formik, Field, FormikProps } from 'formik';
import style from '../theme/formField'
import { useDispatch } from "react-redux";
import { AppDispatch } from "..";
import { logIn } from '../reducers/userReducer';

import { useFetchUserAndNavigate } from '../hooks';
const { FieldContainer } = style

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
            <FieldContainer>
              <Field type="username" name="username" placeholder="username" />
            </FieldContainer>
            <FieldContainer>
              <Field type="password" name="password" placeholder="password" />
            </FieldContainer>
            <FieldContainer>
              <button type="submit">login</button>
            </FieldContainer>
          </Form>
        )}
      </Formik>
    </div>
  )
}


export default SignIn


