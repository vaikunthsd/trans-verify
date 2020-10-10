import React, { Component } from 'react';

class AddRecord extends Component {
  state = {
    student: null,
    transcript: null,
    stackId: null
  }

  handleChange = (field, e) => {
    this.setState({[field]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const { student, transcript } = this.state;
    const stackId = drizzle
      .contracts['Transcript']
      .methods['addRecord']
      .cacheSend(student, transcript, {from: drizzleState.accounts[0]});
    this.setState({stackId});
  }

  render() {
    const { transactions, transactionStack } = this.props.drizzleState; 
    const { stackId } = this.state;
    const txHash = transactionStack[stackId];

    return (
      <div className="addRecord">
        <h2>Add record (only for admin)</h2>
          <small>{`Transaction status ${txHash && transactions[txHash] && transactions[txHash].status}`};</small>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="student">Student address</label>
            <input 
              className="form-control"
              name="student" 
              id="student"
              type="text" 
              onChange={e => this.handleChange('student', e)} />
          </div>
          <div className="form-group">
            <label htmlFor="transcript">Transcript JSON</label>
            <input 
              className="form-control"
              name="transcript"
              id="transcript"
              type="text" 
              onChange={e => this.handleChange('transcript', e)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
};

export default AddRecord;
