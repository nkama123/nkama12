import React ,{useState,useEffect}from 'react';
import firebaseDb from "../firebase";
import { useHistory,useParams} from 'react-router-dom';
import { isEmpty} from "lodash";
import 'bootstrap/dist/css/bootstrap.min.css';



const AddEdit = () => {

    const values = {
        name:"",
        surname:"",
        description:"",
        location:"",
        age:""
    };

    const[ initialState,setState] = useState(values);
    const {name,surname,description,location,age}= initialState;
    

    const history = useHistory();


    let currentId = useParams();
    const {id} = currentId;

    const [data,setData] = useState({});
   
    useEffect(() => {
        firebaseDb.child("contacts").on("value",(snapshot) => {
            if (snapshot.val() !== null) {
                setData({
                    ...snapshot.val(),
                });
            } else {
                snapshot({});
            }
        });
    
        }, [id])

        useEffect (() => {
            if (isEmpty (id)) {
                setState({...values});
            }else {
                setState({...data [id]})
            }

        }, [ id ,data]);


    

    
    const handleInputChange = (e)=> {
        let {name,value} = e.target;
        setState({
            ...initialState,
            [name]: value,
        })
    };

    const handleSubmit =(e)=>{
        e.preventDefault();
        if (isEmpty(id)) {
            firebaseDb.child("contacts").push(initialState,(err) => {
                if (err) {
                    console.log(err);
                }
            });

        } else {
            firebaseDb.child(`/contacts/${id}`).set(initialState,(err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
         

        history.push("/");

    };
    

        
    


    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit = {handleSubmit}>
                        <div className="form-group">
                            <label className="bmd-label-floating">Name</label>
                            <input 
                            type ="text"
                            className="form-control"
                            value={name}
                            name="name"
                            onChange = {handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="bmd-label-floating">Surname</label>
                            <input 
                            type ="text"
                            className="form-control"
                            value={surname}
                            name="surname"
                            onChange = {handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="bmd-label-floating">Description</label>
                            <input 
                            type ="text"
                            className="form-control"
                            value={description}
                            name="description"
                            onChange = {handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="bmd-label-floating">Location</label>
                            <input 
                            type ="text"
                            className="form-control"
                            value={location}
                            name="location"
                            onChange = {handleInputChange}>
                            </input>
                        </div>

                        <div className="form-group">
                            <label className="bmd-label-floating">Age</label>
                            <input 
                            type ="number"
                            className="form-control"
                            value={age}
                            name="age"
                            onChange = {handleInputChange}
                            />
                        </div>
                        <button className="btn btn-default">cancel</button>
                        <button type ="submit" className="btn btn-success btn-raised">submit</button>







                    </form>
                </div>
            </div>

            
            
        </div>
    )
}

export default AddEdit
