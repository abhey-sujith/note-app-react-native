
export const registerUser = async (userDetails) => {
  try {
    console.log('inside registerUser');
    const response = await fetch(
      'https://note-app-laravel-api.herokuapp.com/api/v1/register',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userDetails.email,
          name: userDetails.name,
          password: userDetails.password,
          password_confirmation: userDetails.password_confirmation
        })
      }
    );
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};


export const LoginUser = async (userDetails) => {
  try {
    console.log('inside registerUser');
    const response = await fetch(
      'https://note-app-laravel-api.herokuapp.com/api/v1/login',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userDetails.email,
          password: userDetails.password,
        })
      }
    );
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};

export const LogoutUser = async (token) => {
  try {
    console.log('inside registerUser');
    const response = await fetch(
      'https://note-app-laravel-api.herokuapp.com/api/v1/logout',{
        method: 'POST',
        headers: {
          'Authorization': 'Bearer '+{token},
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      }
    );
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};