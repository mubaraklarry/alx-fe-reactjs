import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

function FormikForm() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register with Formik</h2>

        <Formik
          initialValues={{ username: '', email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log('Form submitted:', values);
            resetForm();
          }}
        >
          <Form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <Field
                type="text"
                name="username"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="username" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default FormikForm;