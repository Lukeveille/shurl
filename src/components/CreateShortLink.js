import React from 'react';

const CreateShortLink = props => {
    return (
      <div>
        <input
          id="url"
          type="text"
          value={props.state.url}
          placeholder="Long URL"
          onChange={e => {
            props.setState({ url: e.target.value });
          }}
        />
        <button onClick={() => {
          const regExp = /[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
          if (props.state.url.match(regExp)) {
            props.setState({error: ''})
            props.createShortLink()
          } else {
            props.setState({error:'Not a valid URL!'})
            props.setState({url: ''})
          }
        }}>Create</button>
        <p className='error'>{props.state.error}</p>
      </div>
    )
};

export default CreateShortLink;