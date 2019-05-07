import React from 'react';
import PropTypes from 'prop-types';

const Link = props => {
    const clickCount = (props.link.stats && props.link.stats.length) || 0;
    return (
      <div>
        <a href={'../' + props.link.hash} target={"_blank"}>
          {props.link.hash}
        </a> - Clicks: {clickCount} - <a href={'/' + props.link.hash + '/stats'}>stats</a> - {props.link.url}
      </div>
    );
};

Link.propTypes = {
  link: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    hash: PropTypes.string,
    stats: PropTypes.array,
  }),
};

export default Link;