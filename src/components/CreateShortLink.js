import React from 'react';

const CreateShortLink = ({
  state,
  createShortLink,
  setState,
}) => {
    return (
      <div>
        <input
          id="url"
          type="text"
          value={state.url}
          placeholder="Long URL"
          onChange={e => {
            setState({ url: e.target.value });
          }}
        />
        <button onClick={() => {
          const regExp = /[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm
          if (state.url.match(regExp)) {
            setState({error: ''})
            createShortLink()
          } else {
            setState({error:'Not a valid URL!'})
            setState({url: ''})
          }
        }}>Create</button>
        <p className='error'>{state.error}</p>
      </div>
    )
};

export default CreateShortLink;