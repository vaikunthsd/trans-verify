import React, { Component } from 'react';

class SignTranscript extends Component {
  state = {
    transcriptHash: null,
    transcriptPath: null,
    dataKey: null,
    showResult: false
  }

  handleSubmit = e => {
    e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const { transcriptHash } = this.state;
    const stackId = drizzle
      .contracts['Transcript']
      .methods['addRecord']
      .cacheSend(transcriptHash, {from: drizzleState.accounts[0]});
    const subject = "Your university transcript was signed"
    const body = "Your university transcript was signed by the university. Any employer can authentify the pdf transcript at http://jverify.com/verify-transcript";
    window.open(`mailto:studentEmail@uni.com?subject=${subject}&body=${body}`);
    this.setState({stackId, showResult: true});
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
    const { transactions, transactionStack } = this.props.drizzleState; 
    const { stackId, transcriptPath, showResult } = this.state;
    const txHash = transactionStack[stackId];

    return (
      <div className="signTranscript mt-4">
        <h2>SIGN STUDENT TRANSCRIPT</h2>
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

        <h4>2. Sign PDF on the blockchain</h4>
        <form onSubmit={this.handleSubmit}>
          <button 
            disabled={transcriptPath ? false : true}
            type="submit" 
            className="btn btn-primary">Submit</button>
        </form>
        {showResult && (
          <small>{`Transaction status ${txHash && transactions[txHash] && transactions[txHash].status}`};</small>
        )}
      </  div>
    );
  }
};

export default SignTranscript;
