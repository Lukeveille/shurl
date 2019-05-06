import React from 'react';

const Stat = props => {
  console.log(props)
  const time = new Date(props.stat.time);
  const year = time.getFullYear();
  const day = time.getDate();
  const month = time.getMonth();
  const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();
  
  return (
    <tr>
      <td>{months[month] + ' ' + day + ' ' + year + ' - ' + hour + ':' + min + ':' + sec}</td>
      <td>{props.stat.ip}</td>
      <td> {props.stat.device}</td>
      {/* <td>{props.stat.unique}</td> */}
    </tr>
  )
}

export default Stat;