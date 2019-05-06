import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import * as deviceCheck from 'react-device-detect';

const GET_FULL_LINK_QUERY = gql`
  query GetFullLink($hash: String!) {
    allLinks(filter: { hash: $hash }) {
      id
      url
      stats {
        id
        ip
        os
        location
        device
        browser
      }
    }
  }
`;

const CREATE_LINK_STATS_MUTATION = gql`
  mutation CreateLinkStats($linkId: ID!, $time: Float!, $ip: String!, $device: String!, $browser: String!, $os: String!, $location: String!) {
    createLinkStats(linkId: $linkId, time: $time, ip: $ip, device: $device, browser: $browser os: $os location: $location) {
      id
      ip
      os
      location
      device
      browser
    }
  }
`;

class ShortLinkRedirect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ip: '',
      os: '',
      location: '',
      device: '',
      browser: '',
    }
  }

  componentDidMount() {
    const model = deviceCheck.isMobileOnly? 'Mobile' : deviceCheck.isTablet? 'Tablet' : deviceCheck.isWearable? 'Wearable Device' : deviceCheck.isConsole? 'Console' : deviceCheck.isSmartTV? 'Smart TV' : 'Desktop';
    const platform = model === 'Desktop'? 'Desktop' : model + deviceCheck.isAndroid? 'Android' : deviceCheck.isIOS? 'iOS' : deviceCheck.isWinPhone? 'Windows Phone' : model
    const device = deviceCheck.isMobile? platform + ' ' + deviceCheck.mobileVendor + ' ' + deviceCheck.mobileModel : platform
    const browser = deviceCheck.browserName;
    const os = deviceCheck.osName + ' ' + deviceCheck.osVersion;

    fetch('http://ip-api.com/json/')
    .then(res => res.json())
    .then(data => this.setState({ip: data.query, location: (data.city + ', ' + data.region + ', ' + data.countryCode), device, browser, os, }));
  }

  render() {
    // alert(this.state.ip + '\n' + this.state.device + '\n' + this.state.browser + '\n' + this.state.os + '\n' + this.state.location)
  
    if (this.props.data.error) {
      return <div>Error occurred</div>;
    }
    
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
  
    if (!this.props.data.allLinks || this.props.data.allLinks.length !== 1) {
      return <div>No redirect found for '{this.props.hash}'</div>;
    }
  
    const linkInfo = this.props.data.allLinks[0];
    const time = Date.now();
  
    this.props.createLinkStats({
      variables: {
        linkId: linkInfo.id,
        time,
        ip: this.state.ip,  
        os: this.state.os,
        location: this.state.location,
        device: this.state.device,
        browser: this.state.browser,
      },
    });
  
    window.location = this.props.data.allLinks[0].url;
    return null;
  }
};

ShortLinkRedirect.propTypes = {
  hash: PropTypes.string,
};

export default compose(
  graphql(CREATE_LINK_STATS_MUTATION, { name: 'createLinkStats' }),
  graphql(GET_FULL_LINK_QUERY, {
    options: ({ hash }) => ({ variables: { hash } }),
  }),
)(ShortLinkRedirect);