

const IsValidSession=()=>
{
    if (sessionStorage.getItem('details')==='' || sessionStorage.getItem('details')==null ) {
        sessionStorage.setItem('details','');
        sessionStorage.setItem('uname','');
        window.location.href = "/";
      }
}

export {IsValidSession}

    

