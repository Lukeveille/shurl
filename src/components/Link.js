import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Link extends Component {
  render() {
    const clickCount = (this.props.link.stats && this.props.link.stats.length) || 0;
    return (
      <div>
        <a href={'../' + this.props.link.hash} target={"_blank"}>
          {this.props.link.hash}
        </a> - Clicks: {clickCount} - <a href={'/' + this.props.link.hash + '/stats'}>stats</a> - {this.props.link.url}
      </div>
    );
  }
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