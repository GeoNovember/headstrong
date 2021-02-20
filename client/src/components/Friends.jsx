import React from 'react';
import moment from 'moment'

const Friends = ({entries, username}) => {
  const time = moment().calendar()
  const entrys = entries.filter((entry) => {
    if(entry.username !== username){
      return true;
    }
    return false;
  })

  return (
    <div>
      <h1 id='friendsPost'>Friend Activity</h1>


      {entrys.map(entry =>
        <div key={ entry.id } id='comment' >
          <div>{`${entry.username}`}</div>
          <div>{`${entry.title}`}</div>
          <div>{`${entry.blog}`}</div>
          {entry.journalImage ? <div ><img height='200px' width='300px' src={entry.journalImage}/></div> : null}
          <div>{` ${time}`}</div>

        </div>)
    }
    </div>
  );
};

export default Friends;