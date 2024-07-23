import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './useSignup';
import { useUser } from './useUser';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  const { signup, isLoading } = useSignup();
  // const { isAdmin } = useUser();

  const disabled = isLoading;

  function onSubmit(data) {
    const { fullName, email, password } = data;
    signup({ fullName, email, password }, { onSettled: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors?.fullName?.message}>
        <Input
          disabled={disabled}
          placeholder='Name'
          type='text'
          id='fullName'
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors?.email?.message}>
        <Input
          placeholder='Email'
          disabled={disabled}
          type='email'
          id='email'
          {...register('email', {
            required: 'This field is required',
            pattern: { value: /\S+@\S+\.\S+/, message: 'Please provide a valid email address' },
          })}
        />
      </FormRow>

      <FormRow label='Password (min 8 characters)' error={errors?.password?.message}>
        <Input
          placeholder='Password'
          disabled={disabled}
          type='password'
          id='password'
          {...register('password', {
            required: 'This field is required',
            minLength: { value: 8, message: 'Password should be at least 8 characters' },
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors?.passwordConfirm?.message}>
        <Input
          placeholder='Verify password'
          disabled={disabled}
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            minLength: { value: 8, message: 'Password should be at least 8 characters' },
            validate: value => value === getValues().password || 'Passwords need to match',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' onClick={reset} disabled={disabled}>
          Cancel
        </Button>
        <Button disabled={disabled}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
