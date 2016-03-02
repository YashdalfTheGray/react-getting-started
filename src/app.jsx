var Button = React.createClass({
    handleClick: function() {
        this.props.handleClick(this.props.increment);
    },
    render: function() {
        return (
            <button onClick={this.handleClick}>Add {this.props.increment}</button>
        )
    }
});

var Result = React.createClass({
    render: function() {
        return (
            <div>{this.props.counterValue}</div>
        );
    }
});

var Main = React.createClass({
    getInitialState: function() {
        return {
            counter: 0
        };
    },
    handleClick: function(increment) {
        this.setState({
            counter: this.state.counter + increment
        });
    },
    render: function() {
        return (
            <div>
                <Button handleClick={this.handleClick} increment={1} />
                <Button handleClick={this.handleClick} increment={5} />
                <Button handleClick={this.handleClick} increment={10} />
                <Button handleClick={this.handleClick} increment={100} />
                <Result counterValue={this.state.counter} />
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('root'));
