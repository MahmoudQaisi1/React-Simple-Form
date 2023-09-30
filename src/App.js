import './App.css';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

function App() {

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8, 'Password must be at least 8 characters long').required(),
    phone: yup.string()
    .matches(/^(05[9260][0-9]{7})$/, 'Invalid phone number')
    .max(10, 'Phone number must be at most 10 characters')
    .required('Phone number is required')

  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = data => console.log(data);

  return (
    <div className='App'> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input type="text" {...register("firstName")} />
        {errors.firstName && <p>{errors.firstName.message}</p>}
        <label htmlFor="lastName">Last Name</label>
        <input type="text" {...register('lastName')} />
        {errors.lastName && <p>{errors.lastName.message}</p>}
        <label>Email</label>
        <input type="text" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
        <label>Password</label>
        <input  type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
        <label htmlFor="phone">Phone</label>
        <input type="tel" {...register('phone')} />
        {errors.phone && <p>{errors.phone.message}</p>}
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
