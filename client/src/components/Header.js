import React, { Component } from 'react';
import { connect} from 'react-redux';

class Header extends Component {

  rendercontent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Log in with Google</a></li>
      default:
        return <li><a href="/api/logout">Log Out</a></li>
    }
  }

  render() {
    return (
      <nav>
      <div className="nav-wrapper">
        <a href="/" className="left brand-logo">Emaily</a>
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