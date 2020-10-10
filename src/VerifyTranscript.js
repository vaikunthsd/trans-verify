import React, { Component } from 'react';

class VerifyTranscript extends Component {
  state = {
    transcriptHash: null,
    transcriptPath: null,
    dataKey: null,
    showResult: false
  }

  handleSubmit = e => {
    e.preventDefault();
    const { drizzle } = this.props;
    const { transcriptHash } = this.state;
    const dataKey = drizzle
      .contracts['Transcript']
      .methods['verifyRecord']
      .cacheCall(transcriptHash);
    this.setState({
      showResult: true, 
      dataKey
    });
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const { drizzle } = this.props;

    reader.onload = (e) => {
      const hash = drizzle.web3.utils.keccak256(e.target.result)
      this.setState({
        showResult: false,
        transcriptHash: hash,
        transcriptPath: e.target.result
      });
    }
		reader.readAsDataURL(file);
	}

  render() {
    const { Transcript } = this.props.drizzleState.contracts;
    const { dataKey, transcriptPath, showResult } = this.state;
    const result = dataKey 
      && Transcript.verifyRecord[dataKey]
      && Transcript.verifyRecord[dataKey].value;

    return (
      <div className="verifyTranscript mt-4">
        <h2>VERIFY STUDENT TRANSCRIPT</h2>
        <h4>1. Upload pdf transcript</h4>
        <form>
          <div className="form-group">
            <input 
              style={{marginLeft: '100px'}}
              id="transcript"
              name="transcript"
              className="form-control-file"
              type="file" 
              onChange={this.handleFileChange} />
          </div>
        </form>

        <br />

        {transcriptPath && (
          <object 
            id="pdf" 
            data={transcriptPath} 
            type="application/pdf" 
            width="100%" />
        )}

        <br />

        <h4>2. Verify PDF on the blockchain</h4>
        <form onSubmit={this.handleSubmit}>
          <button 
            disabled={transcriptPath ? false : true}
            type="submit" 
            className="btn btn-primary">Submit</button>
        </form>
        {showResult && (
          <small>{`Result: ${result ? 'Authentic' : 'Counterfiet'}`}</small>
        )}
      </div>
    );
  }
};

export default VerifyTranscript;
