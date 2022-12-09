export default async function useLogout() 
{
  let requestOptions = {
    method: "POST",
  }
  let response = await fetch("/api/logout", requestOptions)
    .then((response) => {
      return response.json();
    })
    .catch(() => {
        return 'error has occured';
    });
    if(response?.status===undefined || response?.status === 500)
    {
        return 'you are loged';
    }
    if(response?.status===undefined || response?.status !== 200)
    {
        return 'error has occured';
    }
    return 'you are logged';
}