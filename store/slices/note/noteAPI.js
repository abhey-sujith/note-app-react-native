
export const createNote = async (noteDetails) => {
  try {
    const token=noteDetails.token;
    console.log('inside createNote','Bearer ',token);
    const response = await fetch(
      'https://note-app-laravel-api.herokuapp.com/api/v1/notes',{
        method: 'POST',
        headers: {
          Authorization: 'Bearer '+token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: noteDetails.title,
          description: noteDetails.description,
        })
      }
    );
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};


export const editNote = async (noteDetails) => {
  try {
    const token=noteDetails.token;
    const noteid=noteDetails.id;
    console.log('inside createNote','Bearer ',noteid);
    const response = await fetch(
      'https://note-app-laravel-api.herokuapp.com/api/v1/notes/'+noteid,{
        method: 'PUT',
        headers: {
          Authorization: 'Bearer '+token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: noteDetails.title,
          description: noteDetails.description,
        })
      }
    );
    const json = await response.json();

    return json;
  } catch (error) {
    console.error(error);
  }
};



export const getNotes = async (token,pagenumber) => {
  try {
    console.log('inside createNote','Bearer ',pagenumber);
    const response = await fetch(
      'https://note-app-laravel-api.herokuapp.com/api/v1/notes?page='+pagenumber,{
        method: 'GET',
        headers: {
          Authorization: 'Bearer '+token,
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

export const deleteNotes = async (token,id) => {
  try {
    console.log('inside createNote','Bearer ',id);
    const response = await fetch(
      'https://note-app-laravel-api.herokuapp.com/api/v1/notes/'+id,{
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer '+token,
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