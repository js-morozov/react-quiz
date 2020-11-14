import React, { Component } from 'react';
import styles from './Layout.css'

class Layout extends Component {
  render() {
    return (
      <div className={styles.layout}>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;