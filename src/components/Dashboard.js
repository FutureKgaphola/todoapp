import { useState } from 'react';
import { Link,useRevalidator,useLoaderData } from 'react-router-dom';
import img_avatar from '../add_file.png'
import { IsValidSession } from '../sessions/IsValidsession';
const Dashboard = () => {
    IsValidSession();
    var ukey=sessionStorage.getItem('details');
    var uRealName=sessionStorage.getItem('uname');
    const [search,setsearch]=useState('');
    const revalidator = useRevalidator();
    const [msg,setMsg]=useState('');
    const [prior,setPriority]=useState('');

    const [name,setOwner]=useState('');
    const [datecreated,setDate]=useState('');
    const [creatorId,setcreatorId]=useState('');
    let [color,setColor]=useState('badge bg-dark');
    const [uId,setUid]=useState('');
    var dbtasks=useLoaderData();
    const dropmenu=[
        {
            'id':1,
            'optn': 'Low'
        },
        {
            'id':2,
            'optn': 'Medium'
        },
        {
            'id':3,
            'optn': 'High'
        }
    ];
    const [openModal,setOpenModal]=useState(false);
    var actionClose=()=>
      {
        setOpenModal(false);  
      }
    var Updatedb=()=>
    {
        if(prior.toLowerCase().trim()=='low')
        {
            color='badge bg-success';
            console.log('low');
            console.log(color);
        }
        if(prior.toLowerCase().trim()=='medium')
        {
            color='badge bg-warning'
            console.log('medium');
            console.log(color);
        }
        if(prior.toLowerCase().trim()=='high')
        {
            color='badge bg-danger';
            console.log('high');
            console.log(color);
        }
        if(isupdate===true)
        {
            var submition={name:uRealName,colorIcon:color,datecreated:datecreated,msg:msg,creatorId:ukey,Priority:prior,id:uId};
            fetch(`http://localhost:4000/tasks/${uId}`,
            {  
                method: "PUT",
                headers:{
                    "Accept":"application/json",
                    "content-Type": "application/json"},
                body:JSON.stringify(submition)
            }).then(response =>
                {  
                    if(response.status===200 && response.ok)
                    {
                        revalidator.revalidate();
                        setOpenModal(false);  
                    }else{
                        console.log("Something went wrong: Status code - "+response.status);
                    }
                }).catch((error)=>{console.log("Something went wrong: resulting error - "+error);}
                
            );
        }else if(isAddTask===true){
            var submition={name:uRealName,colorIcon:color,datecreated:datecreated,msg:msg,creatorId:ukey,Priority:prior};
            console.log(submition);
            console.log("is add task");
            fetch(`http://localhost:4000/tasks`,
            {  
                method: "POST",
                headers:{
                    "Accept":"application/json",
                    "content-Type": "application/json"},
                body:JSON.stringify(submition)
            }).then(response =>
                {  
                    if(response.status===200 || response.status===201)
                    {
                        console.log("succsful");
                        revalidator.revalidate();
                        setOpenModal(false);  
                    }else{
                        console.log("Something went wrong: Status code - "+response.status);
                    }
                }).catch((error)=>{console.log("Something went wrong: resulting error - "+error);}
                
            );
        }
        
        
        

    } 
    
    const [isupdate,Setisupdate]=useState(false);
    const [isAddTask,SetisAddTask]=useState(false);
    const [ButtonText,SetButtonText]=useState('');
    var handleUpdate=(rowData)=>{

        Setisupdate(true);
        SetisAddTask(false);
        SetButtonText('Update');
        if(isupdate===true)
        {
            setOpenModal(true);
            setUid(rowData.id);
            setMsg(rowData.msg);
            setOwner(rowData.name);
            setDate(rowData.datecreated);
            setcreatorId(rowData.creatorId);
            setPriority(rowData.Priority);
            setColor(rowData.colorIcon);
        }
        
    }
    var handleAddtask=()=>{
        Setisupdate(false);
        SetisAddTask(true);
        SetButtonText('Add');
        if(isAddTask===true)
        {
            console.log('add');
            setOpenModal(true);
            setUid('');
            setMsg('');
            //setOwner(userName);
            const d = new Date();
            let text = d.toLocaleDateString();
            setDate(text);
            //setcreatorId(userKey);
            setPriority('');
            //setColor(rowData.colorIcon);
        }
        
    }

    const handleDelete=(id)=>{
        fetch(`http://localhost:4000/tasks/${id}`,
        {  method: "DELETE"}).then(response =>
          {  
          if(response.status===200 && response.ok)
          {
            revalidator.revalidate();
          }else{
            console.log("Something went wrong: Status code - "+response.status);
          }
        }).catch((error)=>{
          console.log("Something went wrong: resulting error - "+error);
        });
    };

    var signout=()=>{
        sessionStorage.setItem('details','');
        sessionStorage.setItem('uname','');
        window.location.href = "/";
    }
    return ( 
        <div className="Dashboard container" style={{backgroundColor:'#2b3452'}}>

            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <h4 className="navbar-brand">To-do list Monitor</h4>
                    <form className="d-flex">
                    <input onChange={(e)=>setsearch(e.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button style={{marginLeft:"5px"}} 
                        type="button"
                        onClick={()=>handleAddtask()}
                        className="btn btn-success"
                        >+</button>
                    
                    </form>
                </div>
            </nav>
            <button onClick={()=>signout()} className="badge rounded-pill bg-dark fa fa-sign-out" aria-hidden="true">log out</button>
            <span style={{margin:'5px'}} className="badge bg-success">welcome, {uRealName}</span>
            <div className="row">
            {
                dbtasks
                .filter((item)=>{
                    return search.toLowerCase()===''
                    ? item
                    : item.Priority.toLowerCase().includes(search);
                })
                .map((task)=>{
                    if(task.creatorId==ukey)
                    {
                       return (

                        <div style={{margin:'5px'}} className="card col-lg-4 col-md-6 col-sm-12" key={task.id}>
                            <div className="card-header">
                                Priority: {task.Priority} <span style={{margin:'5px'}} className={task.colorIcon}>.</span>
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{"Date created: "+task.datecreated}</h5>
                                <p className="card-text">{task.msg}</p>
                                <Link onClick={()=>handleUpdate(task)} style={{margin:'5px'}} className="btn btn-primary">update</Link>
                                <Link onClick={()=>handleDelete(task.id)} style={{margin:'5px'}} className="btn btn-danger">delete</Link>
                            </div>
                        </div>
                       )
                    }
                })
            }
            </div>
            
            {openModal && 
                <div className='card' style={{width:'50%'}}>
                {
                  <div className="Modal">
  
                    <div>
                        <button style={{margin:"5px"}} 
                                        type="button"
                                        onClick={()=>actionClose()}
                                        className="btn btn-danger"
                                        >close</button>
                        <div className="container text-center">
                            
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="mb-3">
                                    <div className="form-group" style={{margin:'5px'}}>
                                        <label  htmlFor="exampleFormControlTextarea1">Task details</label>
                                        <textarea
                                        value={msg}
                                        onChange={(e)=>setMsg(e.target.value)}
                                         className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>                  
                                            <input type="text" required readOnly value={prior} onChange={(e)=>{setPriority(e.target.value)}} className="form-control" name="inputpos" placeholder="employee Position"/>
                                            <div className="dropdown" style={{textAlign:"start",margin:"5px"}}>
                                            <h5 defaultValue>Task Priority</h5>
                                            <select multiple={true} value={prior} id="dropdownMenu2"
                                            onChange={(e)=>setPriority(e.target.value)} className="form-select" aria-label="Default select example">
                                                
                                                {
                                                    dropmenu.map((item)=>(
                                                        
                                                        <option key={item.id} value={item.optn}>{item.optn}</option> 
                                                    ))
                                                }
                                    
                                            </select>
                                                <button style={{margin:'5px'}} 
                                                type="button"
                                                onClick={()=>Updatedb()}
                                                className="btn btn-success"
                                                >{ButtonText}</button>
                                                
                                            </div>
  
                                    </div>
  
                                    {/*{dataError && dataError.errorpos && <p>{dataError.errorpos}</p>}
                                    {dataError && dataError.errorphone && <p>{dataError.errorphone}</p>}
                                    {dataError && dataError.errorposmanual && <p>{dataError.errorposmanual}</p>}
                                    {dataError && dataError.errorsur && <p>{dataError.errorsur}</p>}
                                            {dataError && dataError.errorname && <p>{dataError.errorname}</p>}*/}
                                    
                                </div>
  
                            </div>
                        </div>
  
                    </div>
  
  
                  </div>
                }
                </div>
            }
            
        </div>
     );
}
 
export default Dashboard;