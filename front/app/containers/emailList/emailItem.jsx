import React, { useEffect } from 'react'
import { makeSelectEmailById, selectLoading, selectEmails } from './selectors';
import { fetchEmailById } from './actions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const EmailItem = ({ email, loading}) =>{

console.log("the emiia", email);

    const { id } = useParams()
    useEffect(()=>{
        if(!email){
            console.log("Inside the non working");
            fetchEmailById(id)
        }
    },[email, id, fetchEmailById])

    if (!email) {
        console.log("The email", email);
        return <div>Loading...</div>;
      }

      
      const formattedBody = DOMPurify.sanitize(
        email.body.replace(/(\r\n|\r|\n)/g, "<br />")
      )
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '1rem' }}>
      <h1>{email.subject}</h1>
      <p><strong>From:</strong> {email.from || email.sender}</p>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: formattedBody }} />
    </div>
  );
};



const mapStateToProps = (state )=>{
    const { id } = useParams()
    const selectEmail = makeSelectEmailById(id) 
    return{
        email: selectEmail(state),
        loading: selectLoading(state)
    }  

}

const mapDispatchToProps = {
    fetchEmailById
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailItem);