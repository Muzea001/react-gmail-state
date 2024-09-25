import  { useState, useEffect } from 'react';
import emailsData from './data/emails';
import Header from './components/Header'

const App = () => {
  const [emailList, setEmailList] = useState([]);
  const [hideRead, setHideRead] = useState(false);  
  const [currentTab, setCurrentTab] = useState('inbox'); 

  useEffect(() => {
    setEmailList(emailsData);
  }, []);

  const toggleRead = (id) => {
    setEmailList((prevEmailList) =>
      prevEmailList.map((email) =>
        email.id === id ? { ...email, read: !email.read } : email
      )
    );
  };

  const toggleStar = (id) => {
    setEmailList((prevEmailList) =>
      prevEmailList.map((email) =>
        email.id === id ? { ...email, starred: !email.starred } : email
      )
    );
  };

  const getReadEmails = (emails) => {
    return hideRead ? emails.filter(email => !email.read) : emails;
  };

  const handleHideReadChange = () => {
    setHideRead(!hideRead);
  };

   const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const filteredEmails = getReadEmails(emailList);

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={`item ${currentTab === 'inbox' ? 'active' : ''}`}
            onClick={() => handleTabChange('inbox')}
          >
            <span className="label">Inbox</span>
            <span className="count">{emailList.length}</span> {/* Inbox count */}
          </li>
          <li
            className={`item ${currentTab === 'starred' ? 'active' : ''}`}
            onClick={() => handleTabChange('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{emailList.filter(email => email.starred).length}</span> {/* Starred count */}
          </li>
          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={handleHideReadChange}  // Handle checkbox change
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {filteredEmails.map((email) => (
            <li key={email.id} className="email">
              <div className="select">
                <input
                  className="select-checkbox"
                  type="checkbox"
                />
              </div>
              <div className="star">
                <input
                  className="star-checkbox"
                  type="checkbox"
                  checked={email.starred}
                  onClick={() => toggleStar(email.id)} 
                />
              </div>
              <div className="sender">{email.sender}</div>
              <div className="title">{email.title}</div>
              <div className="read">
                <input
                  type="checkbox"
                  checked={email.read}
                  onClick={() => toggleRead(email.id)} 
                />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
