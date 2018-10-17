import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect} from 'react-redux';
import Payments from './Payments';

class Header extends Component {

  rendercontent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Log in with Google</a></li>
      default:
        return [ 
          <li key="1"><Payments /></li>,
          <li key="3" style={{margin: '0px 10px'}}>Credits: {this.props.auth.credits}</li>,
          <li key="2"><a href="/api/logout">Log Out</a></li>
        ]
    }
  }

  render() {
    return (
      <nav>
      <div className="nav-wrapper">
        <Link 
          to={this.props.auth ? '/surveys' : '/'} 
          className="left brand-logo"
        >Emaily
        </Link>
        <ul id="nav-mobile" className="right">
          {this.rendercontent()}
        </ul>
      </div>
    </nav>  
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  }
}

export default connect(mapStateToProps)(Header);