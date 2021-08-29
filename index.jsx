import React, {useState,useEffect} from "react";
import firebaseDb from "../firebase";
import {Link } from "react-router-dom";
import { object } from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";





const ListRecord= () => {
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
    })

    }, [])


    const onDelete = (id) =>  {
        if (window.confirm("are you sure you want to delete?")) {
            firebaseDb.child(`contacts/${id}`).remove((err) => {
                if (err){
                    console.log(err);
                }

            });
        }
    };




    return (
        <div className = "container-fluid mt-5 pt-10">
            <div className = "row">
                <div className = "col-lg-12">
                    <div className ="jumbotron">
                        <h2 className= "display-2"> LIST OF USERS</h2>
                    </div>
                    <table className ="table table-bordered table-striped">
                        <thead className="thead-dark">
                            <tr>
                                <th scope ="col">No</th>
                                <th scope ="col">Name</th>
                                <th scope ="col">surname</th>
                              
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data) .map((id,index) => {
                                return(
                                    <tr key={id}>
                                        <th scope ="row">{index + 1}</th>
                                        <td>{data[id].name}</td>
                                        <td>{data[id].surname}</td>
                                       
                                        <td>
                                            <Link to = {`/update/${id}`}>
                                               
                                            <a className="btn btn-secondary" href="#" >
                                                 <i className="fa fa-trash-o fa-lg"></i> Update</a>

                                            </Link>

                                                <a className="btn btn-danger" href="#" onClick = {() => onDelete(id)} >
                                                 <i className="fa fa-trash-o fa-lg"></i> Delete</a>

                                                

                                        
                                            
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


            <section className = "section bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h3 className ="main-heading">our company</h3>
                            <div className="underline mx-auto"></div>
                            <p>Our vision is put into action through programs and a focus on environmental stewardship, activities to benefit society, and a commitment to build shareholder value by making PepsiCo a truly sustainable company. At PepsiCo, we're committed to achieving business and financial success while leaving a positive imprint on society - delivering what we call Performance with Purpose." (Quoted from</p>

                        </div>

                    </div>

                </div>

            </section>
            
            <section className = "section bg-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-5 text-center">
                            <h3 className="main-heading">Vision,Mission and Values</h3>
                            <div className ="underline mx-auto"></div>
                        <div className ="col-md-4">
                            <h6>our vision</h6>
                            <p>Vision sentence example. The sun was brilliant, the pinks and oranges – combined with the multiple shades of blue sky as it lightened – creating a vision beyond that of any dream. Her vision blurred with tears, and she stood precariously.</p>
                        </div>

                        <div className ="col-md-4">
                            <h6>our Mission</h6>
                            <p>Vision sentence example. The sun was brilliant, the pinks and oranges – combined with the multiple shades of blue sky as it lightened – creating a vision beyond that of any dream. Her vision blurred with tears, and she stood precariously.</p>
                        </div>

                        <div className ="col-md-4">
                            <h6>our core values</h6>
                            <p>Vision sentence example. The sun was brilliant, the pinks and oranges – combined with the multiple shades of blue sky as it lightened – creating a vision beyond that of any dream. Her vision blurred with tears, and she stood precariously.</p>
                        </div>


                        

                        </div>
                    </div>
                </div>


            </section>


            




        </div>
    )
}

export default ListRecord
