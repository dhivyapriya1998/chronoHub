import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchEmails } from './actions'
import { selectEmails, selectLoading } from './selectors'
import './emailList.css'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'

const EmailList = ({ emails, loading, fetchEmails }) => {
  const navigate = useNavigate()

  useEffect(() => {
    fetchEmails()
  },[])

  console.log("annnan nathan");
  return (
    <div className="glass-container">
      <h2 className="header">📧 Your Inbox</h2>
{loading ? (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <Spin size="large" />
  </div>
) : (      <ul className="email-list">
        {emails.map((email, i) => (
          <li
            className="email-item"
            key={i}
            onClick={() => navigate(`/emails/${email.id}`)}
          >
            <div className="email-from">{email.from}</div>
            <div className="email-subject">{email.subject}</div>
          </li>
        ))}
      </ul>
)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  emails: selectEmails(state),
  loading: selectLoading(state),
})

const mapDispatchToProps = {
  fetchEmails,
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailList)
