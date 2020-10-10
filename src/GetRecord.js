import React, { Component } from 'react';

class GetRecord extends Component {
  state = {
    student: null,
    dataKey: null
  }

  handleChange = (field, e) => {
    this.setState({[field]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const { drizzle } = this.props;
    const { student } = this.state;
    const dataKey = drizzle
      .contracts['Transcript']
      .methods['getRecord']
      .cacheCall(student);
    this.setState({dataKey});
  }

  render() {
    const { Transcript } = this.props.drizzleState.contracts;
    const { dataKey } = this.state;
    const record = dataKey 
      && Transcript.getRecord[dataKey]
      && Transcript.getRecord[dataKey].value;

    return (
      <div className="getRecord">
        <h2>View hash of Student transcript</h2>
        <small>Hash: {record}</small>
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
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
};

export default GetRecord;
