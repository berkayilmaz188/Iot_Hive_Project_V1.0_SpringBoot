import Alert from 'react-bootstrap/Alert';

function PostAlert() {
    return (
        <>
        {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map((variant) => (
          <Alert key={success} variant={success}>
            {success} The post has been sent.
          </Alert>
        ))}
      </>
    );
  }

  export default PostAlert;